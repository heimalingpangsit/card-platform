import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Supabase client untuk dipakai di Server Components, Server Actions,
 * dan Route Handlers. Menggunakan anon key + RLS — mewarisi identitas
 * user dari cookie session, BUKAN service role.
 *
 * Edge Runtime compatible: hanya pakai `cookies()` dari next/headers,
 * tidak ada dependency Node native.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll dipanggil dari Server Component (bukan Server Action/Route
            // Handler) akan throw — aman diabaikan karena middleware yang
            // menangani refresh session di jalur tersebut.
          }
        },
      },
    }
  );
}

/**
 * Client dengan Service Role — HANYA untuk RPC/operasi administratif
 * yang sengaja melewati RLS (mis. proses redeem code, reward match).
 * Tidak pernah dipanggil dari kode yang bisa diakses langsung oleh client.
 */
export async function createServiceRoleClient() {
  const { createClient: createSupabaseClient } = await import("@supabase/supabase-js");
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
