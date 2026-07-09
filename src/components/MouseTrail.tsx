/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';

export default function MouseTrail() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [magnetic, setMagnetic] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  // Mouse position tracking
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover/coarse pointer
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(mediaQuery.matches);

    const updateTouch = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    mediaQuery.addEventListener('change', updateTouch);

    if (mediaQuery.matches) return;

    // Hide native cursor on html/body element
    document.documentElement.classList.add('cursor-none');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onWindowClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    };

    // Smooth outer ring follow with deceleration
    let animationFrameId: number;
    const updateRing = () => {
      // Linear interpolation (lerp)
      const ease = 0.15; // Speed factor of outer ring
      
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };

    updateRing();

    // Event listeners to handle hover state expansions and magnets
    const onMouseEnterInteractive = (e: Event) => {
      setHovered(true);
      const target = e.currentTarget as HTMLElement;
      if (target.classList.contains('magnetic-glow') || target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setMagnetic(true);
      }
    };

    const onMouseLeaveInteractive = () => {
      setHovered(false);
      setMagnetic(false);
    };

    const registerInteractiveListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], input, select, textarea, img, .clickable, .magnetic-target');
      targets.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    // Initial registration
    registerInteractiveListeners();

    // Re-register elements on clicks/dom change
    const observer = new MutationObserver(() => {
      registerInteractiveListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onWindowClick);

    return () => {
      mediaQuery.removeEventListener('change', updateTouch);
      document.documentElement.classList.remove('cursor-none');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onWindowClick);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner precise dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-brand-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference shadow-[0_0_10px_#C9A227]"
      />
      {/* Smooth outer ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ${
          hovered
            ? magnetic
              ? 'w-16 h-16 bg-brand-gold/15 border border-brand-gold shadow-[0_0_20px_rgba(201,162,39,0.4)]'
              : 'w-14 h-14 bg-transparent border border-brand-gold-sec scale-110'
            : 'w-8 h-8 bg-transparent border border-brand-gold/30'
        }`}
      />
      {/* Click Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none rounded-full border border-brand-gold/70 z-[9999] -translate-x-1/2 -translate-y-1/2 animate-ripple-expand"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '80px',
            height: '80px'
          }}
        />
      ))}
    </>
  );
}
