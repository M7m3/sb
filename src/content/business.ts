// Business details that drive the status strip and contact links.
// TODO(client): confirm every value in this file before launch.
export type DayHours = { open: string; close: string } | null; // "HH:MM" 24h, local Toronto time

export const business = {
  // TODO(client): real phone number
  phone: "(416) 000-0000",
  phoneHref: "tel:+14160000000",
  timezone: "America/Toronto",
  // TODO(client): set true only if the business really answers 24/7
  is24x7: false,
  // TODO(client): real opening hours. Index 0 = Sunday ... 6 = Saturday.
  hours: [
    { open: "10:00", close: "18:00" }, // Sun
    { open: "08:00", close: "20:00" }, // Mon
    { open: "08:00", close: "20:00" }, // Tue
    { open: "08:00", close: "20:00" }, // Wed
    { open: "08:00", close: "20:00" }, // Thu
    { open: "08:00", close: "20:00" }, // Fri
    { open: "08:00", close: "20:00" }, // Sat
  ] as DayHours[],
};
