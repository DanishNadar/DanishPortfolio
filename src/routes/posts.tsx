import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { MotionPage } from "@/components/MotionPage";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { postsQuery } from "@/lib/queries";
import { POST_TYPES } from "@/lib/postHelpers";
import { getPostPage } from "@/content/postPages";
import { linkedInPosts } from "@/data/linkedinPosts";
import { StableSearchBox } from "@/components/StableSearchBox";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const POSTS_PER_PAGE = 9;

export const Route = createFileRoute("/posts")({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Math.max(1, Number(search.page) || 1),
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: () => ({
    meta: [
      { title: "Posts & Updates  -  Danish Nadar" },
      { name: "description", content: "LinkedIn posts, event reflections, project updates, and technical writeups." },
    ],
  }),
  component: PostsPage,
});

function PostsPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname.replace(/\/+$/, "") === "/posts";
  return isIndex ? <PostsIndex /> : <Outlet />;
}

function PostsIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);
  const { page } = Route.useSearch();
  const [type, setType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (type !== "all" && p.post_type !== type) return false;
      if (searchTerm && !`${p.title} ${p.generated_summary ?? ""} ${(p.tags ?? []).join(" ")} ${p.published_at ?? ""}`.toLowerCase().includes(searchTerm)) return false;
      return true;
    });
  }, [posts, type, searchTerm]);

  const featured = useMemo(() => posts.filter((p) => p.featured).slice(0, 3), [posts]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const visibleLinkedInPosts = useMemo(() => {
    if (type !== "all" && type !== "linkedin_post") return [];
    return linkedInPosts.filter((post) => {
      if (!searchTerm) return true;
      return `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase().includes(searchTerm);
    });
  }, [searchTerm, type]);

  return (
    <MotionPage className="posts-page mx-auto max-w-[100rem] px-6 lg:px-12 py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold animated-title-glow">Posts &amp; <span className="text-gradient-rb">Updates</span></h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        LinkedIn posts, project updates, event reflections, hackathon recaps, and technical writeups. Long-form portfolio articles are paginated, while imported LinkedIn references render as a complete archive.
      </p>

      {featured.length > 0 && (
        <section className="mt-10">
          <div className="text-xs uppercase tracking-widest text-accent mb-3">Featured</div>
          <div className="grid md:grid-cols-3 gap-7">
            {featured.map((p) => {
              const detail = getPostPage(p.slug);
              return (
                <Link key={p.id} to="/posts/$slug" params={{ slug: p.slug }} className="glass premium-border rounded-[1.85rem] p-8 hover:glow-blue transition hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-wide text-accent">
                    <span>{(detail?.postType ?? p.post_type).replace(/_/g, " ")}</span>
                    <span className="text-muted-foreground normal-case">{formatPostDate(detail?.writtenDate ?? p.published_at)}</span>
                  </div>
                  <h3 className="portfolio-title-font post-title-font mt-2 font-semibold">{detail?.title ?? p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{detail?.summary ?? p.generated_summary}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-3 items-center">
        <StableSearchBox
          value={searchTerm}
          onSearch={(value) => setSearchTerm(value.toLowerCase())}
          onClear={() => setSearchTerm("")}
          placeholder="Search posts…"
          label="Search posts"
          maxLength={120}
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setType("all")} className={`text-xs px-3 py-1.5 rounded-full transition living-chip cursor-pointer ${type === "all" ? "bg-gradient-rb text-background font-semibold" : "glass"}`}>All</button>
          {POST_TYPES.map((t) => (
            <button key={t.value} onClick={() => setType(t.value)} className={`text-xs px-3 py-1.5 rounded-full transition living-chip cursor-pointer ${type === t.value ? "bg-gradient-rb text-background font-semibold" : "glass hover:bg-muted/40"}`}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <div>
          Showing <span className="text-foreground font-semibold">{visiblePosts.length}</span> of <span className="text-foreground font-semibold">{filtered.length}</span> matching posts
          {visibleLinkedInPosts.length > 0 ? <span> plus <span className="text-foreground font-semibold">{visibleLinkedInPosts.length}</span> LinkedIn references</span> : null}
          {filtered.length > POSTS_PER_PAGE ? <span> · page {currentPage} of {totalPages}</span> : null}
        </div>
        {filtered.length > POSTS_PER_PAGE ? (
          <div className="rounded-full border border-border px-3 py-1 text-xs text-accent">
            Render limit: {POSTS_PER_PAGE} cards per page
          </div>
        ) : null}
      </div>

      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 8, filter: "drop-shadow(0 0 32px rgba(196,18,48,0.55)) brightness(1.2)" }}
        animate={{ opacity: 1, y: 0, filter: "drop-shadow(0 0 0px rgba(196,18,48,0)) brightness(1)" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12"
      >
        {filtered.length === 0 && (
          <div className="col-span-full glass rounded-2xl p-10 text-center text-muted-foreground">
            No posts yet. Create one from the admin dashboard at <Link to="/admin" className="text-accent underline">/admin</Link>.
          </div>
        )}
        {visiblePosts.map((p, i) => {
          const detail = getPostPage(p.slug);
          const tags = detail?.tags ?? p.tags ?? [];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}>
              <Link to="/posts/$slug" params={{ slug: p.slug }} className="post-card-link block glass premium-border ambient-card rounded-[1.85rem] p-8 md:p-9 hover:glow-blue transition hover:-translate-y-1 h-full min-h-[23rem] cursor-pointer">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-gradient-rb text-background font-semibold">
                    {(detail?.postType ?? p.post_type).replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-accent">{formatPostDate(detail?.writtenDate ?? p.published_at)}</span>
                </div>
                <h3 className="portfolio-title-font post-title-font text-lg font-semibold leading-snug">{detail?.title ?? p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{detail?.summary ?? p.generated_summary}</p>
                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-border text-muted-foreground">#{t}</span>
                    ))}
                  </div>
                )}
                <div className="mt-5 text-xs text-accent">Open full post page →</div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length > POSTS_PER_PAGE && (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Posts pagination">
          <PageLink page={Math.max(1, currentPage - 1)} disabled={currentPage === 1} label="Previous" icon="prev" />
          {pageNumbers.map((pageNumber) => (
            <PageLink key={pageNumber} page={pageNumber} active={pageNumber === currentPage} label={String(pageNumber)} />
          ))}
          <PageLink page={Math.min(totalPages, currentPage + 1)} disabled={currentPage === totalPages} label="Next" icon="next" />
        </nav>
      )}

      <section className="mt-16 glass premium-border rounded-[2rem] p-6 md:p-8">
        <div className="case-badge bg-gradient-rb text-background">Imported LinkedIn archive</div>
        <h2 className="mt-4 text-3xl font-display font-bold">All LinkedIn posts in the portfolio data</h2>
        <p className="mt-3 max-w-4xl text-muted-foreground leading-7">Every LinkedIn post reference currently imported into the site is shown here, with no card cap. Add new public LinkedIn URLs to the data file and they will automatically appear in this section.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {visibleLinkedInPosts.length === 0 && (
            <div className="md:col-span-3 rounded-2xl border border-border/70 bg-background/30 p-6 text-sm text-muted-foreground">
              No LinkedIn references match the current filter.
            </div>
          )}
          {visibleLinkedInPosts.map((post) => (
            <a key={`${post.title}-${post.url}`} href={post.url} target="_blank" rel="noreferrer" className="glass ambient-card premium-border rounded-2xl p-5 hover:glow-blue transition cursor-pointer">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.imageAlt ?? post.title}
                  loading="lazy"
                  className="mb-4 aspect-video w-full rounded-xl border border-border/70 object-cover"
                />
              )}
              <div className="flex items-start justify-between gap-3">
                <h3 className="portfolio-title-font post-title-font text-lg font-semibold leading-tight">{post.title}</h3>
                <ExternalLink className="h-4 w-4 shrink-0 text-accent" />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-wide text-muted-foreground">{tag}</span>)}
              </div>
            </a>
          ))}
        </div>
      </section>
    </MotionPage>
  );
}

function formatPostDate(value?: string) {
  if (!value) return "Draft date";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function PageLink({ page, label, active = false, disabled = false, icon }: { page: number; label: string; active?: boolean; disabled?: boolean; icon?: "prev" | "next" }) {
  const content = (
    <>
      {icon === "prev" && <ChevronLeft className="h-3.5 w-3.5" />}
      {label}
      {icon === "next" && <ChevronRight className="h-3.5 w-3.5" />}
    </>
  );

  if (disabled) {
    return <span className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">{content}</span>;
  }

  return (
    <Link
      to="/posts"
      search={{ page }}
      className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm transition cursor-pointer ${active ? "border-transparent bg-gradient-rb text-background font-semibold" : "border-border glass hover:text-accent"}`}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </Link>
  );
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
