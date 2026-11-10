// Remote (Supabase) reads for public pages.
// - The Supabase SDK (~100 KB gzipped) is imported on demand, so it is not part
//   of the initial bundle that every page downloads.
// - Reads are capped by a timeout: a slow or unreachable database falls back to
//   the bundled seed data instead of holding a page render.
type RemoteResult<T> = { data: T | null; error: unknown };

type SupabaseClient = (typeof import("@/integrations/supabase/client"))["supabase"];

const REMOTE_TIMEOUT_MS = 1500;

export async function readRemote<T>(
  query: (client: SupabaseClient) => PromiseLike<RemoteResult<unknown>>,
): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<null>((resolve) => {
      timer = setTimeout(() => resolve(null), REMOTE_TIMEOUT_MS);
    });
    const request = (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await query(supabase);
      if (error) return null;
      return (data ?? null) as T | null;
    })();
    return await Promise.race([request, timeout]);
  } catch {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
