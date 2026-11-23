// Thin custom strokes (1.5px, rounded caps) used for the few functional icons.
type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false as const,
});

export const MenuIcon = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 8h16M4 16h11" />
  </svg>
);

export const CloseIcon = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

export const PhoneIcon = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export const ArrowIcon = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5" />
  </svg>
);

export const BookIcon = ({ size = 22, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 6.5h14v12H5zM5 10.5h14M9 4.5v3M15 4.5v3M9 14l2 2 4-4" />
  </svg>
);
