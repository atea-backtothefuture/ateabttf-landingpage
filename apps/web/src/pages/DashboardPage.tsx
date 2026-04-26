import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createReview } from "../lib/api";
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
  const navigate = useNavigate();
  const [targetRole, setTargetRole] = useState("QA Analyst");
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const review = await createReview({
        targetRole,
        resumeText,
        jobDescriptionText
      });

      navigate(`/review-results/${review.id}`);
    } catch {
      setError("We could not create the placeholder review just yet. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr,0.85fr]">
      <SectionCard
        eyebrow="ATS-style resume review"
        title="How the guided review experience works"
        description="This starter flow shows how participants compare a resume against a target IT role before uploads, R2 storage, and live API scoring are wired in."
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
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Target role</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              onChange={(event) => setTargetRole(event.target.value)}
              value={targetRole}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Resume text</span>
            <textarea
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste the current resume text here for the placeholder review flow."
              value={resumeText}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Job description</span>
            <textarea
              className="min-h-40 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              onChange={(event) => setJobDescriptionText(event.target.value)}
              placeholder="Paste a target job description here."
              value={jobDescriptionText}
            />
          </label>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading || !jobDescriptionText.trim()}
              type="submit"
            >
              {loading ? "Generating review..." : "Generate placeholder review"}
            </button>
            <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/review-results">
              Preview static results
            </Link>
          </div>
        </form>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/review-results">
            Preview results page
          </Link>
          <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/sessions/resume-refresh">
            Open resume workshop
          </Link>
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Sample output"
        title="What the results page summarizes"
        description="Simple KPI cards and next-step coaching to anchor the later API-backed review output."
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
