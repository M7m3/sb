import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";

export const metadata: Metadata = { title: "My account | SB" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AccountShell>{children}</AccountShell>;
}
