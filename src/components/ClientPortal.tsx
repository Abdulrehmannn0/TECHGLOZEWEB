/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, LogIn, Lock, CheckCircle, RefreshCw, CircleAlert } from 'lucide-react';

interface TaskItem {
  id: number;
  title: string;
  status: 'Done' | 'In Progress' | 'Backlog';
}

export default function ClientPortal({ 
  isLoggedIn, 
  setIsLoggedIn, 
  onOpenLogin 
}: { 
  isLoggedIn: boolean; 
  setIsLoggedIn: (loggedIn: boolean) => void; 
  onOpenLogin: () => void;
}) {
  // Simulated client data
  const clientProject = {
    name: "Aura Headless Redesign",
    overallProgress: 75,
    lastUpdated: "Today, 14:22 UTC",
    phases: [
      { name: "Phase 1: Creative Wireframes & Brand Audit", status: "Completed", value: 100 },
      { name: "Phase 2: Custom Headless React/Vite Development", status: "Active (75%)", value: 75 },
      { name: "Phase 3: Automated SEO Injection & Performance Audit", status: "Pending", value: 0 }
    ],
    invoices: [
      { id: "INV-2026-001", amount: "$7,500.00", status: "Paid", date: "June 12, 2026" },
      { id: "INV-2026-002", amount: "$7,500.00", status: "Paid", date: "July 01, 2026" },
      { id: "INV-2026-003", amount: "$5,000.00", status: "Pending", date: "August 15, 2026" }
    ],
    tasks: [
      { id: 1, title: "Configure standard SVG brand identities", status: "Done" },
      { id: 2, title: "Optimize core images under LCP guidelines", status: "Done" },
      { id: 3, title: "Assemble Gemini interactions backend route", status: "Done" },
      { id: 4, title: "Setup responsive canvas spiderweb interactions", status: "In Progress" },
      { id: 5, title: "Integrate multi-language translations package", status: "In Progress" },
      { id: 6, title: "Audit security parameters on firestore.rules", status: "Backlog" }
    ] as TaskItem[]
  };

  return (
    <section id="client-portal-section" className="py-24 bg-white dark:bg-[#0F0F0F] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
              07 / SECURE COLLABORATION
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
              Elite Client Portal
            </h2>
            <div className="h-[2px] bg-brand-gold w-16 mt-4" />
          </div>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Unlock real-time developmental workflows, invoice status audits, and secure workspace synchronization seamlessly.
          </p>
        </div>

        {/* Outer Wrapper container */}
        <div className="max-w-4xl mx-auto">
          
          {!isLoggedIn ? (
            // ==================== PORTAL LOCKED STATE ====================
            <div className="bg-white dark:bg-[#171717] border border-brand-border dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm max-w-lg mx-auto text-center space-y-6 animate-fade-in relative overflow-hidden">
              {/* Gold gradient top line accent */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-brand-gold to-brand-gold-sec" />
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20 animate-pulse">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-2xl text-brand-dark dark:text-white tracking-tight">Secure Partner Node Offline</h3>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                  To view real-time deliverables, sprint tasks, financial audits, and interactive staging systems, a valid encrypted handshake key must be established on this node.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-gold-light/40 dark:bg-[#0F0F0F] border border-brand-gold/20 text-xs font-mono text-zinc-500 dark:text-zinc-400 space-y-1 max-w-sm mx-auto">
                <p className="font-bold text-brand-gold">SECURE CHANNEL STATUS:</p>
                <p className="text-[0.65rem]">STANDBY // ENCRYPTION HANDSHAKE REQUIRED</p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="px-8 py-3.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg"
                >
                  <LogIn className="w-4 h-4 text-brand-gold" />
                  Initiate Encrypted Handshake
                </button>
              </div>
            </div>
          ) : (
            // ==================== PORTAL UNLOCKED DASHBOARD ====================
            <div className="bg-white dark:bg-[#171717] border border-brand-border dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-lg text-left animate-fade-in space-y-8">
              
              {/* Header Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-gold" />
                    <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest font-black">Authorized Partner Node</span>
                  </div>
                  <h3 className="font-display font-black text-xl text-brand-dark dark:text-white">{clientProject.name}</h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right">
                    <p className="text-zinc-400 font-bold">LAST SYSTEM SYNC:</p>
                    <p className="text-brand-gold font-extrabold">{clientProject.lastUpdated}</p>
                  </div>
                  <button
                    onClick={() => { setIsLoggedIn(false); localStorage.removeItem('tg_partner_logged_in'); }}
                    className="px-3 py-1.5 border border-brand-border hover:border-red-500 dark:border-zinc-800 text-zinc-400 hover:text-red-500 rounded font-mono text-[0.65rem] transition-colors cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Grid: Left Phases, Right Invoices */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Progress & Phases (7 Columns) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Progress Card */}
                  <div className="bg-brand-gold-light/20 dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-2xl p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-sm text-brand-dark dark:text-white">Overall Deliverables Progress</span>
                      <span className="font-mono text-sm font-black text-brand-gold">{clientProject.overallProgress}%</span>
                    </div>
                    {/* Progress track */}
                    <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold rounded-full" style={{ width: `${clientProject.overallProgress}%` }} />
                    </div>
                  </div>

                  {/* Phases list */}
                  <div className="space-y-4 text-left">
                    <h4 className="font-display font-bold text-sm text-brand-dark dark:text-white">Project Milestones Map</h4>
                    <div className="space-y-3">
                      {clientProject.phases.map((phase, idx) => (
                        <div key={idx} className="bg-zinc-50 dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 p-4 rounded-xl flex items-center justify-between text-xs">
                          <div className="space-y-1">
                            <p className="font-sans font-bold text-brand-dark dark:text-white">{phase.name}</p>
                            <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-wider">{phase.status}</span>
                          </div>
                          <span className={`font-mono font-black ${phase.value === 100 ? 'text-green-500' : phase.value > 0 ? 'text-brand-gold' : 'text-zinc-400'}`}>
                            {phase.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Invoices List (5 Columns) */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="font-display font-bold text-sm text-brand-dark dark:text-white">Invoices & Financial Audit</h4>
                  
                  <div className="space-y-3">
                    {clientProject.invoices.map((inv) => (
                      <div key={inv.id} className="p-4 border border-brand-border dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-xs flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="font-mono font-bold text-brand-dark dark:text-white">{inv.id}</p>
                          <p className="font-mono text-[0.6rem] text-zinc-400">{inv.date}</p>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="font-mono font-black text-brand-dark dark:text-white">{inv.amount}</p>
                          <span className={`font-mono text-[0.55rem] uppercase px-1.5 py-0.5 rounded font-black ${inv.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Kanban / Tasks checklist layout */}
              <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h4 className="font-display font-bold text-sm text-brand-dark dark:text-white">Active Sprints Task Board</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Done tasks */}
                  <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-brand-border dark:border-zinc-800/80 text-xs space-y-3">
                    <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest font-black block border-b pb-2 border-zinc-100 dark:border-zinc-800">Done (3)</span>
                    <div className="space-y-2">
                      {clientProject.tasks.filter(t => t.status === 'Done').map(t => (
                        <div key={t.id} className="p-3 bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-lg flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-zinc-600 dark:text-zinc-300 leading-normal">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Progress tasks */}
                  <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-brand-border dark:border-zinc-800/80 text-xs space-y-3">
                    <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest font-black block border-b pb-2 border-zinc-100 dark:border-zinc-800">Active Sprint (2)</span>
                    <div className="space-y-2">
                      {clientProject.tasks.filter(t => t.status === 'In Progress').map(t => (
                        <div key={t.id} className="p-3 bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-lg flex items-start gap-2">
                          <RefreshCw className="w-4 h-4 text-brand-gold shrink-0 mt-0.5 animate-spin" />
                          <span className="text-zinc-600 dark:text-zinc-300 leading-normal">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Backlog tasks */}
                  <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-brand-border dark:border-zinc-800/80 text-xs space-y-3">
                    <span className="font-mono text-[0.6rem] text-zinc-400 uppercase tracking-widest font-black block border-b pb-2 border-zinc-100 dark:border-zinc-800">QA Backlog (1)</span>
                    <div className="space-y-2">
                      {clientProject.tasks.filter(t => t.status === 'Backlog').map(t => (
                        <div key={t.id} className="p-3 bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-lg flex items-start gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 mt-1.5 shrink-0" />
                          <span className="text-zinc-400 dark:text-zinc-500 leading-normal">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
