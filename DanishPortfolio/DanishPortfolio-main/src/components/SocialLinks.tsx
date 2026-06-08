import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/DanishNadar",
    icon: Github,
    detail: "DanishNadar",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/danish-nadar",
    icon: Linkedin,
    detail: "linkedin.com/in/danish-nadar",
  },
  {
    label: "Email",
    href: "mailto:danish.t.nadar@gmail.com",
    icon: Mail,
    detail: "danish.t.nadar@gmail.com",
  },
] as const;

interface SocialLinksProps {
  variant?: "buttons" | "icons" | "stacked";
  className?: string;
}

export function SocialLinks({ variant = "buttons", className = "" }: SocialLinksProps) {
  if (variant === "icons") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            aria-label={label}
            className="group h-11 w-11 rounded-xl border border-border/70 bg-background/45 grid place-items-center text-muted-foreground transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-foreground hover:shadow-[0_0_30px_-12px_var(--neon-blue)]"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`grid gap-3 ${className}`}>
        {socialLinks.map(({ label, href, icon: Icon, detail }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="group glass rounded-2xl px-4 py-3.5 flex items-center justify-between gap-4 hover:glow-blue transition duration-300 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className="h-10 w-10 rounded-xl bg-gradient-rb text-background grid place-items-center shrink-0"><Icon className="h-4 w-4" /></span>
              <span className="min-w-0">
                <span className="block font-tech text-sm font-semibold">{label}</span>
                <span className="block truncate text-xs text-muted-foreground">{detail}</span>
              </span>
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon, detail }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
          className="brand-button glass inline-flex items-center gap-2.5 hover:glow-blue transition duration-300 hover:-translate-y-0.5"
          title={detail}
        >
          <Icon className="h-4 w-4" /> {label}
        </a>
      ))}
    </div>
  );
}
