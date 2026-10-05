"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";
import { getAttribution } from "@/lib/analytics/attribution";

/**
 * Cal.com inline booking iframe. Listens for Cal's embed postMessage on a
 * completed booking to fire `call_booked` (checked defensively by origin).
 */
export function CalEmbed({ link, title }: { link?: string; title: string }) {
  useEffect(() => {
    if (!link) return;
    const calOrigin = new URL(link).origin;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== calOrigin) return;
      const data = e.data as { type?: string; originator?: string } | undefined;
      if (data?.type && /bookingSuccessful/i.test(data.type)) {
        track("call_booked", {
          source_page: window.location.pathname,
          utm_source: getAttribution().utm_source,
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [link]);

  if (!link) return null;
  const url = new URL(link);
  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", "auto");
  return (
    <iframe
      src={url.toString()}
      title={title}
      loading="lazy"
      className="border-line bg-surface h-[720px] w-full rounded-2xl border"
    />
  );
}
