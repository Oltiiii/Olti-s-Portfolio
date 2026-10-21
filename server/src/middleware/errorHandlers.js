import { isProduction } from '../config/env.js';
import { HttpError } from '../utils/HttpError.js';

export function notFound(req, _res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Express recognises error middleware by its four arguments.
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({
    error: status >= 500 && isProduction ? 'Something went wrong on the server.' : error.message,
  });
}
