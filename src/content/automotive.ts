import { svc } from "./helpers";
import type { SideContent } from "./types";

const diagnoseItems = [
  svc("Computer Diagnostics", "Full scans to find the real cause, not just the code."),
  svc("Check Engine Light", "We read the fault and explain it in plain English."),
  svc("Immobilizer Repair", "Cranks but will not start? We fix the security link."),
  svc("ECU Repair and Programming", "Repair, reflash and programming for engine computers."),
  svc("Electrical Faults", "Tracking down drains, shorts and flickering lights."),
];

const repairItems = [
  svc("Brakes", "Pads, rotors and fluid for confident stopping."),
  svc("Suspension and Steering", "A smoother, tighter ride and straighter driving."),
  svc("Engine Repair", "From small leaks to major engine work."),
  svc("Transmission", "Service and repair for smooth, reliable shifting."),
  svc("Exhaust", "Quiet, clean exhaust repairs and replacements."),
  svc("Timing Chain", "Replace a noisy or stretched chain before it fails."),
];

const serviceItems = [
  svc("Oil Change", "Fresh oil and a quick check of the basics."),
  svc("Tires and Alignment", "Better grip, even wear and straight tracking."),
  svc("Fluids and Filters", "Keep everything flowing and breathing well."),
  svc("A/C Service", "Cold air when you need it, all summer long."),
  svc("Pre Sale Inspection", "Know exactly what you are buying or selling."),
  svc("Safety Certification", "Inspection and certification to get you road legal."),
];

export const automotive: SideContent = {
  side: "automotive",
  navLinks: [
    { label: "Diagnose", href: "#diagnose" },
    { label: "Repair", href: "#repair" },
    { label: "Service", href: "#service" },
    { label: "Areas", href: "#areas" },
    { label: "Book", href: "#book" },
  ],
  groups: [
    { id: "diagnose", title: "Diagnose", blurb: "Modern cars run on software. We read it and fix it.", items: diagnoseItems },
    { id: "repair", title: "Repair", blurb: "Solid repairs that keep you safe and moving.", items: repairItems },
    { id: "service", title: "Service", blurb: "Simple upkeep that avoids big bills later.", items: serviceItems },
  ],
  booking: { serviceOptions: [...diagnoseItems, ...repairItems, ...serviceItems].map((s) => s.title) },

  editorial: {
    heroLabel: "Automotive · Scarborough & GTA",
    heroLine: "Car Won't Start? We'll Find Out Why.",
    heroPrompt: "What do you need?",
    words: [
      { id: "diagnose", label: "Diagnose", blurb: "Computer diagnostics, check engine light, immobilizer and ECU." },
      { id: "repair", label: "Repair", blurb: "Brakes, suspension, engine, transmission and exhaust." },
      { id: "service", label: "Service", blurb: "Oil changes, tires, fluids, filters and A/C." },
    ],
    callLabel: "Call Now",
    bookLabel: "Book Your Car In",
    sections: {
      diagnose: {
        n: "01",
        name: "DIAGNOSE",
        title: "Diagnose",
        line: "Warning light on, or car won't start? We find the real cause.",
      },
      repair: { n: "02", name: "REPAIR", title: "Repair", line: "From small fixes to big jobs, done properly." },
      service: { n: "03", name: "SERVICE", title: "Service", line: "Keep it running smooth." },
    },
    // TODO(client): confirm every claim below (dealer level tools, European cars, local base).
    why: {
      n: "04",
      name: "WHY SB",
      title: "Why SB",
      items: [
        { title: "Dealer level tools.", text: "The right equipment to read and fix modern cars.", slug: "dealer-level-tools" },
        { title: "Honest advice.", text: "We tell you what needs doing now and what can wait.", slug: "honest-advice" },
        { title: "European cars welcome.", text: "BMW, Mercedes, Audi and more are part of our daily work.", slug: "european-cars-welcome" },
        { title: "Local to Scarborough.", text: "A neighbourhood shop that knows its customers.", slug: "auto-local-to-scarborough" },
      ],
    },
    areas: {
      n: "05",
      name: "BRANDS AND AREAS",
      title: "Brands and areas",
      note: "Not on the list? Call us, chances are we can help.",
      // Text only. Not affiliated with any manufacturer.
      brands: {
        title: "Makes we work on",
        list: [
          "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche", "Land Rover", "Jaguar", "Toyota",
          "Honda", "Lexus", "Nissan", "Hyundai", "Kia", "Ford", "Chevrolet", "Jeep",
        ],
      },
    },
    reviews: { title: "What customers say", placeholderText: "Customer review goes here", placeholderName: "Name, Car" },
    book: { title: "Book your car in", line: "Tell us what is going on and we will call you back with a time and a fair quote." },
    final: { headline: "Sorted.", line: "Whatever's wrong, we'll get you back on the road." },
    menuLinks: [
      { label: "Diagnose", href: "#diagnose" },
      { label: "Repair", href: "#repair" },
      { label: "Service", href: "#service" },
      { label: "Areas", href: "#areas" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
};
