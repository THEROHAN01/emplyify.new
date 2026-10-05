"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckboxField, FormAlert, Honeypot, TextField } from "@/components/ui/field";
import { getAttribution } from "@/lib/analytics/attribution";
import { track } from "@/lib/analytics/events";
import { focusFirstError, submitForm } from "@/lib/forms/client";
import { fieldErrors, reportSchema } from "@/lib/leads/schema";
import { Turnstile } from "./turnstile";

export function ReportForm({ reportSlug, cta }: { reportSlug: string; cta: string }) {
  const router = useRouter();
  const [v, setV] = useState({ name: "", workEmail: "", company: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState("");
  const set = (k: keyof typeof v, value: string | boolean) => {
    setV((p) => ({ ...p, [k]: value }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...v, reportSlug, turnstileToken: token, attribution: getAttribution() };
    const check = reportSchema.safeParse(payload);
    if (!check.success) {
      const errs = fieldErrors(check.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    setBusy(true);
    const res = await submitForm<{ ref: string; release: string }>("/api/report", payload);
    setBusy(false);
    if (!res.ok) {
      setFormError(res.error);
      if (res.fieldErrors) setErrors(res.fieldErrors);
      return;
    }
    track("report_downloaded", { report_name: reportSlug });
    router.push(`/insights/${reportSlug}/thank-you`);
  };

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-4">
      {formError && <FormAlert>{formError}</FormAlert>}
      <TextField
        id="name"
        label="Name"
        autoComplete="name"
        value={v.name}
        onChange={(e) => set("name", e.target.value)}
        error={errors.name}
      />
      <TextField
        id="workEmail"
        label="Work email"
        type="email"
        autoComplete="email"
        value={v.workEmail}
        onChange={(e) => set("workEmail", e.target.value)}
        error={errors.workEmail}
      />
      <TextField
        id="company"
        label="Company"
        autoComplete="organization"
        value={v.company}
        onChange={(e) => set("company", e.target.value)}
        error={errors.company}
      />
      <CheckboxField
        id="consent"
        checked={v.consent}
        onChange={(e) => set("consent", e.target.checked)}
        error={errors.consent}
        label="Email me this report and occasional hiring insights. Unsubscribe any time."
      />
      <Honeypot value={v.website} onChange={(x) => set("website", x)} />
      <Turnstile onToken={setToken} />
      <Button type="submit" disabled={busy} className="w-full">
        {busy ? "Sending…" : cta}
      </Button>
    </form>
  );
}
