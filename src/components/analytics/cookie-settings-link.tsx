"use client";

import { openConsentSettings } from "@/lib/analytics/consent";

export function CookieSettingsLink() {
  return (
    <button type="button" onClick={openConsentSettings} className="hover:text-accent hover:underline">
      Cookie settings
    </button>
  );
}
