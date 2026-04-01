'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import SpiderGraph from '../components/SpiderGraph';
import LoginBox from '../components/LoginBox';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();

  // Dynamic heading based on login state
  const userName = session?.user?.name;
  const heading = userName ? `${userName}, what do you want to learn?` : 'I want to learn';

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SpiderGraph searchQuery={searchQuery} />
      <LoginBox />
      
      <Link href="/admin" style={{ position: 'absolute', top: '24px', right: '24px', padding: '10px 18px', backgroundColor: '#1a1a1a', color: '#fff', textDecoration: 'none', borderRadius: '6px', border: '1px solid #333', zIndex: 50, fontSize: '14px', fontWeight: 500 }}>
        ⚙️ Admin Panel
      </Link>

      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none'
      }}>
        <h1 style={{ 
          fontSize: userName ? '2.4rem' : '4rem', 
          fontWeight: 600, 
          marginBottom: '2rem', 
          letterSpacing: '-0.02em', 
          pointerEvents: 'auto', 
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          textAlign: 'center',
          padding: '0 20px',
          transition: 'font-size 0.3s ease',
        }}>{heading}</h1>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g. React.js, Python..." 
          style={{
             padding: '1rem 2rem', fontSize: '1.2rem', width: '100%', maxWidth: '500px',
             backgroundColor: 'rgba(20, 20, 20, 0.8)', color: 'white', border: '1px solid #333',
             borderRadius: '8px', outline: 'none', pointerEvents: 'auto', backdropFilter: 'blur(10px)',
             transition: 'border-color 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    </main>
  );
}