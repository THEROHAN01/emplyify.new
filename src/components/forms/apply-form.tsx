"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckboxField, FieldShell, FormAlert, Honeypot, TextField } from "@/components/ui/field";
import { getAttribution } from "@/lib/analytics/attribution";
import { track } from "@/lib/analytics/events";
import { focusFirstError, submitForm } from "@/lib/forms/client";
import { cn } from "@/lib/utils/cn";
import { Turnstile } from "./turnstile";

const MAX = 5 * 1024 * 1024;

/** One-step apply: CV (from phone storage / Drive via the OS picker) or LinkedIn. */
export function ApplyForm({
  jobSlug,
  jobTitle,
  roleFamily,
}: {
  jobSlug: string;
  jobTitle: string;
  roleFamily: string;
}) {
  const router = useRouter();
  const [v, setV] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    noticeDays: "",
    expectedCtcLpa: "",
    consent: false,
    website: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState("");

  const set = (k: keyof typeof v, value: string | boolean) => {
    setV((p) => ({ ...p, [k]: value }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!v.name.trim()) errs.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email))
      errs.email = "Enter a valid email address, e.g. name@example.com.";
    if (!/^\+?[0-9 ()-]{8,18}$/.test(v.phone.trim()))
      errs.phone = "Enter a phone number with country code, e.g. +91 98765 43210.";
    if (v.noticeDays === "") errs.noticeDays = "Enter your notice period in days.";
    if (!v.expectedCtcLpa) errs.expectedCtcLpa = "Enter your expected CTC in ₹ LPA.";
    if (!file && !v.linkedin) errs.cv = "Upload your CV or add your LinkedIn URL — one is enough.";
    if (file && file.size > MAX) errs.cv = "Your CV must be under 5 MB. Try exporting it as a PDF.";
    if (!v.consent) errs.consent = "Tick the box to agree to how we use your data.";
    return errs;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    const fd = new FormData();
    Object.entries({
      ...v,
      consent: v.consent ? "true" : "",
      jobSlug,
      turnstileToken: token,
      attribution: JSON.stringify(getAttribution()),
    }).forEach(([k, val]) => fd.set(k, String(val)));
    if (file) fd.set("cv", file);
    setBusy(true);
    setFormError(null);
    const res = await submitForm<{ ref: string }>("/api/apply", fd);
    setBusy(false);
    if (!res.ok) {
      setFormError(res.error);
      if (res.fieldErrors) setErrors(res.fieldErrors);
      return;
    }
    track("job_apply", { role: roleFamily, source: "job_page" });
    router.push(`/jobs/${jobSlug}/applied?ref=${encodeURIComponent(res.data.ref)}`);
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative grid gap-5"
      aria-label={`Apply for ${jobTitle}`}
    >
      {formError && <FormAlert>{formError}</FormAlert>}
      <TextField
        id="name"
        label="Full name"
        autoComplete="name"
        value={v.name}
        onChange={(e) => set("name", e.target.value)}
        error={errors.name}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={v.email}
        onChange={(e) => set("email", e.target.value)}
        error={errors.email}
      />
      <TextField
        id="phone"
        label="Phone"
        type="tel"
        autoComplete="tel"
        value={v.phone}
        onChange={(e) => set("phone", e.target.value)}
        error={errors.phone}
        hint="We never call without a booked slot."
      />

      <FieldShell
        id="cv"
        label="CV"
        hint="PDF or Word, up to 5 MB. Works from phone storage or Google Drive."
        error={errors.cv}
        optional={Boolean(v.linkedin)}
      >
        <label
          htmlFor="cv"
          className={cn(
            "hover:border-accent mt-1.5 flex min-h-16 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed px-4 py-4 text-center text-sm",
            errors.cv ? "border-red-600" : "border-line",
          )}
        >
          {file ? (
            <span>
              <strong>{file.name}</strong> · {(file.size / 1024 / 1024).toFixed(1)} MB — tap to
              change
            </span>
          ) : (
            <span>
              <strong className="text-accent">Choose a file</strong> or drop it here
            </span>
          )}
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-describedby={errors.cv ? "cv-error" : "cv-hint"}
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setErrors((x) => ({ ...x, cv: "" }));
          }}
        />
      </FieldShell>
      <TextField
        id="linkedin"
        label="LinkedIn URL"
        type="url"
        optional
        inputMode="url"
        placeholder="https://www.linkedin.com/in/…"
        value={v.linkedin}
        onChange={(e) => set("linkedin", e.target.value)}
        error={errors.linkedin}
        hint="Instead of, or as well as, a CV."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="noticeDays"
          label="Notice period (days)"
          type="number"
          inputMode="numeric"
          min={0}
          max={180}
          value={v.noticeDays}
          onChange={(e) => set("noticeDays", e.target.value)}
          error={errors.noticeDays}
        />
        <TextField
          id="expectedCtcLpa"
          label="Expected CTC (₹ LPA)"
          type="number"
          inputMode="decimal"
          min={1}
          value={v.expectedCtcLpa}
          onChange={(e) => set("expectedCtcLpa", e.target.value)}
          error={errors.expectedCtcLpa}
        />
      </div>
      <CheckboxField
        id="consent"
        checked={v.consent}
        onChange={(e) => set("consent", e.target.checked)}
        error={errors.consent}
        label={
          <>
            I agree Emplyify may store my CV and details and use AI to assess my fit for this role.
            Emplyify will ask me again before sharing my profile with the employer.{" "}
            <a href="/legal/candidate-consent" target="_blank" className="text-accent underline">
              Consent terms
            </a>
          </>
        }
      />
      <Honeypot value={v.website} onChange={(x) => set("website", x)} />
      <Turnstile onToken={setToken} />
      <Button type="submit" size="lg" disabled={busy} className="w-full">
        {busy ? "Sending…" : "Apply for this role"}
      </Button>
    </form>
  );
}
