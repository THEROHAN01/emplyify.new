import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** WCAG 2.2 AA: every text/background token pair must reach 4.5:1 in both themes. */
const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function tokens(block: string) {
  return Object.fromEntries(
    [...block.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]),
  );
}
const light = tokens(
  css.slice(css.indexOf(":root {"), css.indexOf("@media (prefers-color-scheme: dark)")),
);
const dark = tokens(
  css.slice(css.indexOf("@media (prefers-color-scheme: dark)"), css.indexOf("@theme")),
);

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const pairs: [string, string][] = [
  ["ink", "bg"],
  ["ink", "surface"],
  ["muted", "bg"],
  ["muted", "surface"],
  ["accent", "bg"],
  ["accent", "surface"],
  ["accent-ink", "accent"],
  ["signal", "surface"],
  ["signal", "signal-bg"],
  ["warn", "warn-bg"],
  ["accent", "accent-soft"],
  ["muted", "accent-soft"],
];

describe.each([
  ["light", light],
  ["dark", dark],
])("%s theme contrast", (_name, t) => {
  it.each(pairs)("%s on %s ≥ 4.5:1", (fg, bg) => {
    expect(t[fg], `missing token ${fg}`).toBeDefined();
    expect(t[bg], `missing token ${bg}`).toBeDefined();
    expect(contrast(t[fg], t[bg])).toBeGreaterThanOrEqual(4.5);
  });
});
