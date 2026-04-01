import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';

const prisma = new PrismaClient();

export async function PUT(request: Request, context: any) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { resourceId, status } = body;

    // Get logged-in user from session
    const session = await getServerSession(authOptions);
    const userId = (session as any)?.userId;

    if (!userId) {
      return NextResponse.json({ error: 'You must be logged in to save progress' }, { status: 401 });
    }

    // Upsert the progress record
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_resourceId: {
          userId,
          resourceId,
        }
      },
      update: {
        status,
      },
      create: {
        userId,
        resourceId,
        topicId: id,
        status,
      }
    });

    return NextResponse.json({ success: true, progress });
  } catch (error: any) {
    console.error("Failed to save progress:", error);
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
  }
}
