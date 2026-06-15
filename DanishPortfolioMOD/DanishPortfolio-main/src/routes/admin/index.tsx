import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { allIntegrations } from "@/lib/integrations";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

interface Stats {
  projects: number;
  posts: number;
  drafts: number;
  featured: number;
  contact: number;
}

function Overview() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      const [p, pubPosts, drafts, feat, contact] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("featured", true),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        projects: p.count ?? 0,
        posts: pubPosts.count ?? 0,
        drafts: drafts.count ?? 0,
        featured: feat.count ?? 0,
        contact: contact.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Projects", v: stats?.projects ?? "—" },
    { label: "Published posts", v: stats?.posts ?? "—" },
    { label: "Draft posts", v: stats?.drafts ?? "—" },
    { label: "Featured projects", v: stats?.featured ?? "—" },
    { label: "Contact messages", v: stats?.contact ?? "—" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Welcome back. Quick stats and integration status.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-xl p-4">
            <div className="text-2xl font-display font-bold text-gradient-rb">{c.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/admin/posts" className="bg-gradient-rb text-background font-semibold px-4 py-2 rounded-lg text-sm">+ New post</Link>
        <Link to="/admin/projects" className="glass px-4 py-2 rounded-lg text-sm font-semibold">+ New project</Link>
      </div>

      <div>
        <h2 className="text-lg font-display font-semibold mb-3">Integrations</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {allIntegrations.map((i) => {
            const s = i.describe();
            return (
              <div key={s.provider} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm">{s.displayName}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.enabled ? "bg-accent text-background" : "bg-muted text-muted-foreground"}`}>
                    {s.enabled ? "configured" : "not configured"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.purpose}</div>
                <div className="text-[10px] text-muted-foreground mt-2">Env: {s.requiredEnv.join(", ")}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
