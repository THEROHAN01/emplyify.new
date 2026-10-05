const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatInr(amount: number): string {
  return inr.format(Math.round(amount));
}

/** "18–35 LPA" style range, using an en dash. */
export function formatLpaRange(min: number, max: number): string {
  return `₹${min}–${max} LPA`;
}

export function formatPercent(value: number, digits = 2): string {
  return `${Number(value.toFixed(digits))}%`;
}

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Asia/Kolkata",
});

export function formatDateIst(date: Date): string {
  return dateFmt.format(date);
}

const longDateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function formatLongDate(iso: string): string {
  return longDateFmt.format(new Date(iso));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
