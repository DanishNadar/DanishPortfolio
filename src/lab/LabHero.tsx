import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  Car,
  FileText,
  FlaskConical,
  Github,
  LayoutGrid,
  Linkedin,
  Mail,
  Network,
} from "lucide-react";
import { AutonomousScene } from "./AutonomousScene";
import { heroSignals, links } from "./data";
import { InternalLink } from "./InternalLink";

function HeroButton({
  icon,
  label,
  sub,
  primary,
  children,
}: {
  icon: ReactNode;
  label: string;
  sub: string;
  primary?: boolean;
  children: (content: ReactNode, className: string) => ReactNode;
}) {
  const content = (
    <>
      <span className="lab-btn-icon" aria-hidden="true">
        {icon}
      </span>
      <span>
        {label}
        <small>{sub}</small>
      </span>
    </>
  );
  return <>{children(content, `lab-btn ${primary ? "lab-btn-primary" : ""}`)}</>;
}

export function LabHero() {
  return (
    <section className="lab-hero lab-surface" aria-labelledby="lab-hero-name">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12">
        <div className="min-w-0">
          <div className="lab-hero-brand lab-mono">
            <span className="lab-hero-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="text-[var(--lab-ice)]">Intelligent Systems Lab</span>
            <span className="hidden text-[var(--lab-steel)] sm:inline">
              / perceive · reason · act
            </span>
          </div>

          <h1 id="lab-hero-name" className="lab-hero-name">
            <span className="lab-name-blue">Danish</span>{" "}
            <span className="lab-name-red">Nadar</span>
          </h1>
          <span className="lab-hero-rule" aria-hidden="true" />

          <p className="lab-hero-role">
            AI Engineer <span aria-hidden="true">|</span>
            <span className="lab-sr-only">,</span> Autonomous Systems{" "}
            <span aria-hidden="true">|</span>
            <span className="lab-sr-only">,</span> Applied Machine Learning
          </p>
          <p className="lab-hero-statement">
            Building intelligent systems that <b style={{ color: "var(--lab-blue)" }}>perceive</b>,{" "}
            <b style={{ color: "var(--lab-ice)" }}>reason</b>, and{" "}
            <b style={{ color: "var(--lab-red-hi)" }}>act</b>.
          </p>
          <p className="lab-body mt-4 max-w-xl text-[0.98rem]">
            I build complete intelligent systems: on-device multimodal inference, LLM compression,
            perception and tracking for robots and vehicles, and the software and infrastructure
            that ship them.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <img
              src="/portfolio_images/home/danish-avatar.webp"
              alt="Danish Nadar"
              width={44}
              height={44}
              className="lab-hero-avatar"
              decoding="async"
            />
            <p className="lab-mono text-[0.72rem] leading-5 tracking-[0.04em] text-[var(--lab-steel)]">
              Chicago · Illinois Tech AI (expected May 2027)
              <br />
              <span className="text-[var(--lab-ice)]">Open to AI/ML engineering roles</span>
            </p>
          </div>

          <nav aria-label="Explore the lab" className="mt-7 grid gap-2.5 sm:grid-cols-2">
            <HeroButton
              icon={<LayoutGrid className="h-4 w-4" />}
              label="Explore Projects"
              sub="/projects"
              primary
            >
              {(c, cls) => (
                <Link to="/projects" className={cls}>
                  {c}
                </Link>
              )}
            </HeroButton>
            <HeroButton
              icon={<Network className="h-4 w-4" />}
              label="Engineering Case Studies"
              sub="flagship systems"
            >
              {(c, cls) => (
                <a href="#flagship-systems" className={cls}>
                  {c}
                </a>
              )}
            </HeroButton>
            <HeroButton
              icon={<Car className="h-4 w-4" />}
              label="Autonomous Systems"
              sub="/autonomous-vehicles"
            >
              {(c, cls) => (
                <Link to="/autonomous-vehicles" className={cls}>
                  {c}
                </Link>
              )}
            </HeroButton>
            <HeroButton
              icon={<FlaskConical className="h-4 w-4" />}
              label="Research"
              sub="Morph · lanes · RL"
            >
              {(c, cls) => (
                <Link to="/projects" search={{ track: "research" }} className={cls}>
                  {c}
                </Link>
              )}
            </HeroButton>
          </nav>
          <div className="lab-hero-secondary mt-3">
            <Link to="/resume" className="lab-plink">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Resume
            </Link>
            <a href={links.github} target="_blank" rel="noreferrer" className="lab-plink">
              <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="lab-plink">
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
            </a>
            <Link to="/contact" className="lab-plink">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Contact
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          <AutonomousScene />
        </div>
      </div>

      <ul className="lab-signals mt-10" aria-label="Verified highlights">
        {heroSignals.map((s, i) => (
          <li
            key={s.label}
            style={
              {
                "--lab-accent": s.tone === "red" ? "var(--lab-red-hi)" : "var(--lab-blue)",
                "--lab-delay": `${i * 70}ms`,
              } as CSSProperties
            }
          >
            <InternalLink href={s.href} className="lab-signal">
              <span className="lab-signal-label">{s.label}</span>
              <span className="lab-signal-detail">{s.detail}</span>
              <ArrowRight className="lab-signal-arrow h-4 w-4" aria-hidden="true" />
            </InternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
