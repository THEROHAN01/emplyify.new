import { site } from "@/content/site";
import { formatDateIst } from "@/lib/utils/format";

export function briefConfirmationEmail(p: {
  name: string;
  roleTitle: string;
  ref: string;
  desk: string;
  recruiterName: string | null;
  replyBy: Date;
  shortlistBy: Date;
  calLink?: string;
}) {
  const owner = p.recruiterName ? `${p.recruiterName} from our ${p.desk}` : `A senior recruiter from our ${p.desk}`;
  const lines = [
    `Hi ${p.name.split(" ")[0]},`,
    `Thanks for your ${p.roleTitle} brief. Your reference is ${p.ref}.`,
    `What happens next:\n1. ${owner} will reply by ${formatDateIst(p.replyBy)} to confirm must-haves and budget.\n2. Once the brief is confirmed, your verified shortlist arrives within ${site.promises.shortlistHours} hours — current estimate ${formatDateIst(p.shortlistBy)}.\n3. You only pay if you hire, and every hire carries a ${site.promises.replacementDays}-day free replacement.`,
    p.calLink ? `Prefer to brief us live? Book 20 minutes here: ${p.calLink}` : "",
    `Reply to this email any time.\n\n— The ${site.name} team`,
  ].filter(Boolean);
  return { subject: `Your ${p.roleTitle} brief (${p.ref}) — next steps`, text: lines.join("\n\n") };
}

export function internalBriefAlert(p: {
  ref: string;
  roleTitle: string;
  company: string;
  companyType: string;
  openings: number;
  seniority: string;
  location: string;
  budget: string;
  track: string;
  temperature: string;
  score: number;
  reasons: string[];
  replyBy: Date;
  freeEmail: boolean;
}) {
  const emoji = p.temperature === "hot" ? "🔥" : "🟢";
  const text = [
    `${emoji} New brief ${p.ref}: ${p.roleTitle} × ${p.openings} at ${p.company} (${p.companyType})`,
    `Track: ${p.track} · Score ${p.score}${p.reasons.length ? ` (${p.reasons.join(", ")})` : ""}`,
    `${p.seniority} · ${p.location} · Budget ${p.budget}`,
    p.freeEmail ? "⚠️ Personal email domain — verify company." : "",
    `Reply SLA: ${formatDateIst(p.replyBy)} ${p.replyBy.toISOString().slice(11, 16)} UTC`,
  ]
    .filter(Boolean)
    .join("\n");
  return { subject: `[${p.temperature.toUpperCase()}] Brief ${p.ref}: ${p.roleTitle} — ${p.company}`, text };
}

export function talentNetworkWelcomeEmail(name: string) {
  return {
    subject: `Welcome to the ${site.name} talent network`,
    text: [
      `Hi ${name.split(" ")[0]},`,
      "You're in. Here's what to expect from us:",
      `• We'll only contact you about roles that match your skills, with the salary band upfront.\n• No calls without a booked slot — first contact is by email or WhatsApp.\n• We never share your profile with an employer without asking you first, for that specific role.\n• A status update within ${site.promises.candidateUpdateBusinessDays} business days at every stage, and a reason for every outcome.`,
      `To see, export or delete your data, reply to this email or write to ${site.email.privacy}.`,
      `— The ${site.name} talent team`,
    ].join("\n\n"),
  };
}

export function applicationReceivedEmail(p: { name: string; jobTitle: string; ref: string }) {
  return {
    subject: `Application received: ${p.jobTitle} (${p.ref})`,
    text: [
      `Hi ${p.name.split(" ")[0]},`,
      `We've received your application for ${p.jobTitle}. Your reference is ${p.ref}.`,
      `Status: Received → Screened → Shared with employer (only with your OK) → Interview → Outcome.\nYou'll hear from us within ${site.promises.candidateUpdateBusinessDays} business days, whatever the answer.`,
      "While you wait, try our interview prep for this role: " + "/candidates/interview-prep",
      `— The ${site.name} talent team`,
    ].join("\n\n"),
  };
}

export function reportEmail(p: { name: string; title: string; available: boolean; releaseLabel?: string }) {
  return {
    subject: p.available ? `Your copy: ${p.title}` : `You're on the list: ${p.title}`,
    text: [
      `Hi ${p.name.split(" ")[0]},`,
      p.available
        ? `Here is your copy of ${p.title}. The download link is valid for 7 days.`
        : `Thanks for signing up. ${p.title} is not out yet (${p.releaseLabel ?? "coming soon"}). We'll email you the PDF on release day.`,
      `— The ${site.name} team`,
    ].join("\n\n"),
  };
}
