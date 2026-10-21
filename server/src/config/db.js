import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  mongoose.set('strictQuery', true);

  mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  mongoose.connection.on('error', (error) => console.error('MongoDB error:', error.message));

  await mongoose.connect(env.mongoUri);
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
}
