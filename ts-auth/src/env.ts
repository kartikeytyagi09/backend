import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGO_URL: string;
  JWT_SECRET: string;
}

export const config: EnvConfig = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URL: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'mongodb://127.0.0.1:27017/User',
};

if (!config.MONGO_URL || !config.JWT_SECRET) {
  throw new Error('Missing environment variables in .env file');
}
