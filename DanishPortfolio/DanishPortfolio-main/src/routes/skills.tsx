import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { skillsQuery } from "@/lib/queries";

export const Route = createFileRoute("/skills")({
  loader: ({ context }) => context.queryClient.ensureQueryData(skillsQuery),
  head: () => ({ meta: [{ title: "Skills — Danish Nadar" }] }),
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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold">Skills &amp; <span className="text-gradient-rb">Tech Stack</span></h1>
      <p className="mt-3 text-muted-foreground">The toolkit behind the projects.</p>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-accent mb-4">{cat}</div>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s.id} className="text-sm px-3 py-1.5 rounded-lg border border-border bg-muted/20" title={`Level ${s.level}/5`}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
