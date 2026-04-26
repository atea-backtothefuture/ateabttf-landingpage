import { Link } from "react-router-dom";
import { SectionCard } from "../ui/SectionCard";

const adminStats = [
  { label: "Participants in active cohort", value: "32" },
  { label: "Sessions confirmed", value: "6 / 8" },
  { label: "Volunteers awaiting follow-up", value: "5" },
  { label: "Resume reviews completed", value: "21" }
];

const queueItems = [
  {
    title: "Confirm June cloud workshop speaker",
    owner: "Program coordinator",
    detail: "Melissa needs the final attendee count and session brief before May 29."
  },
  {
    title: "Approve mentor pairings for cohort B",
    owner: "Volunteer lead",
    detail: "Five participants have selected mentoring and still need matches."
  },
  {
    title: "Review ATS feedback trends",
    owner: "Career services",
    detail: "Resume reviews show repeated gaps around cloud vocabulary and quantified impact bullets."
  }
];

const healthRows = [
  { label: "Attendance target", value: "85%", status: "On track" },
  { label: "Volunteer coverage", value: "75%", status: "Needs follow-up" },
  { label: "Resume review completion", value: "66%", status: "Improving" }
];

export function AdminPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-soft lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-100">Admin workspace</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Coordinate sessions, volunteers, and resume support in one place.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            This starter admin page gives ATTA coordinators a single view of cohort progress, volunteer follow-up,
            and the next actions that keep the returnship program moving.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/volunteer">
              Review volunteer hub
            </Link>
            <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/review-results">
              Preview review output
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {adminStats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <SectionCard
          eyebrow="Coordinator queue"
          title="Highest-priority actions this week"
          description="A realistic starter list for later task, reminder, and assignment integrations."
        >
          <div className="space-y-4">
            {queueItems.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-100">
                    {item.owner}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Program health"
          title="Signals to monitor across the cohort"
          description="Simple status rows that can later map to live attendance, sign-up, and review data."
        >
          <div className="space-y-4">
            {healthRows.map((row) => (
              <div key={row.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-400">{row.label}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                    {row.status}
                  </span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-white">{row.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
