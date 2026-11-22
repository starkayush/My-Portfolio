import React, { useState } from 'react';
import { Film, Play, Eye, Clapperboard, Aperture, Video, Sparkles, Image as ImageIcon } from 'lucide-react';

export const StorytellingSection: React.FC = () => {
  const [activeFrame, setActiveFrame] = useState(0);

  const cinematicFrames = [
    {
      title: 'Atmospheric Chiaroscuro',
      subtitle: 'Shadows, High Contrast & Mood',
      tagline: 'ROLLS-ROYCE NOIR AESTHETIC',
      desc: 'Harnessing low-key lighting and deep blacks to create suspense, gravitas, and luxury storytelling where what remains unseen in shadow is as powerful as the light.',
      meta: { lens: '50mm Anamorphic', fstop: 'f/1.4', shutter: '1/48s', iso: '800', fps: '24 FPS' },
      bgGradient: 'from-neutral-950 via-slate-900 to-black',
      accentColor: 'text-cyan-400',
    },
    {
      title: 'Dynamic Motion & Kinetic Tracking',
      subtitle: 'Velocity in Automobiles & Rhythm',
      tagline: 'KINETIC ENERGY & CAR VISUALS',
      desc: 'Capturing the raw adrenaline of moving vehicles: leading lines on tarmac, low tracking angles, shutter motion blur, and the mechanical drama of high-performance machines.',
      meta: { lens: '35mm Cine Prime', fstop: 'f/2.8', shutter: '1/96s', iso: '400', fps: '60 FPS' },
      bgGradient: 'from-neutral-950 via-red-950/40 to-black',
      accentColor: 'text-red-400',
    },
    {
      title: 'Visual Story Arcs & Composition',
      subtitle: 'The Geometry of Emotion',
      tagline: 'FRAMING • SYMMETRY • PERSPECTIVE',
      desc: 'Every shot is intentional. Using symmetry, depth of field, and compositional balance to guide the viewer’s eye and evoke an unspoken narrative arc.',
      meta: { lens: '85mm Portrait Cine', fstop: 'f/1.8', shutter: '1/48s', iso: '200', fps: '24 FPS' },
      bgGradient: 'from-neutral-950 via-amber-950/30 to-black',
      accentColor: 'text-amber-400',
    },
  ];

  return (
    <section id="cinematography" className="py-24 px-6 relative bg-[#040407] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">
              <Film className="w-3.5 h-3.5" />
              Visual Storytelling & Direction
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-['Cinzel',serif] tracking-wider">
              Cinematography
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
            Translating human emotion and mechanical beauty into compelling visual stories through the lens of cinematography, composition, and video pacing, though it&apos;s something more than a hobby to me. The cameras, the perspectives, the beauty, the lenses, a perfect shot (which doesn&apos;t ever exist) indeed, is what I want to master on the way.
          </p>
        </div>

        {/* Master Cinema Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl mb-12">
          {/* Cinema Letterbox Bar Top */}
          <div className="h-6 bg-black flex items-center justify-between px-6 border-b border-neutral-900 text-[10px] font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              REC • 2.39:1 CINEMATIC ASPECT
            </span>
            <span>TIMECODE 00:24:18:02</span>
            <span>RAW 4K • PRORES</span>
          </div>

          {/* Active Frame Display */}
          <div className={`p-8 sm:p-14 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end bg-gradient-to-br ${cinematicFrames[activeFrame].bgGradient} relative overflow-hidden transition-all duration-700`}>
            {/* Film grain effect overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Viewfinder crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 pointer-events-none flex items-center justify-center">
              <div className="w-2 h-2 border-t border-l border-white/40 absolute -top-1 -left-1" />
              <div className="w-2 h-2 border-t border-r border-white/40 absolute -top-1 -right-1" />
              <div className="w-2 h-2 border-b border-l border-white/40 absolute -bottom-1 -left-1" />
              <div className="w-2 h-2 border-b border-r border-white/40 absolute -bottom-1 -right-1" />
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Frame Content */}
            <div className="relative z-10 max-w-2xl">
              <div className="text-[11px] font-mono tracking-widest uppercase mb-2 font-semibold text-neutral-400">
                {cinematicFrames[activeFrame].tagline}
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white mb-2 font-['Cinzel',serif]">
                {cinematicFrames[activeFrame].title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                {cinematicFrames[activeFrame].desc}
              </p>

              {/* Camera Metadata HUD */}
              <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-black/60 border border-neutral-800 text-neutral-300">
                  LENS: {cinematicFrames[activeFrame].meta.lens}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-neutral-800 text-neutral-300">
                  IRIS: {cinematicFrames[activeFrame].meta.fstop}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-neutral-800 text-neutral-300">
                  SHUTTER: {cinematicFrames[activeFrame].meta.shutter}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-neutral-800 text-neutral-300">
                  ISO: {cinematicFrames[activeFrame].meta.iso}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-neutral-800 text-cyan-400">
                  {cinematicFrames[activeFrame].meta.fps}
                </span>
              </div>
            </div>
          </div>

          {/* Cinema Letterbox Bar Bottom */}
          <div className="h-6 bg-black border-t border-neutral-900" />
        </div>

        {/* Frame Selector Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cinematicFrames.map((frame, index) => (
            <button
              key={frame.title}
              onClick={() => setActiveFrame(index)}
              data-cursor="view"
              className={`p-5 rounded-xl text-left border transition-all duration-300 ${
                activeFrame === index
                  ? 'border-white/80 bg-neutral-900/90 shadow-lg shadow-white/5'
                  : 'border-neutral-800/80 bg-neutral-950/40 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-neutral-400">SCENE 0{index + 1}</span>
                <Clapperboard className={`w-4 h-4 ${activeFrame === index ? 'text-white' : 'text-neutral-500'}`} />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{frame.title}</h4>
              <p className="text-xs text-neutral-400 line-clamp-1">{frame.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
