/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

export default function SpiderWebBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const maxNodes = 60; // Clean, high-performance density
    const maxDistance = 120; // Connection range
    const mouseRadius = 180; // Distance of mouse attraction

    // Resize handler
    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initNodes();
    };

    // Initialize nodes
    const initNodes = () => {
      nodes = [];
      const density = (canvas.width * canvas.height) / 18000;
      const count = Math.min(Math.max(Math.round(density), 30), maxNodes);

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.5 + 0.8;
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: radius,
          baseRadius: radius,
        });
      }
    };

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup
    handleResize();

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update nodes
      const mouse = mouseRef.current;
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Select base colors based on current document theme
      const lineColor = isDarkMode ? 'rgba(201, 162, 39, 0.08)' : 'rgba(201, 162, 39, 0.12)';
      const nodeColor = isDarkMode ? 'rgba(201, 162, 39, 0.35)' : 'rgba(201, 162, 39, 0.5)';

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Constant drifting motion
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundaries
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse attraction physics (magnetic drift)
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            // Calculate pull force (stronger as it gets closer)
            const force = (mouseRadius - dist) / mouseRadius;
            node.x += (dx / dist) * force * 0.65;
            node.y += (dy / dist) * force * 0.65;
            node.radius = node.baseRadius * (1 + force * 0.8);
          } else {
            // Return to normal scale
            node.radius += (node.baseRadius - node.radius) * 0.1;
          }
        } else {
          node.radius += (node.baseRadius - node.radius) * 0.1;
        }

        // Render point
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Connect nodes to neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            // Line opacity based on distance
            const alpha = (1 - dist / maxDistance) * 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = lineColor.replace('0.08', (0.08 * alpha).toFixed(2)).replace('0.12', (0.12 * alpha).toFixed(2));
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto w-full h-full block z-0 opacity-80"
    />
  );
}
