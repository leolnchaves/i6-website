import React from 'react';

type P = { size?: number; color?: string; fill?: string };

const base = (size: number, color: string, children: React.ReactNode, fill = 'none') => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const IconHome: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 10v10h14V10" /></>);

export const IconUpload: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 20h16" /></>);

export const IconTarget: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>);

export const IconDatabase: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>);

export const IconBrain: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 8 18a3 3 0 0 0 4 2V4.5A2.5 2.5 0 0 0 9 4Z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 16 18a3 3 0 0 1-4 2" /></>);

export const IconGrid: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);

export const IconChart: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></>);

export const IconSettings: React.FC<P> = ({ size = 18, color = '#6b7280' }) =>
  base(size, color, <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>);

export const IconChevronDown: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <path d="m6 9 6 6 6-6" />);

export const IconChevronLeft: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <path d="m15 6-6 6 6 6" />);

export const IconHeart: React.FC<P> = ({ size = 16, color = '#FDBA9B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.5 12 20 12 20Z" />
  </svg>
);

export const IconSparkles: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <><path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6Z" /><path d="M18 16.5 18.8 18.7 21 19.5 18.8 20.3 18 22.5 17.2 20.3 15 19.5 17.2 18.7Z" /></>);

export const IconTrendUp: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>);

export const IconShuffle: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <><path d="M3 6h4l10 12h4" /><path d="M3 18h4l3-3.5" /><path d="m17 3 4 3-4 3" /><path d="m17 15 4 3-4 3" /></>);

export const IconRepeat: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <><path d="M4 10V8a3 3 0 0 1 3-3h11" /><path d="m15 2 3 3-3 3" /><path d="M20 14v2a3 3 0 0 1-3 3H6" /><path d="m9 22-3-3 3-3" /></>);

export const IconLayers: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 14 9 5 9-5" /></>);

export const IconZap: React.FC<P> = ({ size = 16, color = '#9ca3af' }) =>
  base(size, color, <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />);

export const IconBook: React.FC<P> = ({ size = 18, color = '#9ca3af' }) =>
  base(size, color, <><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2Z" /><path d="M4 17h15" /></>);

export const IconRotate: React.FC<P> = ({ size = 18, color = '#9ca3af' }) =>
  base(size, color, <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>);

export const IconSend: React.FC<P> = ({ size = 18, color = '#fff' }) =>
  base(size, color, <><path d="m4 12 16-8-6 16-2.5-6.5Z" /></>);

export const IconLightbulb: React.FC<P> = ({ size = 16, color = '#f97316' }) =>
  base(size, color, <><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6h5.4c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" /></>);
