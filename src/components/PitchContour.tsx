import { motion } from "framer-motion";

/** A stylized pitch contour: sung line converging onto the reference via DTW-style alignment. */
export function PitchContour({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 110" className={className} aria-hidden="true">
      <motion.path
        d="M0,64 C40,26 80,22 120,52 C160,80 200,32 240,42 C280,52 320,22 360,36 C380,42 400,38 400,38"
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="2"
        strokeDasharray="1 6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d="M0,82 C40,54 70,72 110,42 C150,22 190,62 230,47 C270,37 310,27 350,35 C375,39 400,38 400,38"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.25 }}
      />
      <circle cx="400" cy="38" r="4" fill="var(--color-gold)" />
    </svg>
  );
}
