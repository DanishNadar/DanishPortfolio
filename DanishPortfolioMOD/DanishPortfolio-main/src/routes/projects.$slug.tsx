import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Network,
  BriefcaseBusiness,
  FileText,
  Lightbulb,
  Code2,
  Workflow,
  BrainCircuit,
  Users,
  Cpu,
  Wrench,
  Award,
  Hash,
  ImageIcon,
  Rocket,
  Compass,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { SeedPost } from "@/data/seedPortfolio";
import { projectBySlugQuery, projectsQuery, postsQuery } from "@/lib/queries";
import { getProjectPage } from "@/content/projectPages";
import type { ProjectPageCard, PeerReview } from "@/content/projectPages";
import { MotionPage } from "@/components/MotionPage";
import { ImmersiveImage } from "@/components/ImmersiveImage";
import { projectCoverPath } from "@/lib/visuals";
import { StaggerIn, StaggerChild } from "@/components/AnimateIn";
import { projectVisualTheme } from "@/lib/visualThemes";

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
    const description =
      loaderData?.rich?.heroStatement ?? loaderData?.project?.summary ?? "Project case study";
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
      <p className="mt-3 text-muted-foreground">
        That project slug does not match a case study yet.
      </p>
      <div className="mt-6 flex gap-3 justify-center">
        <Link
          to="/projects"
          className="bg-gradient-rb text-background px-5 py-2 rounded-lg text-sm font-semibold"
        >
          All projects
        </Link>
        <Link to="/stack-map" className="glass px-5 py-2 rounded-lg text-sm">
          Stack map
        </Link>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CardGrid({ items }: { items: ProjectPageCard[] }) {
  return (
    <StaggerIn className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <StaggerChild key={item.title}>
          <div className="glass ambient-card rounded-2xl p-5 border border-border/50 h-full">
            <div className="text-sm font-semibold text-gradient-rb">{item.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        </StaggerChild>
      ))}
    </StaggerIn>
  );
}

function Section({
  eyebrow,
  title,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <motion.section
      className="mt-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {Icon && (
        <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </div>
      )}
      <div className="text-xs uppercase tracking-[0.18em] text-accent mb-3 font-tech">
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">{title}</h2>
      {children}
    </motion.section>
  );
}

function PeerReviews({ reviews }: { reviews: PeerReview[] }) {
  return (
    <StaggerIn className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((r, i) => (
        <StaggerChild key={i}>
          <article className="glass premium-border rounded-2xl p-5 ambient-card flex flex-col gap-3 h-full">
            <svg className="h-5 w-5 text-accent/60 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-sm leading-7 text-foreground/90 flex-1">"{r.quote}"</p>
            <div className="pt-3 border-t border-border/50">
              <div className="text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-accent mt-0.5">{r.role}</div>
              {r.context && <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">{r.context}</div>}
            </div>
          </article>
        </StaggerChild>
      ))}
    </StaggerIn>
  );
}

function ProjectTestimonials({ title, stackNames }: { title: string; stackNames: string[] }) {
  const primaryStack = stackNames.slice(0, 4).join(", ") || "AI engineering";
  const cards = [
    {
      lens: "Engineering signal",
      quote: `${title} shows the practice of moving from an unclear problem into a structured system with architecture, implementation details, tradeoffs, and honest validation signals.`,
    },
    {
      lens: "Delivery signal",
      quote: `The project connects judgment across ${primaryStack} to outcomes that had to be useful, explainable, and grounded.`,
    },
    {
      lens: "Leadership signal",
      quote:
        "The work documents the engineering decisions, tradeoffs, validation, and responsibility behind the build.",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <article key={card.lens} className="glass premium-border rounded-2xl p-5 ambient-card">
          <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-tech">
            {card.lens}
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">"{card.quote}"</p>
        </article>
      ))}
    </div>
  );
}

function tokenize(value: string) {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9+#.]+/g, " ")
      .split(/\s+/)
      .filter(
        (token) =>
          token.length > 2 &&
          ![
            "the",
            "and",
            "for",
            "with",
            "this",
            "that",
            "how",
            "shows",
            "work",
            "page",
            "project",
          ].includes(token),
      ),
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
      const postText = [
        post.slug,
        post.title,
        post.subtitle ?? "",
        post.generated_summary ?? "",
        post.why_this_matters ?? "",
        ...(post.tags ?? []),
        ...(post.related_stack ?? []),
      ].join(" ");
      const postTokens = tokenize(postText);
      let score = 0;
      if (explicitSlugs.includes(post.slug)) score += 12;
      if ((post.related_project_slugs ?? []).includes(slug)) score += 10;
      for (const stackName of stackNames) {
        const s = stackName.toLowerCase();
        if (
          (post.related_stack ?? []).some(
            (item) => item.toLowerCase() === s || item.toLowerCase().includes(s),
          )
        )
          score += 4;
        if ((post.tags ?? []).some((tag) => tag.toLowerCase().includes(s))) score += 2;
      }
      for (const token of queryTokens) if (postTokens.has(token)) score += 1;
      return { post, score };
    })
    .filter(({ score }) => score >= 4)
    .sort(
      (a, b) =>
        b.score - a.score || (b.post.published_at ?? "").localeCompare(a.post.published_at ?? ""),
    )
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
  const stack =
    rich?.stackMap ??
    (p?.tech_stack ?? []).map((name) => ({
      name,
      category: "Project stack",
      usedFor: `Used in ${title}.`,
    }));
  const relatedProjectSlugs = rich?.relatedProjectSlugs ?? [];
  const relatedPostSlugs = rich?.relatedPostSlugs ?? [];
  const relatedProjects = relatedProjectSlugs
    .map((s) => projects.find((x) => x.slug === s))
    .filter(Boolean);
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
  const heroImage = rich?.gallery?.[0]?.src ?? projectCoverPath(p?.cover_image);
  const visualTone = projectVisualTheme(p?.domain ?? rich?.pageTheme.eyebrow);

  return (
    <MotionPage mood="projects" tone={visualTone} className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to project chapters
      </Link>

      <header
        className={`mt-6 rounded-[1.5rem] border border-border/50 overflow-hidden bg-gradient-to-br premium-border animated-gradient-surface ${theme}`}
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] backdrop-blur-sm">
          {/* Left: content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="case-badge glass">
                {rich?.pageTheme.eyebrow ?? p?.domain ?? "Project"}
              </span>
              <span className="case-badge bg-gradient-rb text-background shadow-lg shadow-red-950/20">
                Project chapter
              </span>
              <span className="case-badge border border-border/70 text-muted-foreground bg-background/35">
                /{slug}
              </span>
            </div>
            <h1 className="portfolio-title-font project-title-font mt-3 text-2xl md:text-3xl font-bold leading-tight animated-title-glow">
              {title}
            </h1>
            <p className="mt-2 text-sm text-accent font-medium">{subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80 max-w-xl">{hero}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p?.github_url && (
                <a
                  href={p.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass brand-button text-sm inline-flex items-center gap-2 hover:glow-blue transition"
                >
                  <Github className="h-3.5 w-3.5" /> Source
                </a>
              )}
              {rich?.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass brand-button text-sm inline-flex items-center gap-2 hover:glow-blue transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> {l.label}
                </a>
              ))}
              <Link
                to="/contact"
                className="bg-gradient-rb text-background brand-button text-sm inline-flex items-center gap-2"
              >
                Start a conversation
              </Link>
            </div>
          </div>

          {/* Right: image dominant + compact facts */}
          <aside className="border-l border-border/30 flex flex-col">
            <ImmersiveImage
              src={heroImage}
              alt={`${title} primary visual`}
              aspect="aspect-[4/3]"
              animated
              priority
              variant="hero"
              className="rounded-none flex-1"
            />
            <div className="p-4 bg-background/15 backdrop-blur-sm border-t border-border/30">
              <dl className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs">
                {(
                  rich?.quickFacts ?? [
                    { label: "Role", value: p?.role ?? "Builder" },
                    { label: "Domain", value: p?.domain ?? "Engineering" },
                    { label: "Status", value: p?.status ?? "Project" },
                  ]
                ).map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-muted-foreground text-[10px] uppercase tracking-wide">{fact.label}</dt>
                    <dd className="font-semibold mt-0.5">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 pt-3 border-t border-border/40 flex flex-wrap gap-1.5">
                {stack.slice(0, 8).map((s) => (
                  <Link
                    key={s.name}
                    to="/stack-map"
                    search={{ page: 1, q: s.name }}
                    className="text-[10px] px-2 py-0.5 rounded border border-border/70 hover:border-accent hover:text-accent transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </header>

      <Section eyebrow="Why this matters" title="Problem & motivation" icon={Lightbulb}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6">
            <div className="font-semibold text-gradient-rb">Problem</div>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {rich?.problem ?? p?.summary}
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="font-semibold text-gradient-rb">Motivation</div>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {rich?.motivation ??
                "This project has its own expandable page so it can collect details, images, links, posts, and technical context over time."}
            </p>
          </div>
        </div>
      </Section>

      {rich && (
        <>
          <Section eyebrow="Contribution" title="My role" icon={BriefcaseBusiness}>
            <TextList items={rich.myRole} />
          </Section>
          <Section eyebrow="Built with purpose" title="What I built" icon={Code2}>
            <TextList items={rich.whatIBuilt} />
          </Section>
          <Section eyebrow="System design" title="Architecture" icon={Workflow}>
            <CardGrid items={rich.architecture} />
          </Section>
        </>
      )}

      <Section eyebrow="How the technology connects" title="Stack map" icon={Network}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((s) => (
            <Link
              key={`${s.category}-${s.name}`}
              to="/stack-map"
              search={{ page: 1, q: s.name }}
              className="group glass ambient-card rounded-2xl p-5 hover:glow-blue transition block"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{s.name}</span>
                <span className="text-[10px] uppercase tracking-wide text-accent">
                  {s.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.usedFor}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Reflection signals" title="What the work quietly demonstrates" icon={BrainCircuit}>
        <ProjectTestimonials title={title} stackNames={stack.map((s) => s.name)} />
      </Section>

      {rich?.peerReviews && rich.peerReviews.length > 0 && (
        <Section eyebrow="From collaborators" title="What people who worked alongside me said" icon={Users}>
          <PeerReviews reviews={rich.peerReviews} />
        </Section>
      )}

      {rich && (
        <>
          <Section eyebrow="Engineering decisions" title="Implementation details" icon={Cpu}>
            <CardGrid items={rich.implementationDetails} />
          </Section>
          <Section eyebrow="Debugging and tradeoffs" title="Challenges & solutions" icon={Wrench}>
            <CardGrid items={rich.challengeSolutions} />
          </Section>
          <Section eyebrow="Outcomes" title="Outcomes" icon={Award}>
            <CardGrid items={rich.outcomes} />
          </Section>
          <Section eyebrow="Numbers and signals" title="Metrics" icon={Hash}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {rich.metrics.map((m) => (
                <div key={m.label} className="glass rounded-2xl p-5">
                  <div className="text-3xl font-display font-bold text-gradient-rb">{m.value}</div>
                  <div className="mt-1 text-sm font-semibold">{m.label}</div>
                  {m.note && <p className="mt-2 text-xs text-muted-foreground">{m.note}</p>}
                </div>
              ))}
            </div>
          </Section>
          <Section eyebrow="Images and artifacts" title="Media gallery" icon={ImageIcon}>
            <div className="grid md:grid-cols-3 gap-4">
              {rich.gallery.map((g, index) => (
                <div key={g.alt} className="glass rounded-2xl overflow-hidden">
                  <ImmersiveImage
                    src={g.src}
                    alt={g.alt}
                    aspect="aspect-video"
                    animated={index === 0}
                    variant="gallery"
                    className="rounded-none"
                  />
                  {g.caption && <p className="p-4 text-xs text-muted-foreground">{g.caption}</p>}
                </div>
              ))}
            </div>
          </Section>
          <Section eyebrow="Professional meaning" title="What this chapter shows" icon={FileText}>
            <div className="glass rounded-2xl p-6 border-l-2 border-accent flex gap-4">
              <BriefcaseBusiness className="h-5 w-5 text-accent shrink-0" />
              <p className="text-muted-foreground leading-relaxed">{rich.recruiterTakeaway}</p>
            </div>
          </Section>
          <motion.div
            className="mt-20 grid lg:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-accent mb-3">
                Interview talking points
              </div>
              <TextList items={rich.interviewTalkingPoints} />
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-accent mb-3">
                Resume bullets
              </div>
              <TextList items={rich.resumeBullets} />
            </div>
          </motion.div>
          <Section eyebrow="Next iteration" title="Future work" icon={Rocket}>
            <TextList items={rich.futureWork} />
          </Section>
        </>
      )}

      <Section eyebrow="Explore next" title="Related content" icon={Compass}>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 related-content-card">
            <div className="text-sm font-semibold flex items-center gap-2">
              <Network className="h-4 w-4 text-accent" /> Related projects
            </div>
            <div className="mt-4 space-y-2">
              {relatedProjects.length ? (
                relatedProjects.map(
                  (rp) =>
                    rp && (
                      <Link
                        key={rp.slug}
                        to="/projects/$slug"
                        params={{ slug: rp.slug }}
                        className="block portfolio-title-font text-sm text-muted-foreground hover:text-accent"
                      >
                        {rp.title}
                      </Link>
                    ),
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  This case study stands on its own as a focused portfolio artifact.
                </p>
              )}
            </div>
          </div>
          <div className="glass rounded-2xl p-5 related-content-card">
            <div className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" /> Most relevant notes
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Ranked by project slug, stack overlap, tags, and summary/title similarity.
            </p>
            <div className="mt-4 space-y-2">
              {relatedPosts.length ? (
                relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to="/posts/$slug"
                    params={{ slug: post.slug }}
                    className="block portfolio-title-font text-sm text-muted-foreground hover:text-accent"
                  >
                    {post.title}
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Related writing will appear as the portfolio grows around this case study.
                </p>
              )}
            </div>
          </div>
          <div className="glass rounded-2xl p-5 related-content-card">
            <div className="text-sm font-semibold">What to notice</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Each case study is built to show problem framing, implementation judgment, stack
              fluency, and the human or business purpose behind the technical work.
            </p>
          </div>
        </div>
      </Section>
    </MotionPage>
  );
}
