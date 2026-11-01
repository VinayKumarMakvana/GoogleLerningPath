import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
  async register(email: string, passwordRaw: string, firstName?: string, lastName?: string, target?: string) {
    if (!email || !passwordRaw) {
      throw new Error('Email and password are required');
    }

    // Demo / offline test bypass
    if (email === 'demo@google.com' || email === 'test@google.com') {
      const token = this.generateToken('66324d081a95e74e6fcf2288');
      return { 
        token, 
        user: { 
          id: '66324d081a95e74e6fcf2288', 
          email, 
          profile: { 
            firstName: firstName || 'Vinay', 
            lastName: lastName || 'Makvana', 
            target: target || 'Google SWE L5' 
          } 
        } 
      };
    }

    try {
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
          profile: (firstName || target) ? {
            create: {
              firstName: firstName || null,
              lastName: lastName || null,
              target: target || 'Google SWE L4/L5',
            }
          } : undefined,
        },
        include: {
          profile: true,
        }
      });

      const token = this.generateToken(user.id);
      return { token, user: { id: user.id, email: user.email, profile: user.profile } };
    } catch (dbErr: any) {
      // If DB is unreachable, still generate a valid token for local inspection
      const token = this.generateToken('66324d081a95e74e6fcf2288');
      return { 
        token, 
        user: { 
          id: '66324d081a95e74e6fcf2288', 
          email, 
          profile: { 
            firstName: firstName || 'Vinay', 
            lastName: lastName || 'Makvana', 
            target: target || 'Google SWE L5' 
          } 
        } 
      };
    }
  }

  async login(email: string, passwordRaw: string) {
    if (!email || !passwordRaw) {
      throw new Error('Email and password are required');
    }

    // Demo / test account bypass
    if (email === 'demo@google.com' || email === 'test@google.com' || email === 'vinay@google.com') {
      const token = this.generateToken('66324d081a95e74e6fcf2288');
      return { 
        token, 
        user: { 
          id: '66324d081a95e74e6fcf2288', 
          email, 
          name: 'Vinay Makvana' 
        } 
      };
    }

    try {
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
    } catch (dbErr: any) {
      if (dbErr.message === 'Invalid credentials') {
        throw dbErr;
      }
      // If remote database connection fails, grant access for local demo testing
      const token = this.generateToken('66324d081a95e74e6fcf2288');
      return { 
        token, 
        user: { 
          id: '66324d081a95e74e6fcf2288', 
          email, 
          name: 'Vinay Makvana' 
        } 
      };
    }
  }

  async getMe(userId: string) {
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        careerProfile: true,
        goals: true,
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: 'demo@google.com',
          password: await bcrypt.hash('Password123!', 10),
          profile: {
            create: {
              firstName: 'Vinay',
              lastName: 'Makvana',
              target: 'Google SWE L5',
            }
          },
          careerProfile: {
            create: {
              targetRole: 'Google Senior Software Engineer (L5)',
              targetLocations: ['Mountain View, CA', 'Bengaluru, India', 'Remote'],
              education: 'B.Tech in Computer Science',
              experience: 'Distributed Systems & High-Throughput Microservices',
              resumeStatus: 'READY'
            }
          }
        },
        include: {
          profile: true,
          careerProfile: true,
          goals: true,
        }
      });
    }

    return user;
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; target?: string; graduation?: string }) {
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        target: data.target,
        graduation: data.graduation ? new Date(data.graduation) : undefined,
      },
      create: {
        userId,
        firstName: data.firstName || 'Vinay',
        lastName: data.lastName || 'Makvana',
        target: data.target || 'Google SWE L5',
        graduation: data.graduation ? new Date(data.graduation) : undefined,
      }
    });
    return profile;
  }

  private generateToken(userId: string) {
    const secret = process.env.JWT_SECRET || 'ByoAQIGvJmX3yggydK0hqIaYtUCOH1vzE17C5rIkCxTAKdICJrKdsqAZTzudsXlHu1H8V5kRgSJSfTzLbBdBAZ';
    const expiresIn = process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN, 10) : 604800;
    return jwt.sign({ id: userId }, secret, { expiresIn });
  }
}

