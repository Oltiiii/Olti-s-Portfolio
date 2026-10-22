import geoip from 'geoip-lite';
import { CvDownload } from '../models/CvDownload.js';

const RECENT_LIMIT = 100;

function parseUserAgent(userAgent = '') {
  const ua = userAgent.toLowerCase();

  let device = 'desktop';
  if (!ua) device = 'unknown';
  else if (/bot|crawler|spider|slurp|preview|curl|wget|python|headless/.test(ua)) device = 'bot';
  else if (/ipad|tablet/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua))) device = 'tablet';
  else if (/mobi|iphone|android/.test(ua)) device = 'mobile';

  // Order matters: Edge and Opera also announce Chrome, and Chrome announces Safari.
  const browsers = [
    ['Edge', /edg\//],
    ['Opera', /opr\/|opera/],
    ['Samsung Internet', /samsungbrowser/],
    ['Firefox', /firefox|fxios/],
    ['Chrome', /chrome|crios/],
    ['Safari', /safari/],
  ];
  const systems = [
    ['iOS', /iphone|ipad|ipod/],
    ['Android', /android/],
    ['Windows', /windows/],
    ['macOS', /mac os x|macintosh/],
    ['Linux', /linux/],
  ];

  return {
    device,
    browser: browsers.find(([, pattern]) => pattern.test(ua))?.[0] ?? '',
    os: systems.find(([, pattern]) => pattern.test(ua))?.[0] ?? '',
  };
}

function referrerHost(referrer) {
  try {
    return referrer ? new URL(referrer).host.slice(0, 200) : '';
  } catch {
    return '';
  }
}

export async function recordCvDownload(req) {
  const location = geoip.lookup(req.ip?.replace(/^::ffff:/, '') ?? '') ?? {};

  await CvDownload.create({
    country: location.country || '',
    region: location.region || '',
    city: location.city || '',
    timezone: location.timezone || '',
    referrer: referrerHost(req.get('referer')),
    ...parseUserAgent(req.get('user-agent')),
  });
}

const countBy = (field, match) =>
  CvDownload.aggregate([
    { $match: match },
    { $group: { _id: field, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

export async function getCvDownloadReport(days = 30) {
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - (days - 1));
  const match = { createdAt: { $gte: since } };

  const [total, countries, cities, devices, daily, recent] = await Promise.all([
    CvDownload.countDocuments(match),
    countBy('$country', match),
    countBy({ city: '$city', region: '$region', country: '$country' }, match),
    countBy('$device', match),
    CvDownload.aggregate([
      { $match: match },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    CvDownload.find(match).sort({ createdAt: -1 }).limit(RECENT_LIMIT).lean(),
  ]);

  return {
    days,
    since: since.toISOString(),
    total,
    countries: countries.map(({ _id, count }) => ({ country: _id, count })),
    cities: cities.map(({ _id, count }) => ({ ..._id, count })),
    devices: devices.map(({ _id, count }) => ({ device: _id, count })),
    daily: daily.map(({ _id, count }) => ({ day: _id, count })),
    recent: recent.map(({ _id, ...download }) => ({ id: String(_id), ...download })),
  };
}
