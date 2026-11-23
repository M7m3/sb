import { useId } from "react";

// Key blank shape in a 300 x 500 box: round bow with a hole, then a cut blade.
const SHAPE =
  "M50 110a100 100 0 1 1 200 0a100 100 0 1 1 -200 0Z" + // bow, clockwise
  "M122 95a28 28 0 1 0 56 0a28 28 0 1 0 -56 0Z" + // hole, counter clockwise so it cuts out
  "M112 185H188V240H170V270H188V300H172V330H188V362H168V392H188V424L170 478H112Z"; // blade

/**
 * Masks its children in the shape of a key blank, with a thin accent outline that follows the shape.
 * "v": bow on top (aspect 3 / 5). "h": bow on the left (aspect 5 / 3).
 */
export function KeyBlank({
  children,
  orientation = "v",
  className = "",
}: {
  children: React.ReactNode;
  orientation?: "v" | "h";
  className?: string;
}) {
  const id = `kb-${useId().replace(/:/g, "")}`;
  const h = orientation === "h";
  const clipTransform = h ? "scale(0.002 0.0033333) translate(0 300) rotate(-90)" : "scale(0.0033333 0.002)";
  const pathTransform = h ? "translate(0 300) rotate(-90)" : undefined;

  return (
    <div className={`relative ${h ? "aspect-[5/3]" : "aspect-[3/5]"} ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={SHAPE} transform={clipTransform} />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-surface" style={{ clipPath: `url(#${id})` }}>
        {children}
      </div>
      <svg
        viewBox={h ? "0 0 500 300" : "0 0 300 500"}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <path d={SHAPE} transform={pathTransform} fill="none" className="stroke-accent" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
