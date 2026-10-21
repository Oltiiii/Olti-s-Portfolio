import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, isProduction } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandlers.js';
import apiRoutes from './routes/index.js';

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

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
