// Copy and data for the locksmith page sections that have their own layout.
// Edit text here, not in the components.

export const carPicker = {
  label: "What do you drive?",
  placeholder: "Choose your make",
  // {make} is replaced with the chosen make.
  yes: "Yes, we cut and program keys for {make}.",
  cta: "Book a key",
  ctaService: "car-key-replacement",
  // TODO(client): confirm the list of makes you cut and program keys for.
  makes: [
    "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia", "Mazda", "Subaru", "Volkswagen",
    "BMW", "Mercedes-Benz", "Audi", "Lexus", "Jeep", "Dodge", "RAM", "GMC", "Tesla",
  ],
};

/** Hotspots on the front door photo. x and y are percentages of the photo. Move them to match your own photo. */
export const doorHotspots: { id: string; label: string; slug: string; x: number; y: number }[] = [
  { id: "deadbolt", label: "Deadbolt", slug: "deadbolt-installation", x: 56, y: 56 },
  { id: "handle", label: "Handle and lockset", slug: "lock-change", x: 60, y: 66 },
  { id: "keypad", label: "Smart lock", slug: "smart-and-keyless-locks", x: 68, y: 58 },
  { id: "frame", label: "Door frame", slug: "rekeying", x: 47, y: 48 },
  { id: "mailbox", label: "Mailbox", slug: "mailbox-locks", x: 22, y: 72 },
  { id: "lockout", label: "Locked out", slug: "house-lockout", x: 50, y: 68 },
];

export const businessBento = {
  storefront: { label: "Storefront and shop security", slug: "commercial-lockout" },
  access: { label: "Access control", slug: "access-control" },
  cctv: { label: "CCTV", slug: "cctv" },
  pushBar: { label: "Push bars and doors", slug: "push-bar-and-door-repair" },
  lockout: { title: "Commercial lockouts", line: "Back into the shop fast.", slug: "commercial-lockout" },
  tree: {
    label: "Master key systems",
    slug: "master-key-systems",
    caption: "One key for you. The right access for everyone else.",
    keys: ["Manager", "Staff", "Storage"],
  },
};

export const howItWorks = {
  n: "04",
  name: "HOW IT WORKS",
  title: "How it works",
  steps: [
    { n: "01", title: "Call", text: "Tell us what is locked and where you are." },
    { n: "02", title: "We come to you", text: "A technician drives to you with the tools to do the job on site." },
    { n: "03", title: "You're back in", text: "Door open, key cut or lock fixed. Then you get on with your day." },
  ],
  // TODO(client): confirm each promise before launch.
  promises: ["Upfront pricing", "Car, home and business", "Local to Scarborough", "Fast response"],
};

export const areasCopy = {
  n: "05",
  name: "AREAS",
  title: "Areas we serve",
  note: "Not on the list? Call us, chances are we can help.",
};

export const reviewsWall = {
  title: "What customers say",
  // TODO(client): replace the badge with the real Google rating once reviews exist.
  badge: { label: "Google rating", note: "Reviews coming soon" },
  // Placeholders only. Do not invent reviews.
  text: "Customer review goes here",
  names: [
    "Name, Car Lockout",
    "Name, Rekeying",
    "Name, Key Fob Programming",
    "Name, Deadbolt Installation",
    "Name, Master Key Systems",
    "Name, Lost All Keys",
  ],
};

// TODO(client): confirm every factual answer (arrival times, payment methods, damage policy).
export const faq = {
  title: "Questions",
  items: [
    {
      q: "How fast can you get to me?",
      a: "We come to you across Scarborough and the GTA. Call us and we will give you a real arrival time based on where you are.",
    },
    {
      q: "Can you make a car key without the original?",
      a: "In most cases, yes. We can cut and program a new key from your car, so you do not need the original.",
    },
    {
      q: "Will you damage my car or door?",
      a: "No. We use professional tools and careful methods to get you in without damage.",
    },
    {
      q: "Do you program key fobs and remotes?",
      a: "Yes. We program fobs, remotes and transponder keys for most makes and models.",
    },
    {
      q: "Do you work on home and business locks?",
      a: "Yes. Lockouts, lock changes, rekeying, deadbolts, master key systems and access control.",
    },
    {
      q: "How do I pay?",
      a: "We confirm payment options when you book. You hear the price before we start any work.",
    },
  ],
};

export const bookFlow = {
  title: "Book a locksmith",
  line: "Four quick steps. We will call you back.",
  steps: ["What's locked?", "Which service?", "Where and when?", "Your details"],
  categories: [
    { id: "car", label: "Car" },
    { id: "home", label: "Home" },
    { id: "business", label: "Business" },
  ],
  windows: ["Morning", "Afternoon", "Evening", "Any time"],
  success: "Booked. We'll call you shortly.",
};
