export type AgendaItem = {
  id: string;
  sessionId: string;
  sortOrder: number;
  title: string;
  details: string | null;
};

export type SessionResource = {
  id: string;
  sessionId: string;
  label: string;
  url: string;
  resourceType: string | null;
};

export type SessionSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string | null;
  plannedDate: string | null;
  plannedEndDate?: string | null;
  speakerName: string | null;
  speakerBio?: string | null;
  meetingLink?: string | null;
  status: string;
  skillLevel?: string | null;
  agenda?: AgendaItem[];
  resources?: SessionResource[];
};

export type SessionDetail = SessionSummary & {
  agenda: AgendaItem[];
  resources: SessionResource[];
};

export type ReviewStrength = {
  content: string;
  sortOrder: number;
};

export type ReviewGap = {
  concept: string;
  gapType: string | null;
  recommendation: string | null;
  sortOrder: number;
};

export type ReviewImprovement = {
  sectionName: string | null;
  suggestion: string;
  exampleRewrite: string | null;
  sortOrder: number;
};

export type ReviewVideo = {
  concept: string;
  reason: string | null;
  title: string;
  videoUrl: string;
  durationSeconds: number | null;
};

export type ReviewResult = {
  id: string;
  title: string;
  resumeFileName?: string | null;
  targetRole?: string | null;
  jobDescriptionText: string;
  score: number;
  status: string;
  createdAt: string;
  strengths: ReviewStrength[];
  gaps: ReviewGap[];
  improvements: ReviewImprovement[];
  videos: ReviewVideo[];
};
