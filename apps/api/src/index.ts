export interface Env {
  DB: D1Database;
  APP_ENV?: string;
  CORS_ORIGIN?: string;
}

type SessionRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  plannedDate: string | null;
  plannedEndDate: string | null;
  speakerName: string | null;
  speakerBio: string | null;
  meetingLink: string | null;
  status: string;
  skillLevel: string | null;
};

type AgendaRow = {
  id: string;
  sessionId: string;
  sortOrder: number;
  title: string;
  details: string | null;
};

type ResourceRow = {
  id: string;
  sessionId: string;
  label: string;
  url: string;
  resourceType: string | null;
};

type ReviewPayload = {
  resumeText?: string;
  resumeFileName?: string;
  jobDescriptionText: string;
  targetRole?: string;
};

function corsHeaders(env: Env, extra: HeadersInit = {}) {
  return {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": env.CORS_ORIGIN ?? "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "Content-Type",
    ...extra
  };
}

function json(env: Env, data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: corsHeaders(env, init.headers ?? {})
  });
}

function cleanText(value: string | undefined) {
  return (value ?? "").trim();
}

function tokenize(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .match(/[a-z0-9+#.]{3,}/g) ?? []
    )
  );
}

function scoreReview(resumeText: string, jobDescriptionText: string, targetRole?: string) {
  const resumeTokens = tokenize(resumeText);
  const jdTokens = tokenize(jobDescriptionText);
  const commonTokens = jdTokens.filter((token) => resumeTokens.includes(token));
  const missingTokens = jdTokens.filter((token) => !resumeTokens.includes(token)).slice(0, 4);

  const score = jdTokens.length === 0 ? 0 : Math.min(95, Math.max(35, Math.round((commonTokens.length / jdTokens.length) * 100)));

  const roleLabel = cleanText(targetRole) || "your target IT role";

  return {
    score,
    strengths: [
      `Your resume already reflects ${commonTokens.slice(0, 3).join(", ") || "foundational IT keywords"} that support ${roleLabel}.`,
      "The current draft shows transferable experience and a clear interest in returning to technology work.",
      "The resume has a good starting structure for ATS-style refinement."
    ],
    gaps: missingTokens.map((token) => ({
      concept: token,
      gapType: "keyword",
      recommendation: `Add a practical example, project, or learning note that shows familiarity with ${token}.`
    })),
    improvements: [
      {
        sectionName: "Summary",
        suggestion: `Tailor the top summary to the target role and include 2-3 keywords from the job description for ${roleLabel}.`,
        exampleRewrite: `Returning IT professional targeting ${roleLabel} opportunities with strengths in cross-team communication, structured problem solving, and continuous learning.`
      },
      {
        sectionName: "Experience",
        suggestion: "Rewrite generic bullets into outcome-based statements with action verbs and measurable impact.",
        exampleRewrite: "Resolved high-volume support issues, documented recurring problems, and improved response consistency for internal stakeholders."
      },
      {
        sectionName: "Learning plan",
        suggestion: "Add a short section for recent coursework, labs, or volunteer projects if they support your return-to-tech story.",
        exampleRewrite: "Completed beginner cloud labs and ATS resume workshops to rebuild technical confidence after a career break."
      }
    ],
    videos: missingTokens.map((token) => ({
      concept: token,
      title: `${token} in plain language`,
      duration: 45,
      videoUrl: `https://example.com/videos/${encodeURIComponent(token)}`,
      reason: `Recommended because ${token} appears in the job description but is not yet visible in the resume.`
    }))
  };
}

async function listSessions(env: Env) {
  const sessionsResult = await env.DB.prepare(
    `SELECT
        id,
        slug,
        title,
        summary,
        description,
        planned_date AS plannedDate,
        planned_end_date AS plannedEndDate,
        speaker_name AS speakerName,
        speaker_bio AS speakerBio,
        meeting_link AS meetingLink,
        status,
        skill_level AS skillLevel
      FROM sessions
      ORDER BY planned_date ASC, title ASC`
  ).all<SessionRow>();

  const agendaResult = await env.DB.prepare(
    `SELECT
        id,
        session_id AS sessionId,
        sort_order AS sortOrder,
        title,
        details
      FROM session_agenda_items
      ORDER BY session_id ASC, sort_order ASC`
  ).all<AgendaRow>();

  const resourcesResult = await env.DB.prepare(
    `SELECT
        id,
        session_id AS sessionId,
        label,
        url,
        resource_type AS resourceType
      FROM session_resources
      ORDER BY session_id ASC, label ASC`
  ).all<ResourceRow>();

  const agendaBySession = new Map<string, AgendaRow[]>();
  for (const item of agendaResult.results ?? []) {
    const existing = agendaBySession.get(item.sessionId) ?? [];
    existing.push(item);
    agendaBySession.set(item.sessionId, existing);
  }

  const resourcesBySession = new Map<string, ResourceRow[]>();
  for (const item of resourcesResult.results ?? []) {
    const existing = resourcesBySession.get(item.sessionId) ?? [];
    existing.push(item);
    resourcesBySession.set(item.sessionId, existing);
  }

  return (sessionsResult.results ?? []).map((session) => ({
    ...session,
    agenda: agendaBySession.get(session.id) ?? [],
    resources: resourcesBySession.get(session.id) ?? []
  }));
}

async function getSessionBySlug(env: Env, slug: string) {
  const sessions = await listSessions(env);
  return sessions.find((session) => session.slug === slug) ?? null;
}

async function createReview(env: Env, payload: ReviewPayload) {
  const reviewId = crypto.randomUUID();
  const resumeText = cleanText(payload.resumeText);
  const jobDescriptionText = cleanText(payload.jobDescriptionText);
  const targetRole = cleanText(payload.targetRole);
  const analysis = scoreReview(resumeText, jobDescriptionText, targetRole);

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO reviews (id, title, resume_file_name, target_role, job_description_text, score, status)
       VALUES (?, ?, ?, ?, ?, ?, 'completed')`
    ).bind(
      reviewId,
      targetRole || "ATS-style review",
      cleanText(payload.resumeFileName) || null,
      targetRole || null,
      jobDescriptionText,
      analysis.score
    ),
    ...analysis.strengths.map((item, index) =>
      env.DB.prepare(
        `INSERT INTO review_strengths (id, review_id, content, sort_order)
         VALUES (?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), reviewId, item, index + 1)
    ),
    ...analysis.gaps.map((item, index) =>
      env.DB.prepare(
        `INSERT INTO review_gaps (id, review_id, concept, gap_type, recommendation, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), reviewId, item.concept, item.gapType, item.recommendation, index + 1)
    ),
    ...analysis.improvements.map((item, index) =>
      env.DB.prepare(
        `INSERT INTO review_improvements (id, review_id, section_name, suggestion, example_rewrite, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), reviewId, item.sectionName, item.suggestion, item.exampleRewrite, index + 1)
    ),
    ...analysis.videos.map((item) =>
      env.DB.prepare(
        `INSERT INTO video_library (id, concept, title, provider, video_url, duration_seconds, description)
         VALUES (?, ?, ?, 'curated', ?, ?, ?)
         ON CONFLICT(id) DO NOTHING`
      ).bind(
        `video-${item.concept}`,
        item.concept,
        item.title,
        item.videoUrl,
        item.duration,
        item.reason
      )
    ),
    ...analysis.videos.map((item) =>
      env.DB.prepare(
        `INSERT INTO review_video_recommendations (id, review_id, video_id, concept, reason)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), reviewId, `video-${item.concept}`, item.concept, item.reason)
    )
  ]);

  return getReviewById(env, reviewId);
}

async function getReviewById(env: Env, reviewId: string) {
  const review = await env.DB.prepare(
    `SELECT
        id,
        title,
        resume_file_name AS resumeFileName,
        target_role AS targetRole,
        job_description_text AS jobDescriptionText,
        score,
        status,
        created_at AS createdAt
      FROM reviews
      WHERE id = ?`
  )
    .bind(reviewId)
    .first<Record<string, unknown>>();

  if (!review) {
    return null;
  }

  const [strengths, gaps, improvements, videos] = await Promise.all([
    env.DB.prepare(
      `SELECT content, sort_order AS sortOrder
       FROM review_strengths
       WHERE review_id = ?
       ORDER BY sort_order ASC`
    )
      .bind(reviewId)
      .all(),
    env.DB.prepare(
      `SELECT concept, gap_type AS gapType, recommendation, sort_order AS sortOrder
       FROM review_gaps
       WHERE review_id = ?
       ORDER BY sort_order ASC`
    )
      .bind(reviewId)
      .all(),
    env.DB.prepare(
      `SELECT section_name AS sectionName, suggestion, example_rewrite AS exampleRewrite, sort_order AS sortOrder
       FROM review_improvements
       WHERE review_id = ?
       ORDER BY sort_order ASC`
    )
      .bind(reviewId)
      .all(),
    env.DB.prepare(
      `SELECT
          vr.concept,
          vr.reason,
          vl.title,
          vl.video_url AS videoUrl,
          vl.duration_seconds AS durationSeconds
       FROM review_video_recommendations vr
       JOIN video_library vl ON vl.id = vr.video_id
       WHERE vr.review_id = ?`
    )
      .bind(reviewId)
      .all()
  ]);

  return {
    ...review,
    strengths: strengths.results ?? [],
    gaps: gaps.results ?? [],
    improvements: improvements.results ?? [],
    videos: videos.results ?? []
  };
}

async function readJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env)
      });
    }

    if (url.pathname === "/api/health") {
      return json(env, {
        ok: true,
        app: "atta-bttf-api",
        environment: env.APP_ENV ?? "development"
      });
    }

    if (url.pathname === "/api/sessions" && request.method === "GET") {
      const sessions = await listSessions(env);
      return json(env, { sessions });
    }

    if (url.pathname.startsWith("/api/sessions/") && request.method === "GET") {
      const slug = decodeURIComponent(url.pathname.replace("/api/sessions/", ""));
      const session = await getSessionBySlug(env, slug);

      if (!session) {
        return json(env, { message: "Session not found" }, { status: 404 });
      }

      return json(env, { session });
    }

    if (url.pathname === "/api/reviews" && request.method === "POST") {
      const payload = await readJson<ReviewPayload>(request);

      if (!payload?.jobDescriptionText?.trim()) {
        return json(env, { message: "jobDescriptionText is required" }, { status: 400 });
      }

      const review = await createReview(env, payload);
      return json(env, { review }, { status: 201 });
    }

    if (url.pathname.startsWith("/api/reviews/") && request.method === "GET") {
      const reviewId = decodeURIComponent(url.pathname.replace("/api/reviews/", ""));
      const review = await getReviewById(env, reviewId);

      if (!review) {
        return json(env, { message: "Review not found" }, { status: 404 });
      }

      return json(env, { review });
    }

    return json(env, { message: "Not found" }, { status: 404 });
  }
} satisfies ExportedHandler<Env>;
