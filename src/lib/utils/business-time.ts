/**
 * Business-time helpers in India Standard Time (UTC+05:30, no DST).
 * Office hours: Mon–Fri, 09:30–18:30 IST. Used for the "human reply within
 * 4 business hours" promise and the 72-hour shortlist date.
 */
const IST_OFFSET_MIN = 330;
const OPEN_MIN = 9 * 60 + 30;
const CLOSE_MIN = 18 * 60 + 30;

/** Shift a UTC date into a Date whose UTC fields read as IST wall-clock. */
const toIstWall = (d: Date) => new Date(d.getTime() + IST_OFFSET_MIN * 60_000);
const fromIstWall = (d: Date) => new Date(d.getTime() - IST_OFFSET_MIN * 60_000);

const isWeekend = (wall: Date) => wall.getUTCDay() === 0 || wall.getUTCDay() === 6;
const minutesOfDay = (wall: Date) => wall.getUTCHours() * 60 + wall.getUTCMinutes();

function nextOpening(wall: Date): Date {
  const d = new Date(wall);
  const mins = minutesOfDay(d);
  if (!isWeekend(d) && mins < OPEN_MIN) {
    d.setUTCHours(9, 30, 0, 0);
    return d;
  }
  if (!isWeekend(d) && mins < CLOSE_MIN) return d;
  // Move to next day's opening, skipping weekends.
  do {
    d.setUTCDate(d.getUTCDate() + 1);
  } while (isWeekend(d));
  d.setUTCHours(9, 30, 0, 0);
  return d;
}

/** Adds working minutes within office hours. */
export function addBusinessMinutes(from: Date, minutes: number): Date {
  let wall = nextOpening(toIstWall(from));
  let remaining = minutes;
  while (remaining > 0) {
    const available = CLOSE_MIN - minutesOfDay(wall);
    if (remaining <= available) {
      wall = new Date(wall.getTime() + remaining * 60_000);
      remaining = 0;
    } else {
      remaining -= available;
      wall.setUTCHours(18, 30, 0, 0);
      wall = nextOpening(new Date(wall.getTime() + 60_000));
    }
  }
  return fromIstWall(wall);
}

export function replyDeadline(from: Date, businessHours = 4): Date {
  return addBusinessMinutes(from, businessHours * 60);
}

/**
 * The 72-hour shortlist clock starts when the brief is confirmed. We quote
 * calendar hours but never land a promise on a weekend: Sat/Sun roll to Monday.
 */
export function shortlistDate(from: Date, hours = 72): Date {
  const target = toIstWall(new Date(from.getTime() + hours * 3_600_000));
  while (isWeekend(target)) target.setUTCDate(target.getUTCDate() + 1);
  return fromIstWall(target);
}
