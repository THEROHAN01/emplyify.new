"use client";

export type SubmitResult<T> =
  { ok: true; data: T } | { ok: false; error: string; fieldErrors?: Record<string, string> };

/** POST JSON (or FormData) to an API route and normalise the response shape. */
export async function submitForm<T>(url: string, body: unknown): Promise<SubmitResult<T>> {
  try {
    const isForm = body instanceof FormData;
    const res = await fetch(url, {
      method: "POST",
      headers: isForm ? undefined : { "content-type": "application/json" },
      body: isForm ? body : JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      fieldErrors?: Record<string, string>;
    } & T;
    if (!res.ok || json.ok === false) {
      return {
        ok: false,
        error: json.error ?? "Something went wrong. Try again, or email hello@emplyify.com.",
        fieldErrors: json.fieldErrors,
      };
    }
    return { ok: true, data: json };
  } catch {
    return { ok: false, error: "You seem to be offline. Check your connection and try again." };
  }
}

/** Move focus to the first invalid field so keyboard and screen-reader users land on the fix. */
export function focusFirstError(errors: Record<string, string>) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  requestAnimationFrame(() => document.getElementById(first)?.focus());
}
