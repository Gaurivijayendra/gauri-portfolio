import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Contact } from "../sections/Contact";
import { Section } from "../components/Section";
import { NavCards } from "../components/NavCards";

export function Home() {
  const { hash } = useLocation();
  const [heroOpened, setHeroOpened] = useState(false);
  // only a manual "Step inside" click gets the nudge — hash-based nav already knows where it's going
  const [manualEnter, setManualEnter] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    if (!hash) return;
    setHeroOpened(true);
    const id = hash.replace("#", "");
    // wait for the portrait to finish sliding apart before scrolling, so the
    // reveal and the jump don't fight each other
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 950);
    return () => window.clearTimeout(t);
  }, [hash]);

  useEffect(() => {
    if (!manualEnter) return;
    const t = window.setTimeout(() => setShowScrollHint(true), 1000);
    return () => window.clearTimeout(t);
  }, [manualEnter]);

  useEffect(() => {
    if (!showScrollHint) return;
    function dismiss() {
      setShowScrollHint(false);
    }
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    const autoHide = window.setTimeout(dismiss, 5000);
    return () => {
      window.removeEventListener("scroll", dismiss);
      window.clearTimeout(autoHide);
    };
  }, [showScrollHint]);

  function handleEnter() {
    setHeroOpened(true);
    setManualEnter(true);
  }

  return (
    <>
      <Hero opened={heroOpened} onKnowMore={handleEnter} />
      <About />
      <Section id="explore" className="pt-0">
        <NavCards />
      </Section>
      <Contact />
      <ScrollHint show={showScrollHint} />
    </>
  );
}

function ScrollHint({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-canvas/90 px-4 py-2 font-body text-xs text-ink/70 shadow-soft backdrop-blur-sm"
        >
          Scroll to see more
          <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
            ↓
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
