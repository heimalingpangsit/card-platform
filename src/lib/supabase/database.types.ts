/**
 * File ini SEHARUSNYA di-generate otomatis, bukan ditulis manual, dengan:
 *
 *   npx supabase gen types typescript --project-id <project-id> > src/lib/supabase/database.types.ts
 *
 * Jalankan ulang perintah di atas setiap kali skema database berubah
 * (setelah migration baru diterapkan). Versi di bawah ini adalah
 * placeholder minimal untuk tabel yang sudah ada di migration 0001,
 * agar TypeScript tidak error sebelum Anda generate versi asli.
 */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          bio: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          avatar_frame_id: string | null;
          avatar_decoration_id: string | null;
          coin: number;
          exp: number;
          level: number;
          mmr: number;
          rank_tier:
            | "rookie"
            | "bronze"
            | "silver"
            | "gold"
            | "platinum"
            | "diamond"
            | "master"
            | "grandmaster"
            | "legend";
          role: "owner" | "admin" | "player";
          verified_badge: boolean;
          is_banned: boolean;
          ban_reason: string | null;
          is_suspended: boolean;
          suspend_reason: string | null;
          suspend_started_at: string | null;
          suspend_ends_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
          username: string;
          display_name: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      player_statistics: {
        Row: {
          profile_id: string;
          total_matches: number;
          total_wins: number;
          total_losses: number;
          win_streak: number;
          best_win_streak: number;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["player_statistics"]["Row"]> & {
          profile_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["player_statistics"]["Row"]>;
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          target_type: string;
          target_id: string | null;
          metadata: Record<string, unknown>;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["audit_logs"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Row"]>;
      };
    };
  };
};
