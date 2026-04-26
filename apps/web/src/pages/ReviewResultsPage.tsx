import { Link, useParams } from "react-router-dom";
import { useReview } from "../hooks/useReview";
import { SectionCard } from "../ui/SectionCard";

const scoreCards = [
  { label: "Role match", value: "78%", detail: "Strong alignment on QA and support operations keywords." },
  { label: "Missing concepts", value: "4", detail: "Cloud deployment, CI/CD, incident response, and metrics." },
  { label: "Rewrite ideas", value: "6", detail: "Focused on stronger action verbs and measurable impact." }
];

const strengths = [
  "Clear service desk and troubleshooting background that maps well to support and QA roles.",
  "Customer communication examples show empathy, ownership, and follow-through.",
  "Recent coursework demonstrates active upskilling during the career return journey."
];

const gaps = [
  "Add hands-on language around test cases, bug tracking, or QA tools if applicable.",
  "Explain current familiarity with cloud platforms, even at a beginner project level.",
  "Quantify scope and outcomes on prior roles instead of listing responsibilities only."
];

const learningPlaylist = [
  { title: "Intro to CI/CD for beginners", duration: "8 min" },
  { title: "Writing measurable resume bullets", duration: "6 min" },
  { title: "Cloud vocabulary for returners", duration: "10 min" }
];

export function ReviewResultsPage() {
  const { reviewId } = useParams();
  const { review, loading, error } = useReview(reviewId);
  const dynamicScoreCards = review
    ? [
        { label: "Role match", value: `${review.score}%`, detail: `Target role: ${review.targetRole ?? "IT role"}.` },
        { label: "Missing concepts", value: `${review.gaps.length}`, detail: "Concepts and keywords that need stronger evidence." },
        { label: "Rewrite ideas", value: `${review.improvements.length}`, detail: "Starter edits to improve ATS-style alignment." }
      ]
    : scoreCards;
  const dynamicStrengths = review ? review.strengths.map((item) => item.content) : strengths;
  const dynamicGaps = review
    ? review.gaps.map((item) => item.recommendation ?? `Add stronger evidence for ${item.concept}.`)
    : gaps;
  const dynamicPlaylist = review
    ? review.videos.map((item) => ({
        title: item.title,
        duration: item.durationSeconds ? `${Math.ceil(item.durationSeconds / 60)} min` : "Short"
      }))
    : learningPlaylist;

  return (
    <div className="space-y-8">
      {loading ? <p className="text-sm text-slate-300">Loading saved review...</p> : null}
      {error ? <p className="text-sm text-amber-200">{error}</p> : null}
      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-soft lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-100">Review results</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            A clear snapshot of resume strengths, gaps, and next learning steps.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            {review
              ? "This saved review comes from the placeholder API contract and shows how live ATS-style feedback can be rendered."
              : "This starter page mirrors the output ATTA participants can expect after comparing a resume with a target IT job description."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/resume-review">
              Back to review flow
            </Link>
            <Link className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white" to="/sessions/resume-refresh">
              Join resume workshop
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {dynamicScoreCards.map((card) => (
            <div key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-2 text-sm text-slate-300">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <SectionCard
          eyebrow="Strengths to keep"
          title="Signals already working in the resume"
          description="Positive feedback first so participants know what not to remove while editing."
        >
          <div className="space-y-4">
            {dynamicStrengths.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Targeted gaps"
          title="Changes that will improve alignment fastest"
          description="Focused coaching points tied to common returnship resume issues."
        >
          <div className="space-y-4">
            {dynamicGaps.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <SectionCard
          eyebrow="Rewrite example"
          title="How a generic bullet becomes stronger"
          description="A simple before-and-after pattern for later model-generated suggestions."
        >
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
            <p className="text-slate-400">Before</p>
            <p>Responsible for supporting users and documenting issues.</p>
            <p className="pt-4 text-slate-400">After</p>
            <p>
              Resolved 20+ weekly support tickets, documented recurring issues, and partnered with engineers to reduce
              repeat incidents for internal users.
            </p>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Learning playlist"
          title="Short videos to close concept gaps"
          description="Seed content for the later concept-video recommendation area."
        >
          <div className="space-y-4">
            {dynamicPlaylist.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-100">
                    {item.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
