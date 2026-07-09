/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import SpiderWebBackground from './SpiderWebBackground';
import { ArrowRight, ChevronRight, Play, Star, Sparkles, Code, Cpu, TrendingUp } from 'lucide-react';
import { TRANSLATIONS } from '../utils/data';

interface HeroProps {
  language: string;
  onStartProject: () => void;
  onViewPortfolio: () => void;
}

export default function Hero({ language, onStartProject, onViewPortfolio }: HeroProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // States for animated counters
  const [projectsCount, setProjectsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);

  // Animate counter effect on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setProjectsCount(Math.min(Math.round((280 / steps) * step), 280));
      setCountriesCount(Math.min(Math.round((24 / steps) * step), 24));
      setClientsCount(Math.min(Math.round((150 / steps) * step), 150));
      setExperienceCount(Math.min(Math.round((8 / steps) * step), 8));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const clientLogos = [
    "Website Development", "Web Applications", "UI UX Design", "SEO", "Google Ads", "Meta Ads", "Social Media", "Brand Identity", "Graphic Design", "Video Editing", "Reels", "AI Automation", "CRM", "Excel Automation", "Data Entry", "WordPress", "Shopify", "Mobile Apps", "E-commerce", "Business Growth"
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-12 bg-white dark:bg-[#0F0F0F] bg-luxury-grid transition-colors duration-500">
      
      {/* Interactive Floating Spider Web Canvas */}
      <SpiderWebBackground />

      {/* Decorative Gradient Blur Background Accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-gold/5 dark:bg-brand-gold/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full bg-brand-gold/3 dark:bg-brand-gold/1 blur-[150px] pointer-events-none" />

      {/* Inner Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center text-center">
        
        {/* Subtitle tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold-light dark:bg-zinc-900 border border-brand-gold/30 dark:border-zinc-800 self-center mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
          <span className="font-mono text-[0.7rem] font-bold tracking-widest text-brand-gold uppercase">
            {language === 'ar' ? "الوكالة الرقمية الفائزة بالجوائز" : "Award-Winning Premium Agency"}
          </span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-display font-black text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-brand-dark dark:text-white tracking-tight leading-[1.05] max-w-5xl mx-auto mb-6">
          {t.hero.headline.split(' ').map((word, idx) => {
            if (word.toLowerCase() === 'premium' || word.toLowerCase() === 'الفاخرة' || word.toLowerCase() === 'digital' || word.toLowerCase() === 'globale' || word.toLowerCase() === 'brands') {
              return <span key={idx} className="text-brand-gold relative inline-block filter drop-shadow-[0_2px_4px_rgba(201,162,39,0.1)]">{word}&nbsp;</span>;
            }
            return word + " ";
          })}
        </h1>

        {/* Strategy tagline */}
        <p className="font-mono text-[0.8rem] md:text-[0.95rem] tracking-wider text-brand-gold font-bold uppercase max-w-3xl mx-auto mb-4">
          {t.hero.tagline}
        </p>

        {/* Detailed description paragraph */}
        <p className="font-sans text-[0.95rem] md:text-[1.1rem] text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t.hero.subheading}
        </p>

        {/* Micro strategic tags */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12 text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Code className="w-4 h-4 text-brand-gold" />
            <span>Master Engineering</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-brand-gold" />
            <span>AI Automation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-brand-gold" />
            <span>Scale & Performance</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onStartProject}
            className="group px-8 py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-sans text-[0.9rem] font-bold tracking-wide flex items-center gap-2 hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 magnetic-target"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onViewPortfolio}
            className="group px-8 py-4 bg-transparent border border-brand-border dark:border-zinc-800 hover:border-brand-gold text-brand-dark dark:text-white rounded-full font-sans text-[0.9rem] font-bold tracking-wide flex items-center gap-2 hover:bg-brand-gold-light dark:hover:bg-zinc-900 transition-all hover:-translate-y-0.5 active:translate-y-0 magnetic-target"
          >
            {t.hero.ctaSecondary}
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-brand-gold" />
          </button>
        </div>

        {/* Animated statistics row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 border-t border-brand-border dark:border-zinc-800 pt-12 pb-6 text-left max-w-5xl mx-auto">
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[2rem] md:text-[2.5rem] text-brand-dark dark:text-white tracking-tight leading-none mb-1">
              {projectsCount}+
            </span>
            <span className="font-mono text-[0.65rem] tracking-widest text-zinc-400 uppercase font-semibold">
              {t.hero.statsProjects}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[2rem] md:text-[2.5rem] text-brand-dark dark:text-white tracking-tight leading-none mb-1">
              {countriesCount}+
            </span>
            <span className="font-mono text-[0.65rem] tracking-widest text-zinc-400 uppercase font-semibold">
              {t.hero.statsCountries}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[2rem] md:text-[2.5rem] text-brand-dark dark:text-white tracking-tight leading-none mb-1">
              {clientsCount}+
            </span>
            <span className="font-mono text-[0.65rem] tracking-widest text-zinc-400 uppercase font-semibold">
              {t.hero.statsClients}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[2rem] md:text-[2.5rem] text-brand-dark dark:text-white tracking-tight leading-none mb-1">
              {experienceCount}+
            </span>
            <span className="font-mono text-[0.65rem] tracking-widest text-zinc-400 uppercase font-semibold">
              {t.hero.statsExperience}
            </span>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800 pt-4 lg:pt-0">
            <div className="flex items-center gap-1 mb-1 text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-gold" />
              ))}
            </div>
            <span className="font-mono text-[0.65rem] tracking-widest text-zinc-400 uppercase font-semibold">
              99.2% {language === 'ar' ? "رضا العملاء" : "Satisfaction"}
            </span>
          </div>
        </div>

      </div>

      {/* Scrolling tech logos marquee */}
      <div className="relative mt-16 border-y border-brand-border dark:border-zinc-800 py-6 overflow-hidden bg-brand-gold-light/40 dark:bg-[#171717]/40 select-none z-10">
        <div className="flex w-full overflow-hidden">
          {/* Double loop for seamless infinite slider effect */}
          <div className="flex gap-20 items-center justify-around min-w-full shrink-0 animate-marquee">
            {clientLogos.map((logo, idx) => (
              <span
                key={idx}
                className="font-display font-extrabold text-xl md:text-2xl tracking-widest text-zinc-300 dark:text-zinc-700 uppercase"
              >
                {logo}
              </span>
            ))}
          </div>
          <div className="flex gap-20 items-center justify-around min-w-full shrink-0 animate-marquee" aria-hidden="true">
            {clientLogos.map((logo, idx) => (
              <span
                key={idx}
                className="font-display font-extrabold text-xl md:text-2xl tracking-widest text-zinc-300 dark:text-zinc-700 uppercase"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
