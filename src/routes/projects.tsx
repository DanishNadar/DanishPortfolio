import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, type CSSProperties } from "react";
import { projectsQuery } from "@/lib/queries";
import { getProjectPage } from "@/content/projectPages";
import { MotionPage } from "@/components/MotionPage";
import { TechnicalHighlight } from "@/components/TechnicalHighlight";
import { ImageZoomButton } from "@/components/ImageLightbox";
import { ProjectGallery } from "@/lab/ProjectSpotlight";
import { ProjectMotif } from "@/lab/motifs";
import { SectionHeading } from "@/lab/LabViz";
import { projectByCaseSlug, type Track } from "@/lab/data";

// Inlined (not derived from lab data) so the route config stays out of the entry bundle.
const trackIds = new Set<string>(["autonomy", "applied", "research", "infrastructure"]);

export const Route = createFileRoute("/projects")({
  validateSearch: (search: Record<string, unknown>): { track?: Track } => {
    const track = typeof search.track === "string" ? search.track : undefined;
    return track && track !== "all" && trackIds.has(track) ? { track: track as Track } : {};
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  head: () => ({
    meta: [
      { title: "Projects  -  Danish Nadar" },
      {
        name: "description",
        content:
          "Engineering case studies: multimodal AI, LLM compression, autonomy and robotics, applied AI products and infrastructure.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname.replace(/\/+$/, "") === "/projects";
  return isIndex ? <ProjectsIndex /> : <Outlet />;
}

function ProjectsIndex() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const { track } = Route.useSearch();
  const navigate = Route.useNavigate();
  const domainOrder = ["Robotics", "Applied AI", "Product", "FinTech", "Cybersecurity"];
  const rawDomains = Array.from(new Set(projects.map((p) => p.domain).filter(Boolean) as string[]));
  const domains = [
    "All",
    ...rawDomains.sort((a, b) => {
      const ai = domainOrder.indexOf(a);
      const bi = domainOrder.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }),
  ];
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.domain === filter);

  return (
    <MotionPage className="projects-page visual-stability-layer mx-auto max-w-[100rem] px-6 lg:px-12 py-16">
      <div className="lab-surface">
        <div className="lab-kicker" style={{ "--lab-accent": "var(--lab-blue)" } as CSSProperties}>
          Intelligent Systems Lab / projects
        </div>
        <h1 className="lab-heading mt-4 text-4xl sm:text-5xl md:text-6xl">
          Engineering <em>case studies</em>
        </h1>
        <p className="lab-body mt-4 max-w-3xl text-base md:text-lg">
          Systems I have built across multimodal AI, model optimization, autonomy and infrastructure. Each one is labelled
          for what it is, and links to its architecture, source and live demo where they exist.
        </p>
        <div className="mt-8">
          <ProjectGallery
            includeFlagships
            track={track ?? "all"}
            onTrackChange={(t) =>
              navigate({ search: t === "all" ? {} : { track: t }, replace: true, resetScroll: false })
            }
          />
        </div>
      </div>

      <div className="lab-surface mt-20">
        <SectionHeading
          kicker="Full index"
          accent="var(--lab-steel)"
          title={<>Every case study</>}
          lede={
            <TechnicalHighlight
              text={`${projects.length} case studies across AI engineering, robotics, autonomy, security automation, and product.`}
            />
          }
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`text-sm px-3 py-1.5 rounded-full transition living-chip ${filter === d ? "bg-gradient-rb text-background font-semibold" : "glass hover:bg-muted/40"}`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="project-card-grid mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12">
        {visible.map((p) => {
          const detail = getProjectPage(p.slug);
          const stack = detail?.stackMap?.map((s) => s.name) ?? p.tech_stack ?? [];
          const imageSrc =
            detail?.gallery?.[0]?.src ??
            (p.cover_image
              ? `/assets/projects/${p.cover_image}`
              : "/portfolio_images/stackmap/workstation-stack.jpg");
          const imageAlt = `${detail?.title ?? p.title} visual`;
          const lab = projectByCaseSlug[p.slug];
          const status = lab?.maturity ?? detail?.quickFacts?.find((f) => /status/i.test(f.label))?.value;
          return (
            <div key={p.id} className="project-card-shell">
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block glass premium-border ambient-card rounded-[1.85rem] p-0 h-full min-h-[25rem] hover:glow-blue transition hover:-translate-y-1 overflow-hidden"
              >
                {lab ? (
                  <div className="aspect-video overflow-hidden border-b border-[var(--lab-line)] bg-[var(--lab-navy)] p-1">
                    <ProjectMotif kind={lab.motif} label={lab.motifCaption} />
                  </div>
                ) : (
                  <div className="zoomable-image-wrap aspect-video bg-muted/20 overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                    <ImageZoomButton src={imageSrc} alt={imageAlt} />
                  </div>
                )}
                <div className="p-8 md:p-9">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-rb text-background font-semibold">
                      {detail?.pageTheme.eyebrow ?? p.domain}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {stack.length} skills mapped
                    </span>
                  </div>
                  <h3 className="portfolio-title-font project-title-font text-lg font-semibold">
                    {detail?.title ?? p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    <TechnicalHighlight text={detail?.heroStatement ?? p.summary} />
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
                    <div className="glass rounded-xl p-3">
                      <span className="text-accent">Status</span>
                      <br />
                      {status ?? "Full case study"}
                    </div>
                    <div className="glass rounded-xl p-3">
                      <span className="text-accent">Stack</span>
                      <br />
                      {stack.length} mapped items
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {stack.slice(0, 4).map((t: string) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 text-xs text-accent group-hover:translate-x-1 transition">
                    Open full case study →
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </MotionPage>
  );
}
