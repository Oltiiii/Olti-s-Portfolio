import path from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, isProduction } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandlers.js';
import apiRoutes from './routes/index.js';

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');

export function createApp() {
  const app = express();

  // Render and most hosts sit behind a proxy; needed for correct client IPs in rate limiting.
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(cors({ origin: env.clientOrigins }));
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));
  app.use(morgan(isProduction ? 'combined' : 'dev'));

  app.use('/api', apiRoutes);
  // Private CV download dashboard; the page asks for ADMIN_KEY before loading any data.
  app.use('/admin', express.static(path.join(publicDir, 'admin')));

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
