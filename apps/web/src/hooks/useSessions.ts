import { useEffect, useState } from "react";
import { fetchSession, fetchSessions } from "../lib/api";
import type { SessionDetail, SessionSummary } from "../lib/types";

export function useSessions() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchSessions()
      .then((result) => {
        if (!cancelled) {
          setSessions(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We could not load live sessions yet, so local starter content is shown.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { sessions, loading, error };
}

export function useSession(slug: string | undefined) {
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchSession(slug)
      .then((result) => {
        if (!cancelled) {
          setSession(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We could not load the live session details yet.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { session, loading, error };
}
