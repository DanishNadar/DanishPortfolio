import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { projectsQuery } from "@/lib/queries";
import { getProjectPage } from "@/content/projectPages";
import { MotionPage } from "@/components/MotionPage";
import { TechnicalHighlight } from "@/components/TechnicalHighlight";
import { ImageZoomButton } from "@/components/ImageLightbox";

export const Route = createFileRoute("/projects")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  head: () => ({ meta: [{ title: "Projects  -  Danish Nadar" }, { name: "description", content: "Robotics, autonomy, applied AI, and security case studies." }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname.replace(/\/+$/, "") === "/projects";
  return isIndex ? <ProjectsIndex /> : <Outlet />;
}

function ProjectsIndex() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const domainOrder = ["Robotics", "Applied AI", "Product", "FinTech", "Cybersecurity"];
  const rawDomains = Array.from(new Set(projects.map((p) => p.domain).filter(Boolean) as string[]));
  const domains = ["All", ...rawDomains.sort((a, b) => {
    const ai = domainOrder.indexOf(a);
    const bi = domainOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  })];
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.domain === filter);

  return (
    <MotionPage className="projects-page mx-auto max-w-[100rem] px-6 lg:px-12 py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold animated-title-glow">Projects</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl"><TechnicalHighlight text={`${projects.length} case studies across AI engineering, robotics, autonomy, security automation, and product.`} /></p>

      <div className="mt-8 flex flex-wrap gap-2">
        {domains.map((d) => (
          <button key={d} onClick={() => setFilter(d)} className={`text-sm px-3 py-1.5 rounded-full transition living-chip ${filter === d ? "bg-gradient-rb text-background font-semibold" : "glass hover:bg-muted/40"}`}>{d}</button>
        ))}
      </div>

      <div className="project-card-grid mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12">
        {visible.map((p, i) => {
          const detail = getProjectPage(p.slug);
          const stack = detail?.stackMap?.map((s) => s.name) ?? p.tech_stack ?? [];
          const imageSrc =
            detail?.gallery?.[0]?.src ??
            (p.cover_image
              ? `/assets/projects/${p.cover_image}`
              : "/portfolio_images/stackmap/workstation-stack.jpg");
          const imageAlt = `${detail?.title ?? p.title} visual`;
          return (
          <motion.div key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block glass premium-border ambient-card rounded-[1.85rem] p-0 h-full min-h-[25rem] hover:glow-blue transition hover:-translate-y-1 overflow-hidden">
              <div className="zoomable-image-wrap aspect-video bg-muted/20 overflow-hidden">
                <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                <ImageZoomButton src={imageSrc} alt={imageAlt} />
              </div>
              <div className="p-8 md:p-9">
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-rb text-background font-semibold">{detail?.pageTheme.eyebrow ?? p.domain}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{stack.length} skills mapped</span>
              </div>
              <h3 className="portfolio-title-font project-title-font text-lg font-semibold">{detail?.title ?? p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3"><TechnicalHighlight text={detail?.heroStatement ?? p.summary} /></p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
                <div className="glass rounded-xl p-3"><span className="text-accent">{detail?.metrics?.[0]?.label ?? "Metric"}</span><br />{detail?.metrics?.[0]?.value && detail.metrics[0].value !== " - " ? detail.metrics[0].value : "Full case study"}</div>
                <div className="glass rounded-xl p-3"><span className="text-accent">Stack</span><br />{stack.length} mapped items</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {stack.slice(0, 4).map((t: string) => (
                  <span key={t} className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-border text-muted-foreground">{t}</span>
                ))}
              </div>
              <div className="mt-5 text-xs text-accent group-hover:translate-x-1 transition">Open full case study →</div>
              </div>
            </Link>
          </motion.div>
        );})}
      </div>
    </MotionPage>
  );
}
