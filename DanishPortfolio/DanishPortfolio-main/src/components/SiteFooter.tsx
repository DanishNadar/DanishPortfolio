import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-background/55 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="font-display text-2xl font-bold text-gradient-rb">Danish Nadar</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
            AI engineer building robotics, autonomy, applied ML, security automation, and product-focused systems from idea to working prototype.
          </p>
          <div className="mt-6">
            <SocialLinks variant="buttons" />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Portfolio</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/projects" className="hover:text-foreground">Projects</Link></li>
            <li><Link to="/autonomous-vehicles" className="hover:text-foreground">Autonomy Mission</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/stack-map" className="hover:text-foreground">Stack Map</Link></li>
            <li><Link to="/posts" className="hover:text-foreground">Posts & Updates</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/resume" className="hover:text-foreground">Resume Timeline</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Outcomes</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/projects/observ-e" className="hover:text-foreground">OBSERV-E</Link></li>
            <li><Link to="/projects/ecocar-sensor-fusion" className="hover:text-foreground">EcoCAR Autonomy</Link></li>
            <li><Link to="/projects/ttp-outreach-automation" className="hover:text-foreground">TTP Automation</Link></li>
            <li><Link to="/projects/rl-autonomous-driving" className="hover:text-foreground">RL Driving Simulator</Link></li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-5 premium-border">
          <div className="text-sm font-semibold">Looking for the full story?</div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Start with the resume timeline, then follow project links into detailed case studies and the stack map.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/resume" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
              View resume timeline <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/autonomous-vehicles" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
              Read autonomy mission <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Danish Nadar · Built with intention · GitHub: DanishNadar · LinkedIn: /in/danish-nadar
      </div>
    </footer>
  );
}
