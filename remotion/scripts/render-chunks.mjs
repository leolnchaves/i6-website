import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition, openBrowser } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.argv[2] ?? '/tmp/vid2';
const start = Number(process.argv[3] ?? 0);
const end = Number(process.argv[4] ?? 3363);
const step = Number(process.argv[5] ?? 210);

fs.mkdirSync(outDir, { recursive: true });

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, '../src/index.ts'),
  webpackOverride: (c) => c,
});

for (let s = start; s <= end; s += step) {
  const e = Math.min(s + step - 1, end);
  const out = path.join(outDir, `part-${String(s).padStart(5, '0')}.mp4`);
  if (fs.existsSync(out)) {
    console.log('skip', out);
    continue;
  }
  const browser = await openBrowser('chrome', {
    browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? '/bin/chromium',
    chromiumOptions: { args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] },
    chromeMode: 'chrome-for-testing',
  });
  const composition = await selectComposition({ serveUrl: bundled, id: 'main', puppeteerInstance: browser });
  console.log('START', s, e, new Date().toISOString());
  try {
    await renderMedia({
      composition,
      serveUrl: bundled,
      codec: 'h264',
      outputLocation: out,
      puppeteerInstance: browser,
      muted: true,
      concurrency: 3,
      timeoutInMilliseconds: 120000,
      frameRange: [s, e],
      onProgress: ({ renderedFrames }) => {
        if (renderedFrames % 30 === 0) console.log('frames', renderedFrames, '/', e - s + 1);
      },
    });
    console.log('OK', s, e, new Date().toISOString());
  } catch (err) {
    console.log('ERR', s, e, String(err).slice(0, 500));
  }
  await browser.close({ silent: false });
}
console.log('ALLDONE');
