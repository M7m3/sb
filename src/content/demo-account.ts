// DEMO DATA for the account area. One made-up customer. No real personal data.
import { images, type ImageSlot } from "./images";
import type { Side } from "./site";

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  colour: string;
  photo: ImageSlot;
  keysOnFile: number;
  lastService: string;
};

export type Place = { id: string; label: "Home" | "Business"; address: string; locks: string[] };

export type Job = {
  id: string;
  date: string; // ISO
  side: Side;
  service: string;
  vehicleId?: string;
  placeId?: string;
  tech: string; // first name only
  status: "Completed";
  notes: string;
  price: string; // placeholder
  photos: ImageSlot[];
};

export type Booking = {
  id: string;
  date: string;
  side: Side;
  service: string;
  window: string;
  status: "Confirmed" | "Completed";
  where: string;
};

export const demoVehicles: Vehicle[] = [
  { id: "v1", make: "Toyota", model: "RAV4", year: 2019, colour: "Silver", photo: images.account.vehicleA, keysOnFile: 2, lastService: "2026-09-12" },
  { id: "v2", make: "BMW", model: "330i", year: 2016, colour: "Blue", photo: images.account.vehicleB, keysOnFile: 1, lastService: "2026-02-03" },
];

export const demoPlaces: Place[] = [
  {
    id: "p1",
    label: "Home",
    address: "12 Example Crescent, Scarborough",
    locks: ["Front door deadbolt, rekeyed Mar 2026", "Back door lockset, fitted Mar 2026"],
  },
  {
    id: "p2",
    label: "Business",
    address: "200 Sample Road, Unit 4, Scarborough",
    locks: ["Shop front high security lock, fitted Jun 2025", "Master key system, 12 keys, 3 access levels"],
  },
];

// Newest first.
export const demoJobs: Job[] = [
  { id: "j1", date: "2026-10-14", side: "locksmith", service: "Car Key Replacement", vehicleId: "v1", tech: "Sam", status: "Completed", notes: "Programmed 2 new smart keys, removed lost key from immobilizer.", price: "$000.00", photos: [images.account.jobA, images.account.jobB] },
  { id: "j2", date: "2026-09-12", side: "automotive", service: "Oil Change", vehicleId: "v1", tech: "Priya", status: "Completed", notes: "Oil and filter changed. Tire pressures set.", price: "$000.00", photos: [images.account.jobC] },
  { id: "j3", date: "2026-07-02", side: "locksmith", service: "House Lockout", placeId: "p1", tech: "Sam", status: "Completed", notes: "Front door opened without damage.", price: "$000.00", photos: [] },
  { id: "j4", date: "2026-05-20", side: "automotive", service: "Brakes", vehicleId: "v2", tech: "Dan", status: "Completed", notes: "Front pads and rotors replaced. Brake fluid checked.", price: "$000.00", photos: [images.account.jobA, images.account.jobC] },
  { id: "j5", date: "2026-03-18", side: "locksmith", service: "Rekeying", placeId: "p1", tech: "Sam", status: "Completed", notes: "Rekeyed front and back doors. 4 keys cut.", price: "$000.00", photos: [images.account.jobB] },
  { id: "j6", date: "2026-02-03", side: "automotive", service: "Computer Diagnostics", vehicleId: "v2", tech: "Priya", status: "Completed", notes: "Check engine light traced to a faulty sensor. Sensor replaced and code cleared.", price: "$000.00", photos: [images.account.jobA] },
  { id: "j7", date: "2025-11-09", side: "locksmith", service: "Master Key Systems", placeId: "p2", tech: "Jordan", status: "Completed", notes: "12 keys cut across 3 access levels. Key list handed over.", price: "$000.00", photos: [images.account.jobB, images.account.jobC] },
  { id: "j8", date: "2025-06-17", side: "locksmith", service: "Lock Change", placeId: "p2", tech: "Sam", status: "Completed", notes: "New high security lock fitted on the shop front.", price: "$000.00", photos: [] },
];

export const demoBookings: Booking[] = [
  { id: "b1", date: "2026-12-02", side: "locksmith", service: "Deadbolt Installation", window: "Morning", status: "Confirmed", where: "12 Example Crescent, Scarborough" },
  { id: "b0", date: "2026-10-14", side: "locksmith", service: "Car Key Replacement", window: "Afternoon", status: "Completed", where: "Scarborough Town Centre lot" },
  { id: "b00", date: "2026-09-12", side: "automotive", service: "Oil Change", window: "Morning", status: "Completed", where: "SB workshop" },
];

export const demoCustomer = { first: "Alex", last: "Morgan", email: "alex.morgan@example.com", phone: "(416) 555-0142", since: "Jun 2025" };

export const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(iso + "T12:00:00Z"));
