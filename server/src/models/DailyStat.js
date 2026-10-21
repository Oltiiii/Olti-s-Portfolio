import mongoose from 'mongoose';

export const STAT_EVENTS = Object.freeze({
  PAGE_VIEW: 'page_view',
  CV_DOWNLOAD: 'cv_download',
});

/**
 * One document per (day, event, path).
 * Storing daily counters instead of one document per visit keeps the
 * collection tiny and stays well inside the MongoDB Atlas free tier.
 */
const dailyStatSchema = new mongoose.Schema(
  {
    day: { type: String, required: true }, // YYYY-MM-DD (UTC)
    event: { type: String, enum: Object.values(STAT_EVENTS), required: true },
    path: { type: String, default: '/', maxlength: 200 },
    count: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true, versionKey: false },
);

dailyStatSchema.index({ day: 1, event: 1, path: 1 }, { unique: true });

export const DailyStat = mongoose.model('DailyStat', dailyStatSchema);
