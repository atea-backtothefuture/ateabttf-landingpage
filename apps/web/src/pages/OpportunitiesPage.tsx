import { featuredOpportunities } from "../data/opportunities";
import { OpportunityCard } from "../ui/OpportunityCard";
import { SectionCard } from "../ui/SectionCard";

const filters = ["Career restart", "Resume", "Interview prep", "QA", "Cloud", "Data"];

export function OpportunitiesPage() {
  return (
    <div className="space-y-8">
      <SectionCard
        eyebrow="8-session program"
        title="Session cards with expandable agendas and planned dates"
        description="Starter listing view for the public program hub. This page can later support filters, registration, and richer session detail pages."
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
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {featuredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
