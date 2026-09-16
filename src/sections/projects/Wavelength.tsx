import { Section } from "../../components/Section";
import { AvatarPose } from "../../components/avatar/AvatarPose";
import { ProjectLinks } from "../../components/ProjectLinks";
import { WAVELENGTH_URL } from "../../lib/commands";

export function Wavelength() {
  return (
    <Section id="wavelength" wide>
      <div className="flex items-center gap-3">
        <AvatarPose pose="night-coding" className="h-14 w-auto shrink-0" />
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Wavelength</h2>
      </div>
      <p className="mt-3 max-w-lg font-body text-ink/75">
        A Spotify-inspired music dashboard, built for the way I actually want to see my
        own listening data. Live audio-reactive UI on top of a proper design system.
      </p>

      <a
        href={WAVELENGTH_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="card group mt-6 block overflow-hidden rounded-2xl"
      >
        <div className="aspect-[16/10] overflow-hidden bg-surface">
          <img
            src="/screenshots/wavelength.jpg"
            alt="Wavelength music dashboard, showing the Ask your library panel and a recently played list"
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </a>

      <p className="mt-4 font-body text-xs uppercase tracking-wide text-ink/40">
        React · TypeScript · Tailwind · Framer Motion
      </p>
      <ProjectLinks live={WAVELENGTH_URL} repo="#" />
    </Section>
  );
}
