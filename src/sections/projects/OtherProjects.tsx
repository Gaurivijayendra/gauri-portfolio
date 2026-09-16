import { Section } from "../../components/Section";
import { OTHER_PROJECTS } from "../../lib/otherProjects";

export function OtherProjects() {
  return (
    <Section id="other-projects" className="pt-0" wide>
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Smaller builds</h2>
      <p className="mt-2 max-w-lg font-body text-sm text-ink/60">
        Earlier, smaller things from GitHub — not case studies, just shipped.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {OTHER_PROJECTS.map((project) => (
          <a
            key={project.name}
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex flex-col rounded-xl p-4 transition-colors hover:border-accent/50"
          >
            <h3 className="font-display text-sm font-semibold text-ink">{project.name}</h3>
            <p className="mt-1.5 flex-1 font-body text-xs leading-relaxed text-ink/60">{project.description}</p>
            <p className="mt-3 font-body text-[11px] uppercase tracking-wide text-ink/40">{project.stack}</p>
            <span className="mt-2 inline-flex items-center gap-1 font-body text-xs text-accent">
              Repo
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
