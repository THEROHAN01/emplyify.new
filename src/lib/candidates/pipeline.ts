import "server-only";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/integrations/email";
import { submitHubspotForm } from "@/lib/integrations/hubspot";
import { log } from "@/lib/integrations/logger";
import { audit, insertRow, uploadCv } from "@/lib/integrations/supabase";
import { applicationReceivedEmail, reportEmail, talentNetworkWelcomeEmail } from "@/lib/leads/emails";
import type { ApplicationInput, Attribution, ReportInput, TalentNetworkInput } from "@/lib/leads/schema";
import type { CvKind } from "@/lib/security/upload";
import { referenceId } from "@/lib/utils/ids";

/** Versioned consent texts. Bump the version whenever the wording changes. */
export const CONSENT_VERSIONS = {
  talentNetwork: "talent-network/2026-10-05",
  application: "application/2026-10-05",
  report: "report/2026-10-05",
} as const;

async function recordConsent(p: { email: string; purpose: string; version: string; ipHash: string; subjectRef: string }) {
  // Consent ledger (DPDP): who, what purpose, which wording, when.
  const res = await insertRow("consents", {
    email: p.email,
    purpose: p.purpose,
    version: p.version,
    subject_ref: p.subjectRef,
    ip_hash: p.ipHash,
  });
  if (!res.ok) log("error", "consent.not_recorded", { subjectRef: p.subjectRef, purpose: p.purpose });
  return res;
}

export async function processTalentNetwork(input: TalentNetworkInput, meta: { ipHash: string }) {
  const ref = referenceId("TN");
  const welcome = talentNetworkWelcomeEmail(input.name);
  await Promise.allSettled([
    insertRow("candidates", {
      ref,
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      role_family: input.roleFamily,
      years_experience: input.yearsExperience,
      preferred_city: input.city,
      notice_days: input.noticeDays,
      linkedin: input.linkedin || null,
      whatsapp_updates: input.whatsappUpdates,
      source: input.attribution.utm_source ?? "website",
      attribution: input.attribution,
    }),
    recordConsent({ email: input.email, purpose: "talent_network", version: CONSENT_VERSIONS.talentNetwork, ipHash: meta.ipHash, subjectRef: ref }),
    sendEmail({ to: input.email, ...welcome }),
  ]);
  await audit("candidate.joined_network", ref, { roleFamily: input.roleFamily });
  log("info", "talent_network.processed", { ref, roleFamily: input.roleFamily });
  return { ref };
}

export async function processApplication(
  input: ApplicationInput,
  cv: { bytes: ArrayBuffer; kind: CvKind; mime: string } | null,
  job: { slug: string; title: string },
  meta: { ipHash: string; attribution: Attribution },
) {
  const ref = referenceId("AP");
  let cvPath: string | null = null;
  if (cv) {
    // Unguessable path; bucket is private. Never derived from the file name.
    const path = `${new Date().toISOString().slice(0, 7)}/${ref}-${crypto.randomUUID()}.${cv.kind}`;
    const upload = await uploadCv(path, cv.bytes, cv.mime);
    if (upload.ok && !upload.skipped) cvPath = path;
  }

  const received = applicationReceivedEmail({ name: input.name, jobTitle: job.title, ref });
  await Promise.allSettled([
    insertRow("applications", {
      ref,
      job_slug: job.slug,
      name: input.name,
      email: input.email,
      phone: input.phone,
      linkedin: input.linkedin || null,
      notice_days: input.noticeDays,
      expected_ctc_lpa: input.expectedCtcLpa,
      cv_path: cvPath,
      status: "received",
      // Malware scan + AI parsing happen asynchronously (see docs/ARCHITECTURE.md).
      cv_scan_status: cvPath ? "pending" : "none",
      attribution: meta.attribution,
    }),
    recordConsent({ email: input.email, purpose: `application:${job.slug}`, version: CONSENT_VERSIONS.application, ipHash: meta.ipHash, subjectRef: ref }),
    sendEmail({ to: input.email, ...received }),
    env.internalAlertEmail
      ? sendEmail({ to: env.internalAlertEmail, subject: `[Application ${ref}] ${job.title}`, text: `New application for ${job.title}. Reference ${ref}. Open the ATS to review.` })
      : Promise.resolve(),
  ]);
  await audit("application.submitted", ref, { job: job.slug, hasCv: Boolean(cvPath) });
  log("info", "application.processed", { ref, job: job.slug, hasCv: Boolean(cv) });
  return { ref };
}

export async function processReportRequest(
  input: ReportInput,
  report: { slug: string; title: string; available: boolean; releaseLabel?: string },
  meta: { ipHash: string },
) {
  const ref = referenceId("RP");
  const mail = reportEmail({ name: input.name, title: report.title, available: report.available, releaseLabel: report.releaseLabel });
  await Promise.allSettled([
    insertRow("leads", {
      ref,
      kind: "report",
      report_slug: report.slug,
      name: input.name,
      email: input.workEmail,
      company: input.company,
      attribution: input.attribution,
      ip_hash: meta.ipHash,
    }),
    recordConsent({ email: input.workEmail, purpose: `report:${report.slug}`, version: CONSENT_VERSIONS.report, ipHash: meta.ipHash, subjectRef: ref }),
    submitHubspotForm(
      env.hubspotReportFormId,
      { email: input.workEmail, firstname: input.name, company: input.company, emplyify_report: report.slug },
      input.attribution,
    ),
    sendEmail({ to: input.workEmail, ...mail }),
  ]);
  log("info", "report.processed", { ref, report: report.slug });
  return { ref };
}
