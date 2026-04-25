export interface Env {
  DB: D1Database;
  APP_ENV?: string;
  CORS_ORIGIN?: string;
}

function json(data: unknown, env: Env, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": env.CORS_ORIGIN ?? "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "Content-Type",
      ...(init.headers ?? {})
    }
  });
}

async function listSessions(env: Env) {
  const result = await env.DB.prepare(
    `SELECT id, slug, title, summary, planned_date AS plannedDate, status, speaker_name AS speakerName
     FROM sessions
     ORDER BY planned_date ASC, title ASC`
  ).all();

  return result.results ?? [];
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": env.CORS_ORIGIN ?? "*",
          "access-control-allow-methods": "GET,POST,OPTIONS",
          "access-control-allow-headers": "Content-Type"
        }
      });
    }

    if (url.pathname === "/api/health") {
      return json(
        {
          ok: true,
          app: "atta-bttf-api",
          environment: env.APP_ENV ?? "development"
        },
        env
      );
    }

    if (url.pathname === "/api/sessions" && request.method === "GET") {
      const sessions = await listSessions(env);
      return json({ sessions }, env);
    }

    return json({ message: "Not found" }, env, { status: 404 });
  }
} satisfies ExportedHandler<Env>;
