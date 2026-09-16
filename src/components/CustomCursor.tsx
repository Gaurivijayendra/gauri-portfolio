import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, [role='button'], [data-cursor-hover]";

/**
 * Replaces the system pointer with a small pink dot that snaps straight to
 * the mouse, trailed by a slower sage-green ring. Over a link or button the
 * ring catches up, turns pink, and switches to a dashed outline while the
 * dot turns green — a quick color-swap "focus" cue instead of just resizing.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24 });

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    }
    function handleLeave() {
      x.set(-100);
      y.set(-100);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 7,
          height: 7,
          backgroundColor: hovering ? "var(--color-leaf)" : "var(--color-accent)",
          transition: "background-color 0.2s ease",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full"
        style={{
          x: reduceMotion ? x : ringX,
          y: reduceMotion ? y : ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 42 : 26,
          height: hovering ? 42 : 26,
          border: `1.5px ${hovering ? "dashed" : "solid"} ${hovering ? "var(--color-accent)" : "var(--color-leaf)"}`,
          opacity: hovering ? 0.85 : 0.5,
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
