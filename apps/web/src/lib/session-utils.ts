import type { SessionDetail, SessionSummary } from "./types";

export function formatSessionDate(value: string | null | undefined) {
  if (!value) {
    return "Date to be confirmed";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export function toOpportunityCard(session: SessionSummary | SessionDetail) {
  return {
    id: session.slug,
    title: session.title,
    category: session.skillLevel ?? "Program session",
    location: "Virtual",
    commitment: "60 min",
    summary: session.summary,
    agenda: (session.agenda ?? []).map((item) => item.title),
    plannedDate: formatSessionDate(session.plannedDate),
    status: mapSessionStatus(session.status),
    speaker: session.speakerName ?? "ATTA volunteer speaker",
    audience: "Women returning to IT careers after a break",
    outcomes: (session.agenda ?? []).map((item) => item.details ?? item.title).slice(0, 3),
    prep: [
      "Bring one target role or job description",
      "Note the questions you want answered",
      "Be ready to learn alongside peers"
    ]
  } as const;
}

function mapSessionStatus(status: string): "Planned" | "Open" | "Completed" {
  switch (status.toLowerCase()) {
    case "open":
      return "Open";
    case "completed":
      return "Completed";
    default:
      return "Planned";
  }
}
