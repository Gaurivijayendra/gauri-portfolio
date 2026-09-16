interface CommandHintProps {
  onClick: () => void;
}

/** A small persistent button that opens the command palette's section list. */
export function CommandHint({ onClick }: CommandHintProps) {
  return (
    <button
      onClick={onClick}
      className="card fixed bottom-5 right-5 z-40 hidden items-center gap-1.5 rounded-full px-4 py-2 font-body text-xs text-ink/70 transition-colors hover:text-ink sm:flex"
    >
      Navigate
    </button>
  );
}
