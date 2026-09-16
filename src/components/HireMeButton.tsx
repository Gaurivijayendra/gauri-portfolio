import { Link } from "react-router-dom";

/** Persistent CTA on every page — always one click from the contact section. */
export function HireMeButton() {
  return (
    <Link
      to="/#contact"
      className="fixed bottom-5 left-5 z-40 rounded-full bg-accent px-4 py-2 font-body text-xs font-semibold text-ink shadow-soft transition-transform hover:scale-[1.04]"
    >
      Hire me
    </Link>
  );
}
