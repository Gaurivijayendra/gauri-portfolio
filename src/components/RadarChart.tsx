import { motion } from "framer-motion";

const AXES = ["Skills", "Titles", "Tools", "Domain", "Seniority"];
const VALUES = [0.9, 0.65, 0.8, 0.7, 0.6];

const VIEW = 220;
const CENTER = VIEW / 2;
const RADIUS = 68;

function point(i: number, value: number) {
  const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
  const r = RADIUS * value;
  return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
}

/** A small, real radar chart of resume-to-JD skill overlap — not a screenshot. */
export function RadarChart({ className }: { className?: string }) {
  const points = VALUES.map((v, i) => point(i, v));
  const polygon = points.map((p) => p.join(",")).join(" ");
  const rings = [0.33, 0.66, 1];

  return (
    <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className={className} aria-hidden="true">
      {rings.map((r) => (
        <polygon
          key={r}
          points={AXES.map((_, i) => point(i, r).join(",")).join(" ")}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1"
        />
      ))}
      {AXES.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="var(--color-line)" strokeWidth="1" />;
      })}
      <motion.polygon
        points={polygon}
        fill="var(--color-accent)"
        fillOpacity="0.35"
        stroke="var(--color-accent)"
        strokeWidth="2"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      />
      {AXES.map((label, i) => {
        const [x, y] = point(i, 1.34);
        return (
          <text
            key={label}
            x={x}
            y={y}
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-ink)"
            opacity="0.6"
            fontFamily="var(--font-body)"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
