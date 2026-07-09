/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_PROJECTS } from '../utils/data';
import { PortfolioProject } from '../types';
import { X, ExternalLink, Calendar, Code, Clock, TrendingUp, Sparkles, Film, ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter categories
  const filters = [
    "All", "Websites", "Mobile Apps", "AI Automation", "Branding", "Meta Ads", "SEO", "Dashboards"
  ];

  const filteredProjects = activeFilter === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(proj => proj.category === activeFilter);

  return (
    <section id="portfolio-section" className="py-24 bg-white dark:bg-[#0F0F0F] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
              03 / RECENT WORK
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
              Selected Masterpieces
            </h2>
            <div className="h-[2px] bg-brand-gold w-16 mt-4" />
          </div>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Explore our curated catalog of custom-engineered applications, luxury visual interfaces, and automated client systems.
          </p>
        </div>

        {/* Category Filters row */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-brand-border dark:border-zinc-800 pb-6 overflow-x-auto">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-brand-gold text-brand-dark font-black shadow-md scale-105'
                  : 'bg-brand-gold-light/40 dark:bg-[#171717]/40 border border-brand-border dark:border-zinc-800 text-zinc-500 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white dark:bg-[#171717] border border-brand-border dark:border-zinc-800 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full clickable"
            >
              
              {/* Card Media Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Custom Video Preview play overlay indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/90 text-brand-dark flex items-center justify-center shadow-lg">
                    <Film className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                {/* Growth Metric Accent tag */}
                {project.growthMetric && (
                  <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[0.6rem] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {project.growthMetric}
                  </div>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-6 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-[0.6rem] font-bold text-brand-gold uppercase tracking-widest">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-brand-dark dark:text-white group-hover:text-brand-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.technology.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="font-mono text-[0.55rem] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                      {tech}
                    </span>
                  ))}
                  {project.technology.length > 3 && (
                    <span className="font-mono text-[0.55rem] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      +{project.technology.length - 3} More
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Project Details Modal popups */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-text">
            {/* Backdrop click closes modal */}
            <div 
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-dark/80 dark:bg-black/85 backdrop-blur-sm cursor-pointer animate-fade-in" 
            />

            <div className="bg-white dark:bg-[#171717] border border-brand-border dark:border-zinc-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative text-left my-8 z-10 animate-scale-up">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-zinc-100 hover:bg-brand-gold dark:bg-zinc-800 dark:hover:bg-brand-gold text-brand-dark dark:text-white dark:hover:text-brand-dark flex items-center justify-center transition-all shadow-md cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Side: Images & Showcase */}
                <div className="lg:col-span-7 bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center min-h-[300px] lg:min-h-[500px]">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProject.gallery.length > 1 && (
                    <div className="grid grid-cols-2 gap-1 p-2 bg-zinc-200/50 dark:bg-zinc-800/50 border-t border-brand-border dark:border-zinc-800">
                      {selectedProject.gallery.slice(0, 2).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Gallery item"
                          className="w-full aspect-[4/3] object-cover rounded"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side: Editorial Content Details */}
                <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-white dark:bg-[#171717]">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase block mb-1">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-display font-black text-2xl text-brand-dark dark:text-white leading-tight">
                        {selectedProject.title}
                      </h3>
                    </div>

                    <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Metadata attributes list */}
                    <div className="grid grid-cols-2 gap-4 border-y border-brand-border dark:border-zinc-800 py-6">
                      <div className="space-y-1">
                        <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest block font-bold">Client</span>
                        <p className="font-sans text-xs font-semibold text-brand-dark dark:text-white">{selectedProject.client}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest block font-bold">Duration</span>
                        <p className="font-sans text-xs font-semibold text-brand-dark dark:text-white">{selectedProject.duration}</p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <span className="font-mono text-[0.6rem] text-brand-gold uppercase tracking-widest block font-bold">Project Results</span>
                        <p className="font-sans text-xs font-bold text-brand-gold flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4" />
                          {selectedProject.results}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest block font-bold">Technologies Used</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technology.map((tech, idx) => (
                          <span key={idx} className="font-mono text-[0.55rem] px-2.5 py-1 rounded bg-brand-gold-light dark:bg-[#0F0F0F] text-brand-dark dark:text-zinc-300 font-bold border border-brand-gold/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      // Scroll to contact brief
                      const el = document.getElementById('contact-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-8 w-full py-3 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Discuss Similar Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
