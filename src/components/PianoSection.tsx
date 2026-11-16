import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, Sparkles, Disc, Radio } from 'lucide-react';
import { PIANO_NOTES, playPianoKey } from '../utils/audio';

export const PianoSection: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [lastPlayedNote, setLastPlayedNote] = useState<string>('C4 (Do)');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play piano key handler
  const handlePlayNote = (noteObj: (typeof PIANO_NOTES)[0]) => {
    setActiveKey(noteObj.note);
    setLastPlayedNote(`${noteObj.note} - ${noteObj.label}`);
    playPianoKey(noteObj.freq, 2.2);

    setTimeout(() => {
      setActiveKey((prev) => (prev === noteObj.note ? null : prev));
    }, 280);
  };

  // Keyboard shortcut listener (ignores typing in forms/inputs)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      // Ignore if user is currently typing in an input, textarea, or editable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('form, input, textarea'))
      ) {
        return;
      }

      const keyChar = e.key.toUpperCase();
      const match = PIANO_NOTES.find((n) => n.key === keyChar);
      if (match) {
        handlePlayNote(match);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Gliding Musical Waveforms & Particle Canvas in Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener('resize', handleResize);

    // Floating notes particles
    const symbols = ['♪', '♫', '♩', '♬', '𝄞'];
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: Math.random() * 16 + 12,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -Math.random() * 0.7 - 0.3, // gently glide upwards
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw flowing sine waveform (Acoustic wave harmonics)
      phase += 0.02;
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';

      for (let x = 0; x < width; x += 3) {
        const y =
          height * 0.55 +
          Math.sin(x * 0.008 + phase) * 25 +
          Math.sin(x * 0.015 - phase * 0.8) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second harmonic wave
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      for (let x = 0; x < width; x += 3) {
        const y =
          height * 0.55 +
          Math.cos(x * 0.006 - phase * 0.7) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw drifting musical glyphs
      ctx.font = '16px serif';
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.fillStyle = `rgba(192, 132, 252, ${p.opacity})`;
        ctx.fillText(p.symbol, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Separate white keys and black keys for realistic layout
  const whiteKeys = PIANO_NOTES.filter((n) => !n.isBlack);
  const blackKeys = PIANO_NOTES.filter((n) => n.isBlack);

  return (
    <section id="music" className="py-24 px-6 relative bg-[#040407] border-t border-purple-950/40 overflow-hidden">
      {/* Background Musical Waves Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">
              <Music className="w-3.5 h-3.5" />
              The Acoustic Lounge & Melodic Journey
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-['Cinzel',serif] tracking-wider">
              Gliding Piano
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Recently began my journey learning the piano. Discovering the interplay between mathematical timing,
            frequency harmonics, and heartfelt musical storytelling.
          </p>
        </div>

        {/* Piano Instrument Console */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-950/90 border border-purple-900/30 shadow-2xl backdrop-blur-xl relative overflow-hidden mb-12">
          {/* Top Piano Header HUD */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-800/80">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-300">
                Acoustic Grand Synthesizer • Web Audio
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-neutral-400">
                LAST NOTE: <span className="text-purple-400 font-bold">{lastPlayedNote}</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-500 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                KEYBOARD INPUT ACTIVE
              </span>
            </div>
          </div>

          {/* Interactive Gliding Piano Keyboard */}
          <div className="relative flex justify-center overflow-x-auto py-6 select-none">
            <div className="relative inline-flex bg-neutral-900 p-3 sm:p-4 rounded-2xl border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Natural White Keys */}
              <div className="flex gap-1.5 sm:gap-2">
                {whiteKeys.map((key) => {
                  const isCurrent = activeKey === key.note;
                  return (
                    <button
                      key={key.note}
                      onClick={() => handlePlayNote(key)}
                      data-cursor="piano"
                      className={`relative w-10 sm:w-14 h-48 sm:h-64 rounded-b-lg flex flex-col justify-end items-center pb-4 transition-all duration-150 transform ${
                        isCurrent
                          ? 'bg-gradient-to-t from-purple-400 to-white translate-y-1 shadow-[0_0_20px_#a855f7]'
                          : 'bg-gradient-to-b from-neutral-100 to-neutral-200 hover:bg-neutral-50 text-neutral-800 shadow-md'
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-bold text-neutral-700">
                        {key.note}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase">
                        [{key.key}]
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Accidental Black Keys (Positioned absolutely over white keys) */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 h-32 sm:h-40 pointer-events-none flex">
                {whiteKeys.map((wKey, index) => {
                  // Find matching sharp note for this specific white key and octave (e.g. C4 -> C#4, D4 -> D#4, C5 -> C#5, D5 -> D#5)
                  const sharpNoteName = wKey.note.slice(0, 1) + '#' + wKey.note.slice(1);
                  const blackKey = blackKeys.find((b) => b.note === sharpNoteName);

                  if (!blackKey) {
                    return <div key={`spacer-${index}`} className="w-10 sm:w-14 mr-1.5 sm:mr-2 flex-shrink-0" />;
                  }

                  const isCurrent = activeKey === blackKey.note;
                  return (
                    <div key={blackKey.note} className="w-10 sm:w-14 mr-1.5 sm:mr-2 relative flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayNote(blackKey);
                        }}
                        data-cursor="piano"
                        className={`pointer-events-auto absolute -right-3.5 sm:-right-4 w-7 sm:w-8 h-32 sm:h-40 rounded-b-md z-20 flex flex-col justify-end items-center pb-3 transition-all duration-150 border border-neutral-700 ${
                          isCurrent
                            ? 'bg-purple-600 border-purple-300 shadow-[0_0_20px_#c084fc] translate-y-0.5'
                            : 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 hover:bg-neutral-800 text-neutral-400 shadow-xl'
                        }`}
                      >
                        <span className="text-[9px] font-bold text-neutral-300">
                          {blackKey.note}
                        </span>
                        <span className="text-[8px] font-mono text-purple-400 uppercase">
                          [{blackKey.key}]
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Playable Chords / Melodies Hint */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/60 px-4 py-2 rounded-full border border-neutral-800">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Try playing on your physical keyboard:</span>
              <span className="text-purple-300 font-semibold">[ A - D - G - K ]</span>
              <span className="text-neutral-500">• (C Major Chord progression)</span>
            </div>
          </div>
        </div>

        {/* Musical Reflection & Code Intersect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800">
            <h3 className="text-lg font-bold text-white mb-2 font-['Cinzel',serif]">
              Why Piano?
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Piano requires two independent hands moving in syncopated rhythms, reading patterns, and maintaining mental clarity. It is the ultimate mental exercise for a software engineer—mirroring concurrency, multithreading, and structural harmony.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800">
            <h3 className="text-lg font-bold text-white mb-2 font-['Cinzel',serif]">
              Harmonics & Mathematics
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every musical pitch is pure physics: frequencies doubling every octave, harmonic partials shaping timbre, and interval ratios triggering human emotions. Learning music enriches both my creative intuition and scientific precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
