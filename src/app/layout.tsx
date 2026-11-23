import type { Metadata, Viewport } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { SideProvider } from "@/components/SideProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SignInModal } from "@/components/account/SignInModal";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

// Set NEXT_PUBLIC_SITE_URL to the real domain at launch so preview images resolve.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "SB | Locksmith and Automotive Service in Scarborough",
  description:
    "Car, home and business locksmith plus automotive diagnostics and repair in Scarborough, Toronto and the GTA.",
  // Fixed brand image for link previews (WebP, gold logo).
  openGraph: { images: [{ url: "/brand/logo-gold.webp" }] },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b", // must be a literal. Keep in sync with --base in globals.css
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${archivo.variable}`}>
      <body className="antialiased">
        <SideProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <SignInModal />
        </SideProvider>
      </body>
    </html>
  );
}
