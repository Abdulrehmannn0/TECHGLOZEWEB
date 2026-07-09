/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TEAM_MEMBERS, BLOG_POSTS, JOB_OPENINGS } from '../utils/data';
import { BlogPost, JobOpening, TeamMember } from '../types';
import { Linkedin, Mail, ExternalLink, Calendar, Clock, BookOpen, ChevronRight, User, FileText, Upload, Check, Search, ArrowLeft } from 'lucide-react';

export default function TeamBlogCareers({ currentSubTab = "team" }: { currentSubTab?: string }) {
  const [subTab, setSubTab] = useState<string>(currentSubTab);

  // --- Blog States ---
  const [blogCategory, setBlogCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // --- Careers States ---
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const blogCategories = ["All", "AI", "Marketing", "SEO", "Design"];

  // Filtered Blog posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchCat = blogCategory === "All" || post.category === blogCategory;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedJob(null);
      setFileName("");
    }, 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <section id="teamblogcareers-section" className="py-24 bg-white dark:bg-[#111111] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Toggle Nav Tabs */}
        <div className="flex justify-center mb-16 border-b border-brand-border dark:border-zinc-800 pb-4">
          <div className="inline-flex gap-2 bg-brand-gold-light/40 dark:bg-zinc-900 p-1.5 rounded-full">
            <button
              onClick={() => { setSubTab('team'); setSelectedPost(null); setSelectedJob(null); }}
              className={`px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all ${
                subTab === 'team'
                  ? 'bg-brand-gold text-brand-dark font-black shadow'
                  : 'text-zinc-500 hover:text-brand-gold'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => { setSubTab('blog'); setSelectedPost(null); setSelectedJob(null); }}
              className={`px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all ${
                subTab === 'blog'
                  ? 'bg-brand-gold text-brand-dark font-black shadow'
                  : 'text-zinc-500 hover:text-brand-gold'
              }`}
            >
              Insights CMS
            </button>
            <button
              onClick={() => { setSubTab('careers'); setSelectedPost(null); setSelectedJob(null); }}
              className={`px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all ${
                subTab === 'careers'
                  ? 'bg-brand-gold text-brand-dark font-black shadow'
                  : 'text-zinc-500 hover:text-brand-gold'
              }`}
            >
              Careers
            </button>
          </div>
        </div>

        {/* ==================== 1. OUR TEAM VIEW ==================== */}
        {subTab === 'team' && (
          <div className="space-y-16 text-left animate-fade-in">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block">
                MEET THE INTELLECTS
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
                Our Elite Creators
              </h2>
              <div className="h-[2px] bg-brand-gold w-16" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.01)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full"
                >
                  {/* Photo area */}
                  <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-80" />
                    
                    {/* Hover Link to bio */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <h4 className="font-display font-bold text-base text-white">{member.name}</h4>
                        <p className="font-mono text-[0.6rem] text-brand-gold uppercase font-bold tracking-wider mt-0.5">{member.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-white/20 hover:bg-brand-gold hover:text-brand-dark text-white flex items-center justify-center transition-all shadow-md backdrop-blur-md"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Skills lists */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between text-left">
                    <p className="font-sans text-[0.75rem] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="space-y-1.5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                      <span className="font-mono text-[0.55rem] text-zinc-400 uppercase font-black tracking-widest block">Core Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="font-mono text-[0.55rem] px-2 py-0.5 rounded bg-brand-gold-light/40 dark:bg-zinc-800 text-brand-gold-sec border border-brand-gold/10 font-bold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 2. INSIGHTS BLOG VIEW ==================== */}
        {subTab === 'blog' && (
          <div className="space-y-12 text-left animate-fade-in">
            {!selectedPost ? (
              <>
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block">
                    EDITORIAL KNOWLEDGE
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
                    TechGloze Journal
                  </h2>
                  <div className="h-[2px] bg-brand-gold w-16" />
                </div>

                {/* Filter and Search controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-y border-brand-border dark:border-zinc-800 py-6">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2 overflow-x-auto w-full md:w-auto">
                    {blogCategories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBlogCategory(cat)}
                        className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all ${
                          blogCategory === cat
                            ? 'bg-brand-dark text-white dark:bg-white dark:text-brand-dark font-black shadow-md'
                            : 'border border-brand-border text-zinc-500 hover:border-brand-gold hover:text-brand-gold dark:border-zinc-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
                    />
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Blog Grid */}
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="group cursor-pointer bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[0.6rem] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>

                        <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex gap-4 text-[0.65rem] font-mono text-zinc-400 font-bold">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-brand-gold" /> {post.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-brand-gold" /> {post.readTime}</span>
                            </div>
                            <h3 className="font-display font-bold text-lg text-brand-dark dark:text-white group-hover:text-brand-gold transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-zinc-500/10">
                            <span className="font-mono text-[0.65rem] text-zinc-400">By {post.author}</span>
                            <span className="font-mono text-xs font-extrabold text-brand-gold group-hover:text-brand-dark dark:group-hover:text-white flex items-center gap-1">
                              Read Article <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center border border-dashed border-brand-border dark:border-zinc-800 rounded-2xl">
                    <BookOpen className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                    <p className="font-sans text-xs text-zinc-400">No insights match your selected parameters.</p>
                  </div>
                )}
              </>
            ) : (
              // FULL ARTICLES READING PANEL
              <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-left">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-brand-gold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Journal
                </button>

                {/* Article Header */}
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-brand-gold/10 text-brand-gold uppercase tracking-widest">
                    {selectedPost.category}
                  </span>
                  <h1 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight leading-[1.1]">
                    {selectedPost.title}
                  </h1>
                  
                  <div className="flex items-center gap-6 border-y border-brand-border dark:border-zinc-800 py-4 text-xs font-mono text-zinc-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-gold" />
                      <span>Author: {selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-gold" />
                      <span>{selectedPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Banner Photo */}
                <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-brand-border dark:border-zinc-800 shadow-md">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Editorial Body Text */}
                <article className="font-sans text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-[1.8] space-y-6 max-w-3xl pt-4">
                  {selectedPost.content.split('\n\n').map((para, idx) => (
                    <p key={idx} className="whitespace-pre-line">{para}</p>
                  ))}
                </article>

                <div className="border-t border-brand-border dark:border-zinc-800 pt-8 mt-12 flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      // Scroll to contact brief
                      const el = document.getElementById('contact-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-brand-gold hover:bg-brand-dark hover:text-white text-brand-dark rounded-full font-sans text-xs font-extrabold uppercase tracking-wider transition-all shadow-md"
                  >
                    Subscribe to Newsletter
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. CAREERS VIEW ==================== */}
        {subTab === 'careers' && (
          <div className="space-y-12 text-left animate-fade-in">
            {!selectedJob ? (
              <>
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block">
                    JOIN THE LEADERS
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight">
                    Current Openings
                  </h2>
                  <div className="h-[2px] bg-brand-gold w-16" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  {JOB_OPENINGS.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between text-left h-full"
                    >
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[0.6rem] font-mono font-bold uppercase tracking-widest text-brand-gold px-2 py-0.5 rounded bg-brand-gold/10">
                            {job.department}
                          </span>
                          <span className="text-[0.6rem] font-mono font-bold uppercase tracking-widest text-zinc-400 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                            {job.type}
                          </span>
                          <span className="text-[0.6rem] font-mono font-bold uppercase tracking-widest text-zinc-400 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                            {job.location}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg text-brand-dark dark:text-white leading-snug">
                          {job.title}
                        </h3>

                        <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedJob(job)}
                        className="mt-6 w-full py-3 border border-brand-border hover:border-brand-gold dark:border-zinc-800 text-brand-dark dark:text-zinc-200 font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:bg-brand-gold-light dark:hover:bg-zinc-800 flex items-center justify-center gap-1.5"
                      >
                        Apply for Position <ChevronRight className="w-4 h-4" />
                      </button>

                    </div>
                  ))}
                </div>
              </>
            ) : (
              // DEDICATED JOB DETAILS APPLICATION PANEL
              <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-left">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-brand-gold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Careers
                </button>

                {/* Job Title */}
                <div className="space-y-3">
                  <div className="flex gap-2 text-[0.65rem] font-mono font-black text-brand-gold uppercase tracking-wider">
                    <span>{selectedJob.department}</span>
                    <span>&#x2022;</span>
                    <span>{selectedJob.location}</span>
                    <span>&#x2022;</span>
                    <span>{selectedJob.type}</span>
                  </div>
                  <h1 className="font-display font-black text-2xl md:text-4xl text-brand-dark dark:text-white tracking-tight">
                    {selectedJob.title}
                  </h1>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-brand-border dark:border-zinc-800 pt-8">
                  
                  {/* Requirements List */}
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-base text-brand-dark dark:text-white">Requirements</h4>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                          <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-base text-brand-gold">Perks & Benefits</h4>
                    <ul className="space-y-3">
                      {selectedJob.benefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                          <Check className="w-4 h-4 text-brand-gold-sec shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Submitting application form */}
                <div className="border-t border-brand-border dark:border-zinc-800 pt-8 mt-12 bg-brand-gold-light/20 dark:bg-zinc-950 p-6 rounded-2xl">
                  {applySuccess ? (
                    <div className="py-8 text-center space-y-4 animate-fade-in">
                      <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">Application Received successfully!</h4>
                      <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">Our CTO Abdul Rehman and our recruitment team will review your credentials within 48 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-6 text-left">
                      <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white">Submit Your Application</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="johndoe@email.com"
                            className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black">Brief Cover Letter / Introduction</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Introduce yourself and state why you want to contribute to TechGloze's engineering frameworks..."
                          className="w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold dark:text-white leading-relaxed"
                        />
                      </div>

                      {/* File upload selector */}
                      <div className="space-y-2">
                        <label className="font-mono text-[0.6rem] text-zinc-400 uppercase font-black block">Resume / Curriculum Vitae (PDF)</label>
                        <div className="relative group border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-brand-gold rounded-xl p-6 bg-white dark:bg-zinc-900 text-center transition-all">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <div className="space-y-2 pointer-events-none">
                            <Upload className="w-8 h-8 text-zinc-400 mx-auto" />
                            <p className="font-sans text-xs font-semibold text-brand-dark dark:text-white">
                              {fileName ? `Selected Resume: ${fileName}` : "Drag and drop or click to upload PDF resume"}
                            </p>
                            <p className="font-mono text-[0.6rem] text-zinc-400 uppercase">Max limit: 5MB</p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-all flex items-center justify-center gap-1.5"
                      >
                        Submit Official Application
                      </button>
                    </form>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
