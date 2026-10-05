import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { footerNav, gccMenu, hireMenu, primaryNav } from "@/content/navigation";
import { ctas } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { jobs } from "@/content/jobs";
import { clientLogos, proofMetrics } from "@/content/metrics";
import { getCities, getRoleFamilies, getRoles, getServices, isVisible } from "@/lib/content";
import { allRoutes } from "@/lib/seo/routes";

const routePaths = new Set(allRoutes().map((r) => r.path));
const strip = (href: string) => href.split(/[?#]/)[0];

describe("content integrity", () => {
  it("has one role page per role family (6) and 18 role × city pages", () => {
    expect(getRoles()).toHaveLength(getRoleFamilies().length);
    const roleCity = allRoutes().filter((r) => /^\/hire\/[^/]+\/[^/]+$/.test(r.path));
    expect(roleCity).toHaveLength(18);
  });

  it("uses unique, lowercase hyphenated slugs", () => {
    const slugs = [...getRoles(), ...getServices(), ...getCities()].map((x) => x.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("gives every job a readable slug ending in its short id", () => {
    for (const j of jobs) expect(j.slug.endsWith(`-${j.id}`)).toBe(true);
  });

  it("keeps salary bands ordered and non-overlapping in the wrong direction", () => {
    for (const r of getRoles()) {
      for (const b of r.salaryBands) expect(b.maxLpa).toBeGreaterThan(b.minLpa);
      const mins = r.salaryBands.map((b) => b.minLpa);
      expect([...mins].sort((a, b) => a - b)).toEqual(mins);
    }
  });

  it("gives every service page 6–10 FAQs (playbook template)", () => {
    for (const s of getServices()) {
      expect(s.faqs.length).toBeGreaterThanOrEqual(6);
      expect(s.faqs.length).toBeLessThanOrEqual(10);
    }
  });

  it("never publishes draft jobs or unverified proof (trust rules)", () => {
    for (const j of jobs.filter((x) => x.status === "draft"))
      expect(isVisible(j, false)).toBe(false);
    expect(caseStudies.every((c) => (c.status === "published" ? Boolean(c.client) : true))).toBe(
      true,
    );
    for (const m of proofMetrics) if (m.value === null) expect(m.pending).toBeTruthy();
    expect(Array.isArray(clientLogos)).toBe(true);
  });
});

describe("navigation", () => {
  it("only links to routes that exist", () => {
    const links = [
      ...hireMenu.services,
      ...hireMenu.roles,
      ...gccMenu,
      ...primaryNav,
      ...footerNav.flatMap((g) => g.links),
      ...Object.values(ctas),
    ].map((l) => strip(l.href));
    const missing = links.filter((href) => !routePaths.has(href));
    expect(missing).toEqual([]);
  });
});

// ---- Copy rules (playbook "Voice" + "CTA vocabulary") ----------------------
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|md)$/.test(f) ? [p] : [];
  });
}
const sources = walk(join(process.cwd(), "src")).map((p) => ({ p, text: readFileSync(p, "utf8") }));

describe("copy rules", () => {
  it("never uses banned hype words", () => {
    const banned = /\b(world-class|seamless(ly)?|synerg(y|ies)|cutting-edge)\b/i;
    const offenders = sources.filter((s) => banned.test(s.text)).map((s) => s.p);
    expect(offenders).toEqual([]);
  });

  it("never uses lorem ipsum placeholders", () => {
    expect(sources.filter((s) => /lorem ipsum/i.test(s.text)).map((s) => s.p)).toEqual([]);
  });
});
