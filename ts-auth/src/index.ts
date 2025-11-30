import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {config} from './env';

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response):void => {
  res.send('JWT Auth Service with TypeScript is running!');
});

const PORT:number = config.PORT || 5000;

mongoose.connect(config.MONGO_URL)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
