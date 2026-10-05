"use client";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics/events";

/** "Download" = browser print-to-PDF of the dossier (print styles hide chrome). */
export function PrintButton({ family }: { family: string }) {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        track("sample_dossier_downloaded", { role_family: family });
        window.print();
      }}
    >
      Download as PDF
    </Button>
  );
}
