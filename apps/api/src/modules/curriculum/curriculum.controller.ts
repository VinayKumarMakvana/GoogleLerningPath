import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRoadmap = async (req: Request, res: Response) => {
  try {
    const roadmap = await prisma.roadmap.findFirst({
      include: {
        phases: {
          orderBy: { order: 'asc' },
          include: {
            modules: {
              orderBy: { order: 'asc' },
              include: {
                skills: {
                  include: {
                    topics: {
                      orderBy: { order: 'asc' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    res.json(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch roadmap' });
  }
};

export const getTopicDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        prerequisites: true,
        prerequisiteFor: true,
        subtopics: true,
        track: true
      }
    });
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { entityType, entityId } = req.params;
    const { status } = req.body;
    
    // Minimal mock implementation for progress update API 
    // This assumes userId="mock-user" until authentication is implemented in later phases
    const progress = await prisma.progress.create({
      data: {
        userId: 'mock-user-id',
        entityType,
        entityId,
        status
      }
    });
    
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};
