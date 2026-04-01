"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function addTopic(formData: FormData) {
  const id = formData.get('id') as string;
  const label = formData.get('label') as string;
  
  if (!id || !label) throw new Error('Missing fields');

  await prisma.topic.create({
    data: { id, label }
  });
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function addLink(formData: FormData) {
  const sourceId = formData.get('sourceId') as string;
  const targetId = formData.get('targetId') as string;
  
  if (!sourceId || !targetId) throw new Error('Missing fields');

  await prisma.graphLink.create({
    data: { sourceId, targetId }
  });
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function addResource(formData: FormData) {
  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  const category = formData.get('category') as string;
  const topicId = formData.get('topicId') as string;
  
  if (!title || !url || !category || !topicId) throw new Error('Missing fields');

  await prisma.resource.create({
    data: { title, url, category, topicId }
  });
  
  revalidatePath(`/topic/${topicId}`);
  revalidatePath('/admin');
}
