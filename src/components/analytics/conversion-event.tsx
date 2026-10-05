"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics/events";

/** Fires one analytics event when a thank-you page mounts (conversion tracking). */
export function ConversionEvent<E extends AnalyticsEvent>({
  name,
  props,
}: {
  name: E["name"];
  props: E["props"];
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(name, props);
  }, [name, props]);
  return null;
}
