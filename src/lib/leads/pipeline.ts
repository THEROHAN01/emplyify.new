import "server-only";
import { recruiterDesks } from "@/content/team";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/integrations/email";
import { submitHubspotForm } from "@/lib/integrations/hubspot";
import { log, type IntegrationResult } from "@/lib/integrations/logger";
import { alertSlack } from "@/lib/integrations/slack";
import { audit, insertRow } from "@/lib/integrations/supabase";
import { replyDeadline, shortlistDate } from "@/lib/utils/business-time";
import { formatLpaRange } from "@/lib/utils/format";
import { referenceId } from "@/lib/utils/ids";
import { briefConfirmationEmail, internalBriefAlert } from "./emails";
import { isFreeEmail } from "./free-email";
import type { BriefInput, ContactInput } from "./schema";
import { scoreBrief } from "./scoring";

export interface BriefOutcome {
  ref: string;
  track: "talent-pod" | "per-hire";
  desk: string;
  recruiterName: string | null;
  replyBy: string;
  shortlistBy: string;
}

function settle(results: PromiseSettledResult<IntegrationResult>[]): IntegrationResult[] {
  return results.map((r) =>
    r.status === "fulfilled" ? r.value : { integration: "unknown", ok: false, detail: String(r.reason) },
  );
}

/**
 * Lead routing (playbook "Lead routing"):
 * 1 CRM record with UTM → 2 enrichment (queued for the backend agent) →
 * 3 score/track → 4 recruiter alert + SLA timer → 5 auto-email → 6 nurture (HubSpot sequence).
 */
export async function processBrief(input: BriefInput, meta: { ipHash: string; now?: Date }): Promise<BriefOutcome> {
  const now = meta.now ?? new Date();
  const ref = referenceId("EM");
  const score = scoreBrief(input);
  const replyBy = replyDeadline(now);
  const shortlistBy = shortlistDate(replyBy);
  const desk = recruiterDesks[input.roleFamily];
  const freeEmail = isFreeEmail(input.workEmail);
  const budget = formatLpaRange(input.budgetMinLpa, input.budgetMaxLpa);

  const confirmation = briefConfirmationEmail({
    name: input.name,
    roleTitle: input.roleTitle,
    ref,
    desk: desk.desk,
    recruiterName: desk.name,
    replyBy,
    shortlistBy,
    calLink: env.calLink,
  });
  const alert = internalBriefAlert({
    ref,
    roleTitle: input.roleTitle,
    company: input.company,
    companyType: input.companyType,
    openings: input.openings,
    seniority: input.seniority,
    location: `${input.location} (${input.workMode})`,
    budget,
    track: score.track,
    temperature: score.temperature,
    score: score.score,
    reasons: score.reasons,
    replyBy,
    freeEmail,
  });

  const results = settle(
    await Promise.allSettled([
      insertRow("leads", {
        ref,
        kind: "brief",
        role_title: input.roleTitle,
        role_family: input.roleFamily,
        seniority: input.seniority,
        location: input.location,
        work_mode: input.workMode,
        openings: input.openings,
        must_have_skills: input.mustHaveSkills,
        budget_min_lpa: input.budgetMinLpa,
        budget_max_lpa: input.budgetMaxLpa,
        target_start: input.targetStart || null,
        job_description: input.jobDescription || null,
        name: input.name,
        email: input.workEmail,
        phone: input.phone,
        company: input.company,
        company_type: input.companyType,
        contact_preference: input.contactPreference,
        track: score.track,
        temperature: score.temperature,
        score: score.score,
        reply_by: replyBy.toISOString(),
        attribution: input.attribution,
        enrichment_status: "queued",
        ip_hash: meta.ipHash,
      }),
      submitHubspotForm(
        env.hubspotBriefFormId,
        {
          email: input.workEmail,
          firstname: input.name.split(" ")[0],
          lastname: input.name.split(" ").slice(1).join(" ") || undefined,
          company: input.company,
          phone: input.phone,
          emplyify_ref: ref,
          emplyify_role_title: input.roleTitle,
          emplyify_role_family: input.roleFamily,
          emplyify_seniority: input.seniority,
          emplyify_openings: input.openings,
          emplyify_budget_lpa: `${input.budgetMinLpa}-${input.budgetMaxLpa}`,
          emplyify_company_type: input.companyType,
          emplyify_track: score.track,
          emplyify_lead_score: score.score,
          emplyify_contact_preference: input.contactPreference,
        },
        input.attribution,
      ),
      sendEmail({ to: input.workEmail, subject: confirmation.subject, text: confirmation.text }),
      env.internalAlertEmail
        ? sendEmail({ to: env.internalAlertEmail, subject: alert.subject, text: alert.text, replyTo: input.workEmail })
        : Promise.resolve({ integration: "alert-email", ok: true, skipped: true }),
      alertSlack(alert.text),
    ]),
  );

  const failed = results.filter((r) => !r.ok);
  log(failed.length ? "warn" : "info", "brief.processed", {
    ref,
    track: score.track,
    score: score.score,
    integrations: results.map((r) => `${r.integration}:${r.skipped ? "skipped" : r.ok ? "ok" : "failed"}`),
  });
  // If every system of record failed, the lead would be lost: surface loudly.
  const recorded = results.some((r) => (r.integration === "supabase" || r.integration === "hubspot") && r.ok && !r.skipped);
  if (!recorded && env.isProduction) log("error", "brief.not_recorded", { ref });
  await audit("brief.submitted", ref, { track: score.track });

  return {
    ref,
    track: score.track,
    desk: desk.desk,
    recruiterName: desk.name,
    replyBy: replyBy.toISOString(),
    shortlistBy: shortlistBy.toISOString(),
  };
}

export async function processContact(input: ContactInput, meta: { ipHash: string }) {
  const ref = referenceId("CT");
  const results = settle(
    await Promise.allSettled([
      insertRow("leads", {
        ref,
        kind: "contact",
        name: input.name,
        email: input.email,
        topic: input.topic,
        message: input.message,
        attribution: input.attribution,
        ip_hash: meta.ipHash,
      }),
      submitHubspotForm(env.hubspotContactFormId, { email: input.email, firstname: input.name, message: `[${input.topic}] ${input.message}` }, input.attribution),
      env.internalAlertEmail
        ? sendEmail({
            to: env.internalAlertEmail,
            subject: `[Contact ${ref}] ${input.topic} — ${input.name}`,
            text: input.message,
            replyTo: input.email,
          })
        : Promise.resolve({ integration: "alert-email", ok: true, skipped: true }),
    ]),
  );
  log("info", "contact.processed", { ref, topic: input.topic, failed: results.filter((r) => !r.ok).length });
  return { ref };
}
