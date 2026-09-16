export function SectionIntro({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 text-ink/40">
      <span className="h-px flex-1 bg-line" />
      <span className="font-body text-xs font-semibold uppercase tracking-[0.2em]">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
