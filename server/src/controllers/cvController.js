import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STAT_EVENTS } from '../models/DailyStat.js';
import { recordEvent } from '../services/statsService.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const CV_PATH = path.resolve(currentDir, '../../assets/Olti-Kryeziu-CV.pdf');
const CV_FILENAME = 'Olti-Kryeziu-CV.pdf';

export async function downloadCv(_req, res, next) {
  // Counting a download should never block the file, so failures are only logged.
  recordEvent(STAT_EVENTS.CV_DOWNLOAD).catch((error) =>
    console.error('Could not record CV download:', error.message),
  );

  res.download(CV_PATH, CV_FILENAME, (error) => {
    if (error && !res.headersSent) next(error);
  });
}
