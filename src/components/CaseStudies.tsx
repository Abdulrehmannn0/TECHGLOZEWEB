/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../utils/data';
import { Sparkles, TrendingUp, HelpCircle, Search, Compass, Paintbrush, Zap, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CaseStudies() {
  const caseStudy = CASE_STUDIES[0]; // Aura Watches Deep-dive

  // Before & After slider state (percentage from 0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleMouseUp);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);
  };

  return (
    <section id="case-studies-section" className="py-24 bg-white dark:bg-[#111111] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-left">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
            04 / CASE STUDY INSIGHTS
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
            Detailed Masterpiece Overhaul
          </h2>
          <div className="h-[2px] bg-brand-gold w-16 mt-4" />
        </div>

        {/* Hero Study Header */}
        <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-mono font-black text-brand-gold uppercase tracking-widest px-2.5 py-1 rounded bg-brand-gold/10">
              {caseStudy.category}
            </span>
            <h3 className="font-display font-black text-2xl md:text-3xl text-brand-dark dark:text-white leading-tight">
              {caseStudy.title}
            </h3>
            
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Discover how TechGloze completely re-architected Aura's digital presence, resulting in an unprecedented luxury conversion and ultra-fast headless performance.
            </p>

            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400 font-bold">CLIENT:</span>
                <span className="text-brand-dark dark:text-white font-extrabold">{caseStudy.client}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400 font-bold">ESTIMATED ROI:</span>
                <span className="text-brand-gold font-extrabold">{caseStudy.roi}</span>
              </div>
            </div>
          </div>

          {/* Interactive Before & After Slider Container */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest font-black mb-4">
              Drag Center Slider Bar To Compare Transformation
            </span>
            
            <div
              ref={sliderContainerRef}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-brand-border dark:border-zinc-800 select-none shadow-md cursor-ew-resize bg-zinc-200 dark:bg-zinc-800"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              {/* OLD IMAGE: "Before" (Always on bottom) */}
              <div className="absolute inset-0">
                <img
                  src={caseStudy.beforeImg}
                  alt="Aura Old Outdated Design"
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/20" />
                <div className="absolute bottom-4 left-4 bg-brand-dark/70 backdrop-blur-md px-3 py-1 rounded text-[0.6rem] font-mono text-zinc-400 uppercase font-black">
                  Before // Flat Outdated Site
                </div>
              </div>

              {/* NEW IMAGE: "After" (On top with sliding width) */}
              <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={caseStudy.afterImg}
                  alt="Aura New Premium TechGloze Design"
                  // Must use explicit fixed width equal to container to avoid squash/stretch
                  className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                  style={{ width: sliderContainerRef.current?.getBoundingClientRect().width }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-gold/10" />
                <div className="absolute bottom-4 left-4 whitespace-nowrap bg-brand-dark/80 backdrop-blur-md border border-brand-gold/30 px-3 py-1 rounded text-[0.6rem] font-mono text-brand-gold uppercase font-black">
                  After // Breathtaking TechGloze Redesign
                </div>
              </div>

              {/* Slider Line Divider */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-brand-gold/80 z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Handle Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-gold text-brand-dark flex items-center justify-between px-1.5 shadow-[0_0_15px_#C9A227] pointer-events-none">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Strategic Roadmap Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl text-left space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">
              The Challenge
            </h4>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl text-left space-y-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">
              Research & Discoveries
            </h4>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {caseStudy.research}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl text-left space-y-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">
              The Strategy
            </h4>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {caseStudy.strategy}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl text-left space-y-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <Paintbrush className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">
              Bespoke Design
            </h4>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {caseStudy.design}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl text-left space-y-4">
            <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">
              Development & Speed
            </h4>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {caseStudy.development}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl text-left space-y-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <Rocket className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">
              Launch & Scale
            </h4>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {caseStudy.launch}
            </p>
          </div>

        </div>

        {/* Growth Metrics Highlight Row */}
        <div className="mt-16 bg-brand-dark border border-zinc-800 rounded-2xl p-8 md:p-12 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 pointer-events-none rounded-bl-full" />
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-brand-gold" />
              <h3 className="font-display font-black text-xl text-white uppercase tracking-wider">
                Audited Growth Metrics
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {caseStudy.growthMetrics.map((metric, idx) => (
                <div key={idx} className="space-y-2 border-l border-brand-gold/30 pl-6">
                  <p className="font-display font-black text-3rem text-brand-gold leading-none tracking-tight">
                    {metric.value}
                  </p>
                  <p className="font-mono text-[0.65rem] text-zinc-400 uppercase tracking-widest font-semibold">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
