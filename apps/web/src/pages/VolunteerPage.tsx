import { Link } from "react-router-dom";
import { SectionCard } from "../ui/SectionCard";

const volunteerRoles = [
  {
    title: "Session speaker",
    commitment: "1 hour per cohort",
    details: "Share a practical IT topic like QA testing, cloud basics, support workflows, or analyst storytelling."
  },
  {
    title: "Career mentor",
    commitment: "2 check-ins per month",
    details: "Guide participants as they rebuild confidence, tailor resumes, and choose realistic target roles."
  },
  {
    title: "Mock interviewer",
    commitment: "90 minutes per event",
    details: "Run structured practice interviews and give kind, specific feedback on communication and examples."
  }
];

const volunteerPrinciples = [
  "Meet returners where they are and avoid assuming recent industry exposure.",
  "Translate jargon into plain language and share examples from everyday work.",
  "Leave each participant with one realistic next step they can complete in a week."
];

const onboardingSteps = [
  "Complete the volunteer profile and areas of expertise.",
  "Choose one or more support tracks: speaker, mentor, or reviewer.",
  "Join the next facilitator briefing and pick an upcoming cohort slot."
];

export function VolunteerPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-soft lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-100">Volunteer hub</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Help women returning to IT careers build confidence and momentum.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            ATTA volunteers lead practical workshops, review resumes, and make the path back into tech feel
            welcoming, current, and achievable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/sessions">
              View upcoming sessions
            </Link>
            <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/admin">
              Open coordinator view
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            { label: "Active volunteers", value: "18" },
            { label: "Open mentor spots", value: "6" },
            { label: "Mock interviews this month", value: "12" }
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionCard
        eyebrow="Ways to help"
        title="Volunteer roles built for busy professionals"
        description="Each starter role maps to a clear commitment so coordinators can later connect this page to sign-up and scheduling flows."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {volunteerRoles.map((role) => (
            <article key={role.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-brand-100">{role.commitment}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{role.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{role.details}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-8 lg:grid-cols-2">
        <SectionCard
          eyebrow="Onboarding"
          title="What new volunteers do first"
          description="A lightweight checklist for the future profile and scheduling experience."
        >
          <div className="space-y-4">
            {onboardingSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-100">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-200">{step}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Volunteer tone"
          title="Coaching principles for the ATTA community"
          description="These reminders keep the experience encouraging and practical for returners."
        >
          <div className="space-y-4">
            {volunteerPrinciples.map((principle) => (
              <div key={principle} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
                {principle}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
