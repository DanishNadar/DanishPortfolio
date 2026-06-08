import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/media")({
  component: MediaAdmin,
});

const BUCKETS = ["public-media", "project-media", "post-media", "avatar-reference-photos"];

function MediaAdmin() {
  const [bucket, setBucket] = useState(BUCKETS[0]);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  async function refresh() {
    const { data } = await supabase.storage.from(bucket).list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    const mapped = (data ?? []).filter((d) => d.name).map((d) => ({
      name: d.name,
      url: supabase.storage.from(bucket).getPublicUrl(d.name).data.publicUrl,
    }));
    setFiles(mapped);
  }
  useEffect(() => { refresh(); }, [bucket]);

  async function upload(file: File) {
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) setMsg(error.message);
    else { setMsg("Uploaded"); refresh(); }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-display font-bold">Media Library</h1>
      <div className="flex gap-2 items-center flex-wrap">
        <select value={bucket} onChange={(e) => setBucket(e.target.value)} className="bg-input/40 border border-border rounded px-2 py-1 text-sm">
          {BUCKETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <label className="bg-gradient-rb text-background px-3 py-1.5 rounded text-sm font-semibold cursor-pointer">
          Upload
          <input type="file" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
        {msg && <span className="text-xs text-accent">{msg}</span>}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {files.map((f) => (
          <a key={f.name} href={f.url} target="_blank" rel="noreferrer" className="block glass rounded-lg overflow-hidden aspect-square group">
            <img src={f.url} alt={f.name} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
          </a>
        ))}
        {files.length === 0 && <div className="col-span-full text-sm text-muted-foreground glass rounded-lg p-6 text-center">No files yet.</div>}
      </div>
    </div>
  );
}
