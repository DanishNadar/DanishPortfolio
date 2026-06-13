import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, CircuitBoard, Code2 } from "lucide-react";
import { projectsQuery } from "@/lib/queries";
import { getProjectPage } from "@/content/projectPages";
import { MotionPage } from "@/components/MotionPage";
import { ImmersiveImage } from "@/components/ImmersiveImage";
import { projectCoverPath } from "@/lib/visuals";
import { rankProjectsForAiEngineering } from "@/lib/projectRanking";

export const Route = createFileRoute("/projects")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  head: () => ({
    meta: [
      { title: "Purposeful Project Chapters - Danish Nadar" },
      {
        name: "description",
        content:
          "Robotics, autonomy, applied AI, accessibility, security, and product case studies connected by rebuilding, learning, and purposeful engineering.",
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
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const domainParam = new URLSearchParams(searchStr).get("domain") ?? "All";
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const rankedProjects = rankProjectsForAiEngineering(projects);
  const domainOrder = ["Robotics", "Applied AI", "Product", "FinTech", "Cybersecurity"];
  const rawDomains = Array.from(
    new Set(rankedProjects.map((p) => p.domain).filter(Boolean) as string[]),
  );
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
  const [filter, setFilter] = useState(() => domainParam || "All");
  const visible =
    filter === "All" ? rankedProjects : rankedProjects.filter((p) => p.domain === filter);

  return (
    <MotionPage
      mood="projects"
      className="projects-page mx-auto max-w-[100rem] px-6 lg:px-12 py-16"
    >
      <section className="section-atmosphere section-atmosphere-technical rounded-[2rem] p-6 md:p-9">
        <div className="flex flex-wrap items-center gap-3 text-accent">
          {[BrainCircuit, CircuitBoard, Code2].map((Icon, index) => (
            <span key={index} className="icon-well icon-well-technical">
              <Icon className="h-5 w-5" />
            </span>
          ))}
          <span className="tech-label text-[10px]">Applied engineering archive</span>
        </div>
        <h1 className="mt-5 text-4xl md:text-5xl font-display font-bold animated-title-glow">
          Project Chapters With Purpose
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {projects.length} case studies ranked for a fast employer scan: award-winning robotics,
          real vehicle autonomy, applied ML research, AI products, and production automation first.
        </p>
      </section>

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
        {visible.map((p, i) => {
          const detail = getProjectPage(p.slug);
          const stack = detail?.stackMap?.map((s) => s.name) ?? p.tech_stack ?? [];
          const visual = detail?.gallery?.[0]?.src ?? projectCoverPath(p.cover_image);
          return (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block glass premium-border ambient-card rounded-[1.85rem] p-0 h-full min-h-[25rem] hover:glow-blue transition hover:-translate-y-1 overflow-hidden"
              >
                <ImmersiveImage
                  src={visual}
                  alt={`${detail?.title ?? p.title} visual`}
                  aspect="aspect-video"
                  animated={i < 6}
                  variant="card"
                  className="rounded-none"
                />
                <div className="p-8 md:p-9">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-rb text-background font-semibold">
                      {detail?.pageTheme.eyebrow ?? p.domain}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {stack.length} skills grounded
                    </span>
                  </div>
                  <h3 className="portfolio-title-font project-title-font text-lg font-semibold">
                    {detail?.title ?? p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {detail?.heroStatement ?? p.summary}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
                    <div className="glass rounded-xl p-3">
                      <span className="text-accent">{detail?.metrics?.[0]?.label ?? "Metric"}</span>
                      <br />
                      {detail?.metrics?.[0]?.value && detail.metrics[0].value !== "—"
                        ? detail.metrics[0].value
                        : "Full case study"}
                    </div>
                    <div className="glass rounded-xl p-3">
                      <span className="text-accent">Stack</span>
                      <br />
                      {stack.length} connected tools
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
                    Open the chapter →
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </MotionPage>
  );
}
