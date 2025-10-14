// Authentic macOS app icons as SVG components

export const NotesIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="notesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="100%" stopColor="#FFE066" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#notesGradient)" />
    {/* Lines */}
    <line x1="12" y1="20" x2="52" y2="20" stroke="#F4A442" strokeWidth="1.5" opacity="0.3" />
    <line x1="12" y1="28" x2="52" y2="28" stroke="#F4A442" strokeWidth="1.5" opacity="0.3" />
    <line x1="12" y1="36" x2="52" y2="36" stroke="#F4A442" strokeWidth="1.5" opacity="0.3" />
    <line x1="12" y1="44" x2="40" y2="44" stroke="#F4A442" strokeWidth="1.5" opacity="0.3" />
    {/* Text simulation */}
    <rect x="12" y="17" width="28" height="2" rx="1" fill="#CC8800" opacity="0.6" />
    <rect x="12" y="25" width="35" height="2" rx="1" fill="#CC8800" opacity="0.6" />
    <rect x="12" y="33" width="25" height="2" rx="1" fill="#CC8800" opacity="0.6" />
  </svg>
);

export const MailIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="mailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A9FF5" />
        <stop offset="100%" stopColor="#1470CC" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#mailGradient)" />
    {/* Envelope */}
    <path
      d="M12 22 L32 36 L52 22 M12 22 L12 46 L52 46 L52 22 Z"
      fill="white"
      opacity="0.95"
    />
    {/* Envelope flap */}
    <path
      d="M12 22 L32 36 L52 22 L32 30 Z"
      fill="white"
      opacity="0.8"
    />
  </svg>
);

export const SafariIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="safariGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4FC3F7" />
        <stop offset="100%" stopColor="#1976D2" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#safariGradient)" />
    {/* Compass circle */}
    <circle cx="32" cy="32" r="18" fill="white" opacity="0.9" />
    {/* Compass needle */}
    <path
      d="M32 20 L28 32 L32 44 L36 32 Z"
      fill="#E53935"
      opacity="0.85"
    />
    <path
      d="M20 32 L32 28 L44 32 L32 36 Z"
      fill="white"
      opacity="0.95"
    />
    {/* Center dot */}
    <circle cx="32" cy="32" r="3" fill="#1976D2" />
  </svg>
);

export const TerminalIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2D2D2D" />
        <stop offset="100%" stopColor="#0A0A0A" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#terminalGradient)" />
    {/* Prompt symbol > */}
    <path
      d="M16 20 L28 26 L16 32"
      stroke="#4AF626"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Cursor */}
    <rect x="32" y="24" width="12" height="4" rx="1" fill="#4AF626" opacity="0.8" />
    {/* Bottom line */}
    <path
      d="M16 40 L28 46 L16 52"
      stroke="#4AF626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

export const VSCodeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="vscodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3FA7F5" />
        <stop offset="100%" stopColor="#0066B8" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#vscodeGradient)" />
    {/* VS Code infinity symbol simplified */}
    <path
      d="M48 16 L20 32 L48 48 L48 16 Z"
      fill="white"
      opacity="0.9"
    />
    <path
      d="M20 24 L12 32 L20 40 L32 32 Z"
      fill="white"
      opacity="0.7"
    />
  </svg>
);

export const GitHubIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="githubGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#444444" />
        <stop offset="100%" stopColor="#1A1A1A" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#githubGradient)" />
    {/* GitHub Octocat simplified */}
    <circle cx="32" cy="28" r="14" fill="white" />
    {/* Cat ears */}
    <circle cx="24" cy="20" r="4" fill="white" />
    <circle cx="40" cy="20" r="4" fill="white" />
    {/* Eyes */}
    <circle cx="28" cy="26" r="2" fill="#1A1A1A" />
    <circle cx="36" cy="26" r="2" fill="#1A1A1A" />
    {/* Smile */}
    <path
      d="M26 32 Q32 36 38 32"
      stroke="#1A1A1A"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const TrashIcon = ({ isFull = false }: { isFull?: boolean }) => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="trashGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F5F5F5" />
        <stop offset="100%" stopColor="#E0E0E0" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#trashGradient)" opacity="0.9" />
    {/* Trash can */}
    <path
      d="M20 26 L22 52 L42 52 L44 26 Z"
      fill="#666666"
      opacity="0.7"
    />
    <rect x="18" y="22" width="28" height="4" rx="2" fill="#666666" />
    <rect x="26" y="18" width="12" height="4" rx="1" fill="#666666" opacity="0.5" />
    {isFull && (
      <>
        <rect x="28" y="30" width="2" height="16" rx="1" fill="#CCCCCC" />
        <rect x="32" y="30" width="2" height="16" rx="1" fill="#CCCCCC" />
        <rect x="36" y="30" width="2" height="16" rx="1" fill="#CCCCCC" />
      </>
    )}
  </svg>
);

export const FinderIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="finderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A9FF5" />
        <stop offset="100%" stopColor="#1470CC" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="64" height="64" rx="14" fill="url(#finderGradient)" />
    {/* Finder face - left side (blue) */}
    <path d="M16 20 L32 20 L32 44 L16 44 Z" fill="#4EA4F5" />
    {/* Finder face - right side (lighter blue) */}
    <path d="M32 20 L48 20 L48 44 L32 44 Z" fill="#73B9F7" />
    {/* Smile */}
    <path
      d="M20 32 Q32 42 44 32"
      stroke="white"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    {/* Eyes */}
    <circle cx="24" cy="28" r="2" fill="white" />
    <circle cx="40" cy="28" r="2" fill="white" />
  </svg>
);
