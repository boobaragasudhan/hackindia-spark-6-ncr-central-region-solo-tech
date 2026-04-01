import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const graphDataCode = fs.readFileSync(path.join(process.cwd(), 'src/data/graphData.ts'), 'utf-8');
const resourceDataCode = fs.readFileSync(path.join(process.cwd(), 'src/data/resourceData.ts'), 'utf-8');

// A dirty but effective trick to parse these TS exports into JS objects
const evalGraphData = new Function("exports", graphDataCode.replace(/export const /g, "exports.") + "; return exports;");
const evalResourceData = new Function("exports", resourceDataCode.replace(/export type.*?;/gs, "").replace(/export const /g, "exports.").replace(/export function.*}$/gs, "") + "; return exports;");

const graphExports = evalGraphData({});
const { nodes, links } = graphExports;

const resourceExports = evalResourceData({});
const { topicResources } = resourceExports;

async function main() {
  console.log('Clearing database...');
  await prisma.resource.deleteMany();
  await prisma.graphLink.deleteMany();
  await prisma.topic.deleteMany();

  console.log('Seeding topics and links...');
  // Seed topics
  for (const node of nodes) {
    await prisma.topic.create({
      data: {
        id: node.id,
        label: node.label,
      }
    });
  }

  // Seed links
  for (const link of links) {
    await prisma.graphLink.create({
      data: {
        sourceId: link.source,
        targetId: link.target,
      }
    });
  }

  console.log('Seeding resources...');
  for (const [topicId, resourceData] of Object.entries(topicResources)) {
    if (resourceData.intro) {
      for (const res of resourceData.intro) {
        await prisma.resource.create({ data: { title: res.title, url: res.url, category: 'Intro', topicId } });
      }
    }
    if (resourceData.interesting) {
      for (const res of resourceData.interesting) {
        await prisma.resource.create({ data: { title: res.title, url: res.url, category: 'Interesting', topicId } });
      }
    }
    if (resourceData.other) {
      for (const res of resourceData.other) {
        await prisma.resource.create({ data: { title: res.title, url: res.url, category: 'Other', topicId } });
      }
    }
  }

  console.log('Database seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
