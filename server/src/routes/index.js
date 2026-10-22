import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import {
  getCvDownloads,
  getPrivateSummary,
  getPublicTotal,
  trackVisit,
} from '../controllers/analyticsController.js';
import { downloadCv } from '../controllers/cvController.js';
import { requireAdminKey } from '../middleware/requireAdminKey.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

const trackingLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

router.get('/cv', asyncHandler(downloadCv));

router.post('/analytics/visit', trackingLimiter, asyncHandler(trackVisit));
router.get('/analytics/total', asyncHandler(getPublicTotal));
router.get('/analytics/summary', requireAdminKey, asyncHandler(getPrivateSummary));
router.get('/analytics/cv-downloads', requireAdminKey, asyncHandler(getCvDownloads));

export default router;
