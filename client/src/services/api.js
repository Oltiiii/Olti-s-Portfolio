import { person } from '../data/profile';

/** Base URL of the Express API, e.g. https://olti-api.onrender.com. Empty = no backend. */
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const hasApi = Boolean(API_URL);

/**
 * The API serves the CV and counts the download.
 * Without an API configured, fall back to the copy in /public so the button always works.
 */
export const cvUrl = hasApi ? `${API_URL}/api/cv` : `/${person.cvFileName}`;

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return response.json();
}

export function trackVisit(path = '/') {
  return request('/api/analytics/visit', {
    method: 'POST',
    body: JSON.stringify({ path }),
  });
}

export function fetchTotalVisits() {
  return request('/api/analytics/total');
}
