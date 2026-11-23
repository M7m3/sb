import Link from "next/link";
import { KeyCut } from "@/components/brand/KeyCut";

export default function NotFound() {
  return (
    <section className="sec-ink flex min-h-[80svh] items-center py-32">
      <div className="mx-auto w-full max-w-3xl px-5 text-center">
        <KeyCut name="not-found" size={220} animate variant="line" className="mx-auto text-accent" />
        <p className="t-label mt-8 text-accent-light">Error 404</p>
        <h1 className="t-display-l mt-3">Wrong key.</h1>
        <p className="t-lead mx-auto mt-4 max-w-md text-ink/80">That page does not exist. Let us get you back to the right door.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="accent-bg t-ui rounded-full px-8 py-4 text-on-accent">
            Locksmith
          </Link>
          <Link href="/automotive" className="t-ui rounded-full border border-accent/60 px-8 py-4 text-ink hover:bg-accent/10">
            Automotive
          </Link>
        </div>
      </div>
    </section>
  );
}
