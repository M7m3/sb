"use client";

import { useRef, useState } from "react";
import { signIn } from "@/lib/demoSession";

type Method = "phone" | "email";
const field =
  "t-lead w-full border-0 border-b border-ink/40 bg-transparent px-0 py-3 text-ink placeholder:text-muted focus:border-b-2 focus:border-accent focus:outline-none";

/** Sign in. DEMO: any input works and signs in as the demo customer. Used on the page and in the modal. */
export function SignInFlow({ onDone, titleClass = "t-display-m" }: { onDone: () => void; titleClass?: string }) {
  const [method, setMethod] = useState<Method>("phone");
  const [stage, setStage] = useState<"enter" | "verify">("enter");
  const [value, setValue] = useState("");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const finish = () => {
    signIn();
    onDone();
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setCode((c) => c.map((x, k) => (k === i ? d : x)));
    if (d && i < 5) boxes.current[i + 1]?.focus();
  };
  const onPaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!digits.length) return;
    e.preventDefault();
    setCode((c) => c.map((_, k) => digits[k] ?? ""));
    boxes.current[Math.min(digits.length, 5)]?.focus();
  };

  return (
    <div>
      <h1 className={titleClass}>Sign in</h1>
      <p className="t-small mt-4 border-l-2 border-accent pl-3 text-ink/80" role="note">
        Demo account. Sign in is not live yet.
      </p>

      <div role="tablist" aria-label="Sign in method" className="mt-6 flex gap-2">
        {(["phone", "email"] as Method[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={method === m}
            onClick={() => {
              setMethod(m);
              setStage("enter");
              setValue("");
            }}
            className={`t-ui min-h-11 rounded-full border px-5 capitalize ${method === m ? "border-accent bg-accent/15 text-accent-light" : "border-accent/30 text-ink/80"}`}
          >
            {m}
          </button>
        ))}
      </div>

      {stage === "enter" && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            setStage("verify");
          }}
        >
          <label className="block">
            <span className="t-label mb-1 block text-accent-light">{method === "phone" ? "Phone number" : "Email"}</span>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type={method === "phone" ? "tel" : "email"}
              autoComplete={method === "phone" ? "tel" : "email"}
              placeholder={method === "phone" ? "(416) 000 0000" : "you@example.com"}
              className={field}
            />
          </label>
          <button type="submit" className="accent-bg t-ui mt-6 min-h-12 w-full rounded-full px-8 text-on-accent">
            {method === "phone" ? "Send code" : "Send sign in link"}
          </button>
        </form>
      )}

      {stage === "verify" && method === "phone" && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            finish();
          }}
        >
          <p className="t-lead">Enter the 6 digit code{value ? ` sent to ${value}` : ""}.</p>
          <div className="mt-4 flex gap-2" onPaste={onPaste}>
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  boxes.current[i] = el;
                }}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !code[i] && i > 0) boxes.current[i - 1]?.focus();
                }}
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                aria-label={`Digit ${i + 1}`}
                maxLength={1}
                className="t-heading h-14 w-11 border border-accent/40 bg-transparent text-center text-ink focus:border-accent focus:outline-none sm:w-12"
              />
            ))}
          </div>
          <p className="t-small mt-3 text-muted">Demo mode: any code works.</p>
          <button type="submit" className="accent-bg t-ui mt-6 min-h-12 w-full rounded-full px-8 text-on-accent">
            Verify and sign in
          </button>
          <button type="button" onClick={() => setStage("enter")} className="t-small mt-3 text-accent-light underline underline-offset-4">
            Use a different number
          </button>
        </form>
      )}

      {stage === "verify" && method === "email" && (
        <div className="mt-6" role="status">
          <p className="t-heading">Check your inbox</p>
          <p className="t-lead mt-3 text-ink/80">We sent a sign in link{value ? ` to ${value}` : ""}.</p>
          <button type="button" onClick={finish} className="accent-bg t-ui mt-6 min-h-12 w-full rounded-full px-8 text-on-accent">
            Open the link (demo)
          </button>
          <button type="button" onClick={() => setStage("enter")} className="t-small mt-3 text-accent-light underline underline-offset-4">
            Use a different email
          </button>
        </div>
      )}
    </div>
  );
}
