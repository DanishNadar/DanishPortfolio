import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AdminState {
  loading: boolean;
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
}

export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>({ loading: true, userId: null, email: null, isAdmin: false });

  useEffect(() => {
    let mounted = true;

    async function check(userId: string | null, email: string | null) {
      if (!userId) {
        if (mounted) setState({ loading: false, userId: null, email: null, isAdmin: false });
        return;
      }
      try {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
        const isAdmin = (data ?? []).some((r) => r.role === "admin");
        if (mounted) setState({ loading: false, userId, email, isAdmin });
      } catch {
        if (mounted) setState({ loading: false, userId, email, isAdmin: false });
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      check(session?.user?.id ?? null, session?.user?.email ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user?.id ?? null, session?.user?.email ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
