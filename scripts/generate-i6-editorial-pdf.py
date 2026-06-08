#!/usr/bin/env python3
"""
infinity6 editorial PDF generator.

Reads a source PDF (article), extracts text/sections, and renders an
editorial-style PDF in the infinity6 visual language: deep navy, coral accents,
flowing wave lines, large typography, integrated text-as-design.

Usage:
    python scripts/generate-i6-editorial-pdf.py <input.pdf> <output.pdf>

The script auto-detects:
  - Title (largest line on page 1 / first heading)
  - Section headings (## or short standalone lines preceding paragraphs)
  - Bullet lists (lines starting with * or -)
  - Statistics (\\d+%, ranges, US$ N)
  - Pull-quotes (short isolated paragraphs or first sentences)
  - Trailing metadata block (Title:/Slug:/Excerpt:/Cluster:/CTA)

If detection fails for a layout, the script falls back to a simpler page.
"""

from __future__ import annotations

import math
import os
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import pdfplumber
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as rl_canvas

# ---------------------------------------------------------------------------
# Brand tokens
# ---------------------------------------------------------------------------

NAVY = HexColor("#0B1224")
NAVY_ELEVATED = HexColor("#141C36")
NAVY_LINE = HexColor("#1E2746")
CORAL = HexColor("#F4845F")
CORAL_DIM = HexColor("#A85B43")
TEXT_LIGHT = HexColor("#E7ECF5")
TEXT_MUTED = HexColor("#9AA3B7")
TEXT_DIM = HexColor("#5B6480")
WHITE = HexColor("#FFFFFF")

PAGE_W, PAGE_H = A4  # 595.27 x 841.89 pt
MARGIN = 48

# ---------------------------------------------------------------------------
# Font registration
# ---------------------------------------------------------------------------

FONT_DIR = os.environ.get("I6_FONT_DIR", "/tmp/i6fonts")


def _try_register(name: str, filename: str) -> bool:
    path = os.path.join(FONT_DIR, filename)
    if not os.path.exists(path) or os.path.getsize(path) < 5000:
        return False
    try:
        pdfmetrics.registerFont(TTFont(name, path))
        return True
    except Exception:
        return False


HAVE_FRAUNCES = all([
    _try_register("Fraunces", "Fraunces-Regular.ttf"),
    _try_register("Fraunces-Light", "Fraunces-Light.ttf"),
    _try_register("Fraunces-Bold", "Fraunces-Bold.ttf"),
    _try_register("Fraunces-Black", "Fraunces-Black.ttf"),
])
HAVE_INTER = all([
    _try_register("Inter", "Inter-Regular.ttf"),
    _try_register("Inter-Light", "Inter-Light.ttf"),
    _try_register("Inter-Medium", "Inter-Medium.ttf"),
    _try_register("Inter-Bold", "Inter-Bold.ttf"),
    _try_register("Inter-Black", "Inter-Black.ttf"),
])

DISPLAY = "Fraunces-Black" if HAVE_FRAUNCES else "Helvetica-Bold"
DISPLAY_LIGHT = "Fraunces-Light" if HAVE_FRAUNCES else "Helvetica"
DISPLAY_REG = "Fraunces" if HAVE_FRAUNCES else "Helvetica"
DISPLAY_BOLD = "Fraunces-Bold" if HAVE_FRAUNCES else "Helvetica-Bold"
BODY = "Inter" if HAVE_INTER else "Helvetica"
BODY_LIGHT = "Inter-Light" if HAVE_INTER else "Helvetica"
BODY_MEDIUM = "Inter-Medium" if HAVE_INTER else "Helvetica-Bold"
BODY_BOLD = "Inter-Bold" if HAVE_INTER else "Helvetica-Bold"
BODY_BLACK = "Inter-Black" if HAVE_INTER else "Helvetica-Bold"


# ---------------------------------------------------------------------------
# Brand logo assets (white symbol + horizontal wordmark)
# ---------------------------------------------------------------------------

_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
LOGO_SYMBOL = os.path.join(_SCRIPT_DIR, "assets", "infinity6_symbol_white.png")
LOGO_HORIZ = os.path.join(_SCRIPT_DIR, "assets", "infinity6_horiz_white.png")
# Native aspect ratios (width / height) of the cropped artwork.
_SYMBOL_AR = 1448 / 930
_HORIZ_AR = 1624 / 249


def draw_logo_symbol(c, x: float, y: float, height: float) -> None:
    """Draw the infinity6 symbol with its bottom-left at (x, y)."""
    if not os.path.exists(LOGO_SYMBOL):
        return
    w = height * _SYMBOL_AR
    c.drawImage(LOGO_SYMBOL, x, y, width=w, height=height, mask="auto",
                preserveAspectRatio=True)


def draw_logo_horizontal(c, x: float, y: float, height: float) -> None:
    """Draw the horizontal infinity6 wordmark with its bottom-left at (x, y)."""
    if not os.path.exists(LOGO_HORIZ):
        return
    w = height * _HORIZ_AR
    c.drawImage(LOGO_HORIZ, x, y, width=w, height=height, mask="auto",
                preserveAspectRatio=True)





# ---------------------------------------------------------------------------
# Canvas patches: char-spacing via text objects
# ---------------------------------------------------------------------------

def _set_char_space(self, v: float) -> None:
    self._i6_char_space = v


def _drawString(self, x, y, text):
    cs = getattr(self, "_i6_char_space", 0) or 0
    if cs == 0:
        return _orig_drawString(self, x, y, text)
    t = self.beginText(x, y)
    t.setFont(self._fontname, self._fontsize)
    t.setFillColor(self._fillColorObj)
    t.setCharSpace(cs)
    t.textOut(text)
    t.setCharSpace(0)  # reset PDF Tc so it doesn't leak to later text
    self.drawText(t)


def _drawRightString(self, x, y, text):
    cs = getattr(self, "_i6_char_space", 0) or 0
    if cs == 0:
        return _orig_drawRightString(self, x, y, text)
    w = pdfmetrics.stringWidth(text, self._fontname, self._fontsize) + cs * max(len(text) - 1, 0)
    _drawString(self, x - w, y, text)


def _drawCentredString(self, x, y, text):
    cs = getattr(self, "_i6_char_space", 0) or 0
    if cs == 0:
        return _orig_drawCentredString(self, x, y, text)
    w = pdfmetrics.stringWidth(text, self._fontname, self._fontsize) + cs * max(len(text) - 1, 0)
    _drawString(self, x - w / 2, y, text)


_orig_drawString = rl_canvas.Canvas.drawString
_orig_drawRightString = rl_canvas.Canvas.drawRightString
_orig_drawCentredString = rl_canvas.Canvas.drawCentredString
rl_canvas.Canvas.setCharSpace = _set_char_space
rl_canvas.Canvas.drawString = _drawString
rl_canvas.Canvas.drawRightString = _drawRightString
rl_canvas.Canvas.drawCentredString = _drawCentredString


# ---------------------------------------------------------------------------
# Data model
# ---------------------------------------------------------------------------

@dataclass
class Stat:
    value: str       # e.g. "20–50%"
    label: str       # short context
    source: str = "" # e.g. "McKinsey"


@dataclass
class Section:
    heading: str = ""
    paragraphs: list[str] = field(default_factory=list)
    bullets: list[str] = field(default_factory=list)


@dataclass
class Article:
    title: str
    subtitle: str = ""
    cluster: str = ""
    excerpt: str = ""
    edition: str = "N°01"
    sections: list[Section] = field(default_factory=list)
    stats: list[Stat] = field(default_factory=list)
    pull_quotes: list[str] = field(default_factory=list)
    ctas: list[tuple[str, str]] = field(default_factory=list)  # (label, url)


# ---------------------------------------------------------------------------
# PDF text extraction & parsing
# ---------------------------------------------------------------------------

META_KEYS = {"title", "slug", "excerpt", "cluster", "cta primário",
             "cta secundário", "cta primario", "cta secundario",
             "cta", "tags"}


def extract_text(pdf_path: str) -> str:
    """Extract markdown-flavoured text using font-size cues.

    - Largest font on the document → title line (joined into `# Title`)
    - Second-largest → `## Heading`
    - Bullet chars (●, •, *, -) → `* item`
    - Default → plain paragraph (blank line separates paragraphs)
    """
    out: list[str] = []
    with pdfplumber.open(pdf_path) as pdf:
        # Pass 1: collect all distinct font sizes used to find title/heading levels
        all_sizes: list[float] = []
        for p in pdf.pages:
            for ch in p.chars:
                all_sizes.append(round(ch["size"], 1))
        if not all_sizes:
            return ""
        size_counts: dict[float, int] = {}
        for s in all_sizes:
            size_counts[s] = size_counts.get(s, 0) + 1
        # Body size = most frequent
        body_size = max(size_counts, key=lambda s: size_counts[s])
        bigger = sorted([s for s in size_counts if s > body_size + 1], reverse=True)
        title_size = bigger[0] if bigger else body_size
        heading_size = bigger[1] if len(bigger) > 1 else (
            bigger[0] if bigger and bigger[0] != title_size else body_size
        )
        # If title and heading collapse, pick anything > body
        if heading_size == title_size and len(bigger) >= 1:
            heading_size = bigger[-1] if bigger[-1] != title_size else title_size

        title_parts: list[str] = []
        last_was_blank = True
        prev_y_bottom: Optional[float] = None
        prev_size: Optional[float] = None
        for p in pdf.pages:
            # Group chars by line
            lines_by_y: dict[float, list[dict]] = {}
            for ch in p.chars:
                key = round(ch["top"], 0)
                lines_by_y.setdefault(key, []).append(ch)
            for y in sorted(lines_by_y.keys()):
                chs = lines_by_y[y]
                chs.sort(key=lambda c: c["x0"])
                text = "".join(c["text"] for c in chs).rstrip()
                if not text.strip():
                    continue
                size = round(max(c["size"] for c in chs), 1)
                # Title
                if abs(size - title_size) < 0.5 and title_size > body_size + 2:
                    title_parts.append(text.strip())
                    continue
                # Heading
                if abs(size - heading_size) < 0.5 and heading_size > body_size + 1:
                    if not last_was_blank:
                        out.append("")
                    out.append(f"## {text.strip()}")
                    out.append("")
                    last_was_blank = True
                    prev_size = size
                    continue
                # Bullet
                stripped = text.lstrip()
                if stripped[:1] in {"●", "•", "▪", "■"} or re.match(r"^[\*\-]\s+", stripped):
                    item = re.sub(r"^[●•▪■\*\-]\s*", "", stripped)
                    out.append(f"* {item}")
                    last_was_blank = False
                    prev_size = size
                    continue
                # Plain line — detect paragraph break by vertical gap (> 1.6 * size)
                if prev_y_bottom is not None and (y - prev_y_bottom) > size * 1.6:
                    if not last_was_blank:
                        out.append("")
                        last_was_blank = True
                out.append(text)
                last_was_blank = False
                prev_size = size
                prev_y_bottom = y
        result_lines = []
        if title_parts:
            result_lines.append(f"# {' '.join(title_parts)}")
            result_lines.append("")
        result_lines.extend(out)
        return _norm_ligs("\n".join(result_lines))


_LIG = {"\ufb00":"ff","\ufb01":"fi","\ufb02":"fl","\ufb03":"ffi","\ufb04":"ffl","\ufb05":"st","\u2013":"–","\u2014":"—","\u2018":"'","\u2019":"'","\u201c":"\u201c","\u201d":"\u201d"}

def _norm_ligs(s: str) -> str:
    for k, v in _LIG.items():
        s = s.replace(k, v)
    return s

def _clean(s: str) -> str:
    s = _norm_ligs(s)
    s = re.sub(r"[ \t]+", " ", s)
    return s.strip()


def parse_article(raw: str) -> Article:
    lines = [l.rstrip() for l in raw.splitlines()]
    # Remove leading/trailing blank lines per logical block

    # Pull metadata block (lines like "Title: ..." near the end)
    meta: dict[str, str] = {}
    body_lines = []
    for line in lines:
        m = re.match(r"^\*?\*?([A-Za-zÀ-ÿ ]+?)\*?\*?\s*:\s*(.+)$", line)
        if m and m.group(1).strip().lower() in META_KEYS:
            meta[m.group(1).strip().lower()] = _clean(m.group(2))
        else:
            body_lines.append(line)

    body = "\n".join(body_lines)

    # Title: first non-empty line, OR ## heading at top, OR meta['title']
    title = meta.get("title", "")
    if not title:
        for ln in body_lines:
            t = _clean(ln.lstrip("#").strip())
            if len(t) > 8:
                title = t
                break
    title = re.sub(r"\s+", " ", title).strip().rstrip(".")

    cluster = meta.get("cluster", "").strip()
    excerpt = meta.get("excerpt", "").strip()

    # CTAs
    ctas: list[tuple[str, str]] = []
    urls_in_body = re.findall(r"https?://[^\s)]+", body)
    for k in ("cta primário", "cta primario", "cta secundário", "cta secundario", "cta"):
        if k in meta:
            label = meta[k].strip()
            url = ""
            mu = re.search(r"https?://\S+", label)
            if mu:
                url = mu.group(0)
                label = label.replace(url, "").strip(" -—()")
            ctas.append((label, url))
    if not ctas and urls_in_body:
        for url in urls_in_body[:2]:
            ctas.append(("Saiba mais", url))

    # Split body into sections by ## headings; fallback to blank-line groups
    sections: list[Section] = []
    current = Section(heading="")
    paragraph_buf: list[str] = []
    bullet_buf: list[str] = []

    def flush_paragraph():
        nonlocal paragraph_buf
        if paragraph_buf:
            text = _clean(" ".join(paragraph_buf))
            if text:
                current.paragraphs.append(text)
            paragraph_buf = []

    def flush_bullets():
        nonlocal bullet_buf
        if bullet_buf:
            current.bullets.extend([_clean(b) for b in bullet_buf if _clean(b)])
            bullet_buf = []

    def push_section():
        flush_paragraph()
        flush_bullets()
        if current.heading or current.paragraphs or current.bullets:
            sections.append(current)

    # Skip the title line(s) so we don't duplicate them as a section
    skip_first_heading = True

    for ln in body.splitlines():
        s = ln.strip()
        if not s:
            flush_paragraph()
            flush_bullets()
            continue
        # Markdown heading
        m = re.match(r"^(#{1,6})\s+(.+)$", s)
        if m:
            heading_text = _clean(m.group(2)).rstrip(".")
            if skip_first_heading and _clean(heading_text).lower() == title.lower():
                skip_first_heading = False
                continue
            skip_first_heading = False
            push_section()
            current = Section(heading=heading_text)
            paragraph_buf = []
            bullet_buf = []
            continue
        # Bullet
        mb = re.match(r"^\s*[\*\-•]\s+(.+)$", s)
        if mb:
            flush_paragraph()
            bullet_buf.append(_clean(mb.group(1)).rstrip(";.,"))
            continue
        # Page header like "## Page 1" coming from parsers — skip
        if re.match(r"^Page\s+\d+\s*$", s, re.I):
            continue
        # Plain line — accumulate paragraph
        flush_bullets()
        # If line is the title itself (some PDFs repeat), skip first occurrence
        if skip_first_heading and title and _clean(s).lower().rstrip(".") == title.lower():
            skip_first_heading = False
            continue
        skip_first_heading = False
        paragraph_buf.append(s)

    push_section()

    # Drop sections that are only headings with no content (rare)
    sections = [s for s in sections if (s.paragraphs or s.bullets or s.heading)]

    # If first section heading echoes the title, demote it
    if sections and title:
        first_h = sections[0].heading.lower()
        if first_h and (first_h.startswith(title.lower()[:25])
                        or title.lower().startswith(first_h[:25])):
            sections[0].heading = ""

    # Detect stats inside paragraphs — prefer RANGES first, then singles
    stats: list[Stat] = []
    seen = set()
    range_re = re.compile(
        r"(\d{1,3}(?:[.,]\d+)?)\s*%?\s+(?:a|e|até|to|and|-|–|—)\s+(\d{1,3}(?:[.,]\d+)?)\s*%",
        re.I,
    )
    money_re = re.compile(r"US\$\s?\d+[\d.,]*\s?(?:milh(?:ões|ao|ão)|mi|bilh(?:ões|ao|ão)|M|B)?", re.I)
    single_re = re.compile(r"\d{1,3}(?:[.,]\d+)?\s?%")

    def add_stat(val: str, ctx_para: str, start_idx: int, end_idx: int):
        if val in seen:
            return
        seen.add(val)
        low = ctx_para.lower()
        src = ""
        if "mckinsey" in low:
            src = "McKinsey"
        elif "bcg" in low or "boston consulting" in low:
            src = "BCG"
        # Build label: prefer clause BEFORE the number (verb + object pattern)
        prefix = ctx_para[max(0, start_idx - 110):start_idx].rstrip(" ,;:")
        # take the last clause (after period/comma/semicolon)
        prefix_clause = re.split(r"[\.;]", prefix)[-1]
        prefix_clause = re.split(r",", prefix_clause)[-1].strip()
        # strip filler leaders
        prefix_clause = re.sub(
            r"^(entre|de|a|até|em|por|aumento de|redu(ç|c)ão de|com|que)\s+",
            "", prefix_clause, flags=re.I,
        ).strip(" -–—")
        # Also consider clause AFTER the number ("em custos de armazenagem")
        tail = ctx_para[end_idx:end_idx + 90]
        tail_clause = _clean(re.split(r"[,.;]", tail)[0])
        tail_clause = re.sub(r"^(em|de|para|na|no|nos|nas)\s+", "", tail_clause, flags=re.I)

        # Heuristic: if prefix has a verb ("reduzir", "aumento") use it,
        # else use tail clause.
        verb_re = re.compile(r"\b(reduzir|reduz|reduce|aumentar|aumento|melhor|elevar|crescer|gerar|economizar)", re.I)
        if verb_re.search(prefix_clause) and len(prefix_clause) < 80:
            label = prefix_clause
            if tail_clause and len(label) + len(tail_clause) + 1 < 90:
                label = f"{label} {tail_clause}".strip()
        elif tail_clause:
            label = tail_clause
        else:
            label = prefix_clause or _clean(ctx_para[max(0, end_idx - 40):end_idx + 40])
        # Cap length
        if len(label) > 80:
            label = label[:77].rstrip(" ,") + "…"
        # Capitalize first letter
        if label:
            label = label[0].upper() + label[1:]
        stats.append(Stat(value=val, label=label, source=src))

    consumed_spans: list[tuple[str, int, int]] = []  # to skip overlapping singles
    for sec in sections:
        for p in sec.paragraphs:
            # Ranges like "entre 20% e 50%" or "5% a 10%"
            for m in range_re.finditer(p):
                a, b = m.group(1), m.group(2)
                val = f"{a}–{b}%"
                add_stat(val, p, m.start(), m.end())
                consumed_spans.append((p, m.start(), m.end()))
            # Money: US$ 100 milhões
            for m in money_re.finditer(p):
                add_stat(_clean(m.group(0)), p, m.start(), m.end())
                consumed_spans.append((p, m.start(), m.end()))
            # Singles not inside a range/money span already captured
            for m in single_re.finditer(p):
                if any(p is sp_p and sp_s <= m.start() < sp_e for (sp_p, sp_s, sp_e) in consumed_spans):
                    continue
                add_stat(_clean(m.group(0)), p, m.start(), m.end())
    # Keep at most 5 strongest stats
    stats = stats[:5]

    # Detect pull-quotes: short standalone paragraphs (between 40 and 180 chars)
    # that contain memorable language ("?", "É", "Menos", etc.) and isolated lines
    pull_quotes: list[str] = []
    for sec in sections:
        for p in sec.paragraphs:
            t = p.strip()
            if 40 <= len(t) <= 160 and (
                t.endswith("?")
                or t.startswith("Menos")
                or t.startswith("Mais")
                or t.startswith("É ")
                or "decisão" in t.lower() and len(t) < 130
            ):
                if t not in pull_quotes:
                    pull_quotes.append(t)

    return Article(
        title=title,
        cluster=cluster,
        excerpt=excerpt,
        sections=sections,
        stats=stats,
        pull_quotes=pull_quotes[:4],
        ctas=ctas,
    )


# ---------------------------------------------------------------------------
# Drawing helpers
# ---------------------------------------------------------------------------

def fill_bg(c: rl_canvas.Canvas, color=NAVY):
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def draw_grain(c: rl_canvas.Canvas, count=180, seed=0):
    """Faint coral/white dust to add depth (very subtle)."""
    import random
    rnd = random.Random(seed)
    for _ in range(count):
        x = rnd.uniform(0, PAGE_W)
        y = rnd.uniform(0, PAGE_H)
        r = rnd.uniform(0.2, 0.6)
        alpha = rnd.uniform(0.02, 0.08)
        c.setFillColor(Color(1, 1, 1, alpha=alpha))
        c.circle(x, y, r, fill=1, stroke=0)


def draw_radial_glow(c: rl_canvas.Canvas, cx, cy, max_r, color=CORAL, intensity=0.10, steps=24):
    """Approximate radial gradient with concentric circles, alpha fading out."""
    for i in range(steps, 0, -1):
        r = max_r * (i / steps)
        a = intensity * ((1 - i / steps) ** 1.6)
        c.setFillColor(Color(color.red, color.green, color.blue, alpha=a))
        c.circle(cx, cy, r, fill=1, stroke=0)


def draw_wave(
    c: rl_canvas.Canvas,
    y_base: float,
    amplitude: float = 28,
    wavelength: float = 220,
    phase: float = 0,
    color=CORAL,
    stroke_width=0.6,
    alpha=0.55,
    steps: int = 240,
    x_start: float = -20,
    x_end: Optional[float] = None,
):
    """Thin flowing wave line across the page."""
    if x_end is None:
        x_end = PAGE_W + 20
    c.setStrokeColor(Color(color.red, color.green, color.blue, alpha=alpha))
    c.setLineWidth(stroke_width)
    c.setLineCap(1)
    path = c.beginPath()
    first = True
    for i in range(steps + 1):
        t = i / steps
        x = x_start + (x_end - x_start) * t
        y = y_base + amplitude * math.sin((x / wavelength) * 2 * math.pi + phase)
        if first:
            path.moveTo(x, y)
            first = False
        else:
            path.lineTo(x, y)
    c.drawPath(path, stroke=1, fill=0)


def draw_wave_field(c: rl_canvas.Canvas, y_base: float, count=8, base_amp=30,
                    base_wl=240, seed=0, color=CORAL):
    import random
    rnd = random.Random(seed)
    for i in range(count):
        amp = base_amp * (0.5 + i * 0.12) + rnd.uniform(-4, 4)
        wl = base_wl + rnd.uniform(-40, 60)
        phase = rnd.uniform(0, math.pi * 2)
        alpha = max(0.06, 0.45 - i * 0.04)
        sw = 0.5 if i > 2 else 0.7
        draw_wave(
            c,
            y_base=y_base + (i - count / 2) * 12,
            amplitude=amp,
            wavelength=wl,
            phase=phase,
            color=color,
            stroke_width=sw,
            alpha=alpha,
        )


def draw_particles(c: rl_canvas.Canvas, count=50, seed=1, color=CORAL):
    import random
    rnd = random.Random(seed)
    for _ in range(count):
        x = rnd.uniform(0, PAGE_W)
        y = rnd.uniform(0, PAGE_H)
        r = rnd.uniform(0.4, 1.4)
        a = rnd.uniform(0.15, 0.6)
        c.setFillColor(Color(color.red, color.green, color.blue, alpha=a))
        c.circle(x, y, r, fill=1, stroke=0)


def draw_thin_rule(c: rl_canvas.Canvas, x1, y, x2, color=CORAL, width=0.6, alpha=1.0):
    c.setStrokeColor(Color(color.red, color.green, color.blue, alpha=alpha))
    c.setLineWidth(width)
    c.line(x1, y, x2, y)


def draw_image_placeholder(c: rl_canvas.Canvas, x, y, w, h, caption=""):
    # Outer subtle navy elevated panel
    c.setFillColor(NAVY_ELEVATED)
    c.rect(x, y, w, h, fill=1, stroke=0)
    # Coral diagonal mark in corner
    c.setStrokeColor(CORAL)
    c.setLineWidth(0.6)
    c.line(x + 14, y + h - 14, x + 30, y + h - 14)
    c.line(x + 14, y + h - 14, x + 14, y + h - 30)
    # Faint cross-hatch for "media" feel
    c.setStrokeColor(Color(1, 1, 1, alpha=0.04))
    c.setLineWidth(0.3)
    step = 18
    xi = x
    while xi < x + w + h:
        c.line(xi, y, xi - h, y + h)
        xi += step
    # Center label
    c.setFillColor(Color(1, 1, 1, alpha=0.35))
    c.setFont(BODY_MEDIUM, 7.5)
    c.drawCentredString(x + w / 2, y + h / 2 + 2, "[  IMAGEM  ]")
    if caption:
        c.setFillColor(TEXT_MUTED)
        c.setFont(BODY, 7)
        c.drawString(x, y - 10, caption.upper())


# ---------------------------------------------------------------------------
# Typography helpers
# ---------------------------------------------------------------------------

def wrap_text(c, text: str, font: str, size: float, max_w: float) -> list[str]:
    """Greedy word-wrap returning lines that fit max_w."""
    words = text.split()
    lines: list[str] = []
    cur: list[str] = []
    for w in words:
        trial = (" ".join(cur + [w])).strip()
        if pdfmetrics.stringWidth(trial, font, size) <= max_w or not cur:
            cur.append(w)
        else:
            lines.append(" ".join(cur))
            cur = [w]
    if cur:
        lines.append(" ".join(cur))
    return lines


def draw_paragraph(c, x, y, text, font, size, leading, max_w, color=TEXT_LIGHT,
                   max_lines: Optional[int] = None) -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    lines = wrap_text(c, text, font, size, max_w)
    if max_lines is not None:
        lines = lines[:max_lines]
    for ln in lines:
        c.drawString(x, y, ln)
        y -= leading
    return y  # return next y baseline


def draw_paragraph_justified(c, x, y, text, font, size, leading, max_w,
                             color=TEXT_LIGHT, max_lines: Optional[int] = None) -> float:
    """Justified paragraph (last line left-aligned). Returns next baseline y."""
    c.setFillColor(color)
    lines = wrap_text(c, text, font, size, max_w)
    if max_lines is not None:
        lines = lines[:max_lines]
    for i, line in enumerate(lines):
        words = line.split()
        c.setFont(font, size)
        if i == len(lines) - 1 or len(words) == 1:
            c.drawString(x, y, line)
        else:
            text_w = sum(pdfmetrics.stringWidth(w, font, size) for w in words)
            gaps = len(words) - 1
            extra = (max_w - text_w - (gaps * pdfmetrics.stringWidth(" ", font, size))) / max(gaps, 1)
            cx = x
            for j, w in enumerate(words):
                c.drawString(cx, y, w)
                cx += pdfmetrics.stringWidth(w, font, size) + pdfmetrics.stringWidth(" ", font, size) + extra
        y -= leading
    return y


def draw_eyebrow(c, x, y, text, color=CORAL, size=8.5, tracking=2.6):
    c.setFillColor(color)
    c.setFont(BODY_BOLD, size)
    c.setCharSpace(tracking)
    c.drawString(x, y, text.upper())
    c.setCharSpace(0)


def fit_display(c, text: str, font: str, max_size: float, min_size: float,
                max_w: float, max_lines: int) -> tuple[float, list[str]]:
    """Find largest size where wrapped text fits within max_lines lines."""
    size = max_size
    while size >= min_size:
        lines = wrap_text(c, text, font, size, max_w)
        if len(lines) <= max_lines:
            return size, lines
        size -= 1
    return min_size, wrap_text(c, text, font, min_size, max_w)


# ---------------------------------------------------------------------------
# Page footer / header chrome
# ---------------------------------------------------------------------------

def draw_chrome(c, page_num: int, total: int, section_label: str = "",
                show_top: bool = True):
    # Top-left wordmark (symbol logo), top-right edition/cluster
    if show_top:
        draw_logo_symbol(c, MARGIN, PAGE_H - MARGIN + 4, height=14)
        if section_label:
            c.setFillColor(TEXT_MUTED)
            c.setFont(BODY_MEDIUM, 7.5)
            c.setCharSpace(2.2)
            c.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN + 7,
                              section_label.upper())
            c.setCharSpace(0)
    # Bottom: thin line, page numbers, contact
    draw_thin_rule(c, MARGIN, MARGIN - 12, PAGE_W - MARGIN, color=NAVY_LINE,
                   width=0.5, alpha=1.0)
    c.setFillColor(TEXT_DIM)
    c.setFont(BODY, 7.5)
    c.drawString(MARGIN, MARGIN - 24, "infinity6 · talk@infinity6.ai")

    c.setFont(BODY_MEDIUM, 7.5)
    c.drawRightString(PAGE_W - MARGIN, MARGIN - 24,
                      f"{page_num:02d}  /  {total:02d}")


# ---------------------------------------------------------------------------
# Page templates
# ---------------------------------------------------------------------------

def render_cover(c, art: Article, page_num: int, total: int):
    fill_bg(c)
    # Glow
    draw_radial_glow(c, PAGE_W * 0.85, PAGE_H * 0.78, 380, color=CORAL,
                     intensity=0.14)
    draw_radial_glow(c, PAGE_W * 0.1, PAGE_H * 0.15, 320, color=CORAL,
                     intensity=0.06)
    # Wave field on right
    draw_wave_field(c, y_base=PAGE_H * 0.42, count=10, base_amp=22,
                    base_wl=180, seed=7, color=CORAL)
    draw_particles(c, count=60, seed=3)

    # Top chrome — symbol logo top-left
    draw_logo_symbol(c, MARGIN, PAGE_H - MARGIN - 4, height=18)

    c.setFillColor(CORAL)
    c.setFont(BODY_MEDIUM, 9)
    c.setCharSpace(2.8)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN,
                      (art.cluster or "EDITORIAL").upper())
    c.setCharSpace(0)

    # Big edition mark
    c.setFillColor(CORAL)
    c.setFont(DISPLAY_LIGHT, 60)
    c.drawString(MARGIN, PAGE_H - MARGIN - 90, art.edition)
    c.setFillColor(TEXT_MUTED)
    c.setFont(BODY, 7.5)
    c.setCharSpace(2.5)
    c.drawString(MARGIN, PAGE_H - MARGIN - 108, "EDIÇÃO".upper())
    c.setCharSpace(0)

    # Title — wrap big
    title_text = art.title.upper()
    max_w = PAGE_W - MARGIN * 2 - 20
    size, lines = fit_display(c, title_text, DISPLAY, max_size=56, min_size=28,
                              max_w=max_w, max_lines=5)
    leading = size * 0.95
    y = PAGE_H * 0.55
    c.setFillColor(TEXT_LIGHT)
    c.setFont(DISPLAY, size)
    # Render lines; highlight one keyword in coral if found.
    # Render each line in one or two segments to preserve correct metrics.
    highlight_words = {"preditiva", "adaptativo", "decisão", "decisao",
                       "movimento", "antecipar", "predictive", "decision"}
    space_w = pdfmetrics.stringWidth(" ", DISPLAY, size)
    for ln in lines:
        words = ln.split(" ")
        # Find first highlighted word index
        hl_idx = -1
        for i, w in enumerate(words):
            clean = re.sub(r"[^\wÀ-ÿ]", "", w).lower()
            if clean in highlight_words:
                hl_idx = i
                break
        if hl_idx == -1:
            c.setFillColor(TEXT_LIGHT)
            c.drawString(MARGIN, y, ln)
        else:
            before = " ".join(words[:hl_idx])
            target = words[hl_idx]
            after = " ".join(words[hl_idx + 1:])
            x = MARGIN
            c.setFillColor(TEXT_LIGHT)
            if before:
                c.drawString(x, y, before)
                x += pdfmetrics.stringWidth(before, DISPLAY, size) + space_w
            c.setFillColor(CORAL)
            c.drawString(x, y, target)
            x += pdfmetrics.stringWidth(target, DISPLAY, size) + space_w
            if after:
                c.setFillColor(TEXT_LIGHT)
                c.drawString(x, y, after)
        y -= leading

    # Coral rule
    y -= 14
    draw_thin_rule(c, MARGIN, y, MARGIN + 90, color=CORAL, width=1.2)
    y -= 28

    # Excerpt
    if art.excerpt:
        y = draw_paragraph(c, MARGIN, y, art.excerpt, BODY_LIGHT, 11.5, 16.5,
                           max_w=PAGE_W * 0.55, color=TEXT_LIGHT, max_lines=5)

    # Bottom meta
    c.setFillColor(TEXT_MUTED)
    c.setFont(BODY_MEDIUM, 7.5)
    c.setCharSpace(2.4)
    c.drawString(MARGIN, MARGIN + 6, "UM ENSAIO INFINITY6  ·  LEITURA EDITORIAL")
    c.setCharSpace(0)
    c.setFillColor(TEXT_DIM)
    c.setFont(BODY, 7.5)
    c.drawRightString(PAGE_W - MARGIN, MARGIN + 6,
                      f"{page_num:02d} / {total:02d}")


def render_lead(c, art: Article, page_num: int, total: int):
    fill_bg(c)
    draw_radial_glow(c, PAGE_W * 0.1, PAGE_H * 0.9, 360, color=CORAL,
                     intensity=0.08)
    # Subtle waves at bottom
    draw_wave(c, y_base=MARGIN + 60, amplitude=18, wavelength=320, phase=0,
              color=CORAL, alpha=0.35, stroke_width=0.6)
    draw_wave(c, y_base=MARGIN + 80, amplitude=22, wavelength=280, phase=1.2,
              color=CORAL, alpha=0.22, stroke_width=0.5)
    draw_wave(c, y_base=MARGIN + 100, amplitude=14, wavelength=380, phase=2.4,
              color=CORAL, alpha=0.15, stroke_width=0.4)

    draw_chrome(c, page_num, total, section_label="ABERTURA")

    # Find an opening punch line: first paragraph of first section's first paragraph
    opener = ""
    rest = ""
    for sec in art.sections:
        if sec.paragraphs:
            opener = sec.paragraphs[0]
            break
    # Split into a punchy first sentence and remainder
    m = re.match(r"^(.+?[\.!?])\s+(.*)$", opener, re.DOTALL)
    if m:
        punch = m.group(1).strip()
        rest = m.group(2).strip()
    else:
        punch = opener
        rest = ""

    # Eyebrow
    draw_eyebrow(c, MARGIN, PAGE_H - MARGIN - 28, "01  ABERTURA")

    # Big punch line (display)
    max_w = PAGE_W - MARGIN * 2 - 30
    size, lines = fit_display(c, punch, DISPLAY, 46, 24, max_w, max_lines=5)
    y = PAGE_H - MARGIN - 80
    leading = size * 1.02
    c.setFont(DISPLAY, size)
    for ln in lines:
        c.setFillColor(TEXT_LIGHT)
        c.drawString(MARGIN, y, ln)
        y -= leading

    # Coral underline accent under headline
    y -= 6
    draw_thin_rule(c, MARGIN, y, MARGIN + 60, color=CORAL, width=1.0)
    y -= 28

    # Remainder of opener + extra paragraphs in two narrow columns
    col_w = (PAGE_W - MARGIN * 2 - 30) / 2
    col_x1 = MARGIN
    col_x2 = MARGIN + col_w + 30
    col_top = y
    col_bottom = MARGIN + 130

    # Build text pool from first sections
    pool = []
    if rest:
        pool.append(rest)
    take_paragraphs = 4
    count = 0
    for sec in art.sections:
        for i, p in enumerate(sec.paragraphs):
            if sec is art.sections[0] and i == 0:
                continue
            pool.append(p)
            count += 1
            if count >= take_paragraphs:
                break
        if count >= take_paragraphs:
            break

    # Render two columns by computing block heights, then placing
    font, size, leading = BODY_LIGHT, 9.5, 14.5
    blocks = []
    for para in pool:
        n_lines = len(wrap_text(c, para, font, size, col_w))
        blocks.append((para, n_lines * leading + 10))

    col_height = col_top - col_bottom
    # Greedy: fill col 1 then col 2
    col1, col2 = [], []
    used1 = 0.0
    for b in blocks:
        if used1 + b[1] <= col_height + 6:
            col1.append(b)
            used1 += b[1]
        else:
            col2.append(b)
    used2 = sum(b[1] for b in col2)
    if used2 > col_height + 6:
        # Trim col2 to fit
        truncated = []
        used2 = 0.0
        for b in col2:
            if used2 + b[1] > col_height + 6:
                break
            truncated.append(b)
            used2 += b[1]
        col2 = truncated

    y1 = col_top
    for para, _ in col1:
        y1 = draw_paragraph_justified(c, col_x1, y1, para, font, size, leading,
                                       col_w, color=TEXT_LIGHT)
        y1 -= 10
    y2 = col_top
    for para, _ in col2:
        y2 = draw_paragraph_justified(c, col_x2, y2, para, font, size, leading,
                                       col_w, color=TEXT_LIGHT)
        y2 -= 10


def render_stats(c, art: Article, page_num: int, total: int):
    fill_bg(c)
    draw_radial_glow(c, PAGE_W * 0.95, PAGE_H * 0.12, 380, color=CORAL,
                     intensity=0.10)
    draw_chrome(c, page_num, total, section_label="EVIDÊNCIAS")

    draw_eyebrow(c, MARGIN, PAGE_H - MARGIN - 28,
                 "02  EVIDÊNCIAS QUE SUSTENTAM A TESE")

    headline = "Os números falam por si"
    c.setFillColor(TEXT_LIGHT)
    c.setFont(DISPLAY, 34)
    c.drawString(MARGIN, PAGE_H - MARGIN - 70, headline)
    draw_thin_rule(c, MARGIN, PAGE_H - MARGIN - 86, MARGIN + 50,
                   color=CORAL, width=1.0)

    stats = art.stats[:5]
    if not stats:
        y = PAGE_H - MARGIN - 130
        for sec in art.sections[:1]:
            for p in sec.paragraphs[:3]:
                y = draw_paragraph_justified(c, MARGIN, y, p, BODY_LIGHT, 10.5,
                                              16, PAGE_W - MARGIN * 2,
                                              color=TEXT_LIGHT)
                y -= 12
        return

    # ---- LEFT: hero stat (first) ----
    hero = stats[0]
    hero_x = MARGIN
    hero_top = PAGE_H - MARGIN - 130
    hero_max_w = PAGE_W * 0.45
    # Fit value
    hv_size = 110
    while hv_size > 50 and pdfmetrics.stringWidth(hero.value, DISPLAY, hv_size) > hero_max_w:
        hv_size -= 4
    c.setFillColor(CORAL)
    c.setFont(DISPLAY, hv_size)
    c.drawString(hero_x, hero_top - hv_size * 0.85, hero.value)
    # Underline
    draw_thin_rule(c, hero_x, hero_top - hv_size - 6,
                   hero_x + min(hero_max_w, 220), color=CORAL, width=0.8)
    # Label
    c.setFillColor(TEXT_LIGHT)
    c.setFont(BODY_MEDIUM, 10)
    lab_y = hero_top - hv_size - 24
    for ln in wrap_text(c, hero.label, BODY_MEDIUM, 10, hero_max_w)[:4]:
        c.drawString(hero_x, lab_y, ln)
        lab_y -= 14
    if hero.source:
        c.setFillColor(CORAL)
        c.setFont(BODY_BOLD, 7.5)
        c.setCharSpace(2.4)
        c.drawString(hero_x, lab_y - 8, hero.source.upper() + "  ·  FONTE")
        c.setCharSpace(0)

    # ---- RIGHT: secondary stats stacked ----
    bar_x = PAGE_W * 0.55
    bar_w = PAGE_W - MARGIN - bar_x
    bar_y = PAGE_H - MARGIN - 120
    c.setFillColor(TEXT_MUTED)
    c.setFont(BODY_BOLD, 8)
    c.setCharSpace(2.2)
    c.drawString(bar_x, bar_y, "OUTROS INDICADORES")
    c.setCharSpace(0)
    bar_y -= 16
    draw_thin_rule(c, bar_x, bar_y, PAGE_W - MARGIN, color=NAVY_LINE, width=0.6)
    bar_y -= 24

    rest = stats[1:5]
    for st in rest:
        # Value — keep within left half of column
        vsize = 26
        while vsize > 14 and pdfmetrics.stringWidth(st.value, DISPLAY_BOLD, vsize) > bar_w * 0.55:
            vsize -= 2
        c.setFillColor(TEXT_LIGHT)
        c.setFont(DISPLAY_BOLD, vsize)
        c.drawString(bar_x, bar_y - vsize, st.value)
        # Label on the right side, wrap up to 2 lines
        c.setFillColor(TEXT_MUTED)
        c.setFont(BODY, 8.5)
        lab_x = bar_x + bar_w * 0.58
        lab_w = bar_w - bar_w * 0.58 - 2
        lab_lines = wrap_text(c, st.label, BODY, 8.5, lab_w)[:2]
        ly = bar_y - 8
        for ln in lab_lines:
            c.drawString(lab_x, ly, ln)
            ly -= 11
        # Source — below label, small coral
        if st.source:
            c.setFillColor(CORAL)
            c.setFont(BODY_BOLD, 6.5)
            c.setCharSpace(1.8)
            c.drawString(lab_x, ly - 2, st.source.upper())
            c.setCharSpace(0)
        bar_y -= max(vsize + 22, 44)
        draw_thin_rule(c, bar_x, bar_y + 4, PAGE_W - MARGIN, color=NAVY_LINE,
                       width=0.4)

    # Bottom waves
    draw_wave(c, y_base=MARGIN + 40, amplitude=14, wavelength=300, phase=0,
              color=CORAL, alpha=0.25, stroke_width=0.5)
    draw_wave(c, y_base=MARGIN + 55, amplitude=10, wavelength=260, phase=1.6,
              color=CORAL, alpha=0.15, stroke_width=0.5)


def render_compare(c, art: Article, page_num: int, total: int,
                   section: Optional[Section] = None):
    fill_bg(c)
    draw_chrome(c, page_num, total, section_label="COMPARAÇÃO")
    draw_radial_glow(c, PAGE_W / 2, PAGE_H + 60, 420, color=CORAL,
                     intensity=0.06)

    draw_eyebrow(c, MARGIN, PAGE_H - MARGIN - 28, "03  DUAS LÓGICAS")

    heading = section.heading if section else "Forecast estatístico × forecast adaptativo"
    c.setFillColor(TEXT_LIGHT)
    size, lines = fit_display(c, heading, DISPLAY, 34, 22, PAGE_W - MARGIN * 2,
                              max_lines=2)
    c.setFont(DISPLAY, size)
    y = PAGE_H - MARGIN - 70
    for ln in lines:
        c.drawString(MARGIN, y, ln)
        y -= size * 1.05
    draw_thin_rule(c, MARGIN, y - 4, MARGIN + 50, color=CORAL, width=1.0)
    y -= 30

    # Two columns separated by a coral vertical line
    col_gap = 40
    col_w = (PAGE_W - MARGIN * 2 - col_gap) / 2
    col_x1 = MARGIN
    col_x2 = MARGIN + col_w + col_gap
    # Vertical coral rule
    mid_x = MARGIN + col_w + col_gap / 2
    c.setStrokeColor(Color(CORAL.red, CORAL.green, CORAL.blue, alpha=0.5))
    c.setLineWidth(0.6)
    c.line(mid_x, MARGIN + 50, mid_x, y - 10)

    # Left: statistical
    c.setFillColor(CORAL)
    c.setFont(BODY_BOLD, 8)
    c.setCharSpace(2.4)
    c.drawString(col_x1, y, "TRADICIONAL")
    c.setCharSpace(0)
    c.setFillColor(TEXT_LIGHT)
    c.setFont(DISPLAY, 24)
    c.drawString(col_x1, y - 28, "“o que aconteceu")
    c.drawString(col_x1, y - 52, "antes?”")
    body_left = ("O forecast estatístico parte de séries históricas e identifica padrões "
                 "como tendência, sazonalidade e recorrência. Útil — mas limitado quando "
                 "a demanda é volátil, intermitente ou dependente de contexto.")
    if section and section.paragraphs:
        body_left = section.paragraphs[0]
    draw_paragraph_justified(c, col_x1, y - 90, body_left, BODY_LIGHT, 9.5,
                              14.5, col_w, color=TEXT_LIGHT)

    # Right: adaptive
    c.setFillColor(CORAL)
    c.setFont(BODY_BOLD, 8)
    c.setCharSpace(2.4)
    c.drawString(col_x2, y, "ADAPTATIVO")
    c.setCharSpace(0)
    c.setFillColor(TEXT_LIGHT)
    c.setFont(DISPLAY, 24)
    c.drawString(col_x2, y - 28, "“o que está mudando")
    c.drawString(col_x2, y - 52, "agora?”")
    body_right = ("Combina histórico com sinais de movimento: sell-out, estoque, canal, "
                  "região, comportamento de compra, giro, cobertura, similaridade e "
                  "variáveis externas relevantes — para antecipar o próximo movimento.")
    if section and len(section.paragraphs) > 1:
        body_right = section.paragraphs[1] if len(section.paragraphs) > 1 else body_right
    draw_paragraph_justified(c, col_x2, y - 90, body_right, BODY_LIGHT, 9.5,
                              14.5, col_w, color=TEXT_LIGHT)


def render_numbered_list(c, art: Article, page_num: int, total: int,
                         section: Section):
    fill_bg(c)
    draw_chrome(c, page_num, total, section_label="SINAIS")
    draw_radial_glow(c, PAGE_W * 0.95, PAGE_H * 0.95, 360, color=CORAL,
                     intensity=0.08)

    draw_eyebrow(c, MARGIN, PAGE_H - MARGIN - 28, "04  ANTECIPAR É LER OS SINAIS")

    heading = section.heading or "Os sinais que vêm antes do problema"
    c.setFillColor(TEXT_LIGHT)
    c.setFont(DISPLAY, 32)
    c.drawString(MARGIN, PAGE_H - MARGIN - 70, heading)
    draw_thin_rule(c, MARGIN, PAGE_H - MARGIN - 86, MARGIN + 50, color=CORAL,
                   width=1.0)

    # Intro paragraph
    intro = ""
    if section.paragraphs:
        intro = section.paragraphs[0]
    if intro:
        draw_paragraph_justified(c, MARGIN, PAGE_H - MARGIN - 110, intro,
                                  BODY_LIGHT, 10, 15, PAGE_W * 0.6,
                                  color=TEXT_LIGHT, max_lines=3)

    # List
    items = section.bullets or []
    if not items and section.paragraphs:
        # Fallback: split sentences from second paragraph
        if len(section.paragraphs) > 1:
            items = [s.strip() for s in re.split(r"[;\.]\s+", section.paragraphs[1]) if s.strip()]
    items = items[:7]

    list_top = PAGE_H - MARGIN - 180
    row_h = (list_top - MARGIN - 70) / max(len(items), 1)
    for i, it in enumerate(items):
        y_row = list_top - i * row_h
        # Big coral number
        c.setFillColor(CORAL)
        c.setFont(DISPLAY_LIGHT, 30)
        c.drawString(MARGIN, y_row - 22, f"{i + 1:02d}")
        # Thin coral vertical
        c.setStrokeColor(Color(CORAL.red, CORAL.green, CORAL.blue, alpha=0.55))
        c.setLineWidth(0.6)
        c.line(MARGIN + 56, y_row - 24, MARGIN + 56, y_row + 4)
        # Item text
        c.setFillColor(TEXT_LIGHT)
        c.setFont(BODY_MEDIUM, 11)
        lines = wrap_text(c, it.rstrip(".;"), BODY_MEDIUM, 11, PAGE_W - MARGIN * 2 - 75)
        ly = y_row - 8
        for ln in lines[:2]:
            c.drawString(MARGIN + 70, ly, ln)
            ly -= 14


def render_quote(c, art: Article, page_num: int, total: int, quote: str,
                 attribution: str = ""):
    fill_bg(c)
    draw_chrome(c, page_num, total, section_label="REFLEXÃO")
    draw_radial_glow(c, PAGE_W * 0.5, PAGE_H * 0.55, 420, color=CORAL,
                     intensity=0.10)
    draw_wave_field(c, y_base=PAGE_H * 0.7, count=7, base_amp=18, base_wl=300,
                    seed=5, color=CORAL)
    draw_wave_field(c, y_base=PAGE_H * 0.3, count=6, base_amp=16, base_wl=280,
                    seed=11, color=CORAL)

    # Giant quote mark
    c.setFillColor(CORAL)
    c.setFont(DISPLAY, 160)
    c.drawString(MARGIN - 4, PAGE_H * 0.62, "“")

    # The quote — large display, multi-line
    max_w = PAGE_W - MARGIN * 2 - 30
    size, lines = fit_display(c, quote, DISPLAY_LIGHT, 38, 18, max_w,
                              max_lines=8)
    leading = size * 1.18
    total_h = leading * len(lines)
    y = (PAGE_H + total_h) / 2 - 30
    c.setFillColor(TEXT_LIGHT)
    c.setFont(DISPLAY_LIGHT, size)
    for ln in lines:
        c.drawString(MARGIN + 10, y, ln)
        y -= leading

    # Attribution
    y -= 6
    draw_thin_rule(c, MARGIN + 10, y, MARGIN + 50, color=CORAL, width=1.2)
    if attribution:
        c.setFillColor(TEXT_MUTED)
        c.setFont(BODY_MEDIUM, 8.5)
        c.setCharSpace(2.2)
        c.drawString(MARGIN + 10, y - 16, attribution.upper())
        c.setCharSpace(0)


def render_section_with_image(c, art: Article, page_num: int, total: int,
                              section: Section, side: str = "right",
                              eyebrow_text: str = "05  APRENDIZADO"):
    fill_bg(c)
    draw_chrome(c, page_num, total,
                section_label=section.heading[:24].upper() if section.heading else "")
    draw_radial_glow(c, PAGE_W * 0.1, PAGE_H * 0.1, 380, color=CORAL,
                     intensity=0.06)

    draw_eyebrow(c, MARGIN, PAGE_H - MARGIN - 28, eyebrow_text)

    heading = section.heading or "Aprendizado"
    c.setFillColor(TEXT_LIGHT)
    size, lines = fit_display(c, heading, DISPLAY, 32, 22, PAGE_W - MARGIN * 2,
                              max_lines=2)
    c.setFont(DISPLAY, size)
    y = PAGE_H - MARGIN - 70
    for ln in lines:
        c.drawString(MARGIN, y, ln)
        y -= size * 1.05
    draw_thin_rule(c, MARGIN, y - 4, MARGIN + 50, color=CORAL, width=1.0)
    y -= 30

    # Image placeholder + text side by side
    img_w = (PAGE_W - MARGIN * 2 - 30) * 0.42
    txt_w = (PAGE_W - MARGIN * 2 - 30) * 0.58
    img_h = y - MARGIN - 40
    img_h = min(img_h, PAGE_H * 0.5)
    if side == "right":
        txt_x = MARGIN
        img_x = MARGIN + txt_w + 30
    else:
        img_x = MARGIN
        txt_x = MARGIN + img_w + 30

    draw_image_placeholder(c, img_x, y - img_h, img_w, img_h,
                           caption=(section.heading or "imagem"))

    ty = y - 4
    for p in section.paragraphs[:5]:
        if ty < MARGIN + 30:
            break
        ty = draw_paragraph_justified(c, txt_x, ty, p, BODY_LIGHT, 10, 15,
                                       txt_w, color=TEXT_LIGHT)
        ty -= 10


def render_confidence_diagram(c, art: Article, page_num: int, total: int,
                              section: Optional[Section] = None):
    fill_bg(c)
    draw_chrome(c, page_num, total, section_label="CONFIANÇA")
    draw_radial_glow(c, PAGE_W * 0.5, PAGE_H * 0.85, 380, color=CORAL,
                     intensity=0.06)

    draw_eyebrow(c, MARGIN, PAGE_H - MARGIN - 28,
                 "06  ACURÁCIA NÃO BASTA")

    heading = "Forecast classificado por confiança"
    if section and section.heading:
        heading = section.heading
    c.setFillColor(TEXT_LIGHT)
    c.setFont(DISPLAY, 32)
    c.drawString(MARGIN, PAGE_H - MARGIN - 70, heading)
    draw_thin_rule(c, MARGIN, PAGE_H - MARGIN - 86, MARGIN + 50, color=CORAL,
                   width=1.0)

    intro = ("Um bom forecast não é apenas o que apresenta menor MAPE. "
             "Ele precisa vir acompanhado de confiança, explicabilidade e impacto operacional.")
    if section and section.paragraphs:
        intro = section.paragraphs[0]
    draw_paragraph_justified(c, MARGIN, PAGE_H - MARGIN - 110, intro,
                              BODY_LIGHT, 10.5, 16, PAGE_W * 0.7,
                              color=TEXT_LIGHT, max_lines=4)

    # Diagram: three horizontal segments — Alta / Média / Baixa
    diag_y = PAGE_H * 0.45
    total_w = PAGE_W - MARGIN * 2
    seg_w = total_w / 3
    segments = [
        ("ALTA", "Decisão automatizada", "Curva A · alto giro", 0.95),
        ("MÉDIA", "Revisão colaborativa", "Itens regulares · sazonais", 0.6),
        ("BAIXA", "Política / similaridade", "Cauda longa · esparsos", 0.3),
    ]
    for i, (level, action, kind, intensity) in enumerate(segments):
        x = MARGIN + i * seg_w
        # Fill bar
        c.setFillColor(Color(CORAL.red, CORAL.green, CORAL.blue,
                              alpha=0.18 + intensity * 0.5))
        c.rect(x + 4, diag_y, seg_w - 8, 14, fill=1, stroke=0)
        # Level label
        c.setFillColor(CORAL if i == 0 else TEXT_LIGHT)
        c.setFont(BODY_BLACK, 9)
        c.setCharSpace(2.4)
        c.drawString(x + 4, diag_y + 26, level)
        c.setCharSpace(0)
        # Action
        c.setFillColor(TEXT_LIGHT)
        c.setFont(DISPLAY, 18)
        c.drawString(x + 4, diag_y - 26, action)
        # Kind
        c.setFillColor(TEXT_MUTED)
        c.setFont(BODY, 8.5)
        lines = wrap_text(c, kind, BODY, 8.5, seg_w - 12)
        ly = diag_y - 44
        for ln in lines[:3]:
            c.drawString(x + 4, ly, ln)
            ly -= 11

    # Bottom note
    c.setFillColor(TEXT_MUTED)
    c.setFont(BODY_LIGHT, 9.5)
    note = ("Isso torna o S&OP mais inteligente: separa o que pode ser "
            "automatizado do que precisa ser discutido.")
    draw_paragraph_justified(c, MARGIN, diag_y - 110, note, BODY_LIGHT, 10, 15,
                              PAGE_W - MARGIN * 2, color=TEXT_MUTED)


def render_closing(c, art: Article, page_num: int, total: int):
    fill_bg(c, color=NAVY)
    draw_radial_glow(c, PAGE_W * 0.5, PAGE_H * 0.5, 480, color=CORAL,
                     intensity=0.12)
    draw_wave_field(c, y_base=PAGE_H * 0.25, count=10, base_amp=24,
                    base_wl=260, seed=21, color=CORAL)
    draw_particles(c, count=70, seed=33)

    # Top chrome — symbol logo top-left
    draw_logo_symbol(c, MARGIN, PAGE_H - MARGIN - 4, height=18)

    c.setFillColor(CORAL)
    c.setFont(BODY_MEDIUM, 9)
    c.setCharSpace(2.8)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN, "MOVIMENTO")
    c.setCharSpace(0)

    # Big closing question
    closing = ("Quais sinais mostram que a demanda está mudando, "
               "e qual decisão precisamos tomar agora?")
    max_w = PAGE_W - MARGIN * 2 - 20
    size, lines = fit_display(c, closing, DISPLAY, 38, 22, max_w, max_lines=5)
    c.setFont(DISPLAY, size)
    y = PAGE_H * 0.7
    leading = size * 1.1
    for ln in lines:
        c.setFillColor(TEXT_LIGHT)
        c.drawString(MARGIN, y, ln)
        y -= leading

    draw_thin_rule(c, MARGIN, y - 6, MARGIN + 80, color=CORAL, width=1.2)
    y -= 30

    # CTAs
    c.setFillColor(CORAL)
    c.setFont(BODY_BOLD, 8.5)
    c.setCharSpace(2.6)
    c.drawString(MARGIN, y, "PRÓXIMOS PASSOS")
    c.setCharSpace(0)
    y -= 24
    for label, url in art.ctas[:3]:
        c.setFillColor(TEXT_LIGHT)
        c.setFont(DISPLAY_REG, 18)
        if label:
            c.drawString(MARGIN, y, label)
            y -= 22
        if url:
            c.setFillColor(CORAL)
            c.setFont(BODY_MEDIUM, 9)
            c.drawString(MARGIN, y, url)
            y -= 28
        else:
            y -= 6

    # Horizontal wordmark logo bottom-left
    draw_logo_horizontal(c, MARGIN, MARGIN + 40, height=46)
    c.setFillColor(TEXT_MUTED)
    c.setFont(BODY, 8.5)
    c.drawString(MARGIN, MARGIN + 22, "talk@infinity6.ai  ·  infinity6.ai")

    c.setFillColor(TEXT_DIM)
    c.setFont(BODY, 7.5)
    c.drawRightString(PAGE_W - MARGIN, MARGIN + 22, f"{page_num:02d} / {total:02d}")


# ---------------------------------------------------------------------------
# Build orchestration
# ---------------------------------------------------------------------------

def build_pdf(art: Article, output_path: str):
    # Decide which sections become which templates
    sections = art.sections

    # Find a "compare" section (heading mentions × or x or 'versus' or 'estatístico')
    compare_section = None
    list_section = None
    confidence_section = None
    image_section = None

    for s in sections:
        h = s.heading.lower()
        if compare_section is None and (
            "×" in s.heading or " x " in h or "versus" in h
            or ("estatístico" in h and "adaptativo" in h)
        ):
            compare_section = s
        elif list_section is None and s.bullets and len(s.bullets) >= 3:
            list_section = s
        elif confidence_section is None and ("acurácia" in h or "confiança" in h
                                              or "accuracy" in h):
            confidence_section = s
        elif image_section is None and ("aprend" in h or "infinity6" in h
                                         or "learn" in h):
            image_section = s

    # Build page schedule
    schedule = ["cover", "lead"]
    if art.stats:
        schedule.append("stats")
    if compare_section:
        schedule.append("compare")
    if list_section:
        schedule.append("list")
    if confidence_section:
        schedule.append("confidence")
    if art.pull_quotes:
        schedule.append("quote")
    if image_section:
        schedule.append("image")
    # Closing always
    schedule.append("closing")

    total = len(schedule)
    c = rl_canvas.Canvas(output_path, pagesize=A4)
    c.setTitle(art.title or "infinity6 editorial")
    c.setAuthor("infinity6")
    c.setSubject(art.excerpt or "")

    for idx, kind in enumerate(schedule, start=1):
        if kind == "cover":
            render_cover(c, art, idx, total)
        elif kind == "lead":
            render_lead(c, art, idx, total)
        elif kind == "stats":
            render_stats(c, art, idx, total)
        elif kind == "compare":
            render_compare(c, art, idx, total, compare_section)
        elif kind == "list":
            render_numbered_list(c, art, idx, total, list_section)
        elif kind == "confidence":
            render_confidence_diagram(c, art, idx, total, confidence_section)
        elif kind == "quote":
            render_quote(c, art, idx, total, art.pull_quotes[0],
                         attribution="ensaio infinity6")
        elif kind == "image":
            render_section_with_image(c, art, idx, total, image_section,
                                      side="right",
                                      eyebrow_text="07  O QUE APRENDEMOS")
        elif kind == "closing":
            render_closing(c, art, idx, total)
        c.showPage()

    c.save()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    if len(sys.argv) < 3:
        print("Usage: python generate-i6-editorial-pdf.py <input.pdf> <output.pdf>",
              file=sys.stderr)
        sys.exit(2)
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    if not os.path.exists(input_path):
        print(f"Input not found: {input_path}", file=sys.stderr)
        sys.exit(2)
    raw = extract_text(input_path)
    art = parse_article(raw)
    print(f"Title: {art.title}")
    print(f"Cluster: {art.cluster}")
    print(f"Sections: {len(art.sections)}")
    for s in art.sections:
        print(f"  · {s.heading or '(no heading)'} "
              f"— {len(s.paragraphs)} paras, {len(s.bullets)} bullets")
    print(f"Stats: {len(art.stats)}")
    for st in art.stats:
        print(f"  · {st.value} — {st.label[:60]} ({st.source})")
    print(f"Pull-quotes: {len(art.pull_quotes)}")
    Path(os.path.dirname(output_path) or ".").mkdir(parents=True, exist_ok=True)
    build_pdf(art, output_path)
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
