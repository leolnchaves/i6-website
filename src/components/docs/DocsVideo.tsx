import { useState } from 'react';
import { Play } from 'lucide-react';

interface DocsVideoProps {
  videoId: string;
  title: string;
  playLabel: string;
}

/**
 * YouTube embed for documentation pages of type `video`.
 * No third-party iframe is created before the visitor clicks play — until then
 * only the thumbnail is loaded.
 */
const DocsVideo = ({ videoId, title, playLabel }: DocsVideoProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-secondary/50">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={playLabel}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-[#0B1224]/35 transition-colors group-hover:bg-[#0B1224]/20" />
            <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
              <Play className="h-6 w-6 translate-x-[1px]" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DocsVideo;
