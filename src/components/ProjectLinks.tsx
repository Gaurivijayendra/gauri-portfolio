interface ProjectLinksProps {
  live?: string;
  repo?: string;
  /** Shows a status badge instead of links, for projects with nothing public yet. */
  wip?: boolean;
}

export function ProjectLinks({ live, repo, wip }: ProjectLinksProps) {
  if (wip) {
    return (
      <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-body text-xs text-ink/50">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
        Work in progress
      </div>
    );
  }

  if (!live && !repo) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-5 font-body text-sm text-ink">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent decoration-dotted underline-offset-4 hover:opacity-70"
        >
          Live ↗
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent decoration-dotted underline-offset-4 hover:opacity-70"
        >
          Repo ↗
        </a>
      )}
    </div>
  );
}
