import { AnimatePresence, motion } from "framer-motion";
import { AvatarPose } from "./AvatarPose";

interface JumpBurstProps {
  /** Increment this number each time the tied action completes. */
  triggerKey: number;
  className?: string;
}

/** A quick celebratory beat tied to one completed action — not decoration. */
export function JumpBurst({ triggerKey, className }: JumpBurstProps) {
  return (
    <div className={`pointer-events-none relative h-16 w-16 ${className ?? ""}`}>
      <AnimatePresence>
        {triggerKey > 0 && (
          <motion.div
            key={triggerKey}
            className="absolute inset-0"
            initial={{ y: 0, scale: 0.9, opacity: 0 }}
            animate={{ y: [-6, -34, 0], scale: [0.9, 1.08, 1], opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <AvatarPose pose="happy-wink" className="h-full w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
