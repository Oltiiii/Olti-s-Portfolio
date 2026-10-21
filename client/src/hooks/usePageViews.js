import { useEffect, useState } from 'react';
import { fetchTotalVisits, hasApi, trackVisit } from '../services/api';

const SESSION_KEY = 'portfolio:visit-tracked';

function wasTrackedThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markTracked() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Storage can be blocked (private mode); counting twice is harmless.
  }
}

/**
 * Records one page view per browser session and returns the all-time total.
 * Returns null while loading, or when no API is configured or it is unreachable.
 */
export function usePageViews() {
  const [pageViews, setPageViews] = useState(null);

  useEffect(() => {
    if (!hasApi) return undefined;

    let isActive = true;
    const load = wasTrackedThisSession()
      ? fetchTotalVisits()
      : trackVisit(window.location.pathname).then((result) => {
          markTracked();
          return result;
        });

    load
      .then(({ pageViews: total }) => isActive && setPageViews(total))
      .catch(() => isActive && setPageViews(null));

    return () => {
      isActive = false;
    };
  }, []);

  return pageViews;
}
