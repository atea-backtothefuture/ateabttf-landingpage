import { featuredOpportunities } from "../data/opportunities";
import { useSessions } from "../hooks/useSessions";
import { toOpportunityCard } from "../lib/session-utils";
import { OpportunityCard } from "../ui/OpportunityCard";
import { SectionCard } from "../ui/SectionCard";

const filters = ["Career restart", "Resume", "Interview prep", "QA", "Cloud", "Data"];

export function OpportunitiesPage() {
  const { sessions, loading, error } = useSessions();
  const cards = sessions.length > 0 ? sessions.map(toOpportunityCard) : featuredOpportunities;

  return (
    <div className="space-y-8">
      <SectionCard
        eyebrow="8-session program"
        title="Session cards with agendas, speakers, and detailed workshop views"
        description="Starter listing view for the public program hub. This page can later support filters, registration, attendance tracking, and live session detail content."
      >
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-brand-500/60 hover:text-white"
            >
              {filter}
            </button>
          ))}
        </div>
        {loading ? <p className="mt-6 text-sm text-slate-300">Loading live sessions...</p> : null}
        {error ? <p className="mt-6 text-sm text-amber-200">{error}</p> : null}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {cards.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
