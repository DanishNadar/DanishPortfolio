import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/contact")({ component: ContactAdmin });

interface Msg {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  created_at: string;
  status?: string | null;
}

function ContactAdmin() {
  const [rows, setRows] = useState<Msg[]>([]);
  useEffect(() => {
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows((data as Msg[]) ?? []));
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-display font-bold">Contact inbox</h1>
      <div className="space-y-2">
        {rows.length === 0 && <div className="glass rounded-xl p-6 text-center text-muted-foreground text-sm">No messages yet.</div>}
        {rows.map((m) => (
          <div key={m.id} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{m.name} <span className="text-xs text-muted-foreground">&lt;{m.email}&gt;</span></div>
              <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            {m.subject && <div className="text-sm mt-1">{m.subject}</div>}
            <div className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{m.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
