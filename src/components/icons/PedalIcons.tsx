/** Small hand-drawn-feeling line icons for stack items that aren't a real product logo. */

const common = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MicroFrontendsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="8" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function ResponsiveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="2.5" y="4" width="14" height="10" rx="1.2" />
      <line x1="6" y1="17.5" x2="13" y2="17.5" />
      <rect x="17.5" y="9" width="5" height="9" rx="1" />
    </svg>
  );
}

export function RestApiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M4 8h11" />
      <path d="M11 4l4 4-4 4" />
      <path d="M20 16H9" />
      <path d="M13 20l-4-4 4-4" />
    </svg>
  );
}

export function ReleaseTagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M3 11.5 11.5 3H19a2 2 0 0 1 2 2v7.5L12.5 21a1.5 1.5 0 0 1-2.1 0L3 13.6a1.5 1.5 0 0 1 0-2.1Z" />
      <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <circle cx="8" cy="15" r="4.5" />
      <path d="M11.3 11.7 20 3" />
      <path d="M15.5 6.5 18 9" />
      <path d="M18.5 3.5 21 6" />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M12 3 4 6v6c0 4.5 3.2 7.5 8 9 4.8-1.5 8-4.5 8-9V6Z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

export function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M9.5 3h5" />
      <path d="M10.5 3v6.5L4.8 18.2A1.6 1.6 0 0 0 6.2 20.7h11.6a1.6 1.6 0 0 0 1.4-2.5L13.5 9.5V3" />
      <path d="M7.5 15.5h9" />
    </svg>
  );
}

export function ClipboardCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1Z" />
      <path d="M9 13l2 2 4-4.5" />
    </svg>
  );
}
