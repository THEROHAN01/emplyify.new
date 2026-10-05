"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { track } from "@/lib/analytics/events";
import { focusFirstError, submitForm } from "@/lib/forms/client";
import { isFreeEmail } from "@/lib/leads/free-email";
import {
  briefDetailsStep,
  briefRoleStep,
  briefYouStep,
  COMPANY_TYPES,
  CONTACT_PREFS,
  fieldErrors,
  LOCATIONS,
  WORK_MODES,
  type ROLE_FAMILIES,
  type SENIORITIES,
} from "@/lib/leads/schema";
import { cn } from "@/lib/utils/cn";
import { SkillsInput } from "./skills-input";
import { Turnstile } from "./turnstile";

type Family = (typeof ROLE_FAMILIES)[number];
type Seniority = (typeof SENIORITIES)[number];

export interface BriefFormProps {
  families: { value: Family; label: string }[];
  skillSuggestions: Record<Family, string[]>;
  defaults?: Partial<{
    roleTitle: string;
    roleFamily: Family;
    seniority: Seniority;
    location: (typeof LOCATIONS)[number];
  }>;
  /** Show the JD-to-brief assistant inline on step 2. */
  assistant?: boolean;
  source?: string;
}

const STEPS = ["Role", "Details", "You"] as const;

const seniorityOptions = [
  { value: "junior", label: "Junior (1–3 yrs)" },
  { value: "mid", label: "Mid (3–6 yrs)" },
  { value: "senior", label: "Senior (6–10 yrs)" },
  { value: "lead", label: "Lead / manager (10+ yrs)" },
];

interface State {
  roleTitle: string;
  roleFamily: Family | "";
  seniority: Seniority | "";
  location: string;
  workMode: string;
  openings: string;
  mustHaveSkills: string[];
  budgetMinLpa: string;
  budgetMaxLpa: string;
  targetStart: string;
  jobDescription: string;
  name: string;
  workEmail: string;
  company: string;
  companyType: string;
  phone: string;
  contactPreference: string;
  consent: boolean;
  website: string;
}

interface ExtractedBrief {
  roleTitle: string;
  roleFamily: Family;
  seniority: Seniority;
  mustHaveSkills: string[];
  location: string;
  suggestedBudgetMinLpa: number;
  suggestedBudgetMaxLpa: number;
  summary: string;
  openQuestions: string[];
  source: "ai" | "heuristic";
}

/** Wrapper that resolves URL prefill before mounting the form (needs a Suspense boundary). */
export function BriefFormFromQuery(props: BriefFormProps) {
  const sp = useSearchParams();
  const family = props.families.find((f) => f.value === sp.get("family"))?.value;
  const seniority = (["junior", "mid", "senior", "lead"] as const).find(
    (x) => x === sp.get("seniority"),
  );
  const role = sp.get("role")?.slice(0, 120) || undefined;
  return (
    <BriefForm
      {...props}
      defaults={{
        ...props.defaults,
        roleFamily: family ?? props.defaults?.roleFamily,
        seniority: seniority ?? props.defaults?.seniority,
        roleTitle: role ?? props.defaults?.roleTitle,
      }}
    />
  );
}

export function BriefForm({
  families,
  skillSuggestions,
  defaults = {},
  assistant = true,
  source = "submit-a-role",
}: BriefFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [assistantState, setAssistantState] = useState<{
    loading: boolean;
    result?: ExtractedBrief;
    error?: string;
  }>({ loading: false });
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [s, setS] = useState<State>({
    roleTitle: defaults.roleTitle ?? "",
    roleFamily: defaults.roleFamily ?? "",
    seniority: defaults.seniority ?? "",
    location: defaults.location ?? "",
    workMode: "",
    openings: "1",
    mustHaveSkills: [],
    budgetMinLpa: "",
    budgetMaxLpa: "",
    targetStart: "",
    jobDescription: "",
    name: "",
    workEmail: "",
    company: "",
    companyType: "",
    phone: "",
    contactPreference: "Email",
    consent: false,
    website: "",
  });

  const set = <K extends keyof State>(key: K, value: State[K]) => {
    setS((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
    if (!started.current) {
      started.current = true;
      track("brief_started", { page: source });
    }
  };

  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const validators = [briefRoleStep, briefDetailsStep, briefYouStep] as const;

  const stepPayload = (i: number) => {
    if (i === 0)
      return {
        roleTitle: s.roleTitle,
        roleFamily: s.roleFamily || undefined,
        seniority: s.seniority || undefined,
        location: s.location || undefined,
        workMode: s.workMode || undefined,
        openings: s.openings,
      };
    if (i === 1)
      return {
        mustHaveSkills: s.mustHaveSkills,
        budgetMinLpa: s.budgetMinLpa,
        budgetMaxLpa: s.budgetMaxLpa,
        targetStart: s.targetStart,
        jobDescription: s.jobDescription || undefined,
      };
    return {
      name: s.name,
      workEmail: s.workEmail,
      company: s.company,
      companyType: s.companyType || undefined,
      phone: s.phone,
      contactPreference: s.contactPreference || undefined,
      consent: s.consent,
    };
  };

  const validateStep = (i: number) => {
    const result = validators[i].safeParse(stepPayload(i));
    if (result.success) {
      setErrors({});
      return true;
    }
    const errs = fieldErrors(result.error);
    setErrors(errs);
    focusFirstError(errs);
    return false;
  };

  const next = () => {
    if (!validateStep(step)) return;
    track("brief_step", {
      step: step + 1,
      role_family: s.roleFamily || undefined,
      seniority: s.seniority || undefined,
      openings: Number(s.openings),
    });
    setStep((x) => x + 1);
  };

  const runAssistant = async () => {
    if (s.jobDescription.trim().length < 80) {
      setAssistantState({
        loading: false,
        error: "Paste the full job description (at least a few lines) first.",
      });
      return;
    }
    setAssistantState({ loading: true });
    const res = await submitForm<{ brief: ExtractedBrief }>("/api/ai/jd-to-brief", {
      jobDescription: s.jobDescription,
    });
    if (!res.ok) {
      setAssistantState({ loading: false, error: res.error });
      return;
    }
    const b = res.data.brief;
    track("jd_assistant_used", { source: b.source });
    setAssistantState({ loading: false, result: b });
    setS((prev) => ({
      ...prev,
      mustHaveSkills: prev.mustHaveSkills.length ? prev.mustHaveSkills : b.mustHaveSkills,
      budgetMinLpa: prev.budgetMinLpa || String(b.suggestedBudgetMinLpa),
      budgetMaxLpa: prev.budgetMaxLpa || String(b.suggestedBudgetMaxLpa),
    }));
  };

  const submit = async () => {
    if (!validateStep(2)) return;
    setSubmitting(true);
    setFormError(null);
    const payload = {
      ...stepPayload(0),
      ...stepPayload(1),
      ...stepPayload(2),
      website: s.website,
      turnstileToken: token,
      attribution: getAttribution(),
    };
    const res = await submitForm<{
      ref: string;
      track: string;
      replyBy: string;
      shortlistBy: string;
      desk: string;
      recruiterName: string | null;
    }>("/api/brief", payload);
    setSubmitting(false);
    if (!res.ok) {
      setFormError(res.error);
      if (res.fieldErrors) {
        setErrors(res.fieldErrors);
        const firstStep = validators.findIndex((v) =>
          Object.keys(res.fieldErrors!).some((k) => k in v.shape),
        );
        if (firstStep >= 0) setStep(firstStep);
      }
      return;
    }
    track("brief_submitted", {
      role_family: s.roleFamily,
      seniority: s.seniority,
      openings: Number(s.openings),
      track: res.data.track,
    });
    const q = new URLSearchParams({
      ref: res.data.ref,
      track: res.data.track,
      replyBy: res.data.replyBy,
      shortlistBy: res.data.shortlistBy,
      desk: res.data.desk,
      role: s.roleTitle,
      ...(res.data.recruiterName ? { recruiter: res.data.recruiterName } : {}),
    });
    router.push(`/submit-a-role/thank-you?${q.toString()}`);
  };

  const freeEmailWarning =
    s.workEmail.includes("@") && isFreeEmail(s.workEmail)
      ? "That looks like a personal address. A work email helps us verify your company faster — but you can continue."
      : undefined;

  const suggestions = s.roleFamily ? skillSuggestions[s.roleFamily] : [];

  return (
    <form
      noValidate
      onSubmit={(e) => (e.preventDefault(), step < 2 ? next() : submit())}
      className="border-line bg-surface relative rounded-[12px] border p-6 shadow-sm sm:p-8"
      aria-labelledby="brief-step-title"
    >
      {/* Progress */}
      <div className="mb-8">
        <ol className="flex gap-2" aria-label="Progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-colors duration-200",
                  i <= step ? "bg-accent" : "bg-line",
                )}
              />
              <span
                className={cn(
                  "mt-2 block text-sm",
                  i === step ? "text-ink font-semibold" : "text-muted",
                )}
                aria-current={i === step ? "step" : undefined}
              >
                {i + 1}. {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <h2
        id="brief-step-title"
        ref={headingRef}
        tabIndex={-1}
        className="mb-6 text-xl font-bold outline-none"
      >
        {step === 0 && "What role are you hiring for?"}
        {step === 1 && "What does a great hire look like?"}
        {step === 2 && "Who should we send the shortlist to?"}
      </h2>

      {formError && (
        <div className="mb-6">
          <FormAlert>{formError}</FormAlert>
        </div>
      )}

      {step === 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="roleTitle"
            label="Role title"
            placeholder="e.g. Senior Data Engineer"
            value={s.roleTitle}
            onChange={(e) => set("roleTitle", e.target.value)}
            error={errors.roleTitle}
            className="sm:col-span-2"
            autoComplete="off"
          />
          <SelectField
            id="roleFamily"
            label="Role family"
            options={families}
            value={s.roleFamily}
            onChange={(e) => set("roleFamily", e.target.value as Family)}
            error={errors.roleFamily}
          />
          <SelectField
            id="seniority"
            label="Seniority"
            options={seniorityOptions}
            value={s.seniority}
            onChange={(e) => set("seniority", e.target.value as Seniority)}
            error={errors.seniority}
          />
          <SelectField
            id="location"
            label="Location"
            options={LOCATIONS}
            value={s.location}
            onChange={(e) => set("location", e.target.value)}
            error={errors.location}
          />
          <SelectField
            id="workMode"
            label="Work mode"
            options={WORK_MODES}
            value={s.workMode}
            onChange={(e) => set("workMode", e.target.value)}
            error={errors.workMode}
          />
          <TextField
            id="openings"
            label="Number of openings"
            type="number"
            inputMode="numeric"
            min={1}
            max={500}
            value={s.openings}
            onChange={(e) => set("openings", e.target.value)}
            error={errors.openings}
            hint="Five or more? We'll suggest a Talent Pod."
          />
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {assistant && (
            <div className="border-accent/50 bg-accent-soft rounded-lg border border-dashed p-4 sm:col-span-2">
              <TextareaField
                id="jobDescription"
                label="Job description"
                optional
                placeholder="Paste your JD here and we'll fill in skills and a budget suggestion."
                value={s.jobDescription}
                onChange={(e) => set("jobDescription", e.target.value)}
                error={errors.jobDescription}
                hint="Optional. Our AI drafts the brief; a recruiter confirms it with you."
              />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={runAssistant}
                  disabled={assistantState.loading}
                >
                  <span aria-hidden>✦</span>{" "}
                  {assistantState.loading ? "Reading your JD…" : "Fill from job description"}
                </Button>
                <span className="text-muted text-sm">AI-assisted · never shared</span>
              </div>
              <div aria-live="polite">
                {assistantState.error && (
                  <p className="text-warn mt-2 text-sm">{assistantState.error}</p>
                )}
                {assistantState.result && (
                  <div className="mt-3 text-sm">
                    <p>
                      <strong>
                        {assistantState.result.source === "ai" ? "AI summary" : "Quick read"}:
                      </strong>{" "}
                      {assistantState.result.summary}
                    </p>
                    {assistantState.result.openQuestions.length > 0 && (
                      <p className="text-muted mt-1">
                        We'll confirm: {assistantState.result.openQuestions.join(" · ")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="sm:col-span-2">
            <SkillsInput
              id="mustHaveSkills"
              label="Must-have skills"
              value={s.mustHaveSkills}
              onChange={(v) => set("mustHaveSkills", v)}
              suggestions={suggestions}
              error={errors.mustHaveSkills}
              hint="Only true deal-breakers. We evidence each one on every dossier."
            />
          </div>
          <TextField
            id="budgetMinLpa"
            label="Budget from (₹ LPA)"
            type="number"
            inputMode="decimal"
            min={1}
            placeholder="e.g. 25"
            value={s.budgetMinLpa}
            onChange={(e) => set("budgetMinLpa", e.target.value)}
            error={errors.budgetMinLpa}
          />
          <TextField
            id="budgetMaxLpa"
            label="Budget to (₹ LPA)"
            type="number"
            inputMode="decimal"
            min={1}
            placeholder="e.g. 35"
            value={s.budgetMaxLpa}
            onChange={(e) => set("budgetMaxLpa", e.target.value)}
            error={errors.budgetMaxLpa}
            hint="Fixed annual CTC. We'll tell you honestly if it's below market."
          />
          <TextField
            id="targetStart"
            label="Target start date"
            type="date"
            optional
            value={s.targetStart}
            onChange={(e) => set("targetStart", e.target.value)}
            error={errors.targetStart}
            hint="Most engineers serve 60–90 days' notice."
          />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label="Your name"
            autoComplete="name"
            value={s.name}
            onChange={(e) => set("name", e.target.value)}
            error={errors.name}
          />
          <TextField
            id="workEmail"
            label="Work email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={s.workEmail}
            onChange={(e) => set("workEmail", e.target.value)}
            error={errors.workEmail}
            warning={freeEmailWarning}
          />
          <TextField
            id="company"
            label="Company"
            autoComplete="organization"
            value={s.company}
            onChange={(e) => set("company", e.target.value)}
            error={errors.company}
          />
          <SelectField
            id="companyType"
            label="Company type"
            options={COMPANY_TYPES}
            value={s.companyType}
            onChange={(e) => set("companyType", e.target.value)}
            error={errors.companyType}
          />
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={s.phone}
            onChange={(e) => set("phone", e.target.value)}
            error={errors.phone}
          />
          <SelectField
            id="contactPreference"
            label="Preferred contact"
            options={CONTACT_PREFS}
            value={s.contactPreference}
            onChange={(e) => set("contactPreference", e.target.value)}
            error={errors.contactPreference}
          />
          <CheckboxField
            id="consent"
            className="sm:col-span-2"
            checked={s.consent}
            onChange={(e) => set("consent", e.target.checked)}
            error={errors.consent}
            label={
              <>
                Emplyify may contact me about this role and store these details as described in the{" "}
                <a href="/legal/privacy" className="text-accent underline" target="_blank">
                  privacy notice
                </a>
                .
              </>
            }
          />
          <Honeypot value={s.website} onChange={(v) => set("website", v)} />
          <div className="sm:col-span-2">
            <Turnstile onToken={setToken} />
          </div>
        </div>
      )}

      <div className="border-line mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep((x) => x - 1)}>
            ← Back
          </Button>
        ) : (
          <span className="text-muted text-sm">About 2 minutes · no sales call needed</span>
        )}
        <Button type="submit" size="lg" disabled={submitting}>
          {step < 2 ? "Continue" : submitting ? "Sending…" : "Submit a role"}
        </Button>
      </div>
    </form>
  );
}
