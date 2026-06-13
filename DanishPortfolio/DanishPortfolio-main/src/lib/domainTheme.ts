export type DomainTheme = {
  badge: string;
  text: string;
  border: string;
  glow: string;
  gradient: string;
  pill: string;
};

const themes: [string, DomainTheme][] = [
  [
    "Applied AI",
    {
      badge: "bg-cyan-500/15 border border-cyan-400/30",
      text: "text-cyan-300",
      border: "hover:border-cyan-500/50",
      glow: "hover:shadow-[0_0_40px_-14px_rgba(6,182,212,0.65)]",
      gradient: "from-cyan-500/25 via-blue-800/15 to-slate-900/30",
      pill: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    },
  ],
  [
    "Autonomy Systems",
    {
      badge: "bg-blue-600/15 border border-blue-400/30",
      text: "text-blue-300",
      border: "hover:border-blue-500/50",
      glow: "hover:shadow-[0_0_40px_-14px_rgba(59,130,246,0.65)]",
      gradient: "from-blue-600/25 via-indigo-800/15 to-slate-900/30",
      pill: "bg-blue-500/15 text-blue-300 border-blue-400/30",
    },
  ],
  [
    "Accessibility Robotics",
    {
      badge: "bg-violet-500/15 border border-violet-400/30",
      text: "text-violet-300",
      border: "hover:border-violet-500/50",
      glow: "hover:shadow-[0_0_40px_-14px_rgba(139,92,246,0.65)]",
      gradient: "from-violet-500/25 via-purple-800/15 to-slate-900/30",
      pill: "bg-violet-500/15 text-violet-300 border-violet-400/30",
    },
  ],
  [
    "Cybersecurity",
    {
      badge: "bg-rose-500/15 border border-rose-400/30",
      text: "text-rose-300",
      border: "hover:border-rose-500/50",
      glow: "hover:shadow-[0_0_40px_-14px_rgba(244,63,94,0.65)]",
      gradient: "from-rose-500/25 via-red-800/15 to-slate-900/30",
      pill: "bg-rose-500/15 text-rose-300 border-rose-400/30",
    },
  ],
  [
    "Machine Learning",
    {
      badge: "bg-emerald-500/15 border border-emerald-400/30",
      text: "text-emerald-300",
      border: "hover:border-emerald-500/50",
      glow: "hover:shadow-[0_0_40px_-14px_rgba(16,185,129,0.65)]",
      gradient: "from-emerald-500/25 via-teal-800/15 to-slate-900/30",
      pill: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    },
  ],
  [
    "AI Product",
    {
      badge: "bg-purple-500/15 border border-purple-400/30",
      text: "text-purple-300",
      border: "hover:border-purple-500/50",
      glow: "hover:shadow-[0_0_40px_-14px_rgba(168,85,247,0.65)]",
      gradient: "from-purple-500/25 via-violet-800/15 to-slate-900/30",
      pill: "bg-purple-500/15 text-purple-300 border-purple-400/30",
    },
  ],
  [
    "Hackathon Build",
    {
      badge: "bg-amber-500/15 border border-amber-400/30",
      text: "text-amber-300",
      border: "hover:border-amber-500/50",
      glow: "hover:shadow-[0_0_40px_-14px_rgba(245,158,11,0.65)]",
      gradient: "from-amber-500/25 via-orange-800/15 to-slate-900/30",
      pill: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    },
  ],
];

const defaultTheme: DomainTheme = {
  badge: "bg-accent/15 border border-accent/25",
  text: "text-accent",
  border: "hover:border-accent/50",
  glow: "hover:glow-blue",
  gradient: "from-blue-500/20 via-rose-800/15 to-slate-900/30",
  pill: "bg-accent/15 text-accent border-accent/30",
};

export function getDomainTheme(label?: string | null): DomainTheme {
  if (!label) return defaultTheme;
  const lc = label.toLowerCase();
  for (const [key, theme] of themes) {
    if (lc.includes(key.toLowerCase()) || key.toLowerCase().includes(lc)) return theme;
  }
  return defaultTheme;
}

export const institutionThemes = {
  "Illinois Institute of Technology": {
    accent: "text-red-400",
    border: "border-red-500/40",
    badge: "bg-red-600/15 border border-red-500/30 text-red-300",
    glow: "hover:shadow-[0_0_35px_-12px_rgba(220,38,38,0.65)]",
    orb: "bg-red-600/20",
  },
  "Montgomery College": {
    accent: "text-blue-400",
    border: "border-blue-500/40",
    badge: "bg-blue-600/15 border border-blue-500/30 text-blue-300",
    glow: "hover:shadow-[0_0_35px_-12px_rgba(59,130,246,0.5)]",
    orb: "bg-blue-600/20",
  },
};
