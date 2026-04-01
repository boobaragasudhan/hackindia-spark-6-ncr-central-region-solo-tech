/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import { nodes, links } from '../src/data/graphData';
import { topicResources } from '../src/data/resourceData';

const prisma = new PrismaClient();

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
  // Seed resources from topicResources
  for (const [topicId, resourceData] of Object.entries(topicResources)) {
    
    // Map 'intro' resources
    for (const res of resourceData.intro) {
      await prisma.resource.create({
        data: {
          title: res.title,
          url: res.url,
          category: 'Intro',
          topicId: topicId
        }
      });
    }

    // Map 'interesting' resources
    if (resourceData.interesting) {
      for (const res of resourceData.interesting) {
        await prisma.resource.create({
          data: {
            title: res.title,
            url: res.url,
            category: 'Interesting',
            topicId: topicId
          }
        });
      }
    }

    // Map 'other' resources
    if (resourceData.other) {
      for (const res of resourceData.other) {
        await prisma.resource.create({
          data: {
            title: res.title,
            url: res.url,
            category: 'Other',
            topicId: topicId
          }
        });
      }
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
