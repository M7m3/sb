// Every photo slot on the site. These are placeholders from Unsplash (next/image serves them as WebP).
// To use your own photo, drop a WebP file in /public/photos/ and set src to "/photos/your-file.webp".
// Slot names are the keys, for example images.car.lockout.
export type ImageSlot = { src: string; alt: string };

const u = (id: string, w = 1200): string => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const slot = (id: string, alt: string, w?: number): ImageSlot => ({ src: u(id, w), alt });

export const images = {
  car: {
    lockout: slot("1541443131876-44b03de101c5", "A parked car, locked out"),
    keyReplacement: slot("1449965408869-eaa3f722e40d", "Hand on a steering wheel"),
    lostAllKeys: slot("1609521263047-f8f205293f24", "A dark car at dusk"),
    transponder: slot("1530046339160-ce3e530c7d2f", "Workshop with tools"),
    fob: slot("1580273916550-e323be2ae537", "A car with a smart key"),
    ignition: slot("1494976388531-d1058494cdd8", "A dark sports car"),
    remoteStarter: slot("1568605117036-5fe5e7bab0b7", "A car on an open road"),
    changeLocks: slot("1583121274602-3e2820c69888", "A car parked at a garage door"),
    boatKeys: slot("1533473359331-0135ef1b58bf", "An SUV outdoors"),
  },
  home: {
    door: slot("1570129477492-45c003edd2be", "Front door of a house", 1600),
  },
  business: {
    storefront: slot("1528698827591-e19ccd7bc23d", "A storefront at dusk", 1400),
    access: slot("1582139329536-e7284fece509", "A vault door"),
    cctv: slot("1590859808308-3d2d9c515b1a", "Security technology"),
    pushBar: slot("1497366216548-37526070297c", "A commercial corridor with doors"),
  },
  account: {
    vehicleA: slot("1517524008697-84bbe3c3fd98", "A white SUV", 800),
    vehicleB: slot("1541443131876-44b03de101c5", "A blue coupe", 800),
    jobA: slot("1530046339160-ce3e530c7d2f", "Workshop", 500),
    jobB: slot("1449965408869-eaa3f722e40d", "Steering wheel", 500),
    jobC: slot("1583121274602-3e2820c69888", "Garage", 500),
  },
} as const;

/** Photo for a Car service row, by service slug. */
export const carPhotoBySlug: Record<string, ImageSlot> = {
  "car-lockout": images.car.lockout,
  "car-key-replacement": images.car.keyReplacement,
  "lost-all-keys": images.car.lostAllKeys,
  "transponder-key-programming": images.car.transponder,
  "key-fob-and-remote-programming": images.car.fob,
  "ignition-repair": images.car.ignition,
  "remote-starters": images.car.remoteStarter,
  "change-car-locks": images.car.changeLocks,
  "boat-and-jet-ski-keys": images.car.boatKeys,
};
