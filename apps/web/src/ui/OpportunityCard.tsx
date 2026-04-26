import { Link } from "react-router-dom";
import type { Opportunity } from "../data/opportunities";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-sm text-brand-100">
        <span className="rounded-full bg-brand-500/15 px-3 py-1">{opportunity.category}</span>
        <span>{opportunity.location}</span>
        <span className="text-slate-400">-</span>
        <span>{opportunity.status}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{opportunity.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{opportunity.summary}</p>
      <p className="mt-3 text-sm text-slate-400">Led by {opportunity.speaker}</p>
      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
        <p className="font-medium text-white">Agenda preview</p>
        <ul className="mt-2 space-y-2">
          {opportunity.agenda.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-400">
          {opportunity.commitment} - {opportunity.plannedDate}
        </span>
        <Link
          className="rounded-full bg-white px-4 py-2 font-medium text-slate-950 transition hover:bg-brand-100"
          to={`/sessions/${opportunity.id}`}
        >
          View session
        </Link>
      </div>
    </article>
  );
}
