import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Widens the measure for content-heavy pages (tech stack, projects). */
  wide?: boolean;
}

/** Shared "measure" wrapper: a left-margin rule on mobile standing in for the staff line, generous vertical rhythm. */
export function Section({ id, children, className, wide }: SectionProps) {
  return (
    <section id={id} className={`relative border-l border-line pl-5 sm:border-l-0 sm:pl-0 ${className ?? ""}`}>
      <div
        className={`mx-auto px-4 py-20 sm:pl-16 sm:pr-6 md:pl-24 lg:py-28 ${wide ? "max-w-[1200px]" : "max-w-[900px]"}`}
      >
        {children}
      </div>
    </section>
  );
}
