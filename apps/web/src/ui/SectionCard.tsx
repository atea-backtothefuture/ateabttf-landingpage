import { PropsWithChildren } from "react";

type SectionCardProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
}>;

export function SectionCard({ eyebrow, title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-soft">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.25em] text-brand-100">{eyebrow}</p> : null}
      <div className="mt-2">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm text-slate-300">{description}</p> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

