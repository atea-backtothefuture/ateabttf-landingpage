import { API_BASE_URL } from "./config";
import type { ReviewResult, SessionDetail, SessionSummary } from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchSessions() {
  const result = await request<{ sessions: SessionSummary[] }>("/api/sessions");
  return result.sessions;
}

export async function fetchSession(slug: string) {
  const result = await request<{ session: SessionDetail }>(`/api/sessions/${slug}`);
  return result.session;
}

export async function createReview(payload: {
  resumeText?: string;
  resumeFileName?: string;
  jobDescriptionText: string;
  targetRole?: string;
}) {
  const result = await request<{ review: ReviewResult }>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return result.review;
}

export async function fetchReview(reviewId: string) {
  const result = await request<{ review: ReviewResult }>(`/api/reviews/${reviewId}`);
  return result.review;
}
