/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutFounder from './components/AboutFounder';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CaseStudies from './components/CaseStudies';
import InteractiveResults from './components/InteractiveResults';
import InteractiveTools from './components/InteractiveTools';
import TeamBlogCareers from './components/TeamBlogCareers';
import ClientPortal from './components/ClientPortal';
import FAQContact from './components/FAQContact';
import AIAssistant from './components/AIAssistant';
import MouseTrail from './components/MouseTrail';
import Logo from './components/Logo';
import { TRANSLATIONS } from './utils/data';
import { X, Shield, Lock, Loader2, RefreshCw } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<string>("en");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentSubTab, setCurrentSubTab] = useState<string>("team");
  const [currentTab, setCurrentTab] = useState<string>("home");

  // Secure Partner Login variables
  const [isPartnerLoggedIn, setIsPartnerLoggedIn] = useState<boolean>(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);
  const [partnerPasscode, setPartnerPasscode] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isShake, setIsShake] = useState<boolean>(false);

  // Load language preference and theme on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('tg_language');
    if (savedLang) {
      setLanguage(savedLang);
    }
    const savedTheme = localStorage.getItem('tg_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const isSaved = localStorage.getItem('tg_partner_logged_in');
    if (isSaved === 'true') {
      setIsPartnerLoggedIn(true);
    }
  }, []);

  const handlePartnerLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setIsShake(false);

    try {
      const response = await fetch('/api/verify-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: partnerPasscode })
      });
      const data = await response.json();
      
      if (data.success) {
        setIsPartnerLoggedIn(true);
        localStorage.setItem('tg_partner_logged_in', 'true');
        setPartnerPasscode("");
        setIsPartnerModalOpen(false);
      } else {
        setLoginError(data.error || "Access denied. Invalid encryption handshake key.");
        setIsShake(true);
        setTimeout(() => setIsShake(false), 500);
      }
    } catch (err) {
      console.error(err);
      setLoginError("Failed to authenticate. Server handshaking latency error.");
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('tg_language', lang);
  };

  const handleThemeToggle = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tg_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tg_theme', 'light');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-white dark:bg-[#0F0F0F] ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Premium Magnetic Cursor Tracker */}
      <MouseTrail />

      {/* Glassmorphic Navigation Header */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (tab === 'blog') {
            setCurrentSubTab('blog');
            scrollToSection('teamblogcareers-section');
          } else if (tab === 'careers') {
            setCurrentSubTab('careers');
            scrollToSection('teamblogcareers-section');
          } else if (tab === 'services') {
            scrollToSection('services-section');
          } else if (tab === 'portfolio') {
            scrollToSection('portfolio-section');
          } else if (tab === 'case-studies') {
            scrollToSection('case-studies-section');
          } else if (tab === 'client-portal') {
            scrollToSection('client-portal-section');
          }
        }}
        language={language}
        setLanguage={handleLanguageChange}
        darkMode={isDarkMode}
        setDarkMode={(dark) => {
          setIsDarkMode(dark);
          if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('tg_theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('tg_theme', 'light');
          }
        }}
        onBookConsultation={() => scrollToSection('contact-section')}
      />

      {/* Main Sections */}
      <main>
        
        {/* Fullscreen Hero */}
        <Hero
          language={language}
          onStartProject={() => scrollToSection('contact-section')}
          onViewPortfolio={() => scrollToSection('portfolio-section')}
        />

        {/* Brand identity & Founder bio */}
        <AboutFounder language={language} />

        {/* Agency Service categories */}
        <Services language={language} />

        {/* Interactive Masterpiece Portfolio */}
        <Portfolio />

        {/* Swiping Case Studies comparison slider */}
        <CaseStudies />

        {/* Live ROI Results Dashboard */}
        <InteractiveResults />

        {/* Interactive Calculator, SEO Auditor & AI Roadmapper */}
        <InteractiveTools />

        {/* Team profiles, Careers openings & Insights Blog CMS */}
        <TeamBlogCareers currentSubTab={currentSubTab} />

        {/* Partner Client tracking Board */}
        <ClientPortal 
          isLoggedIn={isPartnerLoggedIn} 
          setIsLoggedIn={setIsPartnerLoggedIn}
          onOpenLogin={() => setIsPartnerModalOpen(true)}
        />

        {/* Onboarding briefing & FAQ */}
        <FAQContact language={language} />

      </main>

      {/* Conversational Floating GlozeAI Bot */}
      <AIAssistant />

      {/* World-Class Premium Editorial Footer */}
      <footer className="bg-[#0F0F0F] bg-luxury-grid text-white border-t border-[#2A2A2A] py-16 text-left relative overflow-hidden">
        {/* Ambient gold glow in footer back */}
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Logo & Manifesto description */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <Logo className="h-9 text-brand-gold" showText={true} />
            </div>
            
            <p className="font-sans text-xs text-zinc-400 max-w-sm leading-relaxed">
              We sculpt flawless bespoke digital platforms pairing pixel-perfect creative vision with senior engineering expertise. We deliver custom software, automated models, and conversion-optimized visual authority.
            </p>

            <div className="space-y-1">
              <p className="font-mono text-[0.6rem] text-zinc-500 uppercase tracking-widest font-black">Registered Address</p>
              <p className="font-sans text-xs text-zinc-400">TechGloze IT Solutions, International Creative Suite</p>
            </div>
          </div>

          {/* Quick shortcuts Navigation columns */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[0.65rem] text-brand-gold uppercase tracking-widest font-black">Agency Indexes</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => scrollToSection('about-founder-section')} className="hover:text-brand-gold transition-colors">
                  01 // Brand Identity
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services-section')} className="hover:text-brand-gold transition-colors">
                  02 // Core Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('portfolio-section')} className="hover:text-brand-gold transition-colors">
                  03 // Selected Masterpieces
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('results-section')} className="hover:text-brand-gold transition-colors">
                  04 // Measureable ROI Projections
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & legal terms */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-[0.65rem] text-brand-gold uppercase tracking-widest font-black">Authorized Operations</h4>
            
            <div className="space-y-2 text-xs text-zinc-400">
              <p>Email: <a href="mailto:arehman03578@gmail.com" className="text-white hover:text-brand-gold font-bold">arehman03578@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/923362141528" className="text-white hover:text-brand-gold font-bold">+92 336 2141528</a></p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setIsPartnerModalOpen(true)}
                className="font-mono text-[0.65rem] text-brand-gold hover:underline font-bold flex items-center gap-1.5 cursor-pointer uppercase tracking-widest"
              >
                <Lock className="w-3.5 h-3.5" />
                Partner Access Code
              </button>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] text-[0.65rem] text-zinc-500 leading-normal">
              <span>Security verified. Hosted on sandbox cloud architectures. Encrypted communication protocol active.</span>
            </div>
          </div>

        </div>

        {/* Global Signature footer stamp */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.65rem] font-mono text-zinc-500">
          <span>&copy; {new Date().getFullYear()} TechGloze IT Solutions. All rights reserved.</span>
          <span className="text-right">Designed & Engineered under Chief Technology Officer Abdul Rehman.</span>
        </div>

      </footer>

      {/* Partner Login Modal Overlay */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-text">
          {/* Backdrop */}
          <div 
            onClick={() => setIsPartnerModalOpen(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer animate-fade-in" 
          />

          {/* Modal Container */}
          <div className={`bg-[#171717] border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative text-left z-10 p-8 md:p-10 animate-scale-up ${isShake ? 'animate-shake' : ''}`}>
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-brand-gold to-brand-gold-sec" />
            
            {/* Close Button */}
            <button
              onClick={() => setIsPartnerModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-900 hover:bg-brand-gold text-zinc-400 hover:text-black flex items-center justify-center transition-all cursor-pointer border border-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon & Title */}
            <div className="text-center space-y-3 mb-6">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-display font-black text-xl text-white tracking-tight">Secure Partner Handshake</h3>
              <p className="font-sans text-xs text-zinc-400 max-w-xs mx-auto leading-normal">
                Establish secure connection to synchronize live workflows and private sprint records.
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handlePartnerLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black tracking-widest block">Handshake Access Key</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter agency passcode..."
                    required
                    value={partnerPasscode}
                    onChange={(e) => setPartnerPasscode(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-gold rounded-xl pl-4 pr-10 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                  <Lock className="w-4 h-4 text-zinc-600 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-brand-gold text-black rounded-xl font-sans text-xs font-black uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg"
              >
                {loginLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                    Verify & Authenticate
                  </>
                )}
              </button>
            </form>

            <p className="font-mono text-[0.55rem] text-zinc-600 uppercase text-center mt-6">
              Encrypted channel via AES-256 protocols
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
