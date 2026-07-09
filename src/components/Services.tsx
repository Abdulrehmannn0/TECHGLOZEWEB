/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Palette, Code, Cpu, TrendingUp, Video, Briefcase, ChevronRight, Check, X, ArrowRight, Layers, Activity, Calendar, Sparkles, Settings } from 'lucide-react';
import { SERVICES_LIST } from '../utils/data';

const getServiceDetails = (name: string) => {
  const detailsMap: Record<string, any> = {
    "Website Design": {
      headline: "Award-winning, conversion-centric visual architecture.",
      overview: "Our bespoke web designs combine Apple-grade negative space, modern typography, and fluid transitions. We don't build generic templates; we engineer digital masterpieces designed to command authority, establish luxury, and convert high-intent prospects.",
      stack: ["Figma Enterprise", "Adobe CC", "Spline (3D)", "Motion (React)", "Tailwind CSS"],
      deliverables: ["High-fidelity interactive Figma prototypes", "Custom premium design system & UI kit", "Responsive desktop, tablet, and mobile layouts", "SEO-optimized semantic structure & typography guides"],
      timeline: "3 - 5 Weeks",
      roi: "+180% User engagement, increased brand trust, and flawless visual credibility."
    },
    "UI UX Design": {
      headline: "Flawless user journeys designed for complex workflows.",
      overview: "We structure hyper-intuitive user interfaces and high-performance user experiences. By conducting extensive research and user-journey mapping, we eliminate friction and make complex software feel completely natural.",
      stack: ["Figma Pro", "Principle", "ProtoPie", "Tailwind CSS", "UserTesting"],
      deliverables: ["Comprehensive user persona mapping", "Interactive wireframes & flow diagrams", "Pixel-perfect final UI designs", "Component-based design system export"],
      timeline: "4 - 6 Weeks",
      roi: "99.9% Task completion rate, decreased churn, and highly optimized onboarding."
    },
    "AI Automation": {
      headline: "Infuse Gemini-powered intelligence directly into your systems.",
      overview: "Automate repetitive decisions, document analysis, and intelligence gathering. Using the modern Gemini API and custom Node.js/Python microservices, we build secure, robust pipelines that handle complex corporate reasoning automatically.",
      stack: ["Gemini 2.5 Pro & Flash", "Google GenAI SDK", "Python", "Node.js", "LangChain / LlamaIndex"],
      deliverables: ["Custom Gemini AI agent architecture", "Secure API routing & proxy endpoints", "Automated reasoning & decision pipelines", "Full developer integration & monitoring dashboard"],
      timeline: "4 - 8 Weeks",
      roi: "10x Faster document processing, 90% reduction in manual oversight, 24/7 autonomous ops."
    },
    "SEO (Technical & Local)": {
      headline: "Command the search engines. Capture compounding organic traffic.",
      overview: "We execute deep technical auditing, semantic content clusters, custom structured data schema, and high-performance server-side rendering setups. This guarantees rapid indexation and sustainable high-authority keyword rankings.",
      stack: ["Google Search Console", "Ahrefs / SEMrush", "Screaming Frog", "Schema.xml", "Vite SSR"],
      deliverables: ["In-depth technical SEO site audit", "Competitor analysis & keyword cluster map", "On-page semantic structural optimization", "Rich snippets & local schema integration"],
      timeline: "Ongoing (Monthly)",
      roi: "+350% Organic traffic growth, top-3 rankings for high-intent queries, compounding ROI."
    },
    "Website Development": {
      headline: "Lightweight, ultra-fast, and stunning web engineering.",
      overview: "We build pixel-perfect, light-speed websites using modern React, Vite, and Tailwind. Every line of code is optimized for performance (achieving Lighthouse scores of 95+), instant interactivity, and seamless animations.",
      stack: ["React 19", "Vite", "TypeScript", "Tailwind CSS v4", "Motion (React)"],
      deliverables: ["Light-speed, 100% responsive frontend code", "Seamless native-like route transitions", "Headless CMS integration (Sanity / Contentful)", "Enterprise hosting configuration"],
      timeline: "4 - 7 Weeks",
      roi: "Lighthouse Score 98+, instantly loading pages, and zero-maintenance infrastructure."
    },
    "Google Ads & PPC": {
      headline: "High-intent client capture via algorithmic PPC scaling.",
      overview: "We engineer high-efficiency search and Performance Max campaigns targeting buyers exactly when they are searching. Our custom bidding scripts and highly optimized landing pages ensure maximum ROI and minimum wasted spend.",
      stack: ["Google Ads Editor", "Google Analytics 4", "Custom Tag Manager", "Excel Automation Scripts"],
      deliverables: ["In-depth keyword targeting & negative list setup", "A/B tested ad copy variations", "Conversion tracking & server-side tagging", "Live performance reporting dashboard"],
      timeline: "2 - 4 Weeks Setup",
      roi: "Consistent 4.5x+ ROAS (Return on Ad Spend) and lower cost-per-acquisition (CPA)."
    }
  };

  // Return specific details or a fallback beautiful premium set based on name
  return detailsMap[name] || {
    headline: `Premium bespoke solutions for ${name}.`,
    overview: `Our ${name} services are crafted specifically to deliver world-class aesthetic quality and high-performance business results. We combine years of agency experience with cutting-edge tools to elevate your brand.`,
    stack: ["Premium Industry Tools", "Tailwind CSS", "Motion (React)", "Custom Automation"],
    deliverables: [
      `Custom-tailored strategy blueprint for ${name}`,
      "Pixel-perfect visual delivery & asset package",
      "Comprehensive launch support & handover guides",
      "Full post-launch analytics & performance validation"
    ],
    timeline: "3 - 6 Weeks",
    roi: "Exponential brand value, optimized user conversion, and master-level custom engineering."
  };
};

export default function Services({ language }: { language: string }) {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [activeService, setActiveService] = useState<any | null>(null);

  // Read hash on mount to check if deep linking is requested
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/services/')) {
        const serviceSlug = hash.replace('#/services/', '');
        // Find matching service name
        for (const cat of SERVICES_LIST) {
          const matched = cat.items.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === serviceSlug);
          if (matched) {
            setActiveService({ ...matched, categoryName: cat.category });
            return;
          }
        }
      } else if (!hash) {
        setActiveService(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run once initially

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openService = (service: any, categoryName: string) => {
    const slug = service.name.toLowerCase().replace(/\s+/g, '-');
    window.location.hash = `#/services/${slug}`;
    setActiveService({ ...service, categoryName });
  };

  const closeService = () => {
    window.location.hash = '';
    setActiveService(null);
  };

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeService();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to map string to lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const details = activeService ? getServiceDetails(activeService.name) : null;

  return (
    <section id="services-section" className="py-24 bg-white dark:bg-[#0F0F0F] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
              02 / AGENCY CAPABILITIES
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
              Our Premium Services
            </h2>
            <div className="h-[2px] bg-brand-gold w-16 mt-4" />
          </div>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            We deliver uncompromising speed, stunning visual luxury, and high-performance automated solutions tailored specifically to capture global leads.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-brand-border dark:border-zinc-800 pb-6 overflow-x-auto">
          {SERVICES_LIST.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(idx)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedCategory === idx
                  ? 'bg-brand-dark dark:bg-white text-white dark:text-brand-dark shadow-md scale-105'
                  : 'bg-white dark:bg-[#171717] border border-brand-border dark:border-zinc-800 text-zinc-500 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {getIcon(cat.icon)}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Selected Category Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST[selectedCategory].items.map((service, idx) => (
            <div
              key={idx}
              onClick={() => openService(service, SERVICES_LIST[selectedCategory].category)}
              className="bg-white dark:bg-[#171717] border border-brand-border dark:border-zinc-800 p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-brand-gold/60 hover:shadow-lg dark:hover:border-brand-gold/40 hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between cursor-pointer"
            >
              {/* Card Header decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-gold/5 dark:from-brand-gold/2 rounded-tr-2xl rounded-bl-full pointer-events-none" />

              <div className="space-y-4 text-left">
                {/* Micro Category Badge */}
                <span className="font-mono text-[0.6rem] font-bold text-brand-gold uppercase tracking-widest block">
                  SERVICE // 0{idx + 1}
                </span>

                <h3 className="font-display font-bold text-xl text-brand-dark dark:text-white group-hover:text-brand-gold transition-colors duration-200">
                  {service.name}
                </h3>
                
                <p className="font-sans text-[0.82rem] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Card Footer action indicators */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-500/10">
                <span className="flex items-center gap-1 text-[0.7rem] font-mono text-zinc-400 dark:text-zinc-500">
                  <Check className="w-3.5 h-3.5 text-brand-gold" />
                  Bespoke Standard
                </span>
                
                <div className="w-8 h-8 rounded-full bg-brand-gold-light dark:bg-zinc-800 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Interactive highlight callout card */}
        <div className="mt-16 bg-brand-dark border border-zinc-800 p-8 md:p-12 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left relative overflow-hidden">
          {/* Glowing backdrops */}
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs text-brand-gold font-bold uppercase tracking-[0.3em]">
              NEED A TAILORED SOLUTION?
            </span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Let's Architect an Intelligent AI-Powered Strategy for Your Brand.
            </h3>
            <p className="font-sans text-sm text-zinc-400 max-w-xl">
              Tell our AI Assistant about your commercial ideas, and instantly generate a secure, modular tech stack and pricing estimate.
            </p>
          </div>

          <div className="lg:col-span-4 justify-self-start lg:justify-self-end">
            <button
              onClick={() => {
                const el = document.getElementById('interactive-tools-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-brand-gold hover:bg-white hover:text-brand-dark text-brand-dark font-sans text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md cursor-pointer"
            >
              Launch Estimate Generator
            </button>
          </div>
        </div>

      </div>

      {/* DEDICATED SERVICE DETAILS PAGE MODAL (Option A) */}
      {activeService && details && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-6 select-text overflow-hidden animate-fade-in">
          {/* Overlay backdrop with high-end blur */}
          <div 
            onClick={closeService}
            className="absolute inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md cursor-pointer" 
          />
          
          {/* The Service Page container */}
          <div className="bg-white dark:bg-[#0F0F0F] border border-brand-border dark:border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-scale-up flex flex-col">
            
            {/* Elegant Header with abstract logo backdrop */}
            <div className="p-8 md:p-12 pb-6 border-b border-brand-border dark:border-zinc-800 relative bg-brand-gold-light/40 dark:bg-[#171717]/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-gold/10 dark:from-brand-gold/5 rounded-bl-full pointer-events-none" />
              
              <button 
                onClick={closeService}
                className="absolute top-6 right-6 p-2 rounded-full border border-brand-border dark:border-zinc-800 hover:border-brand-gold hover:bg-brand-gold/10 text-zinc-400 hover:text-brand-gold transition-all duration-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 text-left">
                <span className="font-mono text-xs font-bold text-brand-gold uppercase tracking-[0.25em] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  {activeService.categoryName} // CAPABILITY
                </span>
                <h1 className="font-display font-black text-2xl md:text-4xl text-brand-dark dark:text-white tracking-tight leading-none">
                  {activeService.name}
                </h1>
                <p className="font-serif italic text-lg text-brand-gold font-medium leading-tight max-w-2xl pt-2">
                  "{details.headline}"
                </p>
              </div>
            </div>

            {/* Main scrollable body */}
            <div className="p-8 md:p-12 space-y-10 text-left flex-1 overflow-y-auto">
              
              {/* Executive Overview */}
              <div className="space-y-4">
                <h3 className="font-mono text-[0.7rem] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  Executive Overview
                </h3>
                <p className="font-sans text-sm md:text-[0.95rem] text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                  {details.overview}
                </p>
              </div>

              {/* Grid: Deliverables and Stack */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-brand-border dark:border-zinc-800">
                
                {/* Custom Deliverables Checklist */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="font-mono text-[0.7rem] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand-gold" />
                    Custom Deliverables Included
                  </h3>
                  <ul className="space-y-3">
                    {details.deliverables.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-brand-gold-light dark:bg-zinc-900 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-sans text-[0.85rem] text-zinc-600 dark:text-zinc-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Metadata (Timeline, ROI, Stack) */}
                <div className="md:col-span-5 space-y-6">
                  
                  {/* Technology Stack */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-[0.7rem] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {details.stack.map((item: string, idx: number) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 rounded bg-brand-gold-light dark:bg-[#171717] border border-brand-gold/15 dark:border-zinc-800 text-[0.72rem] font-mono font-medium text-brand-gold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Estimation Targets */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <span className="font-mono text-[0.62rem] text-zinc-400 dark:text-zinc-500 uppercase font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Duration
                      </span>
                      <p className="font-display font-bold text-sm text-brand-dark dark:text-white">
                        {details.timeline}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[0.62rem] text-zinc-400 dark:text-zinc-500 uppercase font-semibold flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Standard
                      </span>
                      <p className="font-display font-bold text-sm text-brand-dark dark:text-white">
                        Bespoke Premium
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Service Target ROI */}
              <div className="p-6 rounded-2xl bg-brand-gold-light dark:bg-[#171717]/80 border border-brand-gold/20 dark:border-zinc-800/80 space-y-2">
                <span className="font-mono text-[0.65rem] font-bold text-brand-gold uppercase tracking-[0.2em] block">
                  SERVICE ROI TARGET
                </span>
                <p className="font-sans text-[0.88rem] text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                  {details.roi}
                </p>
              </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 md:p-8 bg-zinc-50 dark:bg-[#171717]/40 border-t border-brand-border dark:border-zinc-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
                Launch with TechGloze and experience elite execution. No templates. Perfect custom logic.
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={closeService}
                  className="px-5 py-2.5 rounded-full border border-brand-border dark:border-zinc-800 hover:border-brand-gold text-zinc-500 dark:text-zinc-400 hover:text-brand-gold font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Return to Overview
                </button>
                <button
                  onClick={() => {
                    closeService();
                    // Scroll to estimate generator
                    setTimeout(() => {
                      const el = document.getElementById('interactive-tools-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-6 py-2.5 bg-brand-gold hover:bg-brand-dark dark:hover:bg-white text-brand-dark hover:text-white dark:hover:text-brand-dark font-sans text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  Instant Estimate Generator
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
