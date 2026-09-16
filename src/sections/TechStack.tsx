import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { AvatarPose } from "../components/avatar/AvatarPose";
import { PEDAL_BOARD, type Pedal, type PedalIconId } from "../lib/pedals";
import {
  MicroFrontendsIcon,
  ResponsiveIcon,
  RestApiIcon,
  ReleaseTagIcon,
  KeyIcon,
  ShieldCheckIcon,
  FlaskIcon,
  ClipboardCheckIcon,
} from "../components/icons/PedalIcons";

const PEDAL_ICONS: Record<PedalIconId, (props: { className?: string }) => ReactElement> = {
  "micro-frontends": MicroFrontendsIcon,
  responsive: ResponsiveIcon,
  "rest-api": RestApiIcon,
  "release-tag": ReleaseTagIcon,
  key: KeyIcon,
  "shield-check": ShieldCheckIcon,
  flask: FlaskIcon,
  "clipboard-check": ClipboardCheckIcon,
};

export function TechStack() {
  return (
    <Section id="stack" wide>
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">The toolkit</h2>
      <p className="mt-3 max-w-lg font-body text-ink/70">
        Grouped by what each one is actually for, not alphabetized to look impressive.
        Hover a card to see exactly where it's been used.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="space-y-8">
          {PEDAL_BOARD.map((group) => (
            <div key={group.stage}>
              <h3 className="mb-3 font-body text-sm font-semibold text-ink/60">{group.label}</h3>
              <div className="flex flex-wrap gap-3 border-t border-line pt-4">
                {group.pedals.map((pedal) => (
                  <PedalBox key={pedal.name} pedal={pedal} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto w-full max-w-[180px] sm:sticky sm:top-24">
          <AvatarPose pose="cute-sitting" className="h-auto w-full" />
        </div>
      </div>
    </Section>
  );
}

function PedalBox({ pedal }: { pedal: Pedal }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group relative z-0 hover:z-20"
    >
      <div className="card flex w-[150px] flex-col items-center gap-3 rounded-xl px-3 py-4 text-center transition-colors group-hover:border-accent/50">
        {pedal.logo ? (
          <img
            src={`https://cdn.simpleicons.org/${pedal.logo}/4a3324`}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 opacity-80"
            loading="lazy"
          />
        ) : pedal.icon ? (
          (() => {
            const Icon = PEDAL_ICONS[pedal.icon];
            return <Icon className="h-6 w-6 text-ink/70" />;
          })()
        ) : (
          <span className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="font-body text-xs font-semibold leading-tight text-ink">{pedal.name}</span>
      </div>
      <div className="card pointer-events-none absolute left-0 top-full z-10 mt-2 w-44 rounded-lg px-3 py-2 text-left text-[11px] leading-snug text-ink/80 opacity-0 shadow-lift transition-opacity duration-150 group-hover:opacity-100">
        {pedal.note}
      </div>
    </motion.div>
  );
}
