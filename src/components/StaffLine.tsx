import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const LINE_COUNT = 5;
const LINE_GAP = 5;
const BASE_X = 20;

/**
 * One music staff — 5 hairline strokes running the full height of the page —
 * that draws in as the user scrolls, tying every section together like
 * notation. Converges to a single fading line at the very end (the footer).
 */
export function StaffLine() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const pathLength = reduceMotion ? 1 : scrollYProgress;
  const scaleX = useTransform(scrollYProgress, [0.94, 1], [1, 0.02]);
  const opacity = useTransform(scrollYProgress, [0.96, 1], [1, 0]);
  const centerX = BASE_X + ((LINE_COUNT - 1) * LINE_GAP) / 2;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block" aria-hidden="true">
      <svg
        width={BASE_X * 2 + LINE_GAP * LINE_COUNT}
        height="100%"
        className="absolute left-4 top-0 h-full md:left-10"
        preserveAspectRatio="none"
        viewBox={`0 0 ${BASE_X * 2 + LINE_GAP * LINE_COUNT} 1000`}
      >
        <defs>
          <linearGradient id="staff-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#caa04a" />
            <stop offset="50%" stopColor="#d98a92" />
            <stop offset="100%" stopColor="#7c9678" />
          </linearGradient>
        </defs>
        <motion.g
          style={
            reduceMotion
              ? undefined
              : { scaleX, transformOrigin: `${centerX}px 0px` }
          }
        >
          {Array.from({ length: LINE_COUNT }).map((_, i) => {
            const x = BASE_X + i * LINE_GAP;
            return (
              <motion.line
                key={i}
                x1={x}
                x2={x}
                y1={0}
                y2={1000}
                stroke="url(#staff-gradient)"
                strokeWidth={1.2}
                strokeOpacity={reduceMotion ? 0.4 : opacity}
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
                pathLength={1}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
}
