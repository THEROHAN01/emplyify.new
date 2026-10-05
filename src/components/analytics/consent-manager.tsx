"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { captureAttribution } from "@/lib/analytics/attribution";
import {
  CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/analytics/consent";

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * Cookie banner + consent-gated analytics. Plausible/PostHog scripts are
 * injected only after "Accept", and lazily (afterInteractive / lazyOnload).
 */
export function ConsentManager({
  plausibleDomain,
  posthogKey,
  posthogHost,
}: {
  plausibleDomain?: string;
  posthogKey?: string;
  posthogHost: string;
}) {
  const consent = useSyncExternalStore<ConsentChoice | null | "unknown">(
    subscribe,
    readConsent,
    () => "unknown",
  );
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    captureAttribution();
    const onOpen = (e: Event) => (e as CustomEvent).detail === "open" && setForceOpen(true);
    window.addEventListener(CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_EVENT, onOpen);
  }, []);

  const analyticsConfigured = Boolean(plausibleDomain || posthogKey);
  const showBanner =
    consent !== "unknown" && (consent === null || forceOpen) && analyticsConfigured;

  const choose = (c: ConsentChoice) => {
    writeConsent(c);
    setForceOpen(false);
  };

  return (
    <>
      {consent === "accepted" && plausibleDomain && (
        <Script
          src="https://plausible.io/js/script.tagged-events.js"
          data-domain={plausibleDomain}
          strategy="lazyOnload"
        />
      )}
      {consent === "accepted" && posthogKey && (
        <Script id="posthog-init" strategy="lazyOnload">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init(${JSON.stringify(posthogKey)},{api_host:${JSON.stringify(posthogHost)},person_profiles:'identified_only',session_recording:{maskAllInputs:true},autocapture:false})`}
        </Script>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="border-line bg-surface fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-2xl border p-5 shadow-2xl lg:bottom-6"
        >
          <h2 id="consent-title" className="font-display text-lg font-bold">
            Cookies, briefly
          </h2>
          <p className="text-muted mt-2 text-sm">
            We use privacy-friendly analytics to learn which pages help people. No ads, no
            cross-site tracking, form fields always masked. Essential storage works either way.{" "}
            <Link href="/legal/cookies" className="text-accent underline">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => choose("accepted")}>Accept analytics</Button>
            <Button variant="secondary" onClick={() => choose("rejected")}>
              Essential only
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
