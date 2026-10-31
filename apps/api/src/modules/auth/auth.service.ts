import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
  async register(email: string, passwordRaw: string) {
    if (!email || !passwordRaw) {
      throw new Error('Email and password are required');
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(passwordRaw, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = this.generateToken(user.id);
    return { token, user: { id: user.id, email: user.email } };
  }

  async login(email: string, passwordRaw: string) {
    if (!email || !passwordRaw) {
      throw new Error('Email and password are required');
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(passwordRaw, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id);
    return { token, user: { id: user.id, email: user.email } };
  }

  private generateToken(userId: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const expiresIn = process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN, 10) : 604800;
    return jwt.sign({ id: userId }, secret, {
      expiresIn,
    });
  }
}
