import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Chibi, type ChibiPose } from "./Chibi";
import { PixelSprite } from "./PixelSprite";
import { useConsoleMode } from "../../context/ConsoleModeContext";

export type AvatarPoseId =
  | "cute-sitting"
  | "study-vibes"
  | "coding"
  | "headphones"
  | "night-coding"
  | "pixel-work"
  | "wave"
  | "happy-wink";

interface AvatarPoseProps {
  pose: AvatarPoseId;
  /** Force a specific render track instead of the default color track. */
  variant?: "color" | "sketch" | "pixel";
  /** Play the sketch -> color reveal once, the first time this scrolls into view. */
  reveal?: boolean;
  hoodie?: string;
  className?: string;
}

const CHIBI_POSE_MAP: Partial<Record<AvatarPoseId, ChibiPose>> = {
  "cute-sitting": "cute-sitting",
  "study-vibes": "study-vibes",
  coding: "coding",
  headphones: "headphones",
  "night-coding": "night-coding",
  "pixel-work": "coding",
  "happy-wink": "happy-wink",
};

const PIXEL_SPRITE_MAP: Partial<Record<AvatarPoseId, "chill" | "wave" | "work">> = {
  "cute-sitting": "chill",
  "study-vibes": "chill",
  coding: "chill",
  headphones: "chill",
  "night-coding": "chill",
  "pixel-work": "work",
  wave: "wave",
  "happy-wink": "chill",
};

/**
 * The single entry point every section uses to place Gauri on the page.
 * Handles which visual track (color / sketch / pixel) renders, and swaps
 * to the pixel track automatically whenever console/retro mode is active —
 * this is what makes the console easter egg re-skin her, not just the page.
 */
export function AvatarPose({ pose, variant, reveal = false, hoodie, className }: AvatarPoseProps) {
  const { consoleMode } = useConsoleMode();
  const effectiveVariant: "color" | "sketch" | "pixel" = consoleMode ? "pixel" : variant ?? "color";

  if (pose === "wave" && effectiveVariant !== "pixel") {
    return <WaveIcon className={className} />;
  }

  if (effectiveVariant === "pixel") {
    const sprite = PIXEL_SPRITE_MAP[pose] ?? "chill";
    return <PixelSprite sprite={sprite} className={className} />;
  }

  const chibiPose = CHIBI_POSE_MAP[pose] ?? "cute-sitting";

  if (reveal) {
    return <RevealingChibi pose={chibiPose} hoodie={hoodie} className={className} />;
  }

  return <Chibi pose={chibiPose} chibiStyle={effectiveVariant} hoodie={hoodie} className={className} />;
}

function RevealingChibi({ pose, hoodie, className }: { pose: ChibiPose; hoodie?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [revealed, setRevealed] = useState(false);
  const reduceMotion = useReducedMotion();

  if (inView && !revealed) {
    if (reduceMotion) setRevealed(true);
    else setTimeout(() => setRevealed(true), 650);
  }

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="sketch"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
          >
            <Chibi pose={pose} chibiStyle="sketch" className="h-full w-full" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        animate={{ opacity: revealed || reduceMotion ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
      >
        <Chibi pose={pose} chibiStyle="color" hoodie={hoodie} className="h-full w-full" />
      </motion.div>
    </div>
  );
}

function WaveIcon({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 60"
      className={className}
      role="img"
      aria-label="Gauri waving"
      animate={{ rotate: [0, 14, -6, 14, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5 }}
      style={{ transformOrigin: "20px 44px" }}
    >
      <circle cx="30" cy="24" r="16" fill="#EBBB8C" />
      <path d="M16 22c-1-8 5-16 14-16s15 8 14 16c-2-4-6-6-14-6s-12 2-14 6z" fill="#4A3728" />
      <circle cx="25" cy="25" r="1.8" fill="#2B2438" />
      <circle cx="34" cy="25" r="1.8" fill="#2B2438" />
      <path d="M25 31q5 4 9 0" stroke="#2B2438" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M14 40c2-6 8-6 10 0l2 8-6 4-8-6z" fill="var(--color-accent)" />
      <circle cx="15" cy="40" r="4" fill="#EBBB8C" />
    </motion.svg>
  );
}
