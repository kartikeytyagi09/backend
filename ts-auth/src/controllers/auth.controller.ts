import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import { config } from '../env';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// Generate JWT
const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: '1h' });
};

export const registerUser = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = generateToken(user._id.toString());

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};b
