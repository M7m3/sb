import { svc } from "./helpers";
import type { SideContent } from "./types";

const carItems = [
  svc("Car Lockout", "Back in your car fast, with no damage to the door."),
  svc("Car Key Replacement", "Cut and programmed on site, no tow needed."),
  svc("Lost All Keys", "No key at all? We make a new one from your car."),
  svc("Transponder Key Programming", "Chip keys matched to your vehicle."),
  svc("Key Fob and Remote Programming", "New fobs and remotes set up on the spot."),
  svc("Ignition Repair", "Stuck, worn or broken ignition fixed or replaced."),
  svc("Remote Starters", "Warm up or cool down before you step in."),
  svc("Change Car Locks", "Fresh locks and keys after a theft or lost set."),
  svc("Boat and Jet Ski Keys", "Replacement keys for your boat or jet ski."),
];

const homeItems = [
  svc("House Lockout", "Locked out at home? We get you inside quickly."),
  svc("Lock Change", "New locks fitted fast, ideal after a move."),
  svc("Rekeying", "Change who has access without replacing the lock."),
  svc("Deadbolt Installation", "Solid deadbolts for stronger doors."),
  svc("High Security Locks", "Pick resistant locks for extra peace of mind."),
  svc("Smart and Keyless Locks", "Open with a code or your phone."),
  svc("Mailbox Locks", "Small locks, quick fixes, spare keys."),
  svc("Safe Opening", "Forgot the code or lost the key? We can help."),
];

const businessItems = [
  svc("Commercial Lockout", "Back into your shop or office without delay."),
  svc("Master Key Systems", "One key for the boss, limited keys for staff."),
  svc("Access Control", "Fobs, cards and codes for offices and buildings."),
  svc("Intercom and Entry Systems", "See and speak to visitors before you open up."),
  svc("CCTV", "Cameras fitted and set up to keep watch for you."),
  svc("Push Bar and Door Repair", "Exit devices and commercial doors that work."),
  svc("File Cabinet Locks", "Keep records and stock locked away."),
];

export const locksmith: SideContent = {
  side: "locksmith",
  navLinks: [
    { label: "Car", href: "#car" },
    { label: "Home", href: "#home" },
    { label: "Business", href: "#business" },
    { label: "Areas", href: "#areas" },
    { label: "Book", href: "#book" },
  ],
  groups: [
    { id: "car", title: "Car", blurb: "Keys, fobs and locks for cars, boats and jet skis.", items: carItems },
    { id: "home", title: "Home", blurb: "Stronger, smarter locks for the place you live.", items: homeItems },
    { id: "business", title: "Business", blurb: "Doors, staff and stock kept secure.", items: businessItems },
  ],
  booking: { serviceOptions: [...carItems, ...homeItems, ...businessItems].map((s) => s.title) },

  editorial: {
    heroLabel: "Locksmith · Scarborough & GTA",
    heroLine: "Locked out? We're on our way.",
    heroPrompt: "What's locked?",
    words: [
      { id: "car", label: "Car", blurb: "Lockouts, lost car keys, fob and transponder programming." },
      { id: "home", label: "Home", blurb: "Lockouts, lock changes, rekeying and deadbolts." },
      { id: "business", label: "Business", blurb: "Commercial locks, master keys and access control." },
    ],
    callLabel: "Call Now",
    bookLabel: "Book a Locksmith",
    sections: {
      car: { n: "01", name: "CAR", title: "Car", line: "Locked out, lost your keys, or need a spare? We come to you." },
      home: { n: "02", name: "HOME", title: "Home", line: "Locked out of the house, moving in, or want stronger locks? Sorted." },
      business: { n: "03", name: "BUSINESS", title: "Business", line: "Keep your doors, staff and stock secure." },
    },
    // TODO(client): confirm every claim below (mobile service, upfront pricing, local base).
    why: {
      n: "04",
      name: "WHY SB",
      title: "Why SB",
      items: [
        { title: "We come to you.", text: "Mobile service across Scarborough and the GTA, so you never have to move.", slug: "we-come-to-you" },
        { title: "Upfront pricing.", text: "You hear the price before we start work. No surprises.", slug: "upfront-pricing" },
        { title: "Car, home and business.", text: "One team for every lock you own.", slug: "car-home-and-business" },
        { title: "Local to Scarborough.", text: "We know these streets, so we get to you faster.", slug: "local-to-scarborough" },
      ],
    },
    areas: { n: "05", name: "AREAS", title: "Areas we serve", note: "Not on the list? Call us, chances are we can help." },
    reviews: { title: "What customers say", placeholderText: "Customer review goes here", placeholderName: "Name, Car" },
    book: { title: "Book a locksmith", line: "Tell us what is locked and where. We will call you back." },
    final: { headline: "Unlocked.", prefix: "Un", line: "Whatever's locked, we'll get you back in." },
    menuLinks: [
      { label: "Car", href: "#car" },
      { label: "Home", href: "#home" },
      { label: "Business", href: "#business" },
      { label: "Areas", href: "#areas" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
};
