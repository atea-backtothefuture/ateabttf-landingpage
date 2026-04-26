import { Link, useParams } from "react-router-dom";
import { getOpportunityById } from "../data/opportunities";
import { useSession } from "../hooks/useSessions";
import { formatSessionDate, toOpportunityCard } from "../lib/session-utils";
import { SectionCard } from "../ui/SectionCard";

export function SessionDetailPage() {
  const { sessionId = "" } = useParams();
  const { session: liveSession, loading, error } = useSession(sessionId);
  const session = liveSession ? toOpportunityCard(liveSession) : getOpportunityById(sessionId);

  if (!session) {
    return (
      <SectionCard
        eyebrow="Session detail"
        title="We could not find that session"
        description="The requested workshop is not in the starter dataset yet."
      >
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/sessions">
            Back to sessions
          </Link>
        </div>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-8">
      {loading ? <p className="text-sm text-slate-300">Loading live session details...</p> : null}
      {error ? <p className="text-sm text-amber-200">{error}</p> : null}
      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-soft lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-100">{session.category}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">{session.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{session.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/sessions">
              Back to sessions
            </Link>
            <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/volunteer">
              Volunteer for this track
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            { label: "Date", value: liveSession ? formatSessionDate(liveSession.plannedDate) : session.plannedDate },
            { label: "Format", value: `${session.location} - ${session.commitment}` },
            { label: "Facilitator", value: session.speaker },
            { label: "Audience", value: session.audience }
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <SectionCard
          eyebrow="Agenda"
          title="What participants cover during the workshop"
          description="A concrete starter agenda for the selected ATTA session."
        >
          <div className="space-y-4">
            {session.agenda.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-100">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Expected outcomes"
          title="What attendees should leave with"
          description="These are the practical takeaways coordinators can align to post-session follow-up."
        >
          <div className="space-y-4">
            {session.outcomes.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        eyebrow="Preparation"
        title="Suggested prep before the session"
        description="Simple prompts that help returners arrive ready to participate."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {liveSession?.resources?.length
            ? liveSession.resources.map((item) => (
                <a
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200"
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              ))
            : session.prep.map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
              {item}
            </div>
              ))}
        </div>
      </SectionCard>
    </div>
  );
}
