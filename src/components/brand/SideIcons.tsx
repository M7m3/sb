// Side icons, from public/brand/icon-locksmith.svg and icon-automotive.svg.
// Inlined so they use currentColor. Wrap them in an element with the `group` class:
// the key then does a quarter turn and the car a small forward nudge on hover or press.
type P = { size?: number; className?: string };

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false as const,
});

export function LocksmithIcon({ size = 22, className = "" }: P) {
  return (
    <svg
      {...svgProps(size)}
      className={`transition-transform duration-300 ease-out group-hover:rotate-90 group-active:rotate-90 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-active:rotate-0 ${className}`}
    >
      <circle cx="6.5" cy="12" r="3.75" />
      <circle cx="6.5" cy="12" r="1.25" />
      <path d="M10.25 12H21" />
      <path d="M15.5 12v2.6" />
      <path d="M18.5 12v3.4" />
      <path d="M21 12v1.6" />
    </svg>
  );
}

export function AutomotiveIcon({ size = 22, className = "" }: P) {
  return (
    <svg
      {...svgProps(size)}
      className={`transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-active:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-active:translate-x-0 ${className}`}
    >
      <path d="M2.75 14.25c1.9-1.6 4.4-2.45 7.25-2.65l3.1-2.5a5 5 0 0 1 3.7-.95c2.05.3 3.8 1.65 4.45 3.65v3.95" />
      <path d="M2.75 14.25v2h2.4" />
      <path d="M8.85 16.25h6.3" />
      <path d="M18.85 16.25h2.4" />
      <circle cx="7" cy="16.25" r="1.85" />
      <circle cx="17" cy="16.25" r="1.85" />
    </svg>
  );
}
