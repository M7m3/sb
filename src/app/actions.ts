"use server";

export type BookingState = {
  status: "idle" | "saved" | "demo" | "error";
  message: string;
};

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

export async function createBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const side = str(formData.get("side")) === "AUTOMOTIVE" ? "AUTOMOTIVE" : "LOCKSMITH";
  const service = str(formData.get("service"));
  const name = str(formData.get("name"));
  const phone = str(formData.get("phone"));
  const area = str(formData.get("area"));
  const email = str(formData.get("email"));
  const vehicleMake = str(formData.get("vehicleMake"));
  const vehicleModel = str(formData.get("vehicleModel"));
  const message = str(formData.get("message"));
  const dateRaw = str(formData.get("preferredDate"));

  if (!name || !service || !area || phone.replace(/\D/g, "").length < 7) {
    return {
      status: "error",
      message: "Please add your name, a phone number, a service and your area.",
    };
  }

  // No database configured: the site still works as a demo.
  if (!process.env.DATABASE_URL) {
    return { status: "demo", message: "Demo mode, booking not saved. Connect a database to save requests." };
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const date = dateRaw ? new Date(dateRaw) : null;
    await prisma.booking.create({
      data: {
        side,
        service,
        name,
        phone,
        area,
        email: email || null,
        vehicleMake: vehicleMake || null,
        vehicleModel: vehicleModel || null,
        message: message || null,
        preferredDate: date && !Number.isNaN(date.getTime()) ? date : null,
      },
    });
    return { status: "saved", message: "Thanks! We got your request and will call you back soon." };
  } catch {
    return { status: "demo", message: "Demo mode, booking not saved. The database could not be reached." };
  }
}
