/** Consumer email domains. The brief form shows a soft warning, never a block. */
const FREE_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "yahoo.in", "outlook.com", "hotmail.com",
  "live.com", "msn.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com", "rediffmail.com",
  "zoho.com", "zohomail.in", "gmx.com", "mail.com", "yandex.com",
]);

export function isFreeEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  return Boolean(domain && FREE_DOMAINS.has(domain));
}
