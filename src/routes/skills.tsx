import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { CSSProperties } from "react";
import { skillsQuery } from "@/lib/queries";
import { CapabilityNetwork } from "@/lab/CapabilityNetwork";
import { SectionHeading } from "@/lab/LabViz";
import { capabilities, projectById } from "@/lab/data";

export const Route = createFileRoute("/skills")({
  loader: ({ context }) => context.queryClient.ensureQueryData(skillsQuery),
  head: () => ({
    meta: [
      { title: "Capabilities  -  Danish Nadar" },
      {
        name: "description",
        content:
          "AI, computer vision, autonomy, research, software and cloud skills, each linked to the project that proves it.",
      },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const { data: skills } = useSuspenseQuery(skillsQuery);
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const k = s.category ?? "Other";
    (acc[k] ||= []).push(s);
    return acc;
  }, {});
  return (
    <div className="lab-surface mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
      <div className="lab-kicker" style={{ "--lab-accent": "var(--lab-ice)" } as CSSProperties}>
        Intelligent Systems Lab / capabilities
      </div>
      <h1 className="lab-heading mt-4 text-4xl sm:text-5xl md:text-6xl">
        Capabilities, with <em>proof of work</em>
      </h1>
      <p className="lab-body mt-4 max-w-3xl text-base md:text-lg">
        Six disciplines, and the projects where each skill was actually used. There are no
        self-assigned ratings here: follow a skill to its evidence and judge the work directly.
      </p>

      <div className="mt-10">
        <CapabilityNetwork />
      </div>

      <section className="lab-section" aria-labelledby="matrix-heading">
        <SectionHeading
          id="matrix-heading"
          kicker="Capability matrix"
          accent="var(--lab-blue)"
          title={<>Every discipline at a glance</>}
          lede="The same evidence as the network above, laid out in full."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((c) => (
            <article
              key={c.id}
              className="lab-card p-5"
              style={{ "--lab-accent": c.color } as CSSProperties}
            >
              <h3
                className="text-lg font-bold text-[var(--lab-white)]"
                style={{ fontFamily: "var(--lab-font-display)" }}
              >
                {c.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-[var(--lab-steel)]">{c.blurb}</p>
              <ul className="mt-4 grid gap-2.5">
                {c.items.map((item) => (
                  <li key={item.skill}>
                    <div className="text-sm font-semibold text-[var(--lab-white)]">
                      {item.skill}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {item.evidence.map((id) => {
                        const p = projectById[id];
                        return (
                          <Link
                            key={id}
                            to="/projects/$slug"
                            params={{ slug: p.caseSlug! }}
                            className="lab-proof-chip"
                          >
                            {p.name}
                          </Link>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {Object.keys(grouped).length > 0 && (
        <section aria-labelledby="toolkit-heading" className="pb-6">
          <SectionHeading
            id="toolkit-heading"
            kicker="Toolkit"
            accent="var(--lab-steel)"
            title={<>Tools I work with</>}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="lab-card p-5">
                <div className="lab-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--lab-blue)]">
                  {cat}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s.id}
                      className="lab-chip"
                      style={{
                        textTransform: "none",
                        letterSpacing: "0.02em",
                        fontSize: "0.78rem",
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
