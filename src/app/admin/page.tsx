import React from 'react';
import Link from 'next/link';
import { addTopic, addLink, addResource } from './actions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const topics = await prisma.topic.findMany();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', color: '#fff', padding: '48px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Admin Dashboard</h1>
        <Link href="/" style={{ padding: '10px 20px', backgroundColor: '#1f1f1f', borderRadius: '8px', textDecoration: 'none', color: '#fff', fontWeight: 600 }}>
          Back to Map
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        
        {/* ADD TOPIC CARD */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#141414', border: '1px solid #1f1f1f', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>➕ Create Topic Node</h2>
          <form action={addTopic} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Topic ID (lowercase, no spaces)</label>
              <input name="id" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }} placeholder="e.g. java" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Display Label</label>
              <input name="label" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }} placeholder="e.g. Java Programming" />
            </div>
            <button type="submit" style={{ marginTop: '8px', padding: '14px', backgroundColor: '#10b981', color: '#000', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Create Topic</button>
          </form>
        </div>

        {/* CONNECT TOPICS CARD */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#141414', border: '1px solid #1f1f1f', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>🔗 Connect Topics</h2>
          <form action={addLink} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Source Node</label>
              <select name="sourceId" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }}>
                <option value="">Select source...</option>
                {topics.map(t => <option key={`src-${t.id}`} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Target Node (points to)</label>
              <select name="targetId" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }}>
                <option value="">Select target...</option>
                {topics.map(t => <option key={`tgt-${t.id}`} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <button type="submit" style={{ marginTop: '8px', padding: '14px', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Create Link</button>
          </form>
        </div>

        {/* ADD RESOURCE CARD */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#141414', border: '1px solid #1f1f1f', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>📚 Add Resource</h2>
          <form action={addResource} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Belongs to Topic</label>
              <select name="topicId" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }}>
                <option value="">Select topic...</option>
                {topics.map(t => <option key={`res-${t.id}`} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Resource Title</label>
              <input name="title" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }} placeholder="e.g. Official Docs" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>URL</label>
              <input name="url" type="url" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }} placeholder="https://..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>Category</label>
              <select name="category" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f0f0f', color: '#fff' }}>
                <option value="Intro">Intro</option>
                <option value="Interesting">Interesting</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" style={{ marginTop: '8px', padding: '14px', backgroundColor: '#f59e0b', color: '#000', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Add Resource</button>
          </form>
        </div>

      </div>
    </div>
  );
}
