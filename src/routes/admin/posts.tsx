import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Markdown } from "@/components/Markdown";
import {
  POST_TYPES,
  slugify,
  generateTitle,
  generateSummary,
  generateWhyThisMatters,
  generateSkillsShown,
} from "@/lib/postHelpers";
import { Plus, Trash2, Eye, Save, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin/posts")({
  component: PostsAdmin,
});

interface Row {
  id: string;
  slug: string;
  title: string;
  post_type: string;
  status: string;
  featured: boolean;
  published_at: string | null;
  updated_at: string;
}

const EMPTY = {
  id: null as string | null,
  slug: "",
  title: "",
  subtitle: "",
  post_type: "linkedin_post",
  source_url: "",
  original_text: "",
  body_markdown: "",
  generated_summary: "",
  why_this_matters: "",
  skills_shown: [] as string[],
  tags: [] as string[],
  cover_image_url: "",
  image_urls: [] as string[],
  featured: false,
  status: "draft" as "draft" | "published" | "archived",
};

type Editing = typeof EMPTY;

function PostsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function refresh() {
    const { data } = await supabase
      .from("posts")
      .select("id,slug,title,post_type,status,featured,published_at,updated_at")
      .order("updated_at", { ascending: false });
    setRows((data as Row[]) ?? []);
  }

  useEffect(() => {
    refresh();
  }, []);

  function startNew() {
    setEditing({ ...EMPTY });
    setPreview(false);
  }

  async function edit(id: string) {
    const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
    if (data) {
      setEditing({
        id: data.id,
        slug: data.slug ?? "",
        title: data.title ?? "",
        subtitle: data.subtitle ?? "",
        post_type: data.post_type ?? "linkedin_post",
        source_url: data.source_url ?? "",
        original_text: data.original_text ?? "",
        body_markdown: data.body_markdown ?? "",
        generated_summary: data.generated_summary ?? "",
        why_this_matters: data.why_this_matters ?? "",
        skills_shown: data.skills_shown ?? [],
        tags: data.tags ?? [],
        cover_image_url: data.cover_image_url ?? "",
        image_urls: data.image_urls ?? [],
        featured: !!data.featured,
        status: (data.status ?? "draft") as Editing["status"],
      });
      setPreview(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    if (editing?.id === id) setEditing(null);
    refresh();
  }

  function autoFill() {
    if (!editing) return;
    const src = editing.original_text || editing.body_markdown;
    setEditing({
      ...editing,
      title: editing.title || generateTitle(src),
      slug: editing.slug || slugify(generateTitle(src)),
      generated_summary: editing.generated_summary || generateSummary(src),
      why_this_matters: editing.why_this_matters || generateWhyThisMatters(src),
      skills_shown: editing.skills_shown.length ? editing.skills_shown : generateSkillsShown(src),
      body_markdown: editing.body_markdown || src,
    });
  }

  async function save(publish: boolean) {
    if (!editing) return;
    setSaving(true);
    setMsg(null);
    try {
      const payload = {
        slug: editing.slug || slugify(editing.title),
        title: editing.title,
        subtitle: editing.subtitle || null,
        post_type: editing.post_type,
        source_url: editing.source_url || null,
        source_type: "manual",
        original_text: editing.original_text || null,
        body_markdown: editing.body_markdown || null,
        generated_summary: editing.generated_summary || null,
        why_this_matters: editing.why_this_matters || null,
        skills_shown: editing.skills_shown,
        tags: editing.tags,
        cover_image_url: editing.cover_image_url || null,
        image_urls: editing.image_urls,
        featured: editing.featured,
        status: publish ? "published" : editing.status,
        published_at:
          publish && !editing.id ? new Date().toISOString() : undefined,
      };
      let res;
      if (editing.id) {
        res = await supabase.from("posts").update(payload).eq("id", editing.id).select().single();
      } else {
        res = await supabase.from("posts").insert(payload).select().single();
      }
      if (res.error) throw res.error;
      setMsg(publish ? "Published" : "Saved");
      setEditing({ ...editing, id: res.data.id, status: payload.status as Editing["status"] });
      refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file: File, target: "cover" | "gallery") {
    if (!editing) return;
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from("post-media").upload(path, file);
    if (error) {
      setMsg(error.message);
      return;
    }
    const { data } = supabase.storage.from("post-media").getPublicUrl(path);
    if (target === "cover") setEditing({ ...editing, cover_image_url: data.publicUrl });
    else setEditing({ ...editing, image_urls: [...editing.image_urls, data.publicUrl] });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Posts</h1>
        <button onClick={startNew} className="bg-gradient-rb text-background font-semibold px-3 py-1.5 rounded-lg text-sm inline-flex items-center gap-1">
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      {!editing && (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground uppercase">
              <tr><th className="p-3">Title</th><th>Type</th><th>Status</th><th>Updated</th><th></th></tr>
            </thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No posts yet. Click &lsquo;New post&rsquo; to get started.</td></tr>}
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40 hover:bg-muted/20">
                  <td className="p-3 font-semibold">{r.title}</td>
                  <td className="text-xs text-muted-foreground">{r.post_type.replace(/_/g, " ")}</td>
                  <td><span className={`text-[10px] px-2 py-0.5 rounded-full ${r.status === "published" ? "bg-accent text-background" : "bg-muted"}`}>{r.status}</span></td>
                  <td className="text-xs text-muted-foreground">{new Date(r.updated_at).toLocaleDateString()}</td>
                  <td className="text-right pr-3">
                    <button onClick={() => edit(r.id)} className="text-xs text-accent hover:underline mr-3">Edit</button>
                    <button onClick={() => remove(r.id)} className="text-xs text-destructive hover:underline"><Trash2 className="h-3 w-3 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-semibold">{editing.id ? "Edit post" : "New post"}</h2>
              <button onClick={() => setEditing(null)} className="text-xs text-muted-foreground hover:text-accent">← Back to list</button>
            </div>

            <Field label="Post type">
              <select value={editing.post_type} onChange={(e) => setEditing({ ...editing, post_type: e.target.value })} className="input">
                {POST_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>

            <Field label="Original LinkedIn / source text (paste here, then click Auto-fill)">
              <textarea rows={5} value={editing.original_text} onChange={(e) => setEditing({ ...editing, original_text: e.target.value })} className="input font-mono text-xs" />
            </Field>

            <div className="flex gap-2">
              <button onClick={autoFill} className="glass px-3 py-1.5 rounded-lg text-xs font-semibold">Auto-fill title, slug, summary, etc.</button>
            </div>

            <Field label="Source URL (LinkedIn link, optional)">
              <input type="url" value={editing.source_url} onChange={(e) => setEditing({ ...editing, source_url: e.target.value })} className="input" />
            </Field>

            <Field label="Title">
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" />
            </Field>

            <Field label="Slug">
              <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="input" placeholder="auto-from-title" />
            </Field>

            <Field label="Subtitle (optional)">
              <input value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="input" />
            </Field>

            <Field label="Summary">
              <textarea rows={2} value={editing.generated_summary} onChange={(e) => setEditing({ ...editing, generated_summary: e.target.value })} className="input" />
            </Field>

            <Field label="Why this matters">
              <textarea rows={2} value={editing.why_this_matters} onChange={(e) => setEditing({ ...editing, why_this_matters: e.target.value })} className="input" />
            </Field>

            <Field label="Body (markdown supported)">
              <textarea rows={10} value={editing.body_markdown} onChange={(e) => setEditing({ ...editing, body_markdown: e.target.value })} className="input font-mono text-xs" />
            </Field>

            <Field label="Skills shown (comma separated)">
              <input value={editing.skills_shown.join(", ")} onChange={(e) => setEditing({ ...editing, skills_shown: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="input" />
            </Field>

            <Field label="Tags (comma separated)">
              <input value={editing.tags.join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="input" />
            </Field>

            <Field label="Cover image">
              <div className="flex items-center gap-2">
                <input value={editing.cover_image_url} onChange={(e) => setEditing({ ...editing, cover_image_url: e.target.value })} className="input flex-1" placeholder="https://… or upload" />
                <label className="glass px-2 py-1 rounded text-xs cursor-pointer">
                  Upload
                  <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "cover")} />
                </label>
              </div>
            </Field>

            <Field label="Gallery images">
              <div className="flex flex-wrap gap-2">
                {editing.image_urls.map((u, i) => (
                  <div key={u + i} className="relative h-16 w-16">
                    <img src={u} alt="" className="h-full w-full object-cover rounded" />
                    <button onClick={() => setEditing({ ...editing, image_urls: editing.image_urls.filter((_, j) => j !== i) })} className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-background rounded-full text-[10px]">� - </button>
                  </div>
                ))}
                <label className="glass h-16 w-16 grid place-items-center rounded cursor-pointer text-xs text-muted-foreground">
                  +
                  <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "gallery")} />
                </label>
              </div>
            </Field>

            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Editing["status"] })} className="input w-auto">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button onClick={() => save(false)} disabled={saving} className="glass px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1"><Save className="h-3.5 w-3.5" /> Save draft</button>
              <button onClick={() => save(true)} disabled={saving} className="bg-gradient-rb text-background px-4 py-2 rounded-lg text-sm font-semibold">Publish</button>
              <button onClick={() => setPreview(!preview)} className="glass px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {preview ? "Hide preview" : "Preview"}</button>
              {editing.id && editing.slug && (
                <a href={`/posts/${editing.slug}`} target="_blank" rel="noreferrer" className="glass px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1"><ExternalLink className="h-3.5 w-3.5" /> Open live</a>
              )}
              {msg && <span className="text-xs text-accent self-center">{msg}</span>}
            </div>
          </div>

          {preview && (
            <div className="glass rounded-2xl p-6 overflow-auto max-h-[80vh] sticky top-20 self-start">
              <div className="text-[10px] uppercase tracking-widest text-accent">Preview</div>
              <h1 className="text-2xl font-display font-bold mt-2">{editing.title || "Untitled"}</h1>
              {editing.generated_summary && <p className="text-muted-foreground text-sm mt-2">{editing.generated_summary}</p>}
              {editing.cover_image_url && <img src={editing.cover_image_url} className="mt-4 rounded-lg w-full" alt="" />}
              {editing.body_markdown && <div className="mt-4 text-sm"><Markdown>{editing.body_markdown}</Markdown></div>}
              {editing.why_this_matters && (
                <div className="mt-4 glass rounded-lg p-3"><div className="text-[10px] uppercase text-accent">Why this matters</div><p className="text-sm mt-1">{editing.why_this_matters}</p></div>
              )}
            </div>
          )}
        </div>
      )}

      <style>{`.input{width:100%;background:oklch(0.25 0.04 270 / 0.4);border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.875rem;color:var(--foreground);}.input:focus{outline:none;box-shadow:0 0 0 2px var(--ring)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
