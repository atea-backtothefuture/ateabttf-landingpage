export type OpportunityStatus = "Planned" | "Open" | "Completed";

export type Opportunity = {
  id: string;
  title: string;
  category: string;
  location: string;
  commitment: string;
  summary: string;
  agenda: string[];
  plannedDate: string;
  status: OpportunityStatus;
  speaker: string;
  audience: string;
  outcomes: string[];
  prep: readonly string[];
};

export const featuredOpportunities: Opportunity[] = [
  {
    id: "returning-to-tech",
    title: "Returning to Tech With Confidence",
    category: "Career Restart",
    location: "Virtual",
    commitment: "60 min",
    summary: "Set goals, rebuild confidence, and map the return-to-work path for women re-entering IT careers.",
    agenda: [
      "Program welcome and peer introductions",
      "Common return-to-work challenges in IT",
      "Personal action plan for the next 8 sessions"
    ],
    plannedDate: "May 12, 2026",
    status: "Open",
    speaker: "Nadia K., ATTA program mentor",
    audience: "Women restarting careers in QA, support, analyst, and cloud pathways",
    outcomes: [
      "A personal return-to-work goal for the cohort",
      "A confidence-building routine for the next 30 days",
      "A short list of target roles to explore"
    ],
    prep: [
      "Bring one recent job post that feels interesting",
      "List three strengths from past experience",
      "Be ready to share your career-break story if comfortable"
    ]
  },
  {
    id: "resume-refresh",
    title: "Resume Refresh for IT Roles",
    category: "Resume",
    location: "Virtual",
    commitment: "60 min",
    summary: "Review modern IT resume structure, ATS-style formatting, and role-specific bullet writing.",
    agenda: [
      "ATS-style structure and common resume mistakes",
      "Turning past work into impact-focused bullets",
      "Tailoring for analyst, QA, cloud, and support roles"
    ],
    plannedDate: "May 19, 2026",
    status: "Planned",
    speaker: "Priya S., senior technical recruiter",
    audience: "Participants updating resumes for entry and mid-level IT opportunities",
    outcomes: [
      "A cleaner resume layout for ATS parsing",
      "Three rewritten bullets focused on impact",
      "A checklist for tailoring resumes to job descriptions"
    ],
    prep: [
      "Upload your current resume draft",
      "Highlight one role you want to target this quarter",
      "Collect two accomplishments you want to feature"
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud and DevOps Fundamentals",
    category: "Technical Skills",
    location: "Remote",
    commitment: "60 min",
    summary: "Learn the core cloud, deployment, and DevOps language that appears in many current job descriptions.",
    agenda: [
      "What cloud, CI/CD, and infrastructure mean in practice",
      "Where to start with Azure, AWS, and GitHub Actions",
      "How to position beginner familiarity on a resume"
    ],
    plannedDate: "June 2, 2026",
    status: "Planned",
    speaker: "Melissa R., cloud platform engineer",
    audience: "Participants building technical vocabulary for modern infrastructure teams",
    outcomes: [
      "A beginner map of cloud and DevOps terms",
      "Two starter projects to build confidence",
      "Language you can use in interviews and on resumes"
    ],
    prep: [
      "Review basic Git concepts",
      "Create a free cloud sandbox account if possible",
      "Write down unfamiliar terms from recent job descriptions"
    ]
  }
];

export function getOpportunityById(id: string) {
  return featuredOpportunities.find((opportunity) => opportunity.id === id);
}
