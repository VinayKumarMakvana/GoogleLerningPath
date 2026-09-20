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
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
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
        track: true,
        learningContents: { where: { status: 'PUBLISHED' } },
        notes: { where: { status: 'PUBLISHED' } },
        shortNotes: { where: { status: 'PUBLISHED' } },
        cheatSheets: { where: { status: 'PUBLISHED' } },
        resources: { where: { status: { in: ['PUBLISHED', 'PENDING'] } } }
      }
    });
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    res.json(topic);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch topic' });
  }
};

export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { order: 'asc' },
      include: {
        track: true,
        skill: true,
      }
    });

    // Also get the progress for this user
    let progress: any[] = [];
    if (req.user) {
      progress = await prisma.progress.findMany({
        where: { userId: req.user.id, entityType: 'TOPIC' }
      });
    }

    // Attach progress to topics
    const topicsWithProgress = topics.map(t => {
      const userProgress = progress.find(p => p.entityId === t.id);
      return {
        ...t,
        progress: userProgress ? userProgress.status : 'NOT_STARTED'
      };
    });

    res.json(topicsWithProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
};

export const getAllResources = async (req: Request, res: Response) => {
  try {
    const resources = await prisma.resource.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { priority: 'asc' },
      include: {
        topic: {
          include: { track: true }
        }
      }
    });
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch resources' });
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
        userId: req.user!.id,
        entityType,
        entityId,
        status
      }
    });
    
    res.json(progress);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to update progress' });
  }
};
