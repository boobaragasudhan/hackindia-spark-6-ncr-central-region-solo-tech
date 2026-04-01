import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  try {
    const { id } = await context.params;
    
    // Get logged-in user from session
    const session = await getServerSession(authOptions);
    const userId = (session as any)?.userId || null;

    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        resources: {
          include: {
            progress: userId ? {
              where: { userId }
            } : false
          }
        }
      },
    });

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    // Format the data to match what the frontend expects, now with progress
    const mapResource = (r: any) => ({
      ...r,
      status: r.progress?.[0]?.status || null
    });

    const formattedData = {
      title: topic.label,
      intro: topic.resources.filter((r: any) => r.category === 'Intro' || r.category === 'intro').map(mapResource),
      interesting: topic.resources.filter((r: any) => r.category === 'Interesting' || r.category === 'interesting').map(mapResource),
      other: topic.resources.filter((r: any) => r.category === 'Other' || r.category === 'other').map(mapResource),
    };

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ error: 'Failed to fetch topic data' }, { status: 500 });
  }
}
