"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useRouter } from 'next/navigation';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
}

export default function SpiderGraph({ searchQuery = '' }: { searchQuery?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchRef = useRef(searchQuery);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);

  useEffect(() => {
    searchRef.current = searchQuery;
    // Force re-render on search change
    if (simulationRef.current) {
      simulationRef.current.alpha(0.05).restart();
    }
  }, [searchQuery]);

  useEffect(() => {
    let simulation: d3.Simulation<GraphNode, GraphLink>;

    const initGraph = async () => {
      try {
        const res = await fetch('/api/graph');
        if (!res.ok) throw new Error('Failed to fetch graph data');
        const data = await res.json();

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        context.scale(window.devicePixelRatio, window.devicePixelRatio);

        const nodes: GraphNode[] = data.nodes.map((d: any) => ({ ...d }));
        const links: GraphLink[] = data.links.map((d: any) => ({ ...d }));

        // Count connections per node for sizing (hub nodes = bigger text)
        const connectionCount: Record<string, number> = {};
        nodes.forEach(n => { connectionCount[n.id] = 0; });
        links.forEach((l: any) => {
          const sid = typeof l.source === 'string' ? l.source : l.source.id;
          const tid = typeof l.target === 'string' ? l.target : l.target.id;
          connectionCount[sid] = (connectionCount[sid] || 0) + 1;
          connectionCount[tid] = (connectionCount[tid] || 0) + 1;
        });

        // Determine font size based on connection count
        const getFontSize = (id: string) => {
          const count = connectionCount[id] || 0;
          if (count >= 12) return 28; // Major hubs like "Programming", "CS"
          if (count >= 8) return 22;  // Sub-hubs like "Web", "AI"
          if (count >= 5) return 17;  // Important like "Python", "JavaScript" 
          if (count >= 3) return 14;  // Medium like "React", "Docker"
          return 11; // Leaf nodes
        };

        simulation = d3.forceSimulation<GraphNode>(nodes)
          .force('link', d3.forceLink<GraphNode, GraphLink>(links)
            .id((d: any) => d.id)
            .distance(55)
            .strength(0.2)
          )
          .force('charge', d3.forceManyBody().strength(-80))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('collision', d3.forceCollide().radius((d: any) => getFontSize(d.id) * 1.8))
          // Push nodes AWAY from center — creates the large empty space around "I want to learn"
          .force('radial', d3.forceRadial(
            Math.min(width, height) * 0.55, // much larger radius — big gap in center
            width / 2, 
            height / 2
          ).strength(0.15))
          // Gentle boundary forces to keep nodes on screen
          .force('x', d3.forceX(width / 2).strength(0.01))
          .force('y', d3.forceY(height / 2).strength(0.01))
          .alphaDecay(0.01)
          .velocityDecay(0.45);

        simulationRef.current = simulation;

        // Drag behavior
        d3.select(canvas)
          .call(d3.drag<HTMLCanvasElement, any>()
            .container(canvas)
            .subject((event) => simulation.find(event.x, event.y, 30))
            .on('start', (event) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              event.subject.fx = event.subject.x;
              event.subject.fy = event.subject.y;
            })
            .on('drag', (event) => {
              event.subject.fx = event.x;
              event.subject.fy = event.y;
            })
            .on('end', (event) => {
              if (!event.active) simulation.alphaTarget(0);
              event.subject.fx = null;
              event.subject.fy = null;
            })
          )
          .on('click', (event) => {
            const [x, y] = d3.pointer(event);
            const node = simulation.find(x, y, 25) as GraphNode | undefined;
            if (node && node.id) {
              router.push(`/topic/${node.id}`);
            }
          });

        // Hover cursor change
        canvas.addEventListener('mousemove', (event) => {
          const rect = canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const node = simulation.find(x, y, 25);
          canvas.style.cursor = node ? 'pointer' : 'default';
        });

        simulation.on('tick', () => {
          context.clearRect(0, 0, width, height);
          const currentSearch = searchRef.current.toLowerCase();

          // ── Draw links ──
          context.globalAlpha = 0.08;
          context.strokeStyle = '#ffffff';
          context.lineWidth = 0.5;
          links.forEach((link: any) => {
            if (!link.source.x || !link.target.x) return;
            context.beginPath();
            context.moveTo(link.source.x, link.source.y);
            context.lineTo(link.target.x, link.target.y);
            context.stroke();
          });
          context.globalAlpha = 1;

          // ── Draw node labels ──
          nodes.forEach((node: any) => {
            if (!node.x || !node.y) return;

            const fontSize = getFontSize(node.id);
            const isMatch = currentSearch && node.label.toLowerCase().includes(currentSearch);
            const isHub = (connectionCount[node.id] || 0) >= 8;

            // Font
            const weight = isHub ? 'bold' : 'normal';
            context.font = `${weight} ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';

            if (isMatch) {
              // Matched search — bright green with glow
              context.shadowColor = '#10b981';
              context.shadowBlur = 20;
              context.fillStyle = '#10b981';
              context.fillText(node.label, node.x, node.y);
              context.shadowBlur = 0;
            } else {
              // Default style — red to white gradient based on connections
              const count = connectionCount[node.id] || 0;
              if (count >= 8) {
                context.fillStyle = '#ffffff'; // White for major hubs
              } else if (count >= 5) {
                context.fillStyle = '#cc6b5a'; // Warm salmon for sub-hubs
              } else if (count >= 3) {
                context.fillStyle = '#a83a32'; // Red for medium
              } else {
                context.fillStyle = '#7a3530'; // Dark red for leaf nodes
              }
              
              // Dim non-matching nodes when searching
              if (currentSearch) {
                context.globalAlpha = 0.15;
              }
              
              context.fillText(node.label, node.x, node.y);
              context.globalAlpha = 1;
            }
          });
        });

      } catch (err: any) {
        setError(err.message || 'Error initializing graph');
      }
    };

    initGraph();

    // Handle window resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      if (simulationRef.current) {
        simulationRef.current.force('center', d3.forceCenter(width / 2, height / 2));
        simulationRef.current.alpha(0.3).restart();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (simulation) simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}