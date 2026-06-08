import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Github, Network, BriefcaseBusiness, FileText } from "lucide-react";
import type { ReactNode } from "react";
import type { SeedPost } from "@/data/seedPortfolio";
import { projectBySlugQuery, projectsQuery, postsQuery } from "@/lib/queries";
import { getProjectPage } from "@/content/projectPages";
import type { ProjectPageCard } from "@/content/projectPages";
import { MotionPage } from "@/components/MotionPage";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(projectBySlugQuery(params.slug));
    const rich = getProjectPage(params.slug);
    if (!p && !rich) throw notFound();
    await Promise.all([
      context.queryClient.ensureQueryData(projectsQuery),
      context.queryClient.ensureQueryData(postsQuery),
    ]);
    return { project: p, rich };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.rich?.title ?? loaderData?.project?.title ?? "Project";
    const description = loaderData?.rich?.heroStatement ?? loaderData?.project?.summary ?? "Project case study";
    return {
      meta: [
        { title: `${title} — Danish Nadar` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-4xl font-display font-bold">Project not found</h1>
      <p className="mt-3 text-muted-foreground">That project slug does not match a case study yet.</p>
      <div className="mt-6 flex gap-3 justify-center">
        <Link to="/projects" className="bg-gradient-rb text-background px-5 py-2 rounded-lg text-sm font-semibold">All projects</Link>
        <Link to="/stack-map" className="glass px-5 py-2 rounded-lg text-sm">Stack map</Link>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function TextList({ items }: { items: string[] }) {
  return <ul className="space-y-2">{items.map((item, i) => <li key={i} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" /><span className="text-muted-foreground">{item}</span></li>)}</ul>;
}

function CardGrid({ items }: { items: ProjectPageCard[] }) {
  return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((item) => <div key={item.title} className="glass ambient-card rounded-2xl p-5 border border-border/50"><div className="text-sm font-semibold text-gradient-rb">{item.title}</div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p></div>)}</div>;
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="mt-16"><div className="text-xs uppercase tracking-[0.18em] text-accent mb-3 font-tech">{eyebrow}</div><h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{title}</h2>{children}</section>;
}

function ProjectTestimonials({ title, stackNames }: { title: string; stackNames: string[] }) {
  const primaryStack = stackNames.slice(0, 4).join(", ") || "AI engineering";
  const cards = [
    {
      lens: "Engineering signal",
      quote: `${title} shows the ability to move from an unclear problem into a structured system with architecture, implementation details, tradeoffs, and validation evidence.`,
    },
    {
      lens: "Employer signal",
      quote: `This project gives a hiring team more than a keyword list: it shows judgment across ${primaryStack} and connects tools to practical outcomes.`,
    },
    {
      lens: "Leadership signal",
      quote: "The work is documented in a way that a teammate, mentor, recruiter, or technical reviewer can follow without losing the human purpose behind the build.",
    },
  ];
  return <div className="grid md:grid-cols-3 gap-4">{cards.map((card) => <article key={card.lens} className="glass premium-border rounded-2xl p-5 ambient-card"><div className="text-[10px] uppercase tracking-[0.2em] text-accent font-tech">{card.lens}</div><p className="mt-4 text-sm leading-7 text-muted-foreground">"{card.quote}"</p></article>)}</div>;
}

function tokenize(value: string) {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9+#.]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2 && !["the", "and", "for", "with", "this", "that", "how", "shows", "work", "page", "project"].includes(token)),
  );
}

function rankRelatedPosts({
  slug,
  title,
  subtitle,
  hero,
  stackNames,
  explicitSlugs,
  posts,
}: {
  slug: string;
  title: string;
  subtitle: string;
  hero: string;
  stackNames: string[];
  explicitSlugs: string[];
  posts: SeedPost[];
}) {
  const queryTokens = tokenize([slug, title, subtitle, hero, ...stackNames].join(" "));
  return posts
    .map((post) => {
      const postText = [post.slug, post.title, post.subtitle ?? "", post.generated_summary ?? "", post.why_this_matters ?? "", ...(post.tags ?? []), ...(post.related_stack ?? [])].join(" ");
      const postTokens = tokenize(postText);
      let score = 0;
      if (explicitSlugs.includes(post.slug)) score += 12;
      if ((post.related_project_slugs ?? []).includes(slug)) score += 10;
      for (const stackName of stackNames) {
        const s = stackName.toLowerCase();
        if ((post.related_stack ?? []).some((item) => item.toLowerCase() === s || item.toLowerCase().includes(s))) score += 4;
        if ((post.tags ?? []).some((tag) => tag.toLowerCase().includes(s))) score += 2;
      }
      for (const token of queryTokens) if (postTokens.has(token)) score += 1;
      return { post, score };
    })
    .filter(({ score }) => score >= 4)
    .sort((a, b) => b.score - a.score || (b.post.published_at ?? "").localeCompare(a.post.published_at ?? ""))
    .slice(0, 6)
    .map(({ post }) => post);
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(projectBySlugQuery(slug));
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const { data: posts } = useSuspenseQuery(postsQuery);
  const rich = getProjectPage(slug);
  if (!p && !rich) return null;

  const title = rich?.title ?? p!.title;
  const subtitle = rich?.subtitle ?? p?.summary ?? "Project case study";
  const hero = rich?.heroStatement ?? p?.summary ?? "A detailed, editable project case study.";
  const stack = rich?.stackMap ?? (p?.tech_stack ?? []).map((name) => ({ name, category: "Project stack", usedFor: `Used in ${title}.` }));
  const relatedProjectSlugs = rich?.relatedProjectSlugs ?? [];
  const relatedPostSlugs = rich?.relatedPostSlugs ?? [];
  const relatedProjects = relatedProjectSlugs.map((s) => projects.find((x) => x.slug === s)).filter(Boolean);
  const relatedPosts = rankRelatedPosts({
    slug,
    title,
    subtitle,
    hero,
    stackNames: stack.map((s) => s.name),
    explicitSlugs: relatedPostSlugs,
    posts,
  });
  const theme = rich?.pageTheme?.gradient ?? "from-blue-500/25 via-rose-800/20 to-slate-900/30";

  return (
    <MotionPage className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> All projects</Link>

      <header className={`mt-8 rounded-[2rem] border border-border/50 overflow-hidden bg-gradient-to-br premium-border animated-gradient-surface ${theme}`}>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-9 p-8 md:p-12 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="case-badge glass">{rich?.pageTheme.eyebrow ?? p?.domain ?? "Project"}</span>
              <span className="case-badge bg-gradient-rb text-background shadow-lg shadow-red-950/20">Unique case study</span>
              <span className="case-badge border border-border/70 text-muted-foreground bg-background/35">/{slug}</span>
            </div>
            <h1 className="portfolio-title-font project-title-font mt-5 text-4xl md:text-6xl font-bold leading-tight animated-title-glow">{title}</h1>
            <p className="mt-4 text-xl text-accent font-medium">{subtitle}</p>
            <p className="mt-6 text-lg leading-relaxed text-foreground/85 max-w-3xl">{hero}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {p?.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="glass brand-button text-sm inline-flex items-center gap-2 hover:glow-blue transition"><Github className="h-3.5 w-3.5" /> Source</a>}
              {rich?.links.map((l) => <a key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass brand-button text-sm inline-flex items-center gap-2 hover:glow-blue transition"><ExternalLink className="h-3.5 w-3.5" /> {l.label}</a>)}
              <Link to="/contact" className="bg-gradient-rb text-background brand-button text-sm inline-flex items-center gap-2">Contact / collaborate</Link>
            </div>
          </div>
          <aside className="glass rounded-3xl p-6 self-stretch">
            <div className="text-xs uppercase tracking-widest text-accent">Quick facts</div>
            <dl className="mt-4 grid gap-4 text-sm">
              {(rich?.quickFacts ?? [
                { label: "Role", value: p?.role ?? "Builder" },
                { label: "Domain", value: p?.domain ?? "Engineering" },
                { label: "Status", value: p?.status ?? "Project" },
              ]).map((fact) => <div key={fact.label}><dt className="text-muted-foreground">{fact.label}</dt><dd className="font-semibold mt-1">{fact.value}</dd></div>)}
            </dl>
            <div className="mt-6 pt-6 border-t border-border/60">
              <div className="text-xs uppercase tracking-widest text-accent mb-3">Primary stack</div>
              <div className="flex flex-wrap gap-2">{stack.slice(0, 10).map((s) => <Link key={s.name} to="/stack-map" search={{ page: 1, q: s.name }} className="text-[11px] px-2 py-1 rounded border border-border hover:border-accent hover:text-accent">{s.name}</Link>)}</div>
            </div>
          </aside>
        </div>
      </header>

      <Section eyebrow="Why this exists" title="Problem & motivation">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6"><div className="font-semibold text-gradient-rb">Problem</div><p className="mt-3 text-muted-foreground leading-relaxed">{rich?.problem ?? p?.summary}</p></div>
          <div className="glass rounded-2xl p-6"><div className="font-semibold text-gradient-rb">Motivation</div><p className="mt-3 text-muted-foreground leading-relaxed">{rich?.motivation ?? "This project has its own expandable page so it can collect details, images, links, posts, and technical context over time."}</p></div>
        </div>
      </Section>

      {rich && <>
        <Section eyebrow="Contribution" title="My role"><TextList items={rich.myRole} /></Section>
        <Section eyebrow="Built artifacts" title="What I built"><TextList items={rich.whatIBuilt} /></Section>
        <Section eyebrow="System design" title="Architecture"><CardGrid items={rich.architecture} /></Section>
      </>}

      <Section eyebrow="How the technology connects" title="Stack map">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((s) => <Link key={`${s.category}-${s.name}`} to="/stack-map" search={{ page: 1, q: s.name }} className="group glass ambient-card rounded-2xl p-5 hover:glow-blue transition block"><div className="flex items-center justify-between gap-2"><span className="font-semibold">{s.name}</span><span className="text-[10px] uppercase tracking-wide text-accent">{s.category}</span></div><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.usedFor}</p></Link>)}
        </div>
      </Section>

      <Section eyebrow="Review signals" title="Testimonial-style proof points">
        <ProjectTestimonials title={title} stackNames={stack.map((s) => s.name)} />
      </Section>

      {rich && <>
        <Section eyebrow="Engineering decisions" title="Implementation details"><CardGrid items={rich.implementationDetails} /></Section>
        <Section eyebrow="Debugging and tradeoffs" title="Challenges & solutions"><CardGrid items={rich.challengeSolutions} /></Section>
        <Section eyebrow="Outcomes" title="Outcomes"><CardGrid items={rich.outcomes} /></Section>
        <Section eyebrow="Numbers and signals" title="Metrics"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{rich.metrics.map((m) => <div key={m.label} className="glass rounded-2xl p-5"><div className="text-3xl font-display font-bold text-gradient-rb">{m.value}</div><div className="mt-1 text-sm font-semibold">{m.label}</div>{m.note && <p className="mt-2 text-xs text-muted-foreground">{m.note}</p>}</div>)}</div></Section>
        <Section eyebrow="Images and artifacts" title="Media gallery"><div className="grid md:grid-cols-3 gap-4">{rich.gallery.map((g) => <div key={g.alt} className="glass rounded-2xl overflow-hidden"><div className="aspect-video bg-muted/20"><img src={g.src} alt={g.alt} className="h-full w-full object-cover" /></div>{g.caption && <p className="p-4 text-xs text-muted-foreground">{g.caption}</p>}</div>)}</div></Section>
        <Section eyebrow="Recruiter-ready" title="What this shows"><div className="glass rounded-2xl p-6 border-l-2 border-accent flex gap-4"><BriefcaseBusiness className="h-5 w-5 text-accent shrink-0" /><p className="text-muted-foreground leading-relaxed">{rich.recruiterTakeaway}</p></div></Section>
        <div className="mt-10 grid lg:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6"><div className="text-xs uppercase tracking-widest text-accent mb-3">Interview talking points</div><TextList items={rich.interviewTalkingPoints} /></div>
          <div className="glass rounded-2xl p-6"><div className="text-xs uppercase tracking-widest text-accent mb-3">Resume bullets</div><TextList items={rich.resumeBullets} /></div>
        </div>
        <Section eyebrow="Next iteration" title="Future work"><TextList items={rich.futureWork} /></Section>
      </>}

      <Section eyebrow="Explore next" title="Related content">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 related-content-card"><div className="text-sm font-semibold flex items-center gap-2"><Network className="h-4 w-4 text-accent" /> Related projects</div><div className="mt-4 space-y-2">{relatedProjects.length ? relatedProjects.map((rp) => rp && <Link key={rp.slug} to="/projects/$slug" params={{ slug: rp.slug }} className="block portfolio-title-font text-sm text-muted-foreground hover:text-accent">{rp.title}</Link>) : <p className="text-sm text-muted-foreground">This case study stands on its own as a focused portfolio artifact.</p>}</div></div>
          <div className="glass rounded-2xl p-5 related-content-card"><div className="text-sm font-semibold flex items-center gap-2"><FileText className="h-4 w-4 text-accent" /> Most relevant notes</div><p className="mt-2 text-xs text-muted-foreground">Ranked by project slug, stack overlap, tags, and summary/title similarity.</p><div className="mt-4 space-y-2">{relatedPosts.length ? relatedPosts.map((post) => <Link key={post.slug} to="/posts/$slug" params={{ slug: post.slug }} className="block portfolio-title-font text-sm text-muted-foreground hover:text-accent">{post.title}</Link>) : <p className="text-sm text-muted-foreground">Related writing will appear as the portfolio grows around this case study.</p>}</div></div>
          <div className="glass rounded-2xl p-5 related-content-card"><div className="text-sm font-semibold">What to notice</div><p className="mt-3 text-sm text-muted-foreground">Each case study is built to show problem framing, implementation judgment, stack fluency, and the human or business impact behind the technical work.</p></div>
        </div>
      </Section>
    </MotionPage>
  );
}
