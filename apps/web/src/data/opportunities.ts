export type Opportunity = {
  id: string;
  title: string;
  category: string;
  location: string;
  commitment: string;
  summary: string;
  agenda: string[];
  plannedDate: string;
  status: "Planned" | "Open" | "Completed";
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
    status: "Open"
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
    status: "Planned"
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
    status: "Planned"
  }
];
