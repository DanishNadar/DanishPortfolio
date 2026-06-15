import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-background/70 backdrop-blur-xl relative overflow-hidden">
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-neon-blue/[0.04] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr]">
        {/* Brand column */}
        <div>
          <div className="font-display text-2xl font-bold text-gradient-rb mb-4">Danish Nadar</div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            AI engineer building robotics, autonomy, applied ML, security automation, and
            product-focused systems with curiosity, rebuilding, and service at the center.
          </p>
          <div className="mt-6">
            <SocialLinks variant="buttons" />
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
              Open to new opportunities
            </span>
          </div>
        </div>

        {/* Portfolio links */}
        <div>
          <div className="text-sm font-semibold mb-4 text-foreground">Portfolio</div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/projects", label: "Project Chapters" },
              { to: "/autonomous-vehicles", label: "Autonomy Mission" },
              { to: "/gallery", label: "Gallery" },
              { to: "/stack-map", label: "Stack Map" },
              { to: "/posts", label: "Posts & Updates" },
              { to: "/friends", label: "Friends & Community" },
              { to: "/about", label: "About" },
              { to: "/resume", label: "Resume Path" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="footer-link hover:text-foreground transition-colors inline-flex items-center gap-1 group/fl"
                >
                  {label}
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/fl:opacity-100 group-hover/fl:translate-x-0 transition-all duration-200" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcomes links */}
        <div>
          <div className="text-sm font-semibold mb-4 text-foreground">Outcomes</div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/projects/observ-e", label: "OBSERV-E" },
              { to: "/projects/ecocar-sensor-fusion", label: "EcoCAR Autonomy" },
              { to: "/projects/ttp-outreach-automation", label: "TTP Automation" },
              { to: "/projects/rl-autonomous-driving", label: "RL Driving Simulator" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="footer-link hover:text-foreground transition-colors inline-flex items-center gap-1 group/fl"
                >
                  {label}
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/fl:opacity-100 group-hover/fl:translate-x-0 transition-all duration-200" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="text-sm font-semibold mb-4 text-foreground">Connect</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/contact"
                  className="footer-link hover:text-foreground transition-colors inline-flex items-center gap-1 group/fl"
                >
                  Contact
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/fl:opacity-100 group-hover/fl:translate-x-0 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/danish-nadar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link hover:text-foreground transition-colors inline-flex items-center gap-1 group/fl"
                >
                  LinkedIn
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover/fl:opacity-100 transition-opacity duration-200" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/DanishNadar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link hover:text-foreground transition-colors inline-flex items-center gap-1 group/fl"
                >
                  GitHub
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover/fl:opacity-100 transition-opacity duration-200" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA card */}
        <div className="glass-premium rounded-2xl p-6 premium-border flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Looking for the full story?
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Start with the resume path, then follow the project chapters into detailed case
              studies and the stack map.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 mt-auto">
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground transition-colors group/link"
            >
              View resume path
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
            <Link
              to="/autonomous-vehicles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground transition-colors group/link"
            >
              Read autonomy mission
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground transition-colors group/link"
            >
              Explore project chapters
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border/40 py-6">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/70">
          <span>© {new Date().getFullYear()} Danish Nadar · Built with intention</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DanishNadar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              GitHub: DanishNadar
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/danish-nadar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              LinkedIn: /in/danish-nadar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
