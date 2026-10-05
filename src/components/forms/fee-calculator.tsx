"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { perHireFees } from "@/content/pricing";
import type { Seniority } from "@/content/types";
import { ctcBand, track } from "@/lib/analytics/events";
import { estimateFee } from "@/lib/pricing/fee";
import { shortlistDate } from "@/lib/utils/business-time";
import { formatDateIst, formatInr, formatPercent } from "@/lib/utils/format";

/** Fee and timeline estimator: role + seniority + CTC → fee, GST, total and shortlist date. */
export function FeeCalculator({
  families,
}: {
  families: { value: string; label: string; availability: string; days: string }[];
}) {
  const [family, setFamily] = useState(families[0]?.value ?? "");
  const [seniority, setSeniority] = useState<Seniority>("mid");
  const [ctc, setCtc] = useState("25");
  const tracked = useRef<string>("");

  const ctcNum = Number(ctc);
  const estimate = useMemo(
    () => (ctcNum > 0 && ctcNum <= 500 ? estimateFee(seniority, ctcNum) : null),
    [seniority, ctcNum],
  );
  const fam = families.find((f) => f.value === family);
  const shortlistBy = useMemo(() => shortlistDate(new Date()), []);

  useEffect(() => {
    if (!estimate) return;
    const key = `${family}:${seniority}:${ctcBand(ctcNum)}`;
    if (key === tracked.current) return;
    const t = setTimeout(() => {
      tracked.current = key;
      track("pricing_calculator_used", { role: family, ctc_band: ctcBand(ctcNum) });
    }, 1200);
    return () => clearTimeout(t);
  }, [estimate, family, seniority, ctcNum]);

  return (
    <div className="border-line bg-surface grid gap-8 rounded-2xl border p-6 sm:p-8 lg:grid-cols-2">
      <div className="grid gap-5">
        <SelectField
          id="calc-family"
          label="Role family"
          options={families.map(({ value, label }) => ({ value, label }))}
          value={family}
          onChange={(e) => setFamily(e.target.value)}
        />
        <SelectField
          id="calc-seniority"
          label="Seniority"
          options={(Object.keys(perHireFees) as Seniority[]).map((k) => ({
            value: k,
            label: perHireFees[k].label,
          }))}
          value={seniority}
          onChange={(e) => setSeniority(e.target.value as Seniority)}
        />
        <TextField
          id="calc-ctc"
          label="Annual fixed CTC (₹ LPA)"
          type="number"
          inputMode="decimal"
          min={1}
          max={500}
          step="0.5"
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
          error={ctc !== "" && !estimate ? "Enter a CTC between 1 and 500 LPA." : undefined}
          hint="Fixed pay only. Variable pay and ESOPs are excluded."
        />
      </div>

      <div aria-live="polite" className="bg-bg flex flex-col rounded-lg p-6">
        {estimate ? (
          <>
            <p className="text-muted text-sm">
              Fee at {formatPercent(estimate.percent)} ({estimate.months}{" "}
              {estimate.months === 1 ? "month" : "months"} of CTC)
            </p>
            <p className="tabular text-accent mt-1 text-4xl font-bold">
              {formatInr(estimate.feeInr)}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">GST (18%)</dt>
                <dd className="tabular">{formatInr(estimate.gstInr)}</dd>
              </div>
              <div className="border-line flex justify-between border-t pt-2 font-semibold">
                <dt>Total invoice</dt>
                <dd className="tabular">{formatInr(estimate.totalInr)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Payable</dt>
                <dd>On joining, never before</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shortlist if you brief today</dt>
                <dd>By {formatDateIst(shortlistBy)}</dd>
              </div>
              {fam && (
                <div className="flex justify-between">
                  <dt className="text-muted">Typical time to hire</dt>
                  <dd>
                    {fam.days} · talent {fam.availability}
                  </dd>
                </div>
              )}
            </dl>
            <ButtonLink
              href={`/submit-a-role?family=${family}&seniority=${seniority}`}
              className="mt-6"
            >
              Submit a role
            </ButtonLink>
          </>
        ) : (
          <p className="text-muted">Enter a CTC to see the fee.</p>
        )}
      </div>
    </div>
  );
}
