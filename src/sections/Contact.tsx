import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { AvatarPose } from "../components/avatar/AvatarPose";
import { JumpBurst } from "../components/avatar/JumpBurst";
import { EMAIL } from "../lib/commands";

export function Contact() {
  const [copyKey, setCopyKey] = useState(0);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).catch(() => {});
    setCopyKey((k) => k + 1);
  }

  return (
    <Section id="contact" className="pb-32">
      <div className="grid items-center gap-8 sm:grid-cols-[0.7fr_1.3fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="card mx-auto w-full max-w-[200px] rounded-2xl p-4"
        >
          <AvatarPose pose="happy-wink" className="h-auto w-full" />
        </motion.div>

        <div>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Say hi</h2>
          <p className="mt-3 font-body text-ink/70">
            Currently open to frontend, full-stack, and AI-adjacent roles in Bengaluru.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 font-body text-sm">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-semibold text-ink transition-colors hover:bg-accent/90"
            >
              {EMAIL}
            </button>
            <a
              href="https://www.linkedin.com/in/gauri-vijayendra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 underline decoration-line decoration-dotted underline-offset-4 hover:text-ink"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Gaurivijayendra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 underline decoration-line decoration-dotted underline-offset-4 hover:text-ink"
            >
              GitHub ↗
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 underline decoration-line decoration-dotted underline-offset-4 hover:text-ink"
            >
              Résumé ↗
            </a>
            <JumpBurst triggerKey={copyKey} className="h-10 w-10" />
          </div>

          <p className="mt-10 font-console text-[9px] uppercase tracking-widest text-ink/30">
            engineer by day, vocalist by ear
          </p>
        </div>
      </div>
    </Section>
  );
}
