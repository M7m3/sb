import { business } from "./business";

export type Side = "locksmith" | "automotive";

export const sidePath: Record<Side, string> = {
  locksmith: "/",
  automotive: "/automotive",
};

export const site = {
  name: "SB",
  tagline: "Locksmith and automotive service for Scarborough and the GTA.",
  // PLACEHOLDER: client must confirm phone, email, address and hours.
  phone: business.phone,
  phoneHref: business.phoneHref,
  email: "hello@example.com",
  address: "Scarborough, Toronto, ON (address to be confirmed)",
  // PLACEHOLDER: confirm hours and any 24/7 claim before launch.
  hours: [
    { days: "Mon to Fri", time: "8:00 AM to 8:00 PM" },
    { days: "Sat and Sun", time: "9:00 AM to 6:00 PM" },
    { days: "Emergency lockouts", time: "Call to confirm availability" },
  ],
  areas: [
    "Scarborough", "Toronto", "North York", "East York", "Markham", "Pickering",
    "Ajax", "Whitby", "Richmond Hill", "Etobicoke", "Vaughan", "Mississauga",
  ],
};

export const sideMeta: Record<Side, { label: string }> = {
  locksmith: { label: "Locksmith" },
  automotive: { label: "Automotive" },
};
