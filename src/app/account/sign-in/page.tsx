import type { Metadata } from "next";
import { SignInPage } from "@/components/account/SignInPage";

export const metadata: Metadata = { title: "Sign in | SB" };

export default function Page() {
  return <SignInPage />;
}
