import { useState } from "react";
import { motion } from "framer-motion";
import { SplitPortrait } from "../components/SplitPortrait";

interface HeroProps {
  opened: boolean;
  onKnowMore: () => void;
}

/**
 * The full-screen landing portrait. Sits fixed over the top of the page —
 * once "Know more" is clicked and the portrait finishes sliding apart, it
 * unmounts entirely, revealing the page underneath (which was there all
 * along; nothing scrolls to get there).
 */
export function Hero({ opened, onKnowMore }: HeroProps) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[45] h-screen w-full overflow-hidden bg-canvas"
      aria-hidden={opened}
    >
      <SplitPortrait fullBleed opened={opened} onExitComplete={() => setHidden(true)} className="h-full w-full" />

      <motion.button
        onClick={onKnowMore}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: opened ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6, delay: opened ? 0 : 0.4 }}
        className="absolute left-1/2 top-[88%] flex -translate-x-1/2 items-center gap-2 rounded-full border border-ink/20 bg-canvas/55 px-5 py-2.5 font-body text-sm font-medium text-ink backdrop-blur-md transition-transform hover:scale-[1.03]"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
      >
        Step inside
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          ↓
        </motion.span>
      </motion.button>
    </div>
  );
}
