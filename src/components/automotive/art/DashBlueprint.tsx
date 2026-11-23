import { LIGHT_PATHS } from "./lightPaths";

// Blueprint line art of a car instrument cluster. Purely decorative, drawn in the accent colour at low opacity.
const G = { x: 600, y: 310, r: 230 };
const START = 135;
const SWEEP = 270;

const polar = (cx: number, cy: number, deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};

const f = (n: number) => n.toFixed(1);

function Gauge({ cx, cy, r, count, needle }: { cx: number; cy: number; r: number; count: number; needle: number }) {
  const [ax, ay] = polar(cx, cy, START, r);
  const [bx, by] = polar(cx, cy, START + SWEEP, r);
  const [nx, ny] = polar(cx, cy, START + SWEEP * needle, r - 22);
  return (
    <g>
      <path d={`M${f(ax)} ${f(ay)}A${r} ${r} 0 1 1 ${f(bx)} ${f(by)}`} />
      <circle cx={cx} cy={cy} r={r * 0.62} opacity="0.6" />
      <circle cx={cx} cy={cy} r={r * 0.12} />
      {Array.from({ length: count }, (_, i) => {
        const major = i % 3 === 0;
        const deg = START + (SWEEP / (count - 1)) * i;
        const [x1, y1] = polar(cx, cy, deg, r - (major ? 22 : 12));
        const [x2, y2] = polar(cx, cy, deg, r - 2);
        return <path key={i} d={`M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`} opacity={major ? 1 : 0.6} />;
      })}
      <path d={`M${cx} ${cy}L${f(nx)} ${f(ny)}`} strokeWidth="2" />
    </g>
  );
}

export function DashBlueprint({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 920 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* main rev counter and a smaller speed dial */}
      <Gauge cx={G.x} cy={G.y} r={G.r} count={28} needle={0.62} />
      <Gauge cx={210} cy={350} r={120} count={19} needle={0.35} />
      {/* cluster housing */}
      <path d="M70 120C70 90 90 70 120 70H800C830 70 850 90 850 120V500C850 530 830 550 800 550H120C90 550 70 530 70 500Z" opacity="0.7" />
      {/* warning light symbols along the top */}
      {LIGHT_PATHS.map((l, i) => (
        <g key={l.name} transform={`translate(${300 + i * 74} 92) scale(2.1)`} strokeWidth="0.7" opacity="0.9">
          <path d={l.d} />
        </g>
      ))}
      {/* dimension lines */}
      <path d={`M${G.x - G.r} 568H${G.x + G.r}M${G.x - G.r} 560v16M${G.x + G.r} 560v16`} opacity="0.7" />
      <text x={G.x} y="592" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none" opacity="0.8">
        92.40
      </text>
      <path d="M885 70V550M877 70h16M877 550h16" opacity="0.7" />
      <text x="905" y="310" fontSize="12" fill="currentColor" stroke="none" opacity="0.8" transform="rotate(90 905 310)" textAnchor="middle">
        48.20
      </text>
      {/* crosshair marks */}
      <path d="M30 30h24M42 18v24M880 30h24M892 18v24M30 575h24M42 563v24" opacity="0.6" />
    </svg>
  );
}
