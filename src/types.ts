/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  results: string;
  technology: string[];
  imageUrl: string;
  videoUrl?: string; // For mock video preview
  description: string;
  gallery: string[];
  growthMetric?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  research: string;
  strategy: string;
  design: string;
  development: string;
  launch: string;
  results: string;
  beforeImg: string;
  afterImg: string;
  growthMetrics: {
    label: string;
    value: string;
  }[];
  roi: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  linkedin: string;
  portfolio: string;
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Remote, etc.
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface LanguagePack {
  nav: {
    home: string;
    about: string;
    founder: string;
    services: string;
    portfolio: string;
    caseStudies: string;
    results: string;
    team: string;
    careers: string;
    blog: string;
    testimonials: string;
    faq: string;
    contact: string;
    book: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statsProjects: string;
    statsCountries: string;
    statsClients: string;
    statsExperience: string;
  };
  founder: {
    title: string;
    biography: string;
    mission: string;
    vision: string;
  };
}
