import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { HttpError } from '../utils/HttpError.js';

const safeEqual = (a, b) => {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB);
};

/** Protects private endpoints with the ADMIN_KEY sent in the `x-admin-key` header. */
export function requireAdminKey(req, _res, next) {
  const providedKey = req.get('x-admin-key') || '';

  if (!env.adminKey || !safeEqual(providedKey, env.adminKey)) {
    return next(new HttpError(401, 'A valid x-admin-key header is required.'));
  }

  return next();
}
