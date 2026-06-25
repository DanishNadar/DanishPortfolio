import { Link, useNavigate, Outlet } from "@tanstack/react-router";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, FileText, FolderKanban, Image, Mail, Bot, Database, Plug, Settings, LogOut } from "lucide-react";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/media", label: "Media", icon: Image },
  { to: "/admin/contact", label: "Contact", icon: Mail },
  { to: "/admin/avatar", label: "Avatar Studio", icon: Bot, disabled: true },
  { to: "/admin/knowledge", label: "Knowledge", icon: Database, disabled: true },
  { to: "/admin/integrations", label: "Integrations", icon: Plug },
  { to: "/admin/settings", label: "Settings", icon: Settings, disabled: true },
];

export function AdminShell() {
  const admin = useAdmin();
  const navigate = useNavigate();

  if (admin.loading) return <div className="min-h-[60vh] grid place-items-center text-muted-foreground">Checking access…</div>;

  if (!admin.userId) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-display">Admin only</h1>
          <p className="text-muted-foreground mt-2">You must sign in to access the dashboard.</p>
          <Link to="/admin/login" className="mt-4 inline-block bg-gradient-rb text-background font-semibold px-4 py-2 rounded-lg">Sign in</Link>
        </div>
      </div>
    );
  }

  if (!admin.isAdmin) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-display">Not authorized</h1>
          <p className="text-muted-foreground mt-2">Your account is signed in but does not have the admin role.</p>
          <p className="text-xs text-muted-foreground mt-1">{admin.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-[220px_1fr] gap-8">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="glass rounded-2xl p-3 space-y-1">
          {navItems.map((n) => {
            const Icon = n.icon;
            return n.disabled ? (
              <div key={n.to} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed" title="Phase 2">
                <Icon className="h-4 w-4" /> {n.label}
                <span className="ml-auto text-[9px] uppercase">soon</span>
              </div>
            ) : (
              <Link key={n.to} to={n.to} className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted/30" activeProps={{ className: "bg-gradient-rb text-background font-semibold" }} activeOptions={{ exact: n.exact ?? false }}>
                <Icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
          <button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
        <div className="mt-3 px-3 text-[10px] text-muted-foreground">{admin.email}</div>
      </aside>
      <main><Outlet /></main>
    </div>
  );
}
