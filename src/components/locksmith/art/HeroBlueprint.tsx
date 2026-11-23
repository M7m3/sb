// Blueprint line art of a pin tumbler lock. Purely decorative, drawn in gold at low opacity.
const CX = [230, 355, 480, 605, 730];
const LIFT = [26, 40, 18, 48, 34];
const SHEAR = 300;

const zig = (cx: number, top: number, bottom: number) => {
  const n = 8;
  const step = (bottom - top) / n;
  let d = `M${cx} ${top}`;
  for (let i = 0; i < n; i++) d += `L${cx + (i % 2 ? -14 : 14)} ${top + step * (i + 0.5)}`;
  return d + `L${cx} ${bottom}`;
};

export function HeroBlueprint({ className = "" }: { className?: string }) {
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
      {/* housing and plug */}
      <rect x="70" y="70" width="780" height={SHEAR - 70} rx="18" />
      <rect x="70" y={SHEAR} width="780" height="190" rx="18" />
      <path d={`M70 ${SHEAR}H850`} strokeDasharray="6 7" />
      {/* keyway and a key sliding in */}
      <path d="M50 430H840M50 458H840" opacity="0.6" />
      <path d="M-10 420h70v48h-70z" opacity="0.6" />

      {CX.map((cx, i) => {
        const B = SHEAR + LIFT[i];
        return (
          <g key={cx}>
            <rect x={cx - 26} y="86" width="52" height={SHEAR - 86} opacity="0.5" />
            <path d={zig(cx, 90, B - 78)} opacity="0.8" />
            <rect x={cx - 19} y={B - 78} width="38" height="78" rx="3" />
            <path d={`M${cx - 19} ${B}h38v${70 - 18}l-19 24l-19-24Z`} />
            {/* centre line and tiny dimension ticks */}
            <path d={`M${cx} 60V80`} opacity="0.5" />
            <path d={`M${cx - 26} 548h52M${cx - 26} 542v12M${cx + 26} 542v12`} opacity="0.7" />
            <text x={cx} y="574" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none" opacity="0.8">
              {(6.35 + i * 0.12).toFixed(2)}
            </text>
          </g>
        );
      })}

      {/* overall width dimension */}
      <path d="M70 520H850M70 512v16M850 512v16" opacity="0.7" />
      <text x="460" y="508" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none" opacity="0.8">
        38.10
      </text>
      {/* height dimension */}
      <path d="M885 70V490M877 70h16M877 490h16" opacity="0.7" />
      <text x="902" y="285" fontSize="12" fill="currentColor" stroke="none" opacity="0.8" transform="rotate(90 902 285)" textAnchor="middle">
        24.60
      </text>
      {/* crosshair marks */}
      <path d="M40 40h24M52 28v24M880 40h24M892 28v24M40 560h24M52 548v24" opacity="0.6" />
    </svg>
  );
}
