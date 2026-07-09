/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Linkedin, Compass, Award, Shield, CheckCircle, ExternalLink, Calendar } from 'lucide-react';
import { TRANSLATIONS } from '../utils/data';

export default function AboutFounder({ language }: { language: string }) {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'experience' | 'achievements'>('mission');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const founderTabs = {
    mission: {
      title: "Our Mission",
      content: t.founder.mission,
      icon: <Compass className="w-5 h-5 text-brand-gold" />,
      bullets: [
        "Create custom code instead of utilizing drag-and-drop templates.",
        "Combine conversion-optimization psychology with premium luxury design.",
        "Integrate intelligent AI models securely on server infrastructures."
      ]
    },
    vision: {
      title: "Our Vision",
      content: t.founder.vision,
      icon: <Award className="w-5 h-5 text-brand-gold" />,
      bullets: [
        "Become the global baseline for technical design excellence.",
        "Empower businesses to automate 90% of their operational backends with Gemini AI.",
        "Demonstrate that bespoke, fast websites are a major ranking factor."
      ]
    },
    experience: {
      title: "Core Expertise",
      content: "As a seasoned senior full-stack engineer and AI developer, our founder coordinates our architecture using the following high-end parameters:",
      icon: <Shield className="w-5 h-5 text-brand-gold" />,
      bullets: [
        "Advanced LLM Integration (Gemini-3.5-flash custom workflow systems).",
        "High-performance client engines (React, Next.js, Headless Shopify).",
        "CRM & Corporate Automations (Zapier, Make, custom node servers).",
        "Performance optimization (Core Web Vitals, dynamic asset compression)."
      ]
    },
    achievements: {
      title: "Accomplishments",
      content: "TechGloze has been recognized on multiple creative fronts for digital innovation and flawless engineering execution:",
      icon: <CheckCircle className="w-5 h-5 text-brand-gold" />,
      bullets: [
        "Featured in WebDesign Ledger as an upcoming digital agency leader.",
        "Maintained a client satisfaction rating of 99.2% across three continents.",
        "Awwwards Honorable Mention for e-commerce design excellence.",
        "Successfully saved over 12,000 corporate admin hours through automation."
      ]
    }
  };

  return (
    <section id="about-founder-section" className="py-24 bg-white dark:bg-[#111111] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      {/* Decorative luxury gradient highlights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/3 dark:bg-brand-gold/1 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 text-left">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
            01 / BRAND IDENTITY
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
            Who We Are
          </h2>
          <div className="h-[2px] bg-brand-gold w-16 mt-4" />
        </div>

        {/* Corporate Grid Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start">
          <div className="space-y-6">
            <h3 className="font-display font-bold text-2xl text-brand-dark dark:text-white leading-tight">
              We engineering digital products that command authority, trust, and exponential scaling.
            </h3>
            <p className="font-sans text-[0.95rem] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Based internationally, TechGloze IT Solutions has established itself as an elite design and software development partner. We reject cookie-cutter templates and shortcuts, opting to build bespoke, hand-crafted web products from the ground up.
            </p>
            <p className="font-sans text-[0.95rem] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Our unique strength lies in our unified hybrid model: combining world-class visual creative direction with enterprise-grade system development and intelligent Google Gemini AI integration. The result is a high-speed, SEO-dominating, visually breathtaking platform tailored specifically to convert visitors into raving advocates.
            </p>
          </div>

          <div className="bg-brand-gold-light/40 dark:bg-zinc-900/40 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl relative overflow-hidden space-y-6 shadow-sm">
            <div className="absolute top-0 right-0 p-4 font-mono text-[5rem] font-bold text-brand-gold/5 pointer-events-none select-none">
              TG
            </div>
            <h4 className="font-display font-bold text-lg text-brand-gold">
              The TechGloze Manifesto
            </h4>
            <p className="font-sans text-sm text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
              &ldquo;We do not build templates. We sculpt unique digital narratives. We believe every pixel is a brand asset, every millisecond of speed is a revenue driver, and every client project is our next masterpiece.&rdquo;
            </p>
            <div className="flex gap-4 pt-4 border-t border-brand-border dark:border-zinc-800">
              <div>
                <p className="font-display font-extrabold text-xl text-brand-dark dark:text-white">95+</p>
                <p className="font-mono text-[0.6rem] text-zinc-400 uppercase font-semibold">Lighthouse Speed</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-xl text-brand-dark dark:text-white">99.2%</p>
                <p className="font-mono text-[0.6rem] text-zinc-400 uppercase font-semibold">Client Trust</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-xl text-brand-dark dark:text-white">100%</p>
                <p className="font-mono text-[0.6rem] text-zinc-400 uppercase font-semibold">Bespoke Design</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Founder Profile Section */}
        <div id="founder" className="pt-16 border-t border-brand-border dark:border-zinc-800">
          <div className="mb-12 text-left">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
              MEET THE FOUNDER & CTO
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-dark dark:text-white tracking-tight">
              Leadership & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Founder Image and bio links */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative group overflow-hidden rounded-2xl aspect-[4/5] border border-brand-border dark:border-zinc-800 shadow-lg bg-zinc-100 dark:bg-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Abdul Rehman, TechGloze Founder & CTO"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 text-left">
                  <p className="font-display font-bold text-xl text-white">Abdul Rehman</p>
                  <p className="font-mono text-[0.7rem] text-brand-gold uppercase tracking-widest font-semibold mt-1">Founder & Chief Technology Officer</p>
                </div>
              </div>

              {/* Founder Social Links */}
              <div className="flex gap-4 justify-start">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-300 hover:border-brand-gold hover:text-brand-gold transition-all duration-200 magnetic-target"
                >
                  <Linkedin className="w-4 h-4 text-brand-gold" />
                  <span className="font-mono text-xs">LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
                
                <a
                  href="mailto:arehman03578@gmail.com"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-300 hover:border-brand-gold hover:text-brand-gold transition-all duration-200 magnetic-target"
                >
                  <Mail className="w-4 h-4 text-brand-gold" />
                  <span className="font-mono text-xs">Direct Email</span>
                </a>
              </div>
            </div>

            {/* Biography and Interactive Tabs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-brand-gold/10 text-brand-gold uppercase font-bold tracking-wider">
                  Biography
                </span>
                <p className="font-sans text-[0.95rem] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {t.founder.biography}
                </p>
              </div>

              {/* Interactive Tabs Nav */}
              <div className="flex flex-wrap border-b border-brand-border dark:border-zinc-800">
                {(Object.keys(founderTabs) as Array<keyof typeof founderTabs>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-3.5 px-6 font-sans text-xs uppercase tracking-wider font-bold border-b-2 transition-all ${
                      activeTab === key
                        ? 'border-brand-gold text-brand-gold'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-white'
                    }`}
                  >
                    {founderTabs[key].title}
                  </button>
                ))}
              </div>

              {/* Tab Content Block */}
              <div className="bg-brand-gold-light/20 dark:bg-zinc-900/20 border border-brand-border dark:border-zinc-800 p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  {founderTabs[activeTab].icon}
                  <h4 className="font-display font-bold text-brand-dark dark:text-white text-[1rem]">
                    {founderTabs[activeTab].title}
                  </h4>
                </div>
                
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {founderTabs[activeTab].content}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {founderTabs[activeTab].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                      <span className="font-sans text-xs text-zinc-600 dark:text-zinc-300">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
