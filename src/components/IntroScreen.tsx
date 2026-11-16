import React, { useEffect, useState } from 'react';
import { Sparkles, Terminal, ArrowRight, Disc3 } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const commandText = 'initialize --identity "Ayush Anand" --branch "AI_ML" --status "READY"';

  // Typing effect for system intro
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < commandText.length) {
        setTypedCommand(commandText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 28);
    return () => clearInterval(interval);
  }, []);

  // Listen for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleTriggerLaunch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTriggerLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-40 bg-[#040407] flex flex-col items-center justify-center px-6 transition-all duration-700 ease-out select-none ${
        isLaunching ? 'opacity-0 scale-105 pointer-events-none filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Floating Starlight Particles */}
      <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse opacity-50" />
      <div className="absolute top-1/3 right-1/6 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-40" />

      <div className="relative max-w-xl w-full text-center flex flex-col items-center">
        {/* Top Status Capsule */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            Portfolio Nexus v2.0 • Online
          </span>
        </div>

        {/* Minimalist Terminal Line */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6 bg-black/60 px-4 py-2 rounded-lg border border-neutral-800/80 shadow-inner w-full max-w-md text-left overflow-x-auto">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="text-cyan-400 font-semibold">$</span>
          <span className="text-neutral-300 tracking-tight">{typedCommand}</span>
          <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
        </div>

        {/* Hero Name with Luxury Black Badge Styling */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-3">
          <span className="tracking-[0.18em] uppercase font-['Cinzel',serif] block text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
            Ayush Anand
          </span>
        </h1>

        <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-4" />

        <p className="text-sm sm:text-base font-light tracking-wide text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
          B.Tech CSE (<span className="text-cyan-400 font-medium">Artificial Intelligence & ML</span>)
          <span className="mx-2 text-neutral-600">•</span>
          Engine Enthusiast
          <span className="mx-2 text-neutral-600">•</span>
          Pianist
        </p>

        {/* Action Button & Press Enter Hint */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleTriggerLaunch}
            data-cursor="view"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 bg-white text-black font-semibold tracking-wider text-xs uppercase shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch Experience
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mt-2">
            <span>or press</span>
            <kbd className="px-2.5 py-1 text-[11px] font-semibold text-neutral-300 bg-neutral-900 border border-neutral-700 rounded shadow">
              ENTER ↵
            </kbd>
            <span>to open</span>
          </div>
        </div>

        {/* Bottom Ambient Tagline */}
        <div className="mt-14 text-[11px] uppercase tracking-[0.25em] text-neutral-600 flex items-center gap-3">
          <span>Decisive</span>
          <span>•</span>
          <span>Autonomous</span>
          <span>•</span>
          <span>Creative</span>
        </div>
      </div>
    </div>
  );
};
