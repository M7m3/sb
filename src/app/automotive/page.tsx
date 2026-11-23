import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { automotive } from "@/content/automotive";

export const metadata: Metadata = {
  title: "SB Automotive | Diagnostics and Repair in Scarborough",
};

export default function Page() {
  return <EditorialPage content={automotive} />;
}
