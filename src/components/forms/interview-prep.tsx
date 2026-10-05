"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormAlert, SelectField, TextareaField } from "@/components/ui/field";
import { track } from "@/lib/analytics/events";
import { submitForm } from "@/lib/forms/client";

interface Question {
  question: string;
  whatGoodLooksLike: string;
  category: string;
}
interface Feedback {
  strengths: string[];
  improvements: string[];
  rewriteTip: string;
  source: "ai" | "library";
}

const seniorities = [
  { value: "junior", label: "Junior (1–3 yrs)" },
  { value: "mid", label: "Mid (3–6 yrs)" },
  { value: "senior", label: "Senior (6–10 yrs)" },
  { value: "lead", label: "Lead (10+ yrs)" },
];

export function InterviewPrep({
  families,
  jobs,
  defaults,
}: {
  families: { value: string; label: string }[];
  jobs: { value: string; label: string; family: string; seniority: string }[];
  defaults?: { family?: string; seniority?: string; jobSlug?: string };
}) {
  const [family, setFamily] = useState(defaults?.family ?? "");
  const [seniority, setSeniority] = useState(defaults?.seniority ?? "mid");
  const [jobSlug, setJobSlug] = useState(defaults?.jobSlug ?? "");
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [source, setSource] = useState<"ai" | "library">("library");
  const [active, setActive] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickJob = (slug: string) => {
    setJobSlug(slug);
    const job = jobs.find((j) => j.value === slug);
    if (job) {
      setFamily(job.family);
      setSeniority(job.seniority);
    }
  };

  const load = async () => {
    if (!family) {
      setError("Choose a role family first.");
      return;
    }
    setBusy(true);
    setError(null);
    setFeedback(null);
    setActive(null);
    const res = await submitForm<{ questions: Question[]; source: "ai" | "library" }>(
      "/api/ai/interview-prep",
      { mode: "questions", family, seniority, jobSlug: jobSlug || undefined },
    );
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setQuestions(res.data.questions);
    setSource(res.data.source);
    track("interview_prep_used", { role: family, source: res.data.source });
  };

  const getFeedback = async () => {
    if (active === null || !questions) return;
    setBusy(true);
    setError(null);
    const res = await submitForm<Feedback>("/api/ai/interview-prep", {
      mode: "feedback",
      family,
      seniority,
      jobSlug: jobSlug || undefined,
      question: questions[active].question,
      answer,
    });
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setFeedback(res.data);
  };

  return (
    <div className="grid gap-8">
      <div className="border-line bg-surface grid gap-5 rounded-2xl border p-6 sm:grid-cols-3 sm:items-end">
        {jobs.length > 0 && (
          <SelectField
            id="prep-job"
            label="Practise for a specific role"
            optional
            options={jobs.map(({ value, label }) => ({ value, label }))}
            value={jobSlug}
            onChange={(e) => pickJob(e.target.value)}
            placeholder="Any role"
          />
        )}
        <SelectField
          id="prep-family"
          label="Role family"
          options={families}
          value={family}
          onChange={(e) => setFamily(e.target.value)}
        />
        <SelectField
          id="prep-seniority"
          label="Seniority"
          options={seniorities}
          value={seniority}
          onChange={(e) => setSeniority(e.target.value)}
        />
        <Button onClick={load} disabled={busy} className="sm:col-span-3 sm:justify-self-start">
          {busy && !questions ? "Preparing questions…" : "Get practice questions"}
        </Button>
      </div>

      {error && <FormAlert>{error}</FormAlert>}

      {questions && (
        <div aria-live="polite">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl font-bold">Your practice set</h2>
            <Badge tone="ai">
              {source === "ai" ? "AI-generated" : "From our question library"}
            </Badge>
          </div>
          <ol className="grid gap-4">
            {questions.map((q, i) => (
              <li key={q.question} className="border-line bg-surface rounded-2xl border p-5">
                <p className="text-accent text-sm font-semibold">{q.category}</p>
                <p className="mt-1 text-lg font-semibold">{q.question}</p>
                <details className="text-muted mt-2">
                  <summary className="cursor-pointer text-sm font-semibold">
                    What a strong answer covers
                  </summary>
                  <p className="mt-2">{q.whatGoodLooksLike}</p>
                </details>
                {active === i ? (
                  <div className="mt-4 grid gap-3">
                    <TextareaField
                      id={`answer-${i}`}
                      label="Your answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      hint="Write it as you'd say it. We don't store your answer."
                    />
                    <Button
                      onClick={getFeedback}
                      disabled={busy || answer.trim().length < 20}
                      className="justify-self-start"
                    >
                      {busy ? "Reviewing…" : "Get feedback"}
                    </Button>
                    {feedback && (
                      <div className="bg-bg rounded-lg p-4 text-sm">
                        <Badge tone="ai">
                          {feedback.source === "ai" ? "AI feedback" : "Checklist feedback"}
                        </Badge>
                        {feedback.strengths.length > 0 && (
                          <>
                            <p className="mt-3 font-semibold">What works</p>
                            <ul className="mt-1 list-disc pl-5">
                              {feedback.strengths.map((s) => (
                                <li key={s}>{s}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        <p className="mt-3 font-semibold">To improve</p>
                        <ul className="mt-1 list-disc pl-5">
                          {feedback.improvements.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                        <p className="mt-3">
                          <strong>Tip:</strong> {feedback.rewriteTip}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => {
                      setActive(i);
                      setAnswer("");
                      setFeedback(null);
                    }}
                  >
                    Practise this one
                  </Button>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
