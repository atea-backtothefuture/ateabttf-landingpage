import { useEffect, useState } from "react";
import { fetchReview } from "../lib/api";
import type { ReviewResult } from "../lib/types";

export function useReview(reviewId: string | undefined) {
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(Boolean(reviewId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reviewId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchReview(reviewId)
      .then((result) => {
        if (!cancelled) {
          setReview(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We could not load this saved review yet.");
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
  }, [reviewId]);

  return { review, loading, error };
}
