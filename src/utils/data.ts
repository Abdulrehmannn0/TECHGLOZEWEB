/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioProject, CaseStudy, TeamMember, BlogPost, JobOpening, LanguagePack } from '../types';

export const SERVICES_LIST = [
  {
    category: "Design & Creative",
    icon: "Palette",
    items: [
      { name: "Website Design", desc: "Award-winning bespoke digital experiences optimized for conversion and storytelling." },
      { name: "UI UX Design", desc: "Figma wireframing, high-fidelity prototypes, user research, and comprehensive design systems." },
      { name: "Brand Identity", desc: "Crafting modern logos, brand guidelines, typography systems, and visual narratives." },
      { name: "Graphic Design", desc: "Premium marketing collateral, business presentations, and custom vector artwork." },
      { name: "Logo Design", desc: "Bespoke, timeless logo marks that convey trust, luxury, and market leadership." },
    ]
  },
  {
    category: "Development & Software",
    icon: "Code",
    items: [
      { name: "Website Development", desc: "Ultra-fast, responsive frontend engineering integrated with headless CMS engines." },
      { name: "Custom Software", desc: "Enterprise-grade core software architectures and complex algorithmic backends." },
      { name: "Web Applications", desc: "Scalable SaaS platforms, interactive portals, and real-time dashboard systems." },
      { name: "Mobile App Development", desc: "Native iOS & Android applications built with React Native and Swift." },
      { name: "E-commerce Development", desc: "Conversion-optimized e-commerce stores on Shopify, WooCommerce, and Custom Headless stacks." },
    ]
  },
  {
    category: "AI & Automation",
    icon: "Cpu",
    items: [
      { name: "AI Automation", desc: "Integrating Gemini and custom LLM workflows to streamline business intelligence." },
      { name: "Chatbot Development", desc: "Sleek, context-aware AI agents for customer service, lead capture, and operations." },
      { name: "CRM Automation", desc: "Connecting Salesforce, HubSpot, or custom CRMs with trigger-based sequences." },
      { name: "Workflow Automation", desc: "Connecting systems using Zapier, Make, or custom microservices to eliminate manual tasks." },
      { name: "Excel & Data Automation", desc: "Advanced scripting, automated sheets, and data aggregation pipelines." },
    ]
  },
  {
    category: "Digital Marketing",
    icon: "TrendingUp",
    items: [
      { name: "Meta Ads (Facebook & Instagram)", desc: "High-ROI campaign scaling, precision targeting, and custom creative asset development." },
      { name: "Google Ads & PPC", desc: "Search, Display, and Performance Max campaigns designed to capture high-intent buyers." },
      { name: "LinkedIn Ads", desc: "Account-based marketing (ABM) and B2B lead generation campaigns for enterprise clients." },
      { name: "SEO (Technical & Local)", desc: "In-depth audits, content clusters, schema markup, and Google Maps ranking optimization." },
      { name: "Email Marketing & Funnels", desc: "High-conversion Klaviyo / Mailchimp campaigns and automated nurture flows." },
    ]
  },
  {
    category: "Content & Video",
    icon: "Video",
    items: [
      { name: "Video Editing", desc: "Cinematic post-production, color grading, and custom audio engineering for corporate video." },
      { name: "Instagram Reels & TikToks", desc: "Viral short-form visual hooks, custom typography, and dynamic pacing." },
      { name: "Motion Graphics", desc: "High-end 2D/3D animations, title sequences, and explainer videos that captivate." },
      { name: "Content Creation", desc: "High-quality photography, copy, and visual assets tailored for social distribution." },
    ]
  },
  {
    category: "Business Consulting",
    icon: "Briefcase",
    items: [
      { name: "Business Consulting", desc: "Strategic growth consulting, market analysis, and technology stack optimization." },
      { name: "Lead Generation", desc: "Data-driven outbound prospecting pipelines and targeted account lists." },
      { name: "Data Entry & Dashboards", desc: "High-accuracy data structure setups, reporting dashboards, and Power BI models." },
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "proj-1",
    title: "Aura Luxury Timepieces",
    category: "Websites",
    client: "Aura Watches Ltd",
    duration: "10 Weeks",
    results: "+240% Sales Conversion",
    technology: ["React", "Vite", "Framer Motion", "Shopify headless"],
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    description: "A breathtaking, immersive e-commerce catalog featuring web-gl interactive elements, editorial typography, and rapid scroll transitions.",
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80"
    ],
    growthMetric: "+240% Conv."
  },
  {
    id: "proj-2",
    title: "Apex FinTech Platform",
    category: "Mobile Apps",
    client: "Apex Capital Inc",
    duration: "16 Weeks",
    results: "1.2M Active Users on Android/iOS",
    technology: ["React Native", "Node.js", "Express", "D3.js Charts"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "An intuitive mobile application for stock trading and portfolio asset tracking with real-time biometric login, interactive custom charts, and instant deposit options.",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
    ],
    growthMetric: "1.2M Users"
  },
  {
    id: "proj-3",
    title: "Solis Smart CRM Automation",
    category: "AI Automation",
    client: "Solis Green Energy",
    duration: "6 Weeks",
    results: "92% Admin Overhead Reduction",
    technology: ["Gemini AI", "Make.com", "HubSpot API", "Zapier"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description: "An intelligent sales automation ecosystem that uses Gemini AI to analyze inbound leads, draft personalized proposals, categorize urgency, and trigger instant WhatsApp/email updates.",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    ],
    growthMetric: "-92% Admin Work"
  },
  {
    id: "proj-4",
    title: "Stellar Brand Narrative",
    category: "Branding",
    client: "Stellar Architecture",
    duration: "4 Weeks",
    results: "Redefined Premium Brand Positioning",
    technology: ["Adobe Illustrator", "Bespoke Typography", "Lux Design Systems"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive high-end rebrand for a leading architecture firm, encompassing custom serif typographic systems, a minimalist logo mark, and premium gold-foil physical print identity.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    growthMetric: "Timeless Rebrand"
  },
  {
    id: "proj-5",
    title: "Nova Global Meta Campaign",
    category: "Meta Ads",
    client: "Nova Beauty",
    duration: "Ongoing",
    results: "4.8x Return on Ad Spend (ROAS)",
    technology: ["Meta Pixel", "A/B Dynamic Creatives", "Lead Gen Funnel"],
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    description: "Bespoke short-form creative production and precision targeting scaling cosmetic sales worldwide.",
    gallery: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"],
    growthMetric: "4.8x ROAS"
  },
  {
    id: "proj-6",
    title: "Vanguard Tech SEO Boost",
    category: "SEO",
    client: "Vanguard Devs",
    duration: "6 Months",
    results: "+410% Organic Search Traffic",
    technology: ["Technical SEO", "Schema.org", "Next.js Static Generation"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Complete structural overhaul, core web vitals optimization, and topical authority clustering.",
    gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"],
    growthMetric: "+410% Organic"
  },
  {
    id: "proj-7",
    title: "Horizon Interactive Analytics",
    category: "Dashboards",
    client: "Horizon Logistics",
    duration: "8 Weeks",
    results: "Real-time Fleet Tracking Active",
    technology: ["Power BI", "D3.js", "React Grid Layout"],
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    description: "Multi-layered corporate performance tracking displaying fleet logistics metrics, delivery efficiencies, and operational budgets in high density grids.",
    gallery: ["https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"],
    growthMetric: "Interactive BI"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Aura Watches Redesign",
    client: "Aura Watches Ltd",
    category: "E-Commerce Rebrand",
    challenge: "Aura Watches had an outdated e-commerce platform that failed to convey the premium luxury nature of their Swiss watches, resulting in high shopping cart abandonment and low emotional connection.",
    research: "We analyzed user behavior and found high-intent buyers were leaving on the product details screen. The imagery was flat, the loading speed was poor (FCP > 3.2s), and checkout was cluttered with unnecessary steps.",
    strategy: "Create an ultra-luxury, immersive spatial catalog featuring high-definition, responsive close-ups, interactive micro-animations, a refined narrative around the watchmakers' craft, and a single-tap Apple Pay integration.",
    design: "We employed absolute pure white backgrounds, grand luxury typography usingOutfit as display, large whitespace margins, and a gorgeous gold color palette (#C9A227) as accent highlight. Custom product viewcards were designed with a 20px rounded layout.",
    development: "Built on headless architecture. We implemented the frontend in React using Vite, styled dynamically with Tailwind CSS, and optimized all transitions with smooth Framer Motion. LCP was reduced to 0.8s.",
    launch: "The site was launched in early 2026, accompanied by automated retargeting Meta Ads designed around the high-fidelity branding assets.",
    results: "Direct sales Conversion increased from 1.2% to 4.1%. Shopping cart completion soared, and organic engagement time quadrupled.",
    beforeImg: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80", // Old layout feel
    afterImg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", // Premium new look
    growthMetrics: [
      { label: "Sales Conversion", value: "+240%" },
      { label: "Page Load Speed", value: "0.8s" },
      { label: "Add-to-Cart Completion", value: "78%" }
    ],
    roi: "410% in Year One"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Abdul Rehman",
    role: "Founder & Chief Technology Officer",
    bio: "Visionary technical leader specialized in AI architectures, premium full-stack engineering, and digital growth systems.",
    skills: ["AI Engineering", "React & Node.js", "Digital Strategy", "Growth Systems"],
    linkedin: "https://linkedin.com",
    portfolio: "https://techgloze.com",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "team-2",
    name: "Sophia Sterling",
    role: "Senior UI/UX Creative Director",
    bio: "Design virtuoso with over 10 years of experience shaping visual identities for world-class Fortune 500 tech companies.",
    skills: ["Figma Design Systems", "Creative Direction", "Micro-interactions", "Branding"],
    linkedin: "https://linkedin.com",
    portfolio: "https://techgloze.com",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "team-3",
    name: "Marcus Vance",
    role: "Performance Marketing Specialist",
    bio: "Data-driven marketing strategist managing high-budget Meta, Google, and LinkedIn campaigns with millions in managed spend.",
    skills: ["Meta Ads Scaling", "Google Ads (PPC)", "B2B Lead Gen", "Conversion Rate Optimization"],
    linkedin: "https://linkedin.com",
    portfolio: "https://techgloze.com",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "team-4",
    name: "Isabella Martinez",
    role: "Lead SEO Strategist",
    bio: "Search wizard who thrives on technical audit optimizations, crawl budgets, schema implementation, and local search dominances.",
    skills: ["Technical SEO", "Semantic Search Optimization", "Local Map Pack Rankings", "Schema Architecture"],
    linkedin: "https://linkedin.com",
    portfolio: "https://techgloze.com",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Future of Design: AI-Assisted Bespoke UX Journeys",
    excerpt: "How generative model systems like Gemini are shifting creative design frameworks from static templates to fluid, context-aware digital art platforms.",
    content: `In the premium digital landscape of 2026, templates are dead. High-intent consumers are searching for emotional connection, luxury aesthetics, and unparalleled speed. The entry point of generative AI into the UI/UX pipeline has transformed how digital agency artists create.

At TechGloze, we believe AI isn't here to replace human artistry; it's here to empower it. By leveraging Gemini's real-time contextual reasoning, we can generate dynamic user interfaces that adapt to a user's personality, light conditions, and scroll behaviors on the fly.

This article outlines our core principles for blending luxury, high-end design styling (whitespace, premium typography, custom gold accent schemes) with real-time semantic API pipelines. We explore fluid responsive canvas modules, customized viewport triggers, and how modern agencies can achieve Awwwards-level execution by prioritizing performance alongside interactive aesthetics.`,
    category: "AI",
    author: "Abdul Rehman",
    date: "July 9, 2026",
    readTime: "5 Min Read",
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "blog-2",
    title: "Meta Ads Scaling: How to Sustain a 4x+ ROAS in 2026",
    excerpt: "The playbook on scaling Facebook and Instagram campaigns using hyper-focused dynamic creatives, customer hook arrays, and pixel feedback loops.",
    content: `Scaling high-budget Meta advertising campaigns has fundamentally shifted from granular interest-targeting setups to broad-match visual hook sequences. The algorithm has matured; it thrives when given exceptional visual assets.

To scale a premium brand globally, you must structure your campaign around 'Creative-Led Targeting'. This means designing assets that pre-qualify users based on their visual sophistication.

At TechGloze, we combine high-end post-production (motion graphics, cinematic video-editing) with performance analytics. We construct multi-step e-commerce sales funnels that maintain attention and capture conversions immediately through headless checkout architectures.`,
    category: "Marketing",
    author: "Marcus Vance",
    date: "June 24, 2026",
    readTime: "7 Min Read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "blog-3",
    title: "Advanced Technical SEO: Navigating Core Web Vitals with Headless Stacks",
    excerpt: "Learn how modern agencies structure static generation paths, optimize schema layers, and design layout trees to ensure an instant LCP of under 1 second.",
    content: `Technical search engine optimization is no longer just about meta tags and keyword densities. In 2026, Google's Core Web Vitals are a major ranking factor. If your high-end website takes longer than 1.5 seconds to load, search traffic is lost to faster competitors.

We delve into headless React implementations using Vite, Server-Sent content caching, and how to structure schema markup for rich search engine snippets. Utilizing nested JSON-LD graphs, we guarantee search crawlers index every product with high precision, raising click-through rates by up to 80%.`,
    category: "SEO",
    author: "Isabella Martinez",
    date: "May 18, 2026",
    readTime: "6 Min Read",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Engineer (React & AI Integration)",
    department: "Engineering",
    location: "Remote / Dubai",
    type: "Full-Time",
    description: "We are seeking a senior technical expert to build premium client platforms, headless systems, and intelligent automated workflows powered by state-of-the-art AI engines.",
    requirements: [
      "5+ years of production experience in React, TypeScript, and Node.js.",
      "Expert knowledge of Tailwind CSS, motion design (Framer Motion, GSAP).",
      "Demonstrated experience integrating LLMs and building custom agent workflows.",
      "Track record of writing ultra-clean, highly performant code with modular architectures."
    ],
    benefits: [
      "Highly competitive tax-free salary and annual performance bonuses.",
      "Full remote-work flexibility with core collaboration hours.",
      "Top-tier private medical insurance and global wellness packages.",
      "Access to premium tech gear (MacBook Pro, 4K monitor setup)."
    ]
  },
  {
    id: "job-2",
    title: "Lead Creative Designer (UI/UX & Branding)",
    department: "Design",
    location: "Hybrid / Karachi",
    type: "Full-Time",
    description: "Join us to spearhead luxury digital transformations. You will be responsible for defining the creative vision, wireframing, crafting high-end design systems, and pushing the boundaries of interactive art.",
    requirements: [
      "Portfolio displaying exceptional visual taste, typography mastery, and Awwwards-standard UI layouts.",
      "Proficiency in Figma, Adobe Suite, and motion design tools (Spline / After Effects).",
      "Deep understanding of user psychology, conversion rate optimization, and responsive grid layouts.",
      "Strong communication skills to articulate design decisions to premium global clients."
    ],
    benefits: [
      "Inspiring creative workplace with high-end, modern design studio vibes.",
      "Flexible working schedule and generous paid time off.",
      "Annual conference allowance to attend leading global design events (Framer, Config).",
      "Equity shares option in our product incubator program."
    ]
  }
];

export const FAQ_LIST = [
  {
    question: "What makes TechGloze IT Solutions different from standard digital agencies?",
    answer: "We do not believe in templates or generic strategies. TechGloze is an international premium digital partner that blends award-winning minimalist design aesthetic (inspired by world-class leaders like Apple and Stripe) with cutting-edge engineering and custom server-side AI automation. Every asset, line of code, and marketing campaign is engineered for exceptional business growth and absolute premium trust."
  },
  {
    question: "Do you build custom AI tools and automations for clients?",
    answer: "Yes. Our core capabilities include building bespoke server-side AI tools, context-aware chatbot agents, lead qualification funnels, and automated workflows. We leverage Google Gemini's advanced semantic API engines to eliminate administrative bottlenecks, reduce operational overhead by up to 90%, and deliver real business intelligence."
  },
  {
    question: "How do you manage website SEO and performance scoring?",
    answer: "Every website we develop is built from the ground up using headless speed-optimized architectures (such as React with Vite). We write highly optimized semantic HTML, implement automated schema structures, and compress assets to ensure perfect Core Web Vitals and Lighthouse scores of 95+ out-of-the-box."
  },
  {
    question: "How do we get started and track our project's progress?",
    answer: "You can book an initial consultation or request an AI-powered project estimate. Once onboarded, you get exclusive access to our Client Portal where you can track live project milestones, view active deliverables, interact with our AI managers, and review weekly progress metrics in real-time."
  }
];

export const INDUSTRIES_LIST = [
  { name: "FinTech & SaaS", icon: "Wallet", desc: "Security-focused platforms, elegant transaction flows, and beautiful financial tracking dashboards." },
  { name: "Luxury E-Commerce", icon: "Sparkles", desc: "High-end product galleries, visual narratives, fluid checkout paths, and global scaling systems." },
  { name: "Enterprise B2B", icon: "Building", desc: "Account-based marketing pipelines, custom integrations, automated lead capture, and CRM workflows." },
  { name: "AI Tech Startups", icon: "Zap", desc: "Highly technical landing pages, product animations, interactive playgrounds, and rapid prototype rollouts." }
];

export const TRANSLATIONS: Record<string, LanguagePack> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      founder: "Founder",
      services: "Services",
      portfolio: "Portfolio",
      caseStudies: "Case Studies",
      results: "Results",
      team: "Our Team",
      careers: "Careers",
      blog: "Insights",
      testimonials: "Clients",
      faq: "FAQ",
      contact: "Contact",
      book: "Consultation"
    },
    hero: {
      tagline: "Helping Businesses Scale Through Design, Marketing & Technology.",
      headline: "The Premium Digital Agency Scaling Global Brands",
      subheading: "TechGloze delivers ultra-premium digital solutions that combine master-level creativity, flawless technology, and Gemini-powered AI automation.",
      ctaPrimary: "Start Your Project",
      ctaSecondary: "View Portfolio",
      statsProjects: "Completed Projects",
      statsCountries: "Countries Reached",
      statsClients: "Happy Clients",
      statsExperience: "Years Experience"
    },
    founder: {
      title: "Meet Our Founder",
      biography: "Abdul Rehman founded TechGloze with a single mission: to bridge the gap between high-end aesthetic design and deep technical logic. Under his leadership, TechGloze has scaled from a boutique dev shop to a high-performance international agency serving premium accounts globally.",
      mission: "To engineer digital products and marketing campaigns that evoke trust, establish luxury, and deliver exponential business growth.",
      vision: "To push the frontiers of web engineering and AI automation, proving that world-class design is the single greatest competitive advantage."
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      founder: "المؤسس",
      services: "الخدمات",
      portfolio: "أعمالنا",
      caseStudies: "دراسات الحالة",
      results: "النتائج",
      team: "الفريق",
      careers: "الوظائف",
      blog: "المدونة",
      testimonials: "العملاء",
      faq: "الأسئلة",
      contact: "اتصل بنا",
      book: "حجز موعد"
    },
    hero: {
      tagline: "مساعدة الشركات على التوسع من خلال التصميم والتسويق والتكنولوجيا.",
      headline: "الوكالة الرقمية الفاخرة لتوسيع العلامات التجارية العالمية",
      subheading: "تقدم TechGloze حلولاً رقمية فائقة التميز تجمع بين الإبداع رفيع المستوى والتكنولوجيا الخالية من العيوب والأتمتة الذكية المدعومة بـ Gemini AI.",
      ctaPrimary: "ابدأ مشروعك",
      ctaSecondary: "عرض أعمالنا",
      statsProjects: "مشاريع مكتملة",
      statsCountries: "دول تم الوصول إليها",
      statsClients: "عملاء سعداء",
      statsExperience: "سنوات الخبرة"
    },
    founder: {
      title: "لقاء مع المؤسس",
      biography: "أسس عبد الرحمن TechGloze بمهمة واحدة: سد الفجوة بين التصميم الجمالي الراقي والمنطق التقني العميق. تحت قيادته، توسعت الوكالة من متجر تطوير صغير إلى وكالة دولية عالية الأداء تخدم حسابات متميزة على مستوى العالم.",
      mission: "هندسة المنتجات الرقمية والحملات التسويقية التي تثير الثقة وتثبت الفخامة وتقدم نمواً تجارياً هائلاً.",
      vision: "دفع حدود هندسة الويب وأتمتة الذكاء الاصطناعي، لإثبات أن التصميم ذو المستوى العالمي هو الميزة التنافسية الكبرى."
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      founder: "Fondateur",
      services: "Services",
      portfolio: "Portfolio",
      caseStudies: "Études de Cas",
      results: "Résultats",
      team: "Équipe",
      careers: "Carrières",
      blog: "Insights",
      testimonials: "Témoignages",
      faq: "FAQ",
      contact: "Contact",
      book: "Consultation"
    },
    hero: {
      tagline: "Aider les entreprises à se développer grâce au design, au marketing et à la technologie.",
      headline: "L'Agence Digitale Premium pour les Marques Globales",
      subheading: "TechGloze propose des solutions digitales ultra-premium combinant créativité de haut niveau, technologie irréprochable et automatisation IA alimentée par Gemini.",
      ctaPrimary: "Démarrer un Projet",
      ctaSecondary: "Voir le Portfolio",
      statsProjects: "Projets Réalisés",
      statsCountries: "Pays Atteints",
      statsClients: "Clients Satisfaits",
      statsExperience: "Années d'Expérience"
    },
    founder: {
      title: "Rencontrez Notre Fondateur",
      biography: "Abdul Rehman a fondé TechGloze avec une seule mission : combler le fossé entre le design esthétique haut de gamme et la logique technique profonde. Sous sa direction, TechGloze est passée d'un studio de dev boutique à une agence internationale de haute performance servant des clients premium à travers le monde.",
      mission: "Concevoir des produits numériques et des campagnes marketing qui inspirent confiance, établissent le luxe et favorisent une croissance commerciale exponentielle.",
      vision: "Repousser les limites de l'ingénierie web et de l'automatisation de l'IA, prouvant qu'un design de classe mondiale est le plus grand avantage concurrentiel."
    }
  }
};
