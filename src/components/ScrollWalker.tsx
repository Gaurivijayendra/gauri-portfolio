import { motion, useReducedMotion, useScroll, useTransform, useVelocity } from "framer-motion";

/**
 * A tiny cameo: Gauri "runs" along the staff line, but only while the user
 * is scrolling fast. A signature detail, not a constant animation.
 */
export function ScrollWalker() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const velocity = useVelocity(scrollYProgress);
  const opacity = useTransform(velocity, (v) => Math.min(0.9, Math.abs(v) / 3));
  const top = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute left-2 z-10 hidden -translate-y-1/2 sm:block md:left-8"
      style={{ top, opacity }}
    >
      <motion.svg
        viewBox="0 0 40 40"
        width={26}
        height={26}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="20" cy="10" r="7" fill="#EBBB8C" />
        <path d="M13 9c-1-5 3-9 7-9s8 4 7 9c-1-2-4-3-7-3s-6 1-7 3z" fill="#4A3728" />
        <rect x="14" y="17" width="12" height="12" rx="5" fill="var(--color-accent)" />
        <motion.rect
          x="12"
          y="27"
          width="4"
          height="10"
          rx="2"
          fill="#9AA6C4"
          animate={{ rotate: [-25, 25, -25] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "14px 27px" }}
        />
        <motion.rect
          x="24"
          y="27"
          width="4"
          height="10"
          rx="2"
          fill="#9AA6C4"
          animate={{ rotate: [25, -25, 25] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "26px 27px" }}
        />
      </motion.svg>
    </motion.div>
  );
}
