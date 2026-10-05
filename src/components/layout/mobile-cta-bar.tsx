"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ctas } from "@/content/site";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics/events";
import { whatsappUrl } from "@/lib/utils/contact";

/** Mobile sticky bottom bar: primary CTA + WhatsApp (when configured). Hidden on form pages. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const hideOn = ["/submit-a-role", "/candidates/join", "/book-a-call", "/contact"];
  if (hideOn.some((p) => pathname.startsWith(p)) || /^\/jobs\/[^/]+/.test(pathname)) return null;

  const candidate = pathname.startsWith("/jobs") || pathname.startsWith("/candidates");
  const cta = candidate ? ctas.joinNetwork : ctas.submitRole;
  const wa = whatsappUrl(
    candidate ? "Hi Emplyify, I'm looking for a new role." : "Hi Emplyify, I'd like to hire.",
  );

  return (
    <div
      data-print-hide
      className="border-line bg-surface/95 fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t p-3 backdrop-blur lg:hidden"
    >
      <Link
        href={cta.href}
        className={buttonClasses("primary", "md", "flex-1")}
        onClick={() =>
          track("cta_click", { cta_name: cta.label, page: pathname, position: "mobile_bar" })
        }
      >
        {cta.label}
      </Link>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary", "md")}
          aria-label="Chat on WhatsApp (opens in a new tab)"
        >
          WhatsApp
        </a>
      )}
    </div>
  );
}
