import type { Metadata } from "next";
import { LocksmithPage } from "@/components/locksmith/LocksmithPage";
import { locksmith } from "@/content/locksmith";

export const metadata: Metadata = {
  title: "SB Locksmith | Car, Home and Business Locksmith in Scarborough",
};

export default function Page() {
  return <LocksmithPage content={locksmith} />;
}
