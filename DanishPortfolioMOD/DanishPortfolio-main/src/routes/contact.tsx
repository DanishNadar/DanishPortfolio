import { createFileRoute, Link } from "@tanstack/react-router";
import { MotionPage } from "@/components/MotionPage";
import { useCallback, useState } from "react";
import { ArrowRight, BriefcaseBusiness, Github, Linkedin, Mail, MessageSquare, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SocialLinks } from "@/components/SocialLinks";
import { EmbeddedContactForm, type ContactFormPayload } from "@/components/EmbeddedContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Danish Nadar" }] }),
  component: ContactPage,
});

const contactCards = [
  { title: "Hiring / internships", body: "AI/ML, autonomy, backend systems, and automation built for real needs.", icon: BriefcaseBusiness },
  { title: "Project collaboration", body: "Purposeful work in robotics, accessibility, computer vision, security, and AI.", icon: Sparkles },
  { title: "Speaking / workshops", body: "Practical sessions on AI, robotics, Python, Linux, careers, and technical storytelling.", icon: MessageSquare },
];

function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  const onEmbeddedContact = useCallback(async ({ name, email, message }: ContactFormPayload) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanEmail || !cleanMessage) {
      setErr("Name, email, and message are required.");
      setState("error");
      return;
    }

    setState("sending");
    const { error } = await supabase.from("contact_messages").insert({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });
    if (error) { setErr(error.message); setState("error"); } else { setState("sent"); }
  }, []);

  return (
    <MotionPage mood="leadership" tone="product" className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 md:py-16">
      <section className="glass premium-border rounded-[2rem] p-8 md:p-12 animated-gradient-surface">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] items-start">
          <div>
            <div className="case-badge bg-gradient-rb text-background">Open to purposeful technical conversations</div>
            <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold animated-title-glow">Let&apos;s build something <span className="text-gradient-rb">useful</span>.</h1>
            <p className="mt-5 max-w-3xl text-lg md:text-xl leading-9 text-muted-foreground">Reach out about AI, autonomy, robotics, automation, workshops, or a build with real purpose.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="mailto:danish.t.nadar@gmail.com" className="brand-button-lg bg-gradient-rb text-background inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Email Danish</a>
              <a href="https://github.com/DanishNadar" target="_blank" rel="noreferrer" className="brand-button-lg glass inline-flex items-center gap-2 hover:glow-blue"><Github className="h-4 w-4" /> GitHub</a>
              <a href="https://linkedin.com/in/danish-nadar" target="_blank" rel="noreferrer" className="brand-button-lg glass inline-flex items-center gap-2 hover:glow-blue"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            </div>
          </div>

          <aside className="glass rounded-3xl p-6 md:p-8 space-y-5 premium-border">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">Send a message</div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Tell me what you are building, solving, or exploring.</p>
            </div>
            <EmbeddedContactForm onSubmit={onEmbeddedContact} />
            <a
              href="mailto:danish.t.nadar@gmail.com?subject=Portfolio%20Contact"
              className="brand-button-lg glass inline-flex w-full items-center justify-center gap-2 hover:glow-blue cursor-pointer"
            >
              <Mail className="h-4 w-4" /> Open email app instead
            </a>
            {state === "sent" && <p className="text-sm text-accent">Got it — I&apos;ll get back to you soon.</p>}
            {state === "error" && <p className="text-sm text-destructive">{err}</p>}
          </aside>
        </div>
      </section>

      <section className="mt-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-1">Ways to connect</div>
        <div className="grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => { const Icon = card.icon; return (
            <article key={card.title} className="glass premium-border ambient-card rounded-3xl p-6">
              <Icon className="h-5 w-5 text-accent" />
              <h2 className="mt-4 font-display text-xl font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
            </article>
          ); })}
        </div>
      </section>

      <section className="mt-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-4">Revisit</div>
        <div className="grid gap-5 lg:grid-cols-3">
          <Link to="/projects" className="glass premium-border ambient-card rounded-3xl p-6 hover:glow-blue transition"><div className="text-xs uppercase tracking-[0.2em] text-accent">Start here</div><h2 className="mt-3 font-display text-2xl font-bold">Project chapters</h2><p className="mt-2 text-muted-foreground">See what I built, why it matters, and how it works.</p><span className="mt-4 inline-flex items-center gap-2 text-accent text-sm">Open projects <ArrowRight className="h-4 w-4" /></span></Link>
          <Link to="/stack-map" className="glass premium-border ambient-card rounded-3xl p-6 hover:glow-blue transition"><div className="text-xs uppercase tracking-[0.2em] text-accent">Technical map</div><h2 className="mt-3 font-display text-2xl font-bold">Stack map</h2><p className="mt-2 text-muted-foreground">Trace skills to projects, roles, generated stack notes, and credentials.</p><span className="mt-4 inline-flex items-center gap-2 text-accent text-sm">Open stack map <ArrowRight className="h-4 w-4" /></span></Link>
          <Link to="/resume" className="glass premium-border ambient-card rounded-3xl p-6 hover:glow-blue transition"><div className="text-xs uppercase tracking-[0.2em] text-accent">Professional story</div><h2 className="mt-3 font-display text-2xl font-bold">Resume path</h2><p className="mt-2 text-muted-foreground">Trace the work across AI, robotics, leadership, and education.</p><span className="mt-4 inline-flex items-center gap-2 text-accent text-sm">Open resume <ArrowRight className="h-4 w-4" /></span></Link>
        </div>
      </section>
    </MotionPage>
  );
}
