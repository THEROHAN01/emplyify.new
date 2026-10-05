import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import { log, skipped, type IntegrationResult } from "./logger";

let client: SupabaseClient | null = null;

/** Service-role client: server only, bypasses RLS — every call is audited. */
export function getSupabase(): SupabaseClient | null {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) return null;
  client ??= createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export async function insertRow(
  table: string,
  row: Record<string, unknown>,
): Promise<IntegrationResult & { id?: string }> {
  const db = getSupabase();
  if (!db) return skipped("supabase");
  const { data, error } = await db.from(table).insert(row).select("id").single();
  if (error) {
    log("error", "supabase.insert_failed", { table, code: error.code, message: error.message });
    return { integration: "supabase", ok: false, detail: error.code };
  }
  return { integration: "supabase", ok: true, id: (data as { id: string }).id };
}

export async function audit(action: string, subject: string, meta: Record<string, unknown> = {}) {
  const db = getSupabase();
  if (!db) return;
  const { error } = await db.from("audit_log").insert({ action, subject, meta });
  if (error) log("warn", "supabase.audit_failed", { action, code: error.code });
}

/** Upload a CV into the private bucket. Returns the storage path (never a public URL). */
export async function uploadCv(
  path: string,
  file: ArrayBuffer,
  contentType: string,
): Promise<IntegrationResult & { path?: string }> {
  const db = getSupabase();
  if (!db) return skipped("storage");
  const { error } = await db.storage
    .from(env.cvBucket)
    .upload(path, file, { contentType, upsert: false });
  if (error) {
    log("error", "supabase.cv_upload_failed", { message: error.message });
    return { integration: "storage", ok: false, detail: "upload" };
  }
  return { integration: "storage", ok: true, path };
}

/** Short-lived signed URL for recruiters (default 10 minutes). */
export async function signedCvUrl(path: string, expiresInSeconds = 600): Promise<string | null> {
  const db = getSupabase();
  if (!db) return null;
  const { data, error } = await db.storage
    .from(env.cvBucket)
    .createSignedUrl(path, expiresInSeconds);
  return error ? null : data.signedUrl;
}
