import { motion } from "framer-motion";

const HEIGHTS = [10, 22, 14, 28, 18, 30, 12, 24, 16];

/** Equalizer bars that come alive on hover — earned because Wavelength's content is literally a music UI. */
export function EqualizerBars({ className }: { className?: string }) {
  return (
    <div className={`flex items-end gap-1 ${className ?? ""}`} aria-hidden="true">
      {HEIGHTS.map((h, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-accent to-gold"
          style={{ height: 6 }}
          variants={{
            rest: { height: 6 },
            active: {
              height: [6, h, 8, h * 0.7, 6],
              transition: { duration: 0.9, repeat: Infinity, delay: i * 0.06 },
            },
          }}
        />
      ))}
    </div>
  );
}
