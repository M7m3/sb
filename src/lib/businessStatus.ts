import { business } from "@/content/business";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export type BusinessStatus = { open: boolean; label: string };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
};

/** Current weekday and minutes since midnight in the business time zone. */
function torontoNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: business.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getBusinessStatus(now: Date = new Date()): BusinessStatus {
  if (business.is24x7) return { open: true, label: "Available now" };
  const { day, minutes } = torontoNow(now);
  const today = business.hours[day];

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: "Available now" };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Opens ${fmt(today.open)} today` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = business.hours[d];
    if (h) {
      return { open: false, label: `Opens ${fmt(h.open)} ${i === 1 ? "tomorrow" : DAY_NAMES[d]}` };
    }
  }
  return { open: false, label: "Currently closed" };
}

/** Stable string snapshot for useSyncExternalStore ("1|label" or "0|label"). */
export function statusSnapshot(): string {
  const s = getBusinessStatus();
  return `${s.open ? "1" : "0"}|${s.label}`;
}

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Opening hours grouped for display, for example "Mon to Sat: 8:00 AM to 8:00 PM". Starts on Monday. */
export function hoursSummary(): { days: string; time: string }[] {
  if (business.is24x7) return [{ days: "Every day", time: "Open 24 hours" }];
  const order = [1, 2, 3, 4, 5, 6, 0];
  const out: { days: string; time: string }[] = [];
  let i = 0;
  while (i < order.length) {
    const h = business.hours[order[i]];
    let j = i;
    while (j + 1 < order.length) {
      const n = business.hours[order[j + 1]];
      if ((h && n && h.open === n.open && h.close === n.close) || (!h && !n)) j++;
      else break;
    }
    const first = SHORT_DAYS[order[i]];
    const last = SHORT_DAYS[order[j]];
    out.push({
      days: i === j ? first : `${first} to ${last}`,
      time: h ? `${fmt(h.open)} to ${fmt(h.close)}` : "Closed",
    });
    i = j + 1;
  }
  return out;
}
