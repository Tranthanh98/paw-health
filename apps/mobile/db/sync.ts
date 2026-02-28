/**
 * Sync layer — WatermelonDB ↔ apps/api
 *
 * Protocol: two endpoints on the Express API
 *   GET  /api/sync/pull?lastPulledAt=<timestamp>   → SyncPullResult
 *   POST /api/sync/push                             → 204
 *
 * Trigger: call `sync()` on app foreground + after mutations.
 */
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "./index";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

export type SyncResult = { success: true } | { success: false; error: unknown };

export async function sync(userId: string): Promise<SyncResult> {
  try {
    await synchronize({
      database,

      // ── PULL ─────────────────────────────────────────────────────────────
      pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
        const params = new URLSearchParams({
          lastPulledAt: String(lastPulledAt ?? 0),
          schemaVersion: String(schemaVersion),
          migration: JSON.stringify(migration ?? null),
        });

        const res = await fetch(`${API_URL}/api/sync/pull?${params}`, {
          headers: {
            "Content-Type": "application/json",
            // Auth cookie is sent automatically by the http client;
            // or pass a token header here once JWT support is wired.
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Pull failed: ${res.status}`);

        const { changes, timestamp } = await res.json();
        return { changes, timestamp };
      },

      // ── PUSH ─────────────────────────────────────────────────────────────
      pushChanges: async ({ changes, lastPulledAt }) => {
        const res = await fetch(`${API_URL}/api/sync/push`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ changes, lastPulledAt }),
        });

        if (!res.ok) throw new Error(`Push failed: ${res.status}`);
      },

      // ── OPTIONS ──────────────────────────────────────────────────────────
      migrationsEnabledAtVersion: 1,
      sendCreatedAsUpdated: false, // set true once backend can handle upserts
    });

    return { success: true };
  } catch (error) {
    console.error("[sync] error:", error);
    return { success: false, error };
  }
}
