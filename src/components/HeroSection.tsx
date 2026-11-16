import React from 'react';
import { Sparkles, Terminal, Code2, ArrowDown, Award, Compass, Cpu, Gauge } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Rolls-Royce Black Badge Subtle Light Rays & Ambient Radial */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto text-center flex flex-col items-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 backdrop-blur-md mb-8 transition-transform hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
            B.Tech CSE • Artificial Intelligence & Machine Learning
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-6 uppercase font-['Cinzel',serif]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-500 leading-none">
            AYUSH ANAND
          </span>
        </h1>

        {/* Sub-headline Statement */}
        <p className="max-w-2xl text-base sm:text-xl text-neutral-300 font-light leading-relaxed mb-8">
          Architecting intelligent AI systems and prompt-driven applications, driven by an autonomous mindset,
          a passion for high-revving automobile engineering, and the acoustic expression of piano keys.
        </p>

        {/* Core Principles & Highlights Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 text-xs sm:text-sm font-mono text-neutral-400">
          <span className="px-3.5 py-1 rounded-md bg-neutral-900/80 border border-neutral-800 text-neutral-300">
            ⚡ Autonomous Decision Maker
          </span>
          <span className="px-3.5 py-1 rounded-md bg-neutral-900/80 border border-neutral-800 text-neutral-300">
            🏆 2x Hackathon Competitor
          </span>
          <span className="px-3.5 py-1 rounded-md bg-neutral-900/80 border border-neutral-800 text-neutral-300">
            🚀 Vercel Deployment Specialist
          </span>
          <span className="px-3.5 py-1 rounded-md bg-neutral-900/80 border border-neutral-800 text-neutral-300">
            🔧 ECU Tuning & Engine Enthusiast
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#engineering"
            data-cursor="view"
            className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] flex items-center gap-2"
          >
            <Cpu className="w-4 h-4" />
            <span>Explore Skillset & AI</span>
          </a>

          <a
            href="#garage"
            data-cursor="engine"
            className="px-7 py-3.5 rounded-full bg-neutral-900 border border-red-500/40 text-neutral-200 font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:border-red-500 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.35)] flex items-center gap-2 group"
          >
            <Gauge className="w-4 h-4 text-red-500 transition-transform duration-300 group-hover:rotate-45" />
            <span>Enter The Dyno Lab</span>
          </a>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left">
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 mb-1">2+</div>
            <div className="text-xs font-medium text-neutral-200 uppercase tracking-wider">Hackathons</div>
            <div className="text-[11px] text-neutral-400 mt-1">High-intensity building & agile problem solving</div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">AI & ML</div>
            <div className="text-xs font-medium text-neutral-200 uppercase tracking-wider">Specialization</div>
            <div className="text-[11px] text-neutral-400 mt-1">Undergrad B.Tech CSE curriculum & research</div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 mb-1">Vercel</div>
            <div className="text-xs font-medium text-neutral-200 uppercase tracking-wider">Deployments</div>
            <div className="text-[11px] text-neutral-400 mt-1">Prompt-engineered apps live on the edge</div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-red-400 mb-1">ECU / V12</div>
            <div className="text-xs font-medium text-neutral-200 uppercase tracking-wider">Automotive Passion</div>
            <div className="text-[11px] text-neutral-400 mt-1">Engine diagnostics, tuning & mechanics</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 text-neutral-400">
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-400" />
        </div>
      </div>
    </section>
  );
};
