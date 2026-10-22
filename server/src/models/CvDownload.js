import mongoose from 'mongoose';

/**
 * One document per CV download, so the admin dashboard can show where it came from.
 * Only the coarse location looked up from the IP is kept, never the IP itself.
 */
const cvDownloadSchema = new mongoose.Schema(
  {
    country: { type: String, default: '', maxlength: 2 }, // ISO 3166-1 alpha-2, '' when unknown
    region: { type: String, default: '', maxlength: 100 },
    city: { type: String, default: '', maxlength: 100 },
    timezone: { type: String, default: '', maxlength: 100 },
    referrer: { type: String, default: '', maxlength: 200 }, // host only
    browser: { type: String, default: '', maxlength: 50 },
    os: { type: String, default: '', maxlength: 50 },
    device: { type: String, enum: ['desktop', 'mobile', 'tablet', 'bot', 'unknown'], default: 'unknown' },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

cvDownloadSchema.index({ createdAt: -1 });

export const CvDownload = mongoose.model('CvDownload', cvDownloadSchema);
