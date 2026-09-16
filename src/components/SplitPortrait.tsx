import { motion } from "framer-motion";
import portrait from "../assets/gauri-portrait.jpg";

interface SplitPortraitProps {
  className?: string;
  /** Fills its container edge-to-edge with no card chrome — for the full-screen landing. */
  fullBleed?: boolean;
  /** When true, the two halves animate apart and fade, like doors opening. */
  opened?: boolean;
  /** Fires once the opening animation has fully finished (not on the initial closed-state mount). */
  onExitComplete?: () => void;
}

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * The dual-identity portrait: one photo, split down the middle. Left is a
 * posterized, graphic treatment (same palette, flattened into color bands);
 * right stays full photographic color. On `opened`, the two halves slide
 * apart and fade, like the portrait is opening onto the rest of the site.
 */
export function SplitPortrait({ className, fullBleed = false, opened = false, onExitComplete }: SplitPortraitProps) {
  const objectPosition = fullBleed ? "50% 30%" : "50% 18%";
  const leftClip = "polygon(0 0, 50% 0, 50% 100%, 0 100%)";
  const rightClip = "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)";

  function handleComplete() {
    if (opened) onExitComplete?.();
  }

  return (
    <div className={`relative ${fullBleed ? "" : "card overflow-hidden rounded-2xl"} ${className ?? ""}`}>
      {/* posterize filter def — quantizes each channel into flat bands for a graphic, non-photographic left half */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="portrait-posterize" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="1.4" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 0.14 0.28 0.42 0.56 0.7 0.84 0.94 1" />
            <feFuncG type="discrete" tableValues="0 0.14 0.28 0.42 0.56 0.7 0.84 0.94 1" />
            <feFuncB type="discrete" tableValues="0 0.14 0.28 0.42 0.56 0.7 0.84 0.94 1" />
          </feComponentTransfer>
        </filter>
      </svg>
      <div
        className={fullBleed ? "relative mx-auto h-screen @container" : "relative w-full aspect-[3/4]"}
        style={fullBleed ? { width: "clamp(85vw, 92vh, 100vw)" } : undefined}
      >
        {/* left half — posterized, graphic treatment of the same photo */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: leftClip }}
          animate={opened ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <img
            src={portrait}
            alt="Gauri, left half of a portrait, rendered as flat color bands"
            className="absolute inset-0 h-full w-full object-cover contrast-105"
            style={{ objectPosition, filter: "url(#portrait-posterize)" }}
          />
          {fullBleed && (
            <>
              <svg
                className="absolute -left-4 -top-2 h-40 w-56 text-canvas/70 @lg:h-52 @lg:w-72"
                viewBox="0 0 220 140"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 108C40 40 130 8 216 20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 120C48 66 118 42 200 56" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="1 9" strokeLinecap="round" />
              </svg>
              <div className="absolute left-[35%] top-[68%] flex items-center gap-1.5" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 -rotate-3 text-accent">
                  <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 rotate-6 text-leaf">
                  <rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </>
          )}
        </motion.div>

        {/* right half — full color */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: rightClip }}
          animate={opened ? { x: "100%", opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          onAnimationComplete={handleComplete}
        >
          <img
            src={portrait}
            alt="Gauri, right half of a portrait in full color"
            className="absolute inset-0 h-full w-full object-cover saturate-[1.25] contrast-105"
            style={{ objectPosition }}
          />
        </motion.div>

        {/* seam + labels fade with the halves */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: opened ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-canvas/70" />
          {fullBleed && (
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-ink/75 via-ink/35 to-transparent @lg:h-80" />
          )}
          {fullBleed && (
            <div
              className="absolute inset-6 rounded-sm border border-dashed border-canvas/40 @lg:inset-10"
              aria-hidden="true"
            />
          )}

          <div
            className={`absolute flex ${
              fullBleed
                ? "inset-x-6 top-6 flex-col gap-3 @lg:inset-x-10 @lg:top-10 @lg:flex-row @lg:items-start @lg:justify-between"
                : "inset-x-6 bottom-6 flex-row items-end justify-between"
            }`}
          >
            <div className={fullBleed ? "max-w-full @lg:max-w-[43%]" : "max-w-[46%]"}>
              <div className="flex items-center gap-2.5">
                {fullBleed && <span className="hidden h-8 w-1 rounded-full bg-accent @lg:block" aria-hidden="true" />}
                {fullBleed && <CodeBadge className="hidden text-accent @lg:flex" />}
                <span
                  className={`block font-display font-bold uppercase leading-tight tracking-tight ${
                    fullBleed ? "text-xl text-canvas @lg:text-4xl" : "text-sm text-ink"
                  }`}
                  style={fullBleed ? { textShadow: "0 2px 14px rgba(0,0,0,0.5)" } : undefined}
                >
                  Gauri Vijayendra
                </span>
              </div>
              {fullBleed && <Underline className="mt-1.5 h-2 w-28 text-accent @lg:w-40" />}
            </div>

            <div className={fullBleed ? "max-w-full text-left @lg:max-w-[44%] @lg:text-right" : "max-w-[46%] text-right"}>
              <div className="flex items-center gap-2 @lg:justify-end">
                <span
                  className={`block font-display font-bold uppercase leading-tight tracking-tight text-accent ${
                    fullBleed ? "text-sm @lg:text-2xl" : "text-[7px]"
                  }`}
                  style={fullBleed ? { textShadow: "0 2px 14px rgba(0,0,0,0.7)" } : undefined}
                >
                  Software Developer
                </span>
                {fullBleed && <BrowserBadge className="hidden text-accent @lg:flex" />}
              </div>
              {fullBleed && <Underline className="mt-1.5 h-2 w-28 text-accent @lg:ml-auto @lg:w-40" />}
              {fullBleed && (
                <p className="mt-3 hidden rounded-lg bg-ink/45 px-3 py-2.5 font-body text-xs leading-relaxed text-canvas backdrop-blur-sm @lg:block">
                  I turn Figma prototypes into interfaces that actually move — the good
                  kind of animation, not the confetti kind. Half design instinct, half
                  stubborn debugging, until it finally feels right.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** A single hand-drawn-feeling underline stroke, colored via the parent's text color. */
function Underline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 12" className={className} preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 7 Q40 2 80 6 T158 4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CodeBadge({ className }: { className?: string }) {
  return (
    <span
      className={`h-7 w-7 shrink-0 items-center justify-center rounded-md border border-current font-console text-[9px] ${className ?? ""}`}
    >
      {"</>"}
    </span>
  );
}

function BrowserBadge({ className }: { className?: string }) {
  return (
    <span className={`relative h-7 w-7 shrink-0 items-center justify-center rounded-md border border-current ${className ?? ""}`}>
      <span className="absolute left-1.5 top-1.5 flex gap-0.5">
        <span className="h-[3px] w-[3px] rounded-full bg-current" />
        <span className="h-[3px] w-[3px] rounded-full bg-current" />
        <span className="h-[3px] w-[3px] rounded-full bg-current" />
      </span>
    </span>
  );
}
