import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/postHelpers";
import { Plus, Trash2, Save, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsAdmin,
});

interface Row {
  id: string;
  slug: string;
  title: string;
  domain: string | null;
  status: string;
  featured: boolean;
  updated_at: string;
}

const EMPTY = {
  id: null as string | null,
  slug: "",
  title: "",
  subtitle: "",
  summary: "",
  long_description: "",
  role: "",
  domain: "",
  period: "",
  status: "published" as string,
  featured: false,
  priority: 0,
  tech_stack: [] as string[],
  github_url: "",
  live_demo_url: "",
  article_url: "",
  cover_image_url: "",
  problem: "",
  what_i_built: "",
  architecture: "",
  challenges: "",
  impact_takeaway: "",
};
type Editing = typeof EMPTY;

function ProjectsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function refresh() {
    const { data } = await supabase
      .from("projects")
      .select("id,slug,title,domain,status,featured,updated_at")
      .order("updated_at", { ascending: false });
    setRows((data as Row[]) ?? []);
  }
  useEffect(() => { refresh(); }, []);

  async function edit(id: string) {
    const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
    if (data) {
      const cleaned: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(data)) cleaned[k] = v ?? (EMPTY as Record<string, unknown>)[k] ?? "";
      cleaned.impact_takeaway = data.recruiter_takeaway ?? "";
      setEditing({ ...EMPTY, ...(cleaned as Partial<Editing>), tech_stack: data.tech_stack ?? [] });
    }
  }
  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    refresh();
  }
  async function save() {
    if (!editing) return;
    setMsg(null);
    const payload = { ...editing, slug: editing.slug || slugify(editing.title) };
    const { id, impact_takeaway, ...rest } = payload;
    const dbPayload = { ...rest, recruiter_takeaway: impact_takeaway };
    const res = id
      ? await supabase.from("projects").update(dbPayload).eq("id", id).select().single()
      : await supabase.from("projects").insert(dbPayload).select().single();
    if (res.error) { setMsg(res.error.message); return; }
    setMsg("Saved"); setEditing({ ...editing, id: res.data.id }); refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Projects</h1>
        <button onClick={() => setEditing({ ...EMPTY })} className="bg-gradient-rb text-background font-semibold px-3 py-1.5 rounded-lg text-sm inline-flex items-center gap-1"><Plus className="h-4 w-4" /> New</button>
      </div>

      {!editing && (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr><th className="p-3">Title</th><th>Domain</th><th>Status</th><th>Featured</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40 hover:bg-muted/20">
                  <td className="p-3 font-semibold">{r.title}</td>
                  <td className="text-xs text-muted-foreground">{r.domain}</td>
                  <td className="text-xs">{r.status}</td>
                  <td className="text-xs">{r.featured ? "★" : ""}</td>
                  <td className="text-right pr-3">
                    <button onClick={() => edit(r.id)} className="text-xs text-accent hover:underline mr-3">Edit</button>
                    <button onClick={() => remove(r.id)} className="text-xs text-destructive"><Trash2 className="h-3 w-3 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="space-y-3 max-w-3xl">
          <button onClick={() => setEditing(null)} className="text-xs text-muted-foreground hover:text-accent">← Back</button>
          {([
            ["title", "Title"], ["slug", "Slug"], ["subtitle", "Subtitle"], ["domain", "Domain"], ["role", "Role"], ["period", "Period"],
            ["github_url", "GitHub URL"], ["live_demo_url", "Live demo URL"], ["article_url", "Article URL"], ["cover_image_url", "Cover image URL"],
          ] as const).map(([k, l]) => (
            <Field key={k} label={l}><input value={editing[k] as string} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} className="input" /></Field>
          ))}
          <Field label="Tech stack (comma-separated)">
            <input value={editing.tech_stack.join(", ")} onChange={(e) => setEditing({ ...editing, tech_stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="input" />
          </Field>
          {([
            ["summary", "Summary"], ["long_description", "Long description"],
            ["problem", "Problem"], ["what_i_built", "What I built"], ["architecture", "Architecture"],
            ["challenges", "Challenges"], ["impact_takeaway", "What this demonstrates"],
          ] as const).map(([k, l]) => (
            <Field key={k} label={l}><textarea rows={3} value={editing[k] as string} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} className="input" /></Field>
          ))}
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
            <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="input w-auto">
              <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
            </select>
            <input type="number" value={editing.priority} onChange={(e) => setEditing({ ...editing, priority: Number(e.target.value) })} className="input w-24" placeholder="Priority" />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="bg-gradient-rb text-background font-semibold px-4 py-2 rounded-lg text-sm inline-flex items-center gap-1"><Save className="h-3.5 w-3.5" /> Save</button>
            {editing.id && editing.slug && <a href={`/projects/${editing.slug}`} target="_blank" rel="noreferrer" className="glass px-4 py-2 rounded-lg text-sm inline-flex items-center gap-1"><ExternalLink className="h-3.5 w-3.5" /> View</a>}
            {msg && <span className="text-xs text-accent self-center">{msg}</span>}
          </div>
        </div>
      )}

      <style>{`.input{width:100%;background:oklch(0.25 0.04 270 / 0.4);border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.875rem;color:var(--foreground);}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span><div className="mt-1">{children}</div></label>;
}
