export function PageHeading({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="t-label text-accent-light">{label}</p>
        <h1 className="t-display-m mt-3">{title}</h1>
      </div>
      {children}
    </header>
  );
}

export const card = "border border-line bg-surface p-5 sm:p-6";
