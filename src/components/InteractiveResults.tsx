/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INDUSTRIES_LIST } from '../utils/data';
import { BarChart, DollarSign, Users, RefreshCw, Layers, ShieldCheck, Award, Sparkles, TrendingUp, Percent, Eye } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MonthlyDataPoint {
  month: string;
  revenue: number;
  leads: number;
  conversion: number;
  traffic: number;
  roas: number;
}

interface SectorResults {
  revenueGrowth: string;
  leadsMonthly: string;
  conversionRate: string;
  trafficIncrease: string;
  roasRate: string;
  seoRankingKeywords: string;
  monthlyPerformance: MonthlyDataPoint[];
}

type MetricKey = 'revenue' | 'leads' | 'conversion' | 'traffic' | 'roas';

const METRICS_CONFIG: Record<MetricKey, { label: string; unit: string; color: string; fill: string }> = {
  revenue: { label: 'Revenue Growth', unit: 'k USD', color: '#C9A227', fill: 'rgba(201, 162, 39, 0.08)' },
  leads: { label: 'Inbound Leads', unit: ' Leads', color: '#C9A227', fill: 'rgba(201, 162, 39, 0.08)' },
  conversion: { label: 'Conversion Rate', unit: '%', color: '#C9A227', fill: 'rgba(201, 162, 39, 0.08)' },
  traffic: { label: 'Organic Traffic', unit: 'k Visits', color: '#C9A227', fill: 'rgba(201, 162, 39, 0.08)' },
  roas: { label: 'ROAS Performance', unit: 'x ROAS', color: '#C9A227', fill: 'rgba(201, 162, 39, 0.08)' }
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  unit?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#171717] border border-zinc-800 text-white p-3 rounded-xl shadow-xl text-left text-xs space-y-1">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-zinc-500 font-bold">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <p className="font-sans font-black text-xs">
            {payload[0].value}
            <span className="text-[0.7rem] font-medium text-brand-gold ml-1">{unit}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function InteractiveResults() {
  const [selectedIndustry, setSelectedIndustry] = useState<number>(1); // Default to Luxury E-Commerce
  const [activeMetric, setActiveMetric] = useState<MetricKey>('revenue');
  const [animate, setAnimate] = useState<boolean>(false);

  // Sector-specific live data mapping with monthly data points
  const sectorData: Record<number, SectorResults> = {
    0: { // FinTech
      revenueGrowth: "+180%",
      leadsMonthly: "2.4K",
      conversionRate: "2.9%",
      trafficIncrease: "+220%",
      roasRate: "4.2x",
      seoRankingKeywords: "340+",
      monthlyPerformance: [
        { month: 'Month 1', revenue: 100, leads: 500, conversion: 1.2, traffic: 45, roas: 2.1 },
        { month: 'Month 2', revenue: 140, leads: 820, conversion: 1.6, traffic: 72, roas: 2.6 },
        { month: 'Month 3', revenue: 190, leads: 1300, conversion: 2.1, traffic: 110, roas: 3.1 },
        { month: 'Month 4', revenue: 175, leads: 1150, conversion: 1.9, traffic: 95, roas: 2.9 },
        { month: 'Month 5', revenue: 260, leads: 1850, conversion: 2.5, traffic: 165, roas: 3.7 },
        { month: 'Month 6', revenue: 340, leads: 2400, conversion: 2.9, traffic: 220, roas: 4.2 }
      ]
    },
    1: { // Luxury E-Commerce
      revenueGrowth: "+240%",
      leadsMonthly: "4.8K",
      conversionRate: "4.1%",
      trafficIncrease: "+410%",
      roasRate: "4.8x",
      seoRankingKeywords: "510+",
      monthlyPerformance: [
        { month: 'Month 1', revenue: 150, leads: 1000, conversion: 1.5, traffic: 80, roas: 2.5 },
        { month: 'Month 2', revenue: 260, leads: 1900, conversion: 2.3, traffic: 145, roas: 3.1 },
        { month: 'Month 3', revenue: 390, leads: 2950, conversion: 3.1, traffic: 210, roas: 3.8 },
        { month: 'Month 4', revenue: 350, leads: 2500, conversion: 2.9, traffic: 190, roas: 3.5 },
        { month: 'Month 5', revenue: 540, leads: 3800, conversion: 3.7, traffic: 320, roas: 4.3 },
        { month: 'Month 6', revenue: 720, leads: 4800, conversion: 4.1, traffic: 410, roas: 4.8 }
      ]
    },
    2: { // Enterprise B2B
      revenueGrowth: "+140%",
      leadsMonthly: "850",
      conversionRate: "5.8%",
      trafficIncrease: "+150%",
      roasRate: "5.1x",
      seoRankingKeywords: "180+",
      monthlyPerformance: [
        { month: 'Month 1', revenue: 200, leads: 250, conversion: 2.2, traffic: 35, roas: 2.8 },
        { month: 'Month 2', revenue: 290, leads: 380, conversion: 3.1, traffic: 58, roas: 3.3 },
        { month: 'Month 3', revenue: 370, leads: 520, conversion: 4.2, traffic: 82, roas: 4.1 },
        { month: 'Month 4', revenue: 340, leads: 480, conversion: 3.9, traffic: 75, roas: 3.8 },
        { month: 'Month 5', revenue: 490, leads: 690, conversion: 5.1, traffic: 120, roas: 4.6 },
        { month: 'Month 6', revenue: 640, leads: 850, conversion: 5.8, traffic: 150, roas: 5.1 }
      ]
    },
    3: { // AI Tech Startups
      revenueGrowth: "+310%",
      leadsMonthly: "1.9K",
      conversionRate: "3.5%",
      trafficIncrease: "+630%",
      roasRate: "3.9x",
      seoRankingKeywords: "450+",
      monthlyPerformance: [
        { month: 'Month 1', revenue: 80, leads: 300, conversion: 1.0, traffic: 60, roas: 1.8 },
        { month: 'Month 2', revenue: 170, leads: 650, conversion: 1.9, traffic: 140, roas: 2.3 },
        { month: 'Month 3', revenue: 310, leads: 1100, conversion: 2.6, traffic: 270, roas: 3.0 },
        { month: 'Month 4', revenue: 280, leads: 950, conversion: 2.3, traffic: 230, roas: 2.7 },
        { month: 'Month 5', revenue: 530, leads: 1500, conversion: 3.1, traffic: 460, roas: 3.4 },
        { month: 'Month 6', revenue: 810, leads: 1900, conversion: 3.5, traffic: 630, roas: 3.9 }
      ]
    }
  };

  // Trigger re-animations on category or metric toggle
  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, [selectedIndustry, activeMetric]);

  const activeResults = sectorData[selectedIndustry];
  const chartData = activeResults.monthlyPerformance;
  const currentMetricConfig = METRICS_CONFIG[activeMetric];

  return (
    <section id="results-section" className="py-24 bg-white dark:bg-[#0F0F0F] bg-luxury-grid transition-colors duration-500 border-t border-brand-border dark:border-zinc-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3">
              05 / MEASURABLE RESULTS
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark dark:text-white tracking-tight animate-fade-in">
              Live Results Dashboard
            </h2>
            <div className="h-[2px] bg-brand-gold w-16 mt-4" />
          </div>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Interactive analytical projections illustrating TechGloze's typical brand performance metrics across major industries.
          </p>
        </div>

        {/* Sector Selection Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 text-left">
          {INDUSTRIES_LIST.map((ind, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndustry(idx)}
              className={`p-6 rounded-2xl border text-left transition-all duration-300 relative group flex flex-col justify-between cursor-pointer ${
                selectedIndustry === idx
                  ? 'bg-brand-dark border-brand-gold text-white shadow-lg scale-[1.02] dark:bg-zinc-900'
                  : 'bg-white border-brand-border text-brand-dark hover:border-brand-gold/60 dark:bg-zinc-900/40 dark:border-zinc-800 dark:text-white'
              }`}
            >
              {/* Highlight bar inside button */}
              <div className={`absolute top-0 left-6 right-6 h-[3px] bg-brand-gold rounded-b-md transition-opacity duration-300 ${selectedIndustry === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
              
              <div className="space-y-3">
                <span className="font-mono text-[0.6rem] font-bold text-brand-gold uppercase tracking-wider block">
                  SECTOR // 0{idx + 1}
                </span>
                <h4 className="font-display font-bold text-base leading-none">
                  {ind.name}
                </h4>
                <p className="font-sans text-[0.72rem] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Results Core Dashboard Display */}
        <div className="bg-brand-gold-light/20 dark:bg-zinc-900/30 border border-brand-border dark:border-zinc-800/80 rounded-3xl p-6 md:p-10 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Interactive Stat Panels */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Metric 1 - Revenue */}
            <button
              onClick={() => setActiveMetric('revenue')}
              className={`p-5 rounded-2xl border text-left relative overflow-hidden transition-all duration-300 cursor-pointer ${
                activeMetric === 'revenue'
                  ? 'bg-brand-dark dark:bg-zinc-900 border-brand-gold text-white scale-[1.02] shadow-md'
                  : 'bg-white dark:bg-zinc-900/60 border-brand-border dark:border-zinc-850 text-brand-dark dark:text-zinc-100 hover:border-brand-gold/40'
              }`}
            >
              <div className="absolute top-0 right-0 p-3 text-brand-gold/20"><DollarSign className="w-5 h-5" /></div>
              <p className="font-mono text-[0.55rem] text-zinc-400 uppercase tracking-widest font-bold">Revenue Scale</p>
              <h3 className={`font-display font-black text-2xl md:text-3xl transition-all duration-500 mt-1`}>
                {activeResults.revenueGrowth}
              </h3>
              <p className="font-sans text-[0.65rem] text-zinc-500 dark:text-zinc-400 mt-2">YTD Growth Delta</p>
              {activeMetric === 'revenue' && <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-gold" />}
            </button>

            {/* Metric 2 - Leads */}
            <button
              onClick={() => setActiveMetric('leads')}
              className={`p-5 rounded-2xl border text-left relative overflow-hidden transition-all duration-300 cursor-pointer ${
                activeMetric === 'leads'
                  ? 'bg-brand-dark dark:bg-zinc-900 border-brand-gold text-white scale-[1.02] shadow-md'
                  : 'bg-white dark:bg-zinc-900/60 border-brand-border dark:border-zinc-850 text-brand-dark dark:text-zinc-100 hover:border-brand-gold/40'
              }`}
            >
              <div className="absolute top-0 right-0 p-3 text-brand-gold/20"><Users className="w-5 h-5" /></div>
              <p className="font-mono text-[0.55rem] text-zinc-400 uppercase tracking-widest font-bold">Inbound Leads</p>
              <h3 className={`font-display font-black text-2xl md:text-3xl transition-all duration-500 mt-1`}>
                {activeResults.leadsMonthly}
              </h3>
              <p className="font-sans text-[0.65rem] text-zinc-500 dark:text-zinc-400 mt-2">Avg Monthly Leads</p>
              {activeMetric === 'leads' && <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-gold" />}
            </button>

            {/* Metric 3 - Conversion */}
            <button
              onClick={() => setActiveMetric('conversion')}
              className={`p-5 rounded-2xl border text-left relative overflow-hidden transition-all duration-300 cursor-pointer ${
                activeMetric === 'conversion'
                  ? 'bg-brand-dark dark:bg-zinc-900 border-brand-gold text-white scale-[1.02] shadow-md'
                  : 'bg-white dark:bg-zinc-900/60 border-brand-border dark:border-zinc-850 text-brand-dark dark:text-zinc-100 hover:border-brand-gold/40'
              }`}
            >
              <div className="absolute top-0 right-0 p-3 text-brand-gold/20"><Percent className="w-5 h-5" /></div>
              <p className="font-mono text-[0.55rem] text-zinc-400 uppercase tracking-widest font-bold">Conversion Rate</p>
              <h3 className={`font-display font-black text-2xl md:text-3xl transition-all duration-500 mt-1`}>
                {activeResults.conversionRate}
              </h3>
              <p className="font-sans text-[0.65rem] text-zinc-500 dark:text-zinc-400 mt-2">Active Buying Intent</p>
              {activeMetric === 'conversion' && <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-gold" />}
            </button>

            {/* Metric 4 - Traffic */}
            <button
              onClick={() => setActiveMetric('traffic')}
              className={`p-5 rounded-2xl border text-left relative overflow-hidden transition-all duration-300 cursor-pointer ${
                activeMetric === 'traffic'
                  ? 'bg-brand-dark dark:bg-zinc-900 border-brand-gold text-white scale-[1.02] shadow-md'
                  : 'bg-white dark:bg-zinc-900/60 border-brand-border dark:border-zinc-850 text-brand-dark dark:text-zinc-100 hover:border-brand-gold/40'
              }`}
            >
              <div className="absolute top-0 right-0 p-3 text-brand-gold/20"><TrendingUp className="w-5 h-5" /></div>
              <p className="font-mono text-[0.55rem] text-zinc-400 uppercase tracking-widest font-bold">Organic Traffic</p>
              <h3 className={`font-display font-black text-2xl md:text-3xl transition-all duration-500 mt-1`}>
                {activeResults.trafficIncrease}
              </h3>
              <p className="font-sans text-[0.65rem] text-zinc-500 dark:text-zinc-400 mt-2">Traffic Boost Index</p>
              {activeMetric === 'traffic' && <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-gold" />}
            </button>

          </div>

          {/* Right Side: Graph/Visualization Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800/80 p-6 md:p-8 rounded-2xl shadow-sm text-left flex flex-col justify-between min-h-[350px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="font-display font-bold text-sm text-brand-dark dark:text-white uppercase tracking-wider">
                  {currentMetricConfig.label} Trend
                </span>
              </div>
              <div className="flex gap-4 text-[0.65rem] font-mono text-zinc-400 font-bold">
                <span>ROAS: <strong className="text-brand-gold">{activeResults.roasRate}</strong></span>
                <span>SEO KEYS: <strong className="text-brand-gold">{activeResults.seoRankingKeywords}</strong></span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="flex-1 w-full min-h-[220px] select-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentMetricConfig.color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={currentMetricConfig.color} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#888888', fontSize: 10, fontFamily: 'monospace' }} 
                    axisLine={{ stroke: 'rgba(128,128,128,0.1)' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#888888', fontSize: 10, fontFamily: 'monospace' }}
                    axisLine={{ stroke: 'rgba(128,128,128,0.1)' }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip unit={currentMetricConfig.unit} />} cursor={{ stroke: 'rgba(128,128,128,0.2)', strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey={activeMetric}
                    stroke={currentMetricConfig.color}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill={`url(#gradient-${activeMetric})`}
                    isAnimationActive={animate}
                    animationDuration={800}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Verification label */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <span className="font-mono text-[0.6rem] text-zinc-400 font-bold uppercase tracking-wider">
                Audited &amp; Verified under CTO Abdul Rehman.
              </span>
              <span className="font-mono text-[0.55rem] text-zinc-500 bg-zinc-100 dark:bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 uppercase">
                Active Client Metrics
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
