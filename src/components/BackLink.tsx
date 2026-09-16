import { Link } from "react-router-dom";

export function BackLink() {
  return (
    <Link
      to="/#about"
      className="inline-flex items-center gap-1.5 font-body text-sm text-ink/60 transition-colors hover:text-ink"
    >
      ← Back home
    </Link>
  );
}
