export function HalalBadge({ className = "w-24 h-24 md:w-28 md:h-28" }: { className?: string }) {
  return (
    <svg
      className={`rounded-full shrink-0 shadow-[0_0_0_1px_rgba(227,197,111,0.4),0_24px_70px_-12px_rgba(227,197,111,0.32)] ${className}`}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Halal"
    >
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3DFA2" />
          <stop offset=".45" stopColor="#C9A04E" />
          <stop offset=".75" stopColor="#8E6B2C" />
          <stop offset="1" stopColor="#D9B868" />
        </linearGradient>
        <radialGradient id="hf" cx=".5" cy=".38" r=".7">
          <stop offset="0" stopColor="#4A4237" />
          <stop offset="1" stopColor="#26221D" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#hg)" />
      <circle cx="60" cy="60" r="52.5" fill="url(#hf)" />
      <circle
        cx="60"
        cy="60"
        r="47"
        fill="none"
        stroke="url(#hg)"
        strokeWidth="1.4"
        strokeDasharray="1.6 3.2"
      />
      <circle
        cx="60"
        cy="60"
        r="42.5"
        fill="none"
        stroke="url(#hg)"
        strokeWidth=".8"
        opacity=".7"
      />
      <text
        x="60"
        y="63"
        textAnchor="middle"
        fontSize="31"
        fill="url(#hg)"
        fontFamily="'Geeza Pro','Noto Naskh Arabic','Segoe UI',Tahoma,sans-serif"
        fontWeight="700"
      >
        حلال
      </text>
      <text
        x="60"
        y="84"
        textAnchor="middle"
        fontSize="11.5"
        letterSpacing="3.2"
        fill="#EAD39A"
        fontFamily="Plus Jakarta Sans,Arial,sans-serif"
        fontWeight="700"
      >
        HALAL
      </text>
    </svg>
  );
}

export function PhoneIcon({ className = "w-[17px] h-[17px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-[17px] h-[17px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function ListIcon({ className = "w-[17px] h-[17px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "w-[17px] h-[17px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function PinIcon({ className = "w-[17px] h-[17px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
