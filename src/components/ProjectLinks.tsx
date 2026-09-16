interface ProjectLinksProps {
  live?: string;
  repo?: string;
}

export function ProjectLinks({ live, repo = "#" }: ProjectLinksProps) {
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
      <a
        href={repo}
        target={repo === "#" ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="underline decoration-accent decoration-dotted underline-offset-4 hover:opacity-70"
      >
        Repo ↗
      </a>
    </div>
  );
}
