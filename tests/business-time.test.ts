import { describe, expect, it } from "vitest";
import { addBusinessMinutes, replyDeadline, shortlistDate } from "@/lib/utils/business-time";

// Helper: build a UTC Date from an IST wall-clock time.
const ist = (iso: string) => new Date(`${iso}+05:30`);

describe("replyDeadline (4 business hours, Mon–Fri 09:30–18:30 IST)", () => {
  it("adds 4 hours inside the working day", () => {
    expect(replyDeadline(ist("2026-10-05T10:00:00"))).toEqual(ist("2026-10-05T14:00:00"));
  });

  it("rolls the remainder into the next morning", () => {
    // Mon 17:00 → 1.5h today, 2.5h Tuesday → Tue 12:00
    expect(replyDeadline(ist("2026-10-05T17:00:00"))).toEqual(ist("2026-10-06T12:00:00"));
  });

  it("starts the clock at opening time for early submissions", () => {
    expect(replyDeadline(ist("2026-10-05T07:00:00"))).toEqual(ist("2026-10-05T13:30:00"));
  });

  it("skips the weekend", () => {
    // Fri 18:00 → 0.5h Fri, 3.5h Mon → Mon 13:00
    expect(replyDeadline(ist("2026-10-09T18:00:00"))).toEqual(ist("2026-10-12T13:00:00"));
    // Saturday submission → Monday 13:30
    expect(replyDeadline(ist("2026-10-10T11:00:00"))).toEqual(ist("2026-10-12T13:30:00"));
  });

  it("handles multi-day spans", () => {
    expect(addBusinessMinutes(ist("2026-10-05T09:30:00"), 9 * 60 * 2)).toEqual(
      ist("2026-10-06T18:30:00"),
    );
  });
});

describe("shortlistDate", () => {
  it("is 72 calendar hours later on a weekday", () => {
    expect(shortlistDate(ist("2026-10-05T12:00:00"))).toEqual(ist("2026-10-08T12:00:00"));
  });

  it("never lands on a weekend", () => {
    // Wed + 72h = Sat → Monday same time
    const d = shortlistDate(ist("2026-10-07T12:00:00"));
    expect(d).toEqual(ist("2026-10-12T12:00:00"));
  });
});
