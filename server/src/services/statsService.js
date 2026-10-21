import { DailyStat, STAT_EVENTS } from '../models/DailyStat.js';

const toDayKey = (date = new Date()) => date.toISOString().slice(0, 10);

export async function recordEvent(event, path = '/') {
  await DailyStat.updateOne(
    { day: toDayKey(), event, path },
    { $inc: { count: 1 } },
    { upsert: true },
  );
}

export async function getTotal(event) {
  const [result] = await DailyStat.aggregate([
    { $match: { event } },
    { $group: { _id: null, total: { $sum: '$count' } } },
  ]);
  return result?.total ?? 0;
}

export async function getSummary(days = 30) {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (days - 1));

  const [pageViews, cvDownloads, daily] = await Promise.all([
    getTotal(STAT_EVENTS.PAGE_VIEW),
    getTotal(STAT_EVENTS.CV_DOWNLOAD),
    DailyStat.aggregate([
      { $match: { day: { $gte: toDayKey(since) } } },
      { $group: { _id: { day: '$day', event: '$event' }, count: { $sum: '$count' } } },
      { $sort: { '_id.day': 1 } },
    ]),
  ]);

  return {
    totals: { pageViews, cvDownloads },
    lastDays: daily.map(({ _id, count }) => ({ day: _id.day, event: _id.event, count })),
  };
}
