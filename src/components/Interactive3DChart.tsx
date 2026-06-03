import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Users from 'lucide-react/dist/esm/icons/users';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';

interface MetricPoint {
  label: string;
  templateValue: number; // baseline
  sutraValue: number; // optimized
  unit: string;
}

export const Interactive3DChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'sales' | 'attention'>('sales');
  const [comparisonState, setComparisonState] = useState<'compare' | 'template' | 'sutra'>('compare');
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);

  // Data representing Conversion & Attention Metrics
  const salesMetrics: MetricPoint[] = [
    { label: 'Conversion Rate', templateValue: 1.2, sutraValue: 3.4, unit: '%' },
    { label: 'Customer Acquisition', templateValue: 45, sutraValue: 112, unit: '/mo' },
    { label: 'Average Life Value', templateValue: 120, sutraValue: 280, unit: ' USD' },
    { label: 'ROI Yield Ratio', templateValue: 1.5, sutraValue: 4.8, unit: 'x' }
  ];

  const attentionMetrics: MetricPoint[] = [
    { label: 'Sub-second Speed', templateValue: 3.8, sutraValue: 0.28, unit: 's (Lower=Better)' },
    { label: 'Bounce Rate', templateValue: 56, sutraValue: 18, unit: '% (Lower=Better)' },
    { label: 'Avg Time-on-Site', templateValue: 48, sutraValue: 245, unit: 's' },
    { label: 'UX Friction Index', templateValue: 72, sutraValue: 12, unit: ' (Lower=Better)' }
  ];

  const currentMetrics = activeMetric === 'sales' ? salesMetrics : attentionMetrics;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 relative px-2">
      
      {/* Visual background aura */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

      {/* Main Glass Panel Stage */}
      <div className="w-full rounded-[2.5rem] glass-panel border border-white/60 p-6 md:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden">
        
        {/* Dynamic Light Rays Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header Controller Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200/50 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 px-2 text-[10px] sm:text-xs font-mono font-extrabold uppercase bg-sky-50 border border-sky-100 rounded-full text-sky-600 tracking-wider">
                Simulated 3D Engine Metrics
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sutra Engineered Systems vs. Standard Templates
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select key categories to view real-time modeled attention benchmarks and conversion leaps.
            </p>
          </div>

          {/* Metric Selector Capsules */}
          <div className="flex items-center p-1 bg-slate-200/55 rounded-2xl border border-white/60 backdrop-blur-md self-stretch md:self-auto shadow-inner">
            <button
              onClick={() => setActiveMetric('sales')}
              className={`relative px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeMetric === 'sales' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeMetric === 'sales' && (
                <motion.span
                  layoutId="activeChartMetric"
                  className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#0ea5e9] rounded-xl shadow"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <TrendingUp className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Sales & Value</span>
            </button>

            <button
              onClick={() => setActiveMetric('attention')}
              className={`relative px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeMetric === 'attention' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeMetric === 'attention' && (
                <motion.span
                  layoutId="activeChartMetric"
                  className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#0ea5e9] rounded-xl shadow"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Clock className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">UX Attention</span>
            </button>
          </div>
        </div>

        {/* 3D Isometric Viewport Container with Hover tilt triggers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Left Column: True Simulated 3D Columns Section */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[340px] relative p-4 bg-slate-100/40 border border-slate-200/50 rounded-3xl shadow-inner overflow-hidden">
            
            {/* Background Perspective Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Legend Frame */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-[10px] font-mono uppercase bg-white/70 backdrop-blur-md p-2 rounded-lg border border-slate-200/40">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-300 border border-slate-400" />
                <span className="text-slate-500 font-bold">Standard Template Base</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-gradient-to-r from-blue-600 to-sky-400" />
                <span className="text-[#1e3a8a] font-extrabold">Byte Sutra Optimized</span>
              </div>
            </div>

            {/* Simulated ISOMETRIC Chart Stage */}
            <div className="w-full flex items-end justify-around gap-2 px-4 pt-16 pb-8 preserve-3d">
              
              {currentMetrics.map((m, idx) => {
                // Calculate percentage relative heights for rendering
                const maxVal = Math.max(...currentMetrics.map(item => Math.max(item.templateValue, item.sutraValue)));
                
                // If it's speed/bounce/friction index, lower is actually far better!
                const isLowerBetter = m.label.toLowerCase().includes('speed') || 
                                      m.label.toLowerCase().includes('bounce') || 
                                      m.label.toLowerCase().includes('friction');
                
                // Scaling multiplier for CSS heights (min 15% and max 90% space)
                const baseHeightPercent = Math.max(15, (m.templateValue / maxVal) * 85);
                const sutraHeightPercent = Math.max(15, (m.sutraValue / maxVal) * 85);

                return (
                  <div key={idx} className="flex flex-col items-center w-full max-w-[100px] relative group/col">
                    
                    {/* Columns Stage Compartment inside Isometric slant */}
                    <div className="h-48 w-full flex items-end justify-center gap-3 md:gap-4 relative mt-2 pt-4">
                      
                      {/* 1. BASELINE VALUE COLUMN (Standard template) */}
                      {comparisonState !== 'sutra' && (
                        <div 
                          className="w-4 sm:w-5 relative flex flex-col justify-end transition-all duration-700 ease-out"
                          style={{ height: `${baseHeightPercent}%` }}
                        >
                          {/* 3D Glass block simulation using absolute gradients */}
                          <div className="absolute bottom-0 inset-x-0 w-full rounded-t bg-slate-300 border-x border-t border-slate-400/50 shadow-md">
                            <span className="absolute inset-0 bg-gradient-to-t from-slate-400/20 via-white/10 to-transparent" />
                          </div>
                          
                          {/* Inner glowing core representation */}
                          <div className="w-full bg-slate-200 h-[92%] rounded-t border-t border-white/60 shadow-inner" />
                          
                          {/* Hover floating numeric popup indicator */}
                          <span className="opacity-0 group-hover/col:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-slate-700 text-white font-mono text-[9px] transition-all whitespace-nowrap z-40">
                            {m.templateValue}{m.unit.split(' ')[0]}
                          </span>
                        </div>
                      )}

                      {/* 2. BAYTESUTRA HIGH-PERFORMANCE COLUMN */}
                      {comparisonState !== 'template' && (
                        <div 
                          className="w-5 sm:w-6 relative flex flex-col justify-end transition-all duration-700 ease-out"
                          style={{ height: `${sutraHeightPercent}%` }}
                        >
                          {/* Front face with custom styled reflective gradient */}
                          <div className={`absolute bottom-0 inset-x-0 w-full rounded-t bg-gradient-to-t from-[#1e3a8a] to-[#0ea5e9] border-x border-t border-blue-400/40 shadow-lg ${
                            isLowerBetter ? 'shadow-emerald-500/10' : 'shadow-blue-500/20'
                          }`}>
                            <span className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent animate-pulse" />
                            {/* Glass edge sheen */}
                            <span className="absolute left-[1px] top-px bottom-0 w-px bg-white/20" />
                          </div>

                          {/* Top 3D cap simulator */}
                          <div className="absolute -top-1.5 -left-1 -right-1 h-3 rounded-full bg-sky-300 border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] transform rotateX(45deg) z-20" />
                          
                          {/* Inner glowing light engine core */}
                          <div className="w-full bg-sky-400/20 h-[95%] rounded-t border-t border-white/30 backdrop-blur-sm shadow-inner" />

                          {/* Value Tag Floating */}
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#1e3a8a] text-white font-mono font-bold text-[9px] border border-blue-300/30 shadow whitespace-nowrap flex items-center justify-center gap-0.5 z-40 select-all">
                            {m.sutraValue}{m.unit.split(' ')[0]}
                            {!isLowerBetter && m.sutraValue > m.templateValue && (
                              <ArrowUpRight className="w-2.5 h-2.5 text-sky-300" />
                            )}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Lower Axis Category Label label compartments */}
                    <div className="text-center w-full mt-4 border-t border-slate-200/50 pt-2 min-h-[44px]">
                      <span className="text-[10px] md:text-xs font-bold text-slate-700 leading-tight block">
                        {m.label}
                      </span>
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Quick Comparer Interactive States */}
            <div className="flex bg-white/70 backdrop-blur-md border border-slate-200 rounded-xl p-1 shadow-sm mt-3 w-11/12 max-w-sm justify-between">
              {[
                { id: 'compare', name: 'Direct Overlay' },
                { id: 'template', name: 'Legacy Stack' },
                { id: 'sutra', name: 'Sutra System Only' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setComparisonState(pill.id as any)}
                  className={`flex-1 text-[9px] font-bold tracking-wider uppercase py-1.5 rounded-lg transition-colors cursor-pointer ${
                    comparisonState === pill.id 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  {pill.name}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Textual Impact & Deep Insights Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-100">
              
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1 rounded-lg bg-indigo-50">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                </span>
                <span className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-widest">
                  Performance Impact Map
                </span>
              </div>

              {activeMetric === 'sales' ? (
                <div>
                  <h4 className="font-extrabold text-[#1e3a8a] text-md">
                    Why Custom Logic Multiplies Sales
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                    Web templates are built slow and bloated to satisfy generic uses. When you remove that extra code, load speeds drop below 300 milliseconds. 
                  </p>

                  <div className="mt-5 space-y-3.5 border-t border-slate-100 pt-4.5">
                    <div className="flex gap-3">
                      <div className="w-5 h-5 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                        ✓
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-extrabold text-slate-800">No Cart Dropoffs</h5>
                        <p className="text-[11px] text-slate-400 leading-normal mt-0.5">Every 100ms lag loses 1.2% in user actions. ByteSutra apps maintain subsecond speed thresholds.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-5 h-5 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                        ✓
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-extrabold text-slate-800">Aesthetic Conversions</h5>
                        <p className="text-[11px] text-slate-400 leading-normal mt-0.5">Custom layout structures direct the eye into direct calls to action instead of generic templates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-extrabold text-[#1a79e2] text-md">
                    Unlocking Maximum Engagement
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                    Google ranks custom fast systems over bloated scripts. Lower bounce rates translate directly into more inbound traffic.
                  </p>

                  <div className="mt-5 space-y-3.5 border-t border-slate-100 pt-4.5">
                    <div className="flex gap-3">
                      <div className="w-5 h-5 shrink-0 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] flex items-center justify-center mt-0.5">
                        ✓
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-extrabold text-slate-800">Clean Code Foundations</h5>
                        <p className="text-[11px] text-slate-400 leading-normal mt-0.5">We write clean typescript packages. Minimal libraries mean lightning performance.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-5 h-5 shrink-0 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] flex items-center justify-center mt-0.5">
                        ✓
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-extrabold text-slate-800">SEO Amplification</h5>
                        <p className="text-[11px] text-slate-400 leading-normal mt-0.5">Search engines prioritize Lighthouse and Web Vital speed metrics to reward quality content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Quick Action Button pill */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Simulated Projection Gain</span>
                  <span className="text-lg font-black text-[#22c55e] block mt-0.5">Up to +183% Revenue Gain</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Target Speed</span>
                  <span className="text-xs font-mono font-bold text-slate-700 block mt-0.5">~280ms Edge Delivery</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
