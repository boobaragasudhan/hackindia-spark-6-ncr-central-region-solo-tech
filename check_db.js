const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const resources = await p.resource.findMany();
  console.log('Total resources:', resources.length);
  resources.forEach(x => console.log(x.topicId, '|', x.category, '|', x.title));
  
  const topics = await p.topic.findMany();
  console.log('\nTopics:');
  topics.forEach(t => console.log(t.id, '|', t.label));
}

main().finally(() => p.$disconnect());
