import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ExternalLink, ArrowLeft, Newspaper, Search } from "lucide-react";
import { postBySlugQuery, postsQuery, projectsQuery } from "@/lib/queries";
import { Markdown } from "@/components/Markdown";
import { getPostPage } from "@/content/postPages";
import { MotionPage } from "@/components/MotionPage";
import portfolio from "@/data/portfolio.json";

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postBySlugQuery(params.slug));
    const rich = getPostPage(params.slug);
    if (!post && !rich) throw notFound();
    await Promise.all([context.queryClient.ensureQueryData(postsQuery), context.queryClient.ensureQueryData(projectsQuery)]);
    return { post, rich };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.rich?.title ?? loaderData?.post?.title ?? "Post";
    const description = loaderData?.rich?.summary ?? loaderData?.post?.generated_summary ?? title;
    return { meta: [
      { title: `${title} — Danish Nadar` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ] };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-display">Post not found</h1>
      <p className="mt-2 text-muted-foreground">That update does not exist yet or has not been published.</p>
      <Link to="/posts" className="mt-4 inline-block text-accent underline">Back to posts</Link>
    </div>
  ),
  component: PostPage,
});


function formatWrittenDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

type PortfolioSkillLookup = { slug: string; name: string; category: string };
const stackSkillLookup = new Map(
  ((portfolio as unknown as { skills: PortfolioSkillLookup[] }).skills ?? []).flatMap((skill) => [
    [skill.slug.toLowerCase(), skill.name],
    [skill.name.toLowerCase(), skill.name],
  ]),
);

function titleCaseSearchValue(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      if (/^(ai|ml|api|apis|ui|ux|llm|llms|vlm|vlms|dns|spf|dkim|dmarc|aws|can|ros2|rtmaps|sql)$/i.test(part)) return part.toUpperCase();
      if (/^(c\+\+|coqui|xtts-v2|ppo|yolo|opencv|fastapi|streamlit|supabase|vercel)$/i.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function stackSearchValue(value: string) {
  const raw = value.replace(/^#/, "").trim();
  const slugKey = raw.toLowerCase();
  const readable = raw.replace(/-/g, " ").replace(/\bai\b/gi, "AI").trim();
  const redirects: Record<string, string> = {
    "Road Safety": "Autonomous Systems",
    "Full-Stack AI": "Production App Workflows",
    "Career Growth": "Professional Communication",
    "Portfolio UX": "Agentic Systems",
    "Human-Centered AI": "Agentic Systems",
    "Assistive AI": "Accessibility Robotics",
    "Stack Map": "Stack Map",
    "Evaluation": "Evaluation Metrics",
    "Automation": "Process Automation",
    "Security": "Security Automation",
    "Product": "Production App Workflows",
    "Portfolio": "Agentic Systems",
  };
  return stackSkillLookup.get(slugKey) ?? redirects[raw] ?? redirects[readable] ?? titleCaseSearchValue(readable);
}

function StackMapPill({ value }: { value: string }) {
  const q = stackSearchValue(value);
  return (
    <Link
      to="/stack-map"
      search={{ page: 1, q }}
      className="group inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/25 px-3 py-1 text-xs transition hover:border-accent/80 hover:text-accent hover:shadow-[0_0_22px_-12px_var(--neon-cyan)]"
      title={`Open Stack Map filtered for ${q}`}
    >
      {value}
      <Search className="h-3 w-3 opacity-60 transition group-hover:opacity-100" />
    </Link>
  );
}


function PostTestimonials({ title, tags, relatedStack }: { title: string; tags: string[]; relatedStack: string[] }) {
  const focus = relatedStack.slice(0, 3).join(", ") || tags.slice(0, 3).join(", ") || "AI engineering";
  const cards = [
    ["Technical signal", `${title} turns a portfolio topic into a clear engineering narrative with context, decisions, and practical next-step thinking.`],
    ["Communication signal", `The article shows how I explain ${focus} in a way that connects technical depth to business, user, or safety impact.`],
    ["Hiring signal", "A prospective employer can use this reflection to understand not just what I built, but how I think, learn, validate, and communicate."],
  ];
  return <section className="mt-8 grid md:grid-cols-3 gap-4">{cards.map(([lens, quote]) => <article key={lens} className="glass premium-border ambient-card rounded-2xl p-5"><div className="text-[10px] uppercase tracking-[0.2em] text-accent font-tech">{lens}</div><p className="mt-4 text-sm leading-7 text-muted-foreground">"{quote}"</p></article>)}</section>;
}

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postBySlugQuery(slug));
  const { data: allPosts } = useSuspenseQuery(postsQuery);
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const rich = getPostPage(slug);
  if (!post && !rich) return null;

  const title = rich?.title ?? post!.title;
  const subtitle = rich?.subtitle ?? post?.subtitle;
  const summary = rich?.summary ?? post?.generated_summary;
  const body = rich?.body ?? post?.body_markdown ?? "";
  const type = rich?.postType ?? post?.post_type ?? "post";
  const status = rich?.status ?? post?.status ?? "draft";
  const writtenDate = rich?.writtenDate ?? post?.published_at;
  const tags = rich?.tags ?? post?.tags ?? [];
  const relatedProjectSlugs = rich?.relatedProjectSlugs ?? post?.related_project_slugs ?? [];
  const relatedStack = rich?.relatedStack ?? post?.related_stack ?? post?.skills_shown ?? [];
  const sourceLinks = rich?.sourceLinks ?? [];
  const relatedProjects = projects.filter((p) => relatedProjectSlugs.includes(p.slug));
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? allPosts[idx - 1] : null;
  const next = idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null;

  return (
    <MotionPage className="mx-auto max-w-7xl px-6 py-16">
      <Link to="/posts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent"><ArrowLeft className="h-3 w-3" /> All posts</Link>

      <header className="mt-8 glass rounded-[2rem] p-8 md:p-12 bg-gradient-to-br from-blue-500/10 via-rose-800/10 to-slate-900/30 premium-border animated-gradient-surface">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-gradient-rb text-background font-semibold">{type.replace(/_/g, " ")}</span>
          <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full glass">{status}</span>
          {writtenDate && <span className="text-xs text-muted-foreground">Written {formatWrittenDate(writtenDate)}</span>}
        </div>
        <h1 className="portfolio-title-font post-title-font mt-4 text-4xl md:text-6xl font-bold leading-tight animated-title-glow">{title}</h1>
        {subtitle && <p className="mt-3 text-xl text-accent">{subtitle}</p>}
        {summary && <p className="mt-5 max-w-5xl font-body text-lg leading-8 text-slate-100/80 md:text-xl md:leading-9">{summary}</p>}
      </header>

      {post?.cover_image_url && <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl glass"><img src={post.cover_image_url} alt={title} className="h-full w-full object-cover" /></div>}

      <div className="mt-10 grid xl:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
        <div className="glass rounded-3xl p-7 md:p-10 xl:p-12 readable-panel">
          {body ? <Markdown>{body}</Markdown> : <p className="text-muted-foreground">This article is being prepared with project context.</p>}
        </div>
        <aside className="space-y-4 xl:sticky xl:top-24">
          <div className="glass ambient-card rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-accent">Related stack</div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Click any item to open the Stack Map already filtered to that exact tool, category, or capability.</p>
            <div className="mt-3 flex flex-wrap gap-2">{relatedStack.length ? relatedStack.map((s) => <StackMapPill key={s} value={s} />) : <span className="text-xs text-muted-foreground">Related stack links will appear here when this article has stack context.</span>}</div>
          </div>
          <div className="glass ambient-card rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-accent">Tags</div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Tags also act as quick filters so visitors can keep exploring the portfolio by topic.</p>
            <div className="mt-3 flex flex-wrap gap-2">{tags.map((t) => <StackMapPill key={t} value={`#${t}`} />)}</div>
          </div>
        </aside>
      </div>

      {post?.why_this_matters && <div className="mt-8 glass rounded-2xl p-6 border-l-2 border-accent"><div className="text-xs uppercase tracking-widest text-accent">Why this matters</div><p className="mt-2 text-foreground/90">{post.why_this_matters}</p></div>}

      <section className="mt-10">
        <div className="text-xs uppercase tracking-widest text-accent mb-3">Testimonial-style readout</div>
        <PostTestimonials title={title} tags={tags} relatedStack={relatedStack} />
      </section>

      {relatedProjects.length > 0 && <section className="mt-10"><h2 className="text-xs uppercase tracking-widest text-accent mb-3">Related projects</h2><div className="grid md:grid-cols-2 gap-3">{relatedProjects.map((p) => <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="glass ambient-card rounded-xl p-5 hover:glow-blue transition"><div className="portfolio-title-font text-sm font-semibold">{p.title}</div><p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.summary}</p></Link>)}</div></section>}

      <div className="mt-10 flex flex-wrap gap-3">
        {post?.source_url && <a href={post.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-semibold hover:glow-blue transition"><ExternalLink className="h-3.5 w-3.5" /> Original source</a>}
        {sourceLinks.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-semibold hover:glow-blue transition"><ExternalLink className="h-3.5 w-3.5" /> {source.label}</a>)}
        <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-rb text-background px-4 py-2 rounded-lg text-sm font-semibold">Contact / discuss this</Link>
        <Link to="/stack-map" className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm font-semibold"><Newspaper className="h-3.5 w-3.5" /> Related stack</Link>
      </div>

      {(prev || next) && <div className="mt-16 grid grid-cols-2 gap-3 border-t border-border pt-6"><div>{prev && <Link to="/posts/$slug" params={{ slug: prev.slug }} className="block glass rounded-xl p-4 hover:glow-blue transition"><div className="text-[10px] uppercase tracking-wide text-muted-foreground">← Previous</div><div className="portfolio-title-font text-sm font-semibold mt-1 line-clamp-2">{prev.title}</div></Link>}</div><div className="text-right">{next && <Link to="/posts/$slug" params={{ slug: next.slug }} className="block glass rounded-xl p-4 hover:glow-blue transition"><div className="text-[10px] uppercase tracking-wide text-muted-foreground">Next →</div><div className="portfolio-title-font text-sm font-semibold mt-1 line-clamp-2">{next.title}</div></Link>}</div></div>}
    </MotionPage>
  );
}
