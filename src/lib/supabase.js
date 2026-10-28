import { createClient } from "@supabase/supabase-js";

const url = import.meta.env?.VITE_SUPABASE_URL;
const anonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

// Public project credentials only. Never put a service-role key in a Vite env.
const cached = import.meta.hot?.data.client;
export const supabase =
  cached && cached.url === url && cached.anonKey === anonKey
    ? cached.instance
    : url && anonKey
      ? createClient(url, anonKey, {
          auth: {
            flowType: "pkce",
            detectSessionInUrl: false,
            storageKey: "crittr-website-auth",
          },
        })
      : null;

// Keep one auth client during Vite hot updates; competing clients share locks.
if (import.meta.hot)
  import.meta.hot.data.client = { url, anonKey, instance: supabase };

export function requireAuth() {
  if (!supabase)
    throw new Error(
      "Signup is temporarily unavailable. Please try again shortly or create your account in the Crittr app.",
    );
  return supabase.auth;
}
