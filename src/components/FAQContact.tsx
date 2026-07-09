/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQ_LIST, TRANSLATIONS } from '../utils/data';
import { ChevronDown, MessageSquare, Phone, Calendar, ArrowRight, Check, Send, CheckCircle, HelpCircle } from 'lucide-react';

export default function FAQContact({ language, onFormSubmitSuccess }: { language: string; onFormSubmitSuccess?: () => void }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  
  // --- FAQ States ---
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // --- Contact Briefing States ---
  const [briefName, setBriefName] = useState<string>("");
  const [briefEmail, setBriefEmail] = useState<string>("");
  const [briefService, setBriefService] = useState<string>("Bespoke Web Application");
  const [briefBudget, setBriefBudget] = useState<string>("$10,000 - $25,000");
  const [briefMsg, setBriefMsg] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const toggleFAQ = (idx: number) => {
    setOpenFAQIndex(openFAQIndex === idx ? null : idx);
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      if (onFormSubmitSuccess) onFormSubmitSuccess();
      
      // Reset form
      setBriefName("");
      setBriefEmail("");
      setBriefMsg("");
    }, 1500);
  };

  return (
    <section id="contact-section" className="py-24 bg-white dark:bg-[#111111] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-left">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
            08 / PROJECT INTAKE
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
            Schedule Your Briefing
          </h2>
          <div className="h-[2px] bg-brand-gold w-16 mt-4" />
        </div>

        {/* Core Layout Grid: Left Briefing Form, Right FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: Project Briefing Form (7 Columns) */}
          <div className="lg:col-span-7 bg-brand-gold-light/20 dark:bg-zinc-950 p-8 md:p-10 border border-brand-border dark:border-zinc-800 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-brand-gold" />
            
            {success ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl text-brand-dark dark:text-white">Briefing Received!</h3>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your digital requirements. Our CEO Abdul Rehman will analyze your parameters and draft a direct response within 2-4 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleBriefSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-brand-dark dark:text-white">Partner Briefing Form</h3>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                    Enter your digital requirements below to request an official architecture and schedule an onboarding video session.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={briefName}
                      onChange={(e) => setBriefName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={briefEmail}
                      onChange={(e) => setBriefEmail(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Primary Target service</label>
                    <select
                      value={briefService}
                      onChange={(e) => setBriefService(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white font-sans font-medium"
                    >
                      <option value="Bespoke Web Application">Bespoke Web Application</option>
                      <option value="iOS / Android Mobile App">iOS / Android Mobile App</option>
                      <option value="Luxury Brand Identity & Design">Luxury Brand Identity & Design</option>
                      <option value="AI Workflow & CRM Automation">AI Workflow & CRM Automation</option>
                      <option value="Meta / Google Ad Campaign Scaling">Meta / Google Ad Campaign Scaling</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Approx Budget Threshold</label>
                    <select
                      value={briefBudget}
                      onChange={(e) => setBriefBudget(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white font-sans font-medium"
                    >
                      <option value="$5,000 - $10,000">$5,000 - $10,000 USD</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000 USD</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000 USD</option>
                      <option value="$50,000+">$50,000+ USD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Project Vision Summary</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your brand model, primary bottlenecks, and goals..."
                    value={briefMsg}
                    onChange={(e) => setBriefMsg(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? "Transmitting brief..." : (
                    <>
                      Transmit Project Brief
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

            {/* Direct Connect shortcuts */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-brand-border dark:border-zinc-800 text-xs">
              <a
                href="https://wa.me/923362141528"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors justify-center font-bold"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span>WhatsApp Live Chat</span>
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-colors justify-center font-bold"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Schedule Video Call</span>
              </a>
            </div>

          </div>

          {/* RIGHT: FAQ Accordions (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-brand-dark dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5.5 h-5.5 text-brand-gold" />
                Frequently Answered
              </h3>
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
                A selection of questions concerning TechGloze's developmental practices and custom engineering pipelines.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQ_LIST.map((faq, idx) => {
                const isOpen = openFAQIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-brand-border dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold font-sans text-brand-dark dark:text-white hover:text-brand-gold transition-colors"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-60 border-t border-brand-border dark:border-zinc-800' : 'max-h-0'
                      } overflow-hidden`}
                    >
                      <div className="p-4 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50/50 dark:bg-zinc-950/20">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small reassurance stamp */}
            <div className="p-4 rounded-xl border border-brand-border dark:border-zinc-800 bg-brand-gold-light/20 text-[0.65rem] text-zinc-500 dark:text-zinc-400 leading-normal flex items-start gap-2.5">
              <Check className="w-4.5 h-4.5 text-brand-gold shrink-0" />
              <span>We value clean code and direct executive engineering access. All client messages trigger real-time notification alerts to our founder's devices.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
