import { SectionCard } from "../ui/SectionCard";

const tasks = [
  { title: "Upload resume and target job description", status: "Step 1" },
  { title: "Review strengths, gaps, and suggested edits", status: "Step 2" },
  { title: "Watch short concept videos and update resume", status: "Step 3" }
];

const pipeline = [
  { label: "Matched skills", value: "14" },
  { label: "Concept gaps", value: "4" },
  { label: "Suggested next actions", value: "3" }
];

export function DashboardPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr,0.85fr]">
      <SectionCard
        eyebrow="ATS-style resume review"
        title="How the guided review experience works"
        description="This placeholder page shows the shape of the resume + job description flow before it is wired to uploads, R2, and live API scoring."
      >
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.title}
              className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <span className="font-medium text-white">{task.title}</span>
              <span className="rounded-full bg-brand-500/15 px-3 py-1 text-sm text-brand-100">{task.status}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Sample output"
        title="What the results page will summarize"
        description="Simple KPI cards to anchor the later API-backed review results."
      >
        <div className="space-y-4">
          {pipeline.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
