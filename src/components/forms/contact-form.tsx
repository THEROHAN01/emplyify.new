"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  FormAlert,
  Honeypot,
  SelectField,
  TextareaField,
  TextField,
} from "@/components/ui/field";
import { getAttribution } from "@/lib/analytics/attribution";
import { focusFirstError, submitForm } from "@/lib/forms/client";
import { contactSchema, fieldErrors } from "@/lib/leads/schema";
import { Turnstile } from "./turnstile";

const TOPICS = ["Hiring", "Candidate", "Partnership", "Press", "Data request", "Other"];

export function ContactForm({ defaultTopic = "" }: { defaultTopic?: string }) {
  const [v, setV] = useState({
    name: "",
    email: "",
    topic: defaultTopic,
    message: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
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
      topic: v.topic || undefined,
      turnstileToken: token,
      attribution: getAttribution(),
    };
    const check = contactSchema.safeParse(payload);
    if (!check.success) {
      const errs = fieldErrors(check.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    setBusy(true);
    const res = await submitForm<{ ref: string }>("/api/contact", payload);
    setBusy(false);
    if (!res.ok) {
      setFormError(res.error);
      if (res.fieldErrors) setErrors(res.fieldErrors);
      return;
    }
    setDone(res.data.ref);
  };

  if (done) {
    return (
      <div role="status" className="border-line bg-signal-bg rounded-2xl border p-6">
        <p className="text-signal font-bold">Message sent — reference {done}.</p>
        <p className="mt-2">We reply within 4 business hours (Mon–Fri, 9:30–18:30 IST).</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-4">
      {formError && <FormAlert>{formError}</FormAlert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="name"
          label="Name"
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
          value={v.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
        />
      </div>
      <SelectField
        id="topic"
        label="Topic"
        options={TOPICS}
        value={v.topic}
        onChange={(e) => set("topic", e.target.value)}
        error={errors.topic}
      />
      <TextareaField
        id="message"
        label="Message"
        value={v.message}
        onChange={(e) => set("message", e.target.value)}
        error={errors.message}
      />
      <CheckboxField
        id="consent"
        checked={v.consent}
        onChange={(e) => set("consent", e.target.checked)}
        error={errors.consent}
        label="Emplyify may reply to me by email about this message."
      />
      <Honeypot value={v.website} onChange={(x) => set("website", x)} />
      <Turnstile onToken={setToken} />
      <Button type="submit" disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
