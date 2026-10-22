import { STAT_EVENTS } from '../models/DailyStat.js';
import { getCvDownloadReport } from '../services/cvDownloadService.js';
import { getSummary, getTotal, recordEvent } from '../services/statsService.js';
import { HttpError } from '../utils/HttpError.js';

const PATH_PATTERN = /^\/[\w\-/#]{0,199}$/;

export async function trackVisit(req, res) {
  const path = req.body?.path ?? '/';

  if (typeof path !== 'string' || !PATH_PATTERN.test(path)) {
    throw new HttpError(400, 'path must be a string that starts with "/".');
  }

  await recordEvent(STAT_EVENTS.PAGE_VIEW, path);
  const pageViews = await getTotal(STAT_EVENTS.PAGE_VIEW);

  res.status(201).json({ pageViews });
}

export async function getPublicTotal(_req, res) {
  const pageViews = await getTotal(STAT_EVENTS.PAGE_VIEW);
  res.json({ pageViews });
}

export async function getPrivateSummary(req, res) {
  const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 365);
  res.json(await getSummary(days));
}

export async function getCvDownloads(req, res) {
  const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 365);
  res.json(await getCvDownloadReport(days));
}
