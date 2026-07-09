/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, Search, ShieldCheck, Zap, Cpu, Settings, Code, CheckCircle, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface SEOAuditResult {
  score: number;
  domain: string;
  detectedIndustry: string;
  vulnerabilities: string[];
  strengths: string[];
  performance: {
    lcp: string;
    cls: string;
    fid: string;
  };
  keywordsToTarget: { keyword: string; volume: string; difficulty: string }[];
  actionPlan: string[];
}

interface ProjectEstimateResult {
  estimatedCost: string;
  techStack: string[];
  phases: { name: string; duration: string; deliverables: string[] }[];
  roadblocks: string[];
  seoAdvice: string;
}

export default function InteractiveTools() {
  const [activeTool, setActiveTool] = useState<'calculator' | 'seo' | 'estimator'>('calculator');

  // --- 1. Project Cost Calculator States ---
  const [selectedServices, setSelectedServices] = useState<string[]>(["Website Design"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Web (React/Vite)"]);
  const [timelineUrgency, setTimelineUrgency] = useState<string>("Standard (8-12 weeks)");
  
  const calculateCost = () => {
    let base = 5000;
    
    // Services pricing
    selectedServices.forEach(s => {
      if (s.includes("Design")) base += 2500;
      if (s.includes("Development") || s.includes("Software")) base += 4500;
      if (s.includes("AI") || s.includes("Automation")) base += 3500;
      if (s.includes("Ads") || s.includes("Marketing")) base += 2000;
    });

    // Platforms pricing
    selectedPlatforms.forEach(p => {
      if (p.includes("Mobile")) base += 4000;
      if (p.includes("SaaS")) base += 5000;
      if (p.includes("Shopify") || p.includes("E-commerce")) base += 3000;
    });

    // Urgency multiplier
    if (timelineUrgency.startsWith("Express")) {
      base *= 1.35;
    } else if (timelineUrgency.startsWith("Flexible")) {
      base *= 0.9;
    }

    return Math.round(base);
  };

  const toggleCalculatorService = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const toggleCalculatorPlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // --- 2. SEO Audit Tool States ---
  const [seoUrl, setSeoUrl] = useState<string>("");
  const [seoEmail, setSeoEmail] = useState<string>("");
  const [seoLoading, setSeoLoading] = useState<boolean>(false);
  const [seoResult, setSeoResult] = useState<SEOAuditResult | null>(null);
  const [seoError, setSeoError] = useState<string>("");

  const triggerSEOAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoUrl) return;
    
    setSeoLoading(true);
    setSeoError("");
    setSeoResult(null);

    try {
      const response = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: seoUrl, email: seoEmail })
      });
      
      if (!response.ok) {
        throw new Error("Audit failed. Please try again.");
      }

      const data = await response.json();
      setSeoResult(data);
    } catch (err: any) {
      setSeoError(err.message || "An unexpected issue occurred while analyzing your domain.");
    } finally {
      setSeoLoading(false);
    }
  };

  // --- 3. AI Estimator States ---
  const [estDesc, setEstDesc] = useState<string>("");
  const [estBudget, setEstBudget] = useState<string>("$10,000 - $25,000");
  const [estTimeline, setEstTimeline] = useState<string>("8 - 12 weeks");
  const [estLoading, setEstLoading] = useState<boolean>(false);
  const [estResult, setEstResult] = useState<ProjectEstimateResult | null>(null);
  const [estError, setEstError] = useState<string>("");

  const triggerAIEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estDesc) return;

    setEstLoading(true);
    setEstError("");
    setEstResult(null);

    try {
      const response = await fetch('/api/project-estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: estDesc, budgetRange: estBudget, timeline: estTimeline })
      });

      if (!response.ok) {
        throw new Error("Estimation failed. Please verify description.");
      }

      const data = await response.json();
      setEstResult(data);
    } catch (err: any) {
      setEstError(err.message || "An unexpected issue occurred while drafting your estimation.");
    } finally {
      setEstLoading(false);
    }
  };

  return (
    <section id="interactive-tools-section" className="py-24 bg-white dark:bg-[#111111] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-left">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
            06 / CONSULTATIVE SOLUTIONS
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight animate-fade-in">
            Premium Interactive Suite
          </h2>
          <div className="h-[2px] bg-brand-gold w-16 mt-4" />
        </div>

        {/* Tools Selector Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto text-left">
          
          <button
            onClick={() => setActiveTool('calculator')}
            className={`p-6 rounded-2xl border transition-all flex items-start gap-4 ${
              activeTool === 'calculator'
                ? 'bg-brand-dark border-brand-gold text-white shadow-md dark:bg-zinc-900'
                : 'bg-white border-brand-border text-zinc-500 hover:border-brand-gold hover:text-brand-gold dark:bg-zinc-900/40 dark:border-zinc-800'
            }`}
          >
            <Calculator className={`w-6 h-6 mt-0.5 ${activeTool === 'calculator' ? 'text-brand-gold' : 'text-zinc-400'}`} />
            <div>
              <h4 className="font-display font-bold text-sm leading-tight">Cost Calculator</h4>
              <p className="font-sans text-[0.7rem] opacity-75 mt-1 leading-normal">Dynamic estimate of project pricing indicators instantly.</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTool('seo')}
            className={`p-6 rounded-2xl border transition-all flex items-start gap-4 ${
              activeTool === 'seo'
                ? 'bg-brand-dark border-brand-gold text-white shadow-md dark:bg-zinc-900'
                : 'bg-white border-brand-border text-zinc-500 hover:border-brand-gold hover:text-brand-gold dark:bg-zinc-900/40 dark:border-zinc-800'
            }`}
          >
            <Search className={`w-6 h-6 mt-0.5 ${activeTool === 'seo' ? 'text-brand-gold' : 'text-zinc-400'}`} />
            <div>
              <h4 className="font-display font-bold text-sm leading-tight">SEO Auditor</h4>
              <p className="font-sans text-[0.7rem] opacity-75 mt-1 leading-normal">Scan website structures and receive automated optimization checklists.</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTool('estimator')}
            className={`p-6 rounded-2xl border transition-all flex items-start gap-4 ${
              activeTool === 'estimator'
                ? 'bg-brand-dark border-brand-gold text-white shadow-md dark:bg-zinc-900'
                : 'bg-white border-brand-border text-zinc-500 hover:border-brand-gold hover:text-brand-gold dark:bg-zinc-900/40 dark:border-zinc-800'
            }`}
          >
            <Cpu className={`w-6 h-6 mt-0.5 ${activeTool === 'estimator' ? 'text-brand-gold' : 'text-zinc-400'}`} />
            <div>
              <h4 className="font-display font-bold text-sm leading-tight">AI Project Estimator</h4>
              <p className="font-sans text-[0.7rem] opacity-75 mt-1 leading-normal">Describe a business idea in text to auto-generate a robust technical roadmap.</p>
            </div>
          </button>

        </div>

        {/* ACTIVE TOOL RENDER PANEL */}
        <div className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm max-w-5xl mx-auto">
          
          {/* ==================== 1. COST CALCULATOR ==================== */}
          {activeTool === 'calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left animate-fade-in">
              
              {/* Left Selector Side */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl text-brand-dark dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-gold" />
                    Project Cost Configurator
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Select your targeted services, platforms, and timelines to calculate a high-fidelity pricing delta instantly.
                  </p>
                </div>

                {/* Services Checkboxes */}
                <div className="space-y-3">
                  <span className="font-mono text-[0.65rem] text-zinc-400 uppercase tracking-widest font-black block">1. Select Services</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Website Design", "Website Development", "UI UX Design", "AI & CRM Automation", "Meta & Google Ads", "Technical SEO"].map((s, i) => (
                      <button
                        key={i}
                        onClick={() => toggleCalculatorService(s)}
                        className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          selectedServices.includes(s)
                            ? 'border-brand-gold bg-brand-gold/5 text-brand-gold'
                            : 'border-brand-border text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 hover:border-brand-gold'
                        }`}
                      >
                        {s}
                        <CheckCircle className={`w-4 h-4 transition-opacity ${selectedServices.includes(s) ? 'opacity-100' : 'opacity-0'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Platforms Checkboxes */}
                <div className="space-y-3">
                  <span className="font-mono text-[0.65rem] text-zinc-400 uppercase tracking-widest font-black block">2. Launch Platform</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Web (React/Vite)", "Mobile App (iOS/Android)", "Shopify E-commerce", "SaaS Cloud Portal"].map((p, i) => (
                      <button
                        key={i}
                        onClick={() => toggleCalculatorPlatform(p)}
                        className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          selectedPlatforms.includes(p)
                            ? 'border-brand-gold bg-brand-gold/5 text-brand-gold'
                            : 'border-brand-border text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 hover:border-brand-gold'
                        }`}
                      >
                        {p}
                        <CheckCircle className={`w-4 h-4 transition-opacity ${selectedPlatforms.includes(p) ? 'opacity-100' : 'opacity-0'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline Urgency */}
                <div className="space-y-3">
                  <span className="font-mono text-[0.65rem] text-zinc-400 uppercase tracking-widest font-black block">3. Urgent Delivery Speed</span>
                  <div className="flex flex-wrap gap-3">
                    {["Flexible (12+ weeks)", "Standard (8-12 weeks)", "Express (4-6 weeks)"].map((u, i) => (
                      <button
                        key={i}
                        onClick={() => setTimelineUrgency(u)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          timelineUrgency === u
                            ? 'border-brand-gold bg-brand-gold/5 text-brand-gold'
                            : 'border-brand-border text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 hover:border-brand-gold'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Summary Panel Widget */}
              <div className="lg:col-span-5 bg-brand-gold-light/40 dark:bg-zinc-950 p-8 rounded-2xl border border-brand-border dark:border-zinc-800 space-y-6">
                <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest font-bold block">Estimated Project Summary</span>
                
                <div className="space-y-2">
                  <span className="font-mono text-[0.55rem] text-zinc-400 uppercase block font-bold">Estimated Cost Indicator</span>
                  <p className="font-display font-black text-4xl text-brand-gold tracking-tight">
                    ${calculateCost().toLocaleString()} USD
                  </p>
                  <p className="font-sans text-[0.7rem] text-zinc-500 leading-normal">
                    *Excludes server hosting, API credits, and ad-spend parameters.
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-brand-border dark:border-zinc-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-bold">Services count:</span>
                    <span className="text-brand-dark dark:text-white font-extrabold">{selectedServices.length} Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-bold">Platform targeted:</span>
                    <span className="text-brand-dark dark:text-white font-extrabold truncate max-w-[150px]">{selectedPlatforms.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-bold">Urgency Factor:</span>
                    <span className="text-brand-dark dark:text-white font-extrabold">{timelineUrgency.split(' ')[0]}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById('contact-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Confirm & Request Briefing
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* ==================== 2. SEO AUDITOR TOOL ==================== */}
          {activeTool === 'seo' && (
            <div className="space-y-8 text-left animate-fade-in">
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-brand-dark dark:text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-brand-gold" />
                  Technical Website SEO Audit
                </h3>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  Analyze your domain with Gemini on our secure server, diagnosing structural LCP speed indices, semantic nesting hierarchies, and local market keywords.
                </p>
              </div>

              {/* URL Input Form */}
              <form onSubmit={triggerSEOAudit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-brand-gold-light/20 dark:bg-zinc-950 p-6 rounded-2xl border border-brand-border dark:border-zinc-800">
                <div className="md:col-span-5 space-y-2">
                  <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black block">1. Website URL</label>
                  <input
                    type="url"
                    placeholder="https://yourbrand.com"
                    required
                    value={seoUrl}
                    onChange={(e) => setSeoUrl(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
                  />
                </div>
                <div className="md:col-span-4 space-y-2">
                  <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black block">2. Contact Email</label>
                  <input
                    type="email"
                    placeholder="partner@yourbrand.com"
                    required
                    value={seoEmail}
                    onChange={(e) => setSeoEmail(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={seoLoading}
                    className="w-full py-3.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {seoLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Run Live Audit
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {seoError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>{seoError}</span>
                </div>
              )}

              {/* AUDIT OUTPUT RENDER */}
              {seoResult && (
                <div className="space-y-8 pt-6 border-t border-brand-border dark:border-zinc-800 animate-fade-in text-left">
                  
                  {/* Score Summary Banner */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center bg-brand-dark/5 dark:bg-zinc-950 p-6 rounded-2xl border border-brand-border dark:border-zinc-800">
                    <div className="text-center md:border-r border-zinc-200/50 dark:border-zinc-800/50 pr-4 space-y-1">
                      <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest block font-bold">SEO Score</span>
                      <p className={`font-display font-black text-5rem leading-none ${seoResult.score > 80 ? 'text-green-500' : seoResult.score > 60 ? 'text-brand-gold' : 'text-red-500'}`}>
                        {seoResult.score}
                      </p>
                      <span className="font-mono text-[0.55rem] text-zinc-400 block">Out of 100 max</span>
                    </div>

                    <div className="col-span-3 space-y-2 pl-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold font-bold">AUDIT REPORT</span>
                      <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">
                        Domain: {seoResult.domain}
                      </h4>
                      <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                        <strong>Sector Projection:</strong> {seoResult.detectedIndustry}. The score reflects significant structural speed bottlenecks that may reduce mobile visibility.
                      </p>
                    </div>
                  </div>

                  {/* Vulnerabilities & Strengths side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className="space-y-4">
                      <h5 className="font-display font-bold text-base text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4.5 h-4.5" />
                        Identified Bottlenecks ({seoResult.vulnerabilities.length})
                      </h5>
                      <ul className="space-y-2.5">
                        {seoResult.vulnerabilities.map((v, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                            <span className="text-red-500 font-bold mr-1">&#x2022;</span>
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-display font-bold text-base text-green-500 flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5" />
                        SEO Structural Strengths
                      </h5>
                      <ul className="space-y-2.5">
                        {seoResult.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 bg-green-500/5 p-3 rounded-xl border border-green-500/10">
                            <span className="text-green-500 font-bold mr-1">&#x2022;</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Target Keywords Table */}
                  <div className="space-y-4">
                    <h5 className="font-display font-bold text-base text-brand-dark dark:text-white">
                      Recommended Search Keywords
                    </h5>
                    <div className="overflow-x-auto border border-brand-border dark:border-zinc-800 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-brand-gold-light/40 dark:bg-zinc-950 text-zinc-500 font-mono font-bold uppercase tracking-wider border-b border-brand-border dark:border-zinc-800">
                          <tr>
                            <th className="p-4">Target Keyword</th>
                            <th className="p-4">Est Monthly Volume</th>
                            <th className="p-4">Keyword Difficulty</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border dark:divide-zinc-800 dark:text-zinc-200">
                          {seoResult.keywordsToTarget.map((k, i) => (
                            <tr key={i}>
                              <td className="p-4 font-semibold">{k.keyword}</td>
                              <td className="p-4 font-mono">{k.volume}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded font-mono text-[0.65rem] uppercase font-bold ${
                                  k.difficulty.toLowerCase() === 'high' ? 'bg-red-500/10 text-red-500' : k.difficulty.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'
                                }`}>
                                  {k.difficulty}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recommended Action Plan */}
                  <div className="bg-brand-gold-light/20 dark:bg-zinc-950 p-6 rounded-2xl border border-brand-border dark:border-zinc-800 space-y-4">
                    <h5 className="font-display font-bold text-base text-brand-gold flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      Suggested Action Plan
                    </h5>
                    <ol className="space-y-3">
                      {seoResult.actionPlan.map((p, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                          <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-mono font-bold text-[0.65rem] shrink-0">
                            {i + 1}
                          </span>
                          <span className="mt-0.5 leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ==================== 3. AI ESTIMATOR TOOL ==================== */}
          {activeTool === 'estimator' && (
            <div className="space-y-8 text-left animate-fade-in">
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-brand-dark dark:text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-brand-gold" />
                  Gemini Project Estimator
                </h3>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  Submit your business idea, and let Gemini construct a bespoke full-stack technical architecture, developmental roadmap phases, potential bottlenecks, and cost metrics instantly.
                </p>
              </div>

              {/* Estimator Input Form */}
              <form onSubmit={triggerAIEstimate} className="space-y-6 bg-brand-gold-light/20 dark:bg-zinc-950 p-6 rounded-2xl border border-brand-border dark:border-zinc-800">
                <div className="space-y-2">
                  <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black block">1. Describe your digital vision</label>
                  <textarea
                    rows={4}
                    required
                    value={estDesc}
                    onChange={(e) => setEstDesc(e.target.value)}
                    placeholder="e.g. I need an ultra-luxury headless e-commerce store with animated product filters and an AI-driven size advisor chatbot..."
                    className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold dark:text-white leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black block">2. Target Budget Floor</label>
                    <select
                      value={estBudget}
                      onChange={(e) => setEstBudget(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold dark:text-white font-sans font-medium"
                    >
                      <option value="$5,000 - $10,000">$5,000 - $10,000 USD</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000 USD</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000 USD</option>
                      <option value="$50,000+">$50,000+ USD</option>
                      <option value="Flexible">Flexible / Custom Scope</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black block">3. Timeline Limit</label>
                    <select
                      value={estTimeline}
                      onChange={(e) => setEstTimeline(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold dark:text-white font-sans font-medium"
                    >
                      <option value="4 - 6 weeks">Express (4-6 weeks)</option>
                      <option value="8 - 12 weeks">Standard (8-12 weeks)</option>
                      <option value="12+ weeks">Long Term (12+ weeks)</option>
                      <option value="Flexible">Flexible Timeline</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={estLoading}
                  className="w-full py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {estLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                      Engineering Architecture...
                    </>
                  ) : (
                    <>
                      Generate AI Project Estimate
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {estError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>{estError}</span>
                </div>
              )}

              {/* ESTIMATOR OUTPUT RENDER */}
              {estResult && (
                <div className="space-y-8 pt-6 border-t border-brand-border dark:border-zinc-800 animate-fade-in text-left">
                  
                  {/* Summary Metric Header */}
                  <div className="bg-brand-dark text-white p-6 rounded-2xl border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:border-r border-zinc-800 pr-4 space-y-1">
                      <span className="font-mono text-[0.55rem] text-zinc-400 uppercase tracking-widest font-bold">Estimated Cost Span</span>
                      <p className="font-display font-black text-2xl text-brand-gold tracking-tight">{estResult.estimatedCost}</p>
                    </div>
                    <div className="col-span-2 space-y-1 pl-2">
                      <span className="font-mono text-[0.55rem] text-zinc-400 uppercase tracking-widest font-bold">Strategic Stack Recommendation</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {estResult.techStack.map((tech, idx) => (
                          <span key={idx} className="font-mono text-[0.55rem] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Core Roadmap Phases */}
                  <div className="space-y-4">
                    <h5 className="font-display font-bold text-base text-brand-dark dark:text-white flex items-center gap-2">
                      <Settings className="w-4.5 h-4.5 text-brand-gold" />
                      Development Phase Roadmap
                    </h5>

                    <div className="space-y-6 border-l-2 border-brand-gold/20 pl-6 ml-3">
                      {estResult.phases.map((p, idx) => (
                        <div key={idx} className="relative space-y-2">
                          {/* Circle Timeline bullet */}
                          <div className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full bg-brand-gold text-brand-dark border-4 border-white dark:border-zinc-900 flex items-center justify-center font-mono text-[0.55rem] font-black" />
                          
                          <div className="flex justify-between items-start gap-4">
                            <h6 className="font-display font-bold text-sm text-brand-dark dark:text-white">
                              {p.name}
                            </h6>
                            <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold uppercase font-bold shrink-0">
                              {p.duration}
                            </span>
                          </div>

                          <ul className="space-y-1.5 pl-4 pt-1">
                            {p.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                <span className="text-brand-gold mr-1">&#x2022;</span>
                                {del}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Roadblocks & SEO Advice */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3">
                      <h5 className="font-display font-bold text-base text-amber-500 flex items-center gap-2">
                        <AlertCircle className="w-4.5 h-4.5" />
                        Risk Parameters & Roadblocks
                      </h5>
                      <ul className="space-y-2.5">
                        {estResult.roadblocks.map((rb, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 leading-relaxed">
                            {rb}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-display font-bold text-base text-brand-gold flex items-center gap-2">
                        <Zap className="w-4.5 h-4.5" />
                        SEO Launch Advice
                      </h5>
                      <div className="p-4 rounded-xl border border-brand-border dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {estResult.seoAdvice}
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
