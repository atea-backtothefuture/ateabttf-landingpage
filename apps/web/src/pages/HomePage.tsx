import { Link } from "react-router-dom";
import { useSessions } from "../hooks/useSessions";
import { toOpportunityCard } from "../lib/session-utils";
import { featuredOpportunities } from "../data/opportunities";
import { OpportunityCard } from "../ui/OpportunityCard";
import { SectionCard } from "../ui/SectionCard";

const stats = [
  { label: "Sessions in the program", value: "8" },
  { label: "Session length", value: "1 hour" },
  { label: "Volunteer speakers", value: "12+" }
];

export function HomePage() {
  const { sessions, error } = useSessions();
  const featuredCards = sessions.length > 0 ? sessions.slice(0, 3).map(toOpportunityCard) : featuredOpportunities;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-soft lg:grid-cols-[1.4fr,0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-100">Back to Tech with confidence</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            A shared hub for women returning to IT careers after a break.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            This starter experience brings together an 8-session learning program, volunteer-led role spotlights,
            and an ATS-style resume review flow that helps participants bridge skill gaps with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/sessions">
              Explore sessions
            </Link>
            <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/resume-review">
              Try resume review
            </Link>
            <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/volunteer">
              Become a volunteer
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionCard
        eyebrow="Featured sessions"
        title="Start with the first three topic cards in the 8-session journey"
        description="These cards are seeded from local content now and can later be hydrated from D1 through the Cloudflare Worker."
      >
        {error ? <p className="mb-4 text-sm text-amber-200">{error}</p> : null}
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredCards.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Resume support"
        title="ATS-style feedback for resumes and job descriptions"
        description="Participants can upload a resume, paste a target job description, and get strengths, gaps, rewrite ideas, and short concept-video recommendations."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Keyword and skill alignment",
            "Targeted resume improvement ideas",
            "Short learning videos for missing concepts"
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
