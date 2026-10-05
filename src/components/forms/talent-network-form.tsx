"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckboxField, FormAlert, Honeypot, SelectField, TextField } from "@/components/ui/field";
import { getAttribution } from "@/lib/analytics/attribution";
import { track } from "@/lib/analytics/events";
import { focusFirstError, submitForm } from "@/lib/forms/client";
import { fieldErrors, LOCATIONS, talentNetworkSchema } from "@/lib/leads/schema";
import { Turnstile } from "./turnstile";

export function TalentNetworkForm({ families }: { families: { value: string; label: string }[] }) {
  const router = useRouter();
  const [v, setV] = useState({
    name: "",
    email: "",
    phone: "",
    roleFamily: "",
    yearsExperience: "",
    city: "",
    noticeDays: "",
    linkedin: "",
    whatsappUpdates: false,
    consent: false,
    website: "",
  });
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
    const payload = {
      ...v,
      roleFamily: v.roleFamily || undefined,
      city: v.city || undefined,
      turnstileToken: token,
      attribution: getAttribution(),
    };
    const check = talentNetworkSchema.safeParse(payload);
    if (!check.success) {
      const errs = fieldErrors(check.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    setBusy(true);
    setFormError(null);
    const res = await submitForm<{ ref: string }>("/api/talent-network", payload);
    setBusy(false);
    if (!res.ok) {
      setFormError(res.error);
      if (res.fieldErrors) setErrors(res.fieldErrors);
      return;
    }
    track("candidate_signup", { role: v.roleFamily, source: "talent_network" });
    router.push("/candidates/join/thank-you");
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="border-line bg-surface relative grid gap-5 rounded-[12px] border p-6 sm:grid-cols-2 sm:p-8"
    >
      {formError && (
        <div className="sm:col-span-2">
          <FormAlert>{formError}</FormAlert>
        </div>
      )}
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
      <SelectField
        id="roleFamily"
        label="Your field"
        options={families}
        value={v.roleFamily}
        onChange={(e) => set("roleFamily", e.target.value)}
        error={errors.roleFamily}
      />
      <TextField
        id="yearsExperience"
        label="Years of experience"
        type="number"
        inputMode="decimal"
        min={0}
        max={50}
        value={v.yearsExperience}
        onChange={(e) => set("yearsExperience", e.target.value)}
        error={errors.yearsExperience}
      />
      <SelectField
        id="city"
        label="Preferred location"
        options={LOCATIONS}
        value={v.city}
        onChange={(e) => set("city", e.target.value)}
        error={errors.city}
      />
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
        hint="Enter 0 if you can join immediately."
      />
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
      />
      <TextField
        id="phone"
        label="Mobile (for WhatsApp updates)"
        type="tel"
        optional
        autoComplete="tel"
        value={v.phone}
        onChange={(e) => set("phone", e.target.value)}
        error={errors.phone}
      />
      <CheckboxField
        id="whatsappUpdates"
        className="sm:col-span-2"
        checked={v.whatsappUpdates}
        onChange={(e) => set("whatsappUpdates", e.target.checked)}
        label="Send me application updates on WhatsApp as well as email."
      />
      <CheckboxField
        id="consent"
        className="sm:col-span-2"
        checked={v.consent}
        onChange={(e) => set("consent", e.target.checked)}
        error={errors.consent}
        label={
          <>
            I agree Emplyify may store my profile, use AI to match me with roles, and contact me
            about them. Emplyify will ask me before sharing my profile with any employer.{" "}
            <a href="/legal/candidate-consent" target="_blank" className="text-accent underline">
              Read the consent terms
            </a>
            .
          </>
        }
      />
      <Honeypot value={v.website} onChange={(x) => set("website", x)} />
      <div className="sm:col-span-2">
        <Turnstile onToken={setToken} />
        <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
          {busy ? "Joining…" : "Join the talent network"}
        </Button>
      </div>
    </form>
  );
}
