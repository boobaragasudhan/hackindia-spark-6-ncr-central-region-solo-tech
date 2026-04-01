import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nodes as staticNodes, links as staticLinks } from '../../../data/graphData';

export async function GET() {
  try {
    const prisma = new PrismaClient();
    
    const dbNodes = await prisma.topic.findMany();
    const rawLinks = await prisma.graphLink.findMany();
    
    // Fallback to our existing static data if the database is currently empty!
    // This ensures your graph doesn't just disappear while we write out our database seed logic.
    if (dbNodes.length === 0) {
      return NextResponse.json({ nodes: staticNodes, links: staticLinks });
    }

    // Map links back to the format D3 expects
    const dbLinks = rawLinks.map((link: any) => ({
      source: link.sourceId,
      target: link.targetId
    }));

    return NextResponse.json({ nodes: dbNodes, links: dbLinks });
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json({ error: error?.message || 'Database connection failed' }, { status: 500 });
  }
}
