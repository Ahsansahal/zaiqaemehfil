import { SITE } from "@/data/site";

export const DAYS_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const DAY_NAMES_SUNDAY_FIRST = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function toMins(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return h * 60 + m;
}

export function fmtTime(hhmm: string): string {
  return hhmm.startsWith("0") ? hhmm.slice(1) : hhmm;
}

export function hoursForDay(day: string): [string, string] {
  return SITE.hours[day] || ["11:30", "23:30"];
}

export function getLondonNow(): { day: string; mins: number } {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const map: Record<string, string> = {};
    for (const p of parts) map[p.type] = p.value;
    return {
      day: map.weekday || "Monday",
      mins: parseInt(map.hour || "12", 10) * 60 + parseInt(map.minute || "0", 10),
    };
  } catch {
    const n = new Date();
    return {
      day: DAY_NAMES_SUNDAY_FIRST[n.getDay()],
      mins: n.getHours() * 60 + n.getMinutes(),
    };
  }
}

export function getLiveStatus() {
  const now = getLondonNow();
  const [open, close] = hoursForDay(now.day);
  const o1 = toMins(open);
  const c1 = toMins(close);
  const isOpen = now.mins >= o1 && now.mins < c1;
  const nextOpen =
    now.mins < o1
      ? fmtTime(open)
      : (() => {
          const idx = DAY_NAMES_SUNDAY_FIRST.indexOf(
            now.day as (typeof DAY_NAMES_SUNDAY_FIRST)[number]
          );
          const tmr = DAY_NAMES_SUNDAY_FIRST[(idx + 1) % 7];
          return `${fmtTime(hoursForDay(tmr)[0])} tomorrow`;
        })();

  return {
    day: now.day,
    isOpen,
    label: isOpen ? `Open now · until ${close}` : `Closed now · opens ${nextOpen}`,
  };
}

export function getDayNameForIsoDate(iso: string): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return DAY_NAMES_SUNDAY_FIRST[d.getDay()];
}
