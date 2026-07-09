/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, Globe, Moon, Sun, ArrowRight, MessageSquare, Briefcase, Sparkles, Settings } from 'lucide-react';
import { SERVICES_LIST, BLOG_POSTS, TRANSLATIONS } from '../utils/data';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onBookConsultation: () => void;
}

export default function Navigation({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  onBookConsultation
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Track scrolling to toggle glass background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set RTL support for Arabic language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services, hasMega: true },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'case-studies', label: t.nav.caseStudies },
    { id: 'blog', label: t.nav.blog },
    { id: 'careers', label: t.nav.careers },
    { id: 'client-portal', label: t.nav.results, badge: "Live Portal" }
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/80 dark:bg-brand-dark/90 backdrop-blur-md py-4 shadow-sm border-brand-border dark:border-zinc-800'
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="magnetic-target focus:outline-none"
        >
          <Logo className="h-9" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.hasMega && setMegaMenuOpen('services')}
              onMouseLeave={() => setMegaMenuOpen(null)}
            >
              <button
                onClick={() => {
                  setCurrentTab(item.id);
                  if (!item.hasMega) {
                    setMegaMenuOpen(null);
                  }
                }}
                className={`group relative py-2 font-sans text-[0.9rem] font-medium tracking-wide flex items-center gap-1 transition-colors ${
                  currentTab === item.id
                    ? 'text-brand-gold font-semibold'
                    : 'text-brand-dark dark:text-zinc-200 hover:text-brand-gold'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold font-mono uppercase ml-1 animate-pulse border border-brand-gold/20">
                    {item.badge}
                  </span>
                )}
                {/* Underline slide effect */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-brand-gold transition-all duration-300 ${
                    currentTab === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>

              {/* SERVICES MEGA MENU */}
              {item.hasMega && megaMenuOpen === 'services' && (
                <div className="absolute left-1/2 -translate-x-[45%] top-full pt-4 w-[85vw] max-w-[1000px] z-50 animate-fade-in">
                  <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-brand-border dark:border-zinc-800 rounded-2xl shadow-xl p-8 grid grid-cols-3 gap-8 text-left">
                    
                    {/* Left 2 Columns with Category Items */}
                    <div className="col-span-2 grid grid-cols-2 gap-8 border-r border-brand-border dark:border-zinc-800 pr-8">
                      {SERVICES_LIST.slice(0, 4).map((cat, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="text-[0.75rem] font-mono tracking-widest text-brand-gold uppercase font-bold flex items-center gap-2">
                            {idx === 0 && <Briefcase className="w-3.5 h-3.5" />}
                            {idx === 1 && <Settings className="w-3.5 h-3.5" />}
                            {idx === 2 && <Sparkles className="w-3.5 h-3.5" />}
                            {idx === 3 && <Briefcase className="w-3.5 h-3.5" />}
                            {cat.category}
                          </h4>
                          <ul className="space-y-2">
                            {cat.items.slice(0, 3).map((sub, sidx) => (
                              <li key={sidx}>
                                <button
                                  onClick={() => {
                                    setCurrentTab('home');
                                    setMegaMenuOpen(null);
                                    // Scroll to services
                                    setTimeout(() => {
                                      const el = document.getElementById('services-section');
                                      el?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                  }}
                                  className="text-left text-zinc-500 hover:text-brand-gold dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
                                >
                                  <p className="text-[0.85rem] font-medium leading-none mb-1">{sub.name}</p>
                                  <p className="text-[0.7rem] opacity-75 line-clamp-1">{sub.desc}</p>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Right Column: Featured Insights */}
                    <div className="flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[0.65rem] font-mono px-2 py-1 rounded bg-brand-gold/10 text-brand-gold font-bold uppercase tracking-wider">
                          Featured Insight
                        </span>
                        <h5 className="font-display font-bold text-brand-dark dark:text-white text-[1rem] leading-tight mt-3">
                          {BLOG_POSTS[0].title}
                        </h5>
                        <p className="text-[0.75rem] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                          {BLOG_POSTS[0].excerpt}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentTab('blog');
                          setMegaMenuOpen(null);
                        }}
                        className="group inline-flex items-center gap-2 text-[0.8rem] font-mono font-bold text-brand-gold hover:text-brand-dark dark:hover:text-white transition-colors mt-4 self-start"
                      >
                        Read Article 
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Controls Panel */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Multi-language Selection */}
          <div className="relative group">
            <button className="p-2 text-zinc-600 hover:text-brand-gold dark:text-zinc-300 dark:hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono font-medium">
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50">
              <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden py-1 min-w-[100px]">
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-3 py-1.5 text-xs font-mono hover:bg-brand-gold-light dark:hover:bg-zinc-800 ${
                    language === 'en' ? 'text-brand-gold font-bold' : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`w-full text-right px-3 py-1.5 text-xs font-sans hover:bg-brand-gold-light dark:hover:bg-zinc-800 ${
                    language === 'ar' ? 'text-brand-gold font-bold' : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  العربية (RTL)
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`w-full text-left px-3 py-1.5 text-xs font-mono hover:bg-brand-gold-light dark:hover:bg-zinc-800 ${
                    language === 'fr' ? 'text-brand-gold font-bold' : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  Français
                </button>
              </div>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-zinc-600 hover:text-brand-gold dark:text-zinc-300 dark:hover:text-white transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Book Consultation CTA */}
          <button
            onClick={onBookConsultation}
            className="px-5 py-2.5 bg-brand-gold text-black rounded-full font-sans text-xs font-semibold tracking-wide hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.nav.book}
          </button>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Theme toggler on mobile */}
          <button onClick={toggleDarkMode} className="p-2 text-zinc-600 dark:text-zinc-300">
            {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-dark dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[70px] bg-white dark:bg-brand-dark border-b border-brand-border dark:border-zinc-800 h-[calc(100vh-70px)] z-50 overflow-y-auto px-6 py-8 flex flex-col justify-between lg:hidden animate-slide-down">
          <nav className="flex flex-col gap-5 text-left">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-xl font-display font-semibold flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 ${
                  currentTab === item.id ? 'text-brand-gold' : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="text-[0.55rem] px-1.5 py-0.5 bg-brand-gold/15 text-brand-gold font-mono rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="space-y-6">
            {/* Language switch on Mobile */}
            <div className="flex gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6 justify-center">
              <button
                onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 font-mono text-xs rounded-full border ${
                  language === 'en' ? 'border-brand-gold text-brand-gold font-bold bg-brand-gold/5' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => { setLanguage('ar'); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 font-sans text-xs rounded-full border ${
                  language === 'ar' ? 'border-brand-gold text-brand-gold font-bold bg-brand-gold/5' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => { setLanguage('fr'); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 font-mono text-xs rounded-full border ${
                  language === 'fr' ? 'border-brand-gold text-brand-gold font-bold bg-brand-gold/5' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                FRANÇAIS
              </button>
            </div>

            {/* Mobile CTAs */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  onBookConsultation();
                  setMobileMenuOpen(false);
                }}
                className="py-3 bg-brand-gold text-black rounded-xl font-sans text-xs font-semibold tracking-wide text-center hover:opacity-90 transition-all"
              >
                {t.nav.book}
              </button>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-brand-gold text-black rounded-xl font-sans text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
