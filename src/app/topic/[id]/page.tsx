"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { getTopicResource, ResourceLink } from '../../../data/resourceData';
import { nodes } from '../../../data/graphData';

export default function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Database data state
  const [resourceData, setResourceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/topic/${id}`);
        if (res.ok) {
          const data = await res.json();
          setResourceData(data);
          
          // Pre-populate statuses from database layout!
          const allResources = [...(data.intro || []), ...(data.interesting || []), ...(data.other || [])];
          const initialStatuses: Record<string, string> = {};
          allResources.forEach((r: any) => {
            if (r.status) initialStatuses[r.id] = r.status;
          });
          setStatuses(initialStatuses);
        }
      } catch (e) {
        console.error("Failed to load topic resources", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0f0f0f', color: '#fff', alignItems: 'center', justifyContent: 'center' }}>Loading Topic...</div>;
  if (!resourceData) return <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0f0f0f', color: '#fff', alignItems: 'center', justifyContent: 'center' }}>Topic not found in database.</div>;

  const handleStatusChange = async (resourceId: string, status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Optimistic UI update
    setStatuses(prev => ({ ...prev, [resourceId]: status }));
    setOpenDropdown(null);

    // Persist to database!
    try {
      await fetch(`/api/topic/${id}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId, status })
      });
    } catch (err) {
      console.error('Failed to save progress', err);
    }
  };

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(prev => prev === id ? null : id);
  };

  const renderLinkItem = (item: ResourceLink, index: number) => {
    const currentStatus = statuses[item.id];
    let iconProps = { border: '2px solid #555', bg: 'transparent', text: '' };
    if (currentStatus === 'Learning') iconProps = { border: '2px solid #fbbf24', bg: 'transparent', text: '🎓' };
    if (currentStatus === 'Learned') iconProps = { border: 'none', bg: '#10b981', text: '✓' };
    if (currentStatus === 'To Learn') iconProps = { border: '2px solid #555', bg: 'transparent', text: '🔖' };

    return (
      <div key={item.id} style={{ display: 'flex', alignItems: 'center', margin: '4px 0', padding: '12px 0', borderBottom: '1px solid #1f1f1f' }}>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={(e) => toggleDropdown(item.id, e)}
            style={{ 
              width: '18px', height: '18px', borderRadius: '50%', 
              border: iconProps.border, 
              backgroundColor: iconProps.bg, 
              marginRight: '16px', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px'
            }}
          >
            {iconProps.text && <span style={{ color: '#fff' }}>{iconProps.text}</span>}
          </button>
          
          {openDropdown === item.id && (
            <>
              <div 
                style={{ position: 'fixed', inset: 0, zIndex: 5 }} 
                onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} 
              />
              <div style={{ position: 'absolute', top: '24px', left: 0, backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '8px 0', zIndex: 10, width: '130px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <div onClick={(e) => handleStatusChange(item.id, 'To Learn', e)} style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center' }}><span style={{marginRight: '8px'}}>🔖</span> To Learn</div>
                <div onClick={(e) => handleStatusChange(item.id, 'Learning', e)} style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', color: '#fbbf24' }}><span style={{marginRight: '8px'}}>🎓</span> Learning</div>
                <div onClick={(e) => handleStatusChange(item.id, 'Learned', e)} style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', color: '#10b981' }}><span style={{marginRight: '8px'}}>✓</span> Learned</div>
              </div>
            </>
          )}
        </div>
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', color: '#eaeaea', fontWeight: 500, marginRight: '12px' }}>{item.title}</span>
          <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: '#777', fontSize: '12px', textDecoration: 'none' }}>
            <span style={{ marginRight: '4px' }}>🔗</span>
            <span>{item.url}</span>
          </a>
        </div>
      </div>
    );
  };

  // Performance Tracking Metrics
  const totalItems = (resourceData.intro?.length || 0) + (resourceData.interesting?.length || 0) + (resourceData.other?.length || 0);
  const toLearnCount = Object.values(statuses).filter(s => s === 'To Learn').length;
  const learningCount = Object.values(statuses).filter(s => s === 'Learning').length;
  const learnedCount = Object.values(statuses).filter(s => s === 'Learned').length;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0f0f0f', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{ width: '240px', borderRight: '1px solid #1f1f1f', display: 'flex', flexDirection: 'column', padding: '16px', backgroundColor: '#141414' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '28px', height: '28px', backgroundColor: '#444', borderRadius: '50%', marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>🌐</div>
            <span style={{ fontWeight: 600 }}>Back</span>
          </Link>
        </div>

        <div style={{ flex: 1 }}></div>

        <button style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          → Sign in
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '48px 80px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{resourceData.title}</h1>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#141414', padding: '12px 16px', borderRadius: '8px', border: '1px solid #1f1f1f' }}>
            <span style={{ color: '#777', marginRight: '12px' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search..." 
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '15px', width: '100%' }}
            />
          </div>
        </div>

        {/* Intro Section */}
        {resourceData.intro && resourceData.intro.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '13px', color: '#777', textTransform: 'none', fontWeight: 500, marginBottom: '8px' }}>Intro</h3>
            <div>
              {resourceData.intro.map((item, i) => renderLinkItem(item, i))}
            </div>
          </div>
        )}

        {/* Interesting Section */}
        {resourceData.interesting && resourceData.interesting.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '13px', color: '#777', textTransform: 'none', fontWeight: 500, marginBottom: '8px' }}>Interesting</h3>
            <div>
              {resourceData.interesting.map((item, i) => renderLinkItem(item, i))}
            </div>
          </div>
        )}

        {/* Other Section */}
        {resourceData.other && resourceData.other.length > 0 && (
          <div>
            <h3 style={{ fontSize: '13px', color: '#777', textTransform: 'none', fontWeight: 500, marginBottom: '8px' }}>Other</h3>
            <div>
              {resourceData.other.map((item, i) => renderLinkItem(item, i))}
            </div>
          </div>
        )}

      </div>

      {/* Performance Tracking Right Sidebar */}
      <div style={{ width: '300px', borderLeft: '1px solid #1f1f1f', backgroundColor: '#141414', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 24px 0', borderBottom: '1px solid #333', paddingBottom: '16px' }}>
          Goal Tracking
        </h2>
        
        <div style={{ marginBottom: '32px' }}>
          <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>Current Category</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{resourceData.title}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Progress Bar overall */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', color: '#aaa' }}>
              <span>Completion Indicator</span>
              <span>{Math.round((learnedCount / totalItems) * 100) || 0}%</span>
            </div>
            <div style={{ height: '6px', width: '100%', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(learnedCount / totalItems) * 100}%`, backgroundColor: '#10b981', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1f1f1f', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '12px', fontSize: '18px' }}>🔖</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>To Learn</span>
            </div>
            <span style={{ fontWeight: 600 }}>{toLearnCount}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1f1f1f', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '12px', fontSize: '18px', color: '#fbbf24' }}>🎓</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Learning</span>
            </div>
            <span style={{ fontWeight: 600, color: '#fbbf24' }}>{learningCount}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1f1f1f', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '12px', fontSize: '18px', color: '#10b981' }}>✓</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Learned</span>
            </div>
            <span style={{ fontWeight: 600, color: '#10b981' }}>{learnedCount}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #333', marginTop: '16px', paddingTop: '16px' }}>
            <span style={{ fontSize: '14px', color: '#aaa' }}>Total Resources</span>
            <span style={{ fontWeight: 700 }}>{totalItems}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
