import React, { useState, useEffect, useRef } from 'react';
import { Music, Sparkles } from 'lucide-react';
import { PIANO_NOTES, playPianoKey } from '../utils/audio';

// Predefined Harmonic Chords for Quick Trigger & Harmony Recognition
export const PIANO_CHORDS = [
  {
    name: 'C Major',
    symbol: 'C Maj',
    notes: ['C4', 'E4', 'G4'],
    keys: ['A', 'D', 'G'],
    numKey: '1',
    description: 'Foundational bright tonic triad'
  },
  {
    name: 'D Minor',
    symbol: 'D min',
    notes: ['D4', 'F4', 'A4'],
    keys: ['S', 'F', 'H'],
    numKey: '2',
    description: 'Poignant, reflective, emotive'
  },
  {
    name: 'E Minor',
    symbol: 'E min',
    notes: ['E4', 'G4', 'B4'],
    keys: ['D', 'G', 'J'],
    numKey: '3',
    description: 'Deep, contemplative resonance'
  },
  {
    name: 'F Major',
    symbol: 'F Maj',
    notes: ['F4', 'A4', 'C5'],
    keys: ['F', 'H', 'K'],
    numKey: '4',
    description: 'Warm, soaring, triumphant subdominant'
  },
  {
    name: 'G Major',
    symbol: 'G Maj',
    notes: ['G4', 'B4', 'D5'],
    keys: ['G', 'J', 'L'],
    numKey: '5',
    description: 'Expansive, vibrant dominant harmony'
  },
  {
    name: 'A Minor',
    symbol: 'A min',
    notes: ['A4', 'C5', 'E5'],
    keys: ['H', 'K', ';'],
    numKey: '6',
    description: 'Soulful, nocturnal, cinematic melancholy'
  },
];

export const PianoSection: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [hudStatus, setHudStatus] = useState<string>('C4 (Do)');
  const activeVoicesRef = useRef<Map<string, () => void>>(new Map());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse & Trackpad Gliding state
  const isPointerDownRef = useRef<boolean>(false);
  const lastGlidedNoteRef = useRef<string | null>(null);
  const glideClearTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine current harmonic status label from active keys
  const updateHudLabel = (currentActiveKeys: string[], lastNote?: string) => {
    if (currentActiveKeys.length === 0) {
      if (lastNote) setHudStatus(lastNote);
      return;
    }

    const matchedChord = PIANO_CHORDS.find((chord) =>
      chord.notes.every((n) => currentActiveKeys.includes(n))
    );

    if (matchedChord) {
      setHudStatus(`${matchedChord.name} Chord [${matchedChord.keys.join(' • ')}]`);
    } else if (currentActiveKeys.length > 1) {
      setHudStatus(`Chord Voicing (${currentActiveKeys.join(' + ')})`);
    } else {
      const singleNoteObj = PIANO_NOTES.find((n) => n.note === currentActiveKeys[0]);
      if (singleNoteObj) {
        setHudStatus(`${singleNoteObj.note} - ${singleNoteObj.label}`);
      }
    }
  };

  // Keyboard note press (hold-sustain with damper release)
  const pressKeyboardNote = (noteObj: (typeof PIANO_NOTES)[0]) => {
    if (activeVoicesRef.current.has(noteObj.note)) return;

    const stopFn = playPianoKey(noteObj.freq, 2.8);
    activeVoicesRef.current.set(noteObj.note, stopFn);

    const newActive = Array.from(activeVoicesRef.current.keys());
    setActiveKeys(newActive);
    updateHudLabel(newActive, `${noteObj.note} - ${noteObj.label}`);
  };

  const releaseKeyboardNote = (noteObj: (typeof PIANO_NOTES)[0]) => {
    const stopFn = activeVoicesRef.current.get(noteObj.note);
    if (stopFn) {
      stopFn();
    }
    activeVoicesRef.current.delete(noteObj.note);

    const newActive = Array.from(activeVoicesRef.current.keys());
    setActiveKeys(newActive);
    updateHudLabel(newActive);
  };

  // Gliding Piano trigger (used for mouse/trackpad tap, drag glissando, and scroll sweeps)
  // Plays with the EXACT same full, solid acoustic intensity as keyboard taps (no touch sensitivity attenuation)
  const triggerGlideNote = (noteObj: (typeof PIANO_NOTES)[0]) => {
    if (lastGlidedNoteRef.current === noteObj.note) return;
    lastGlidedNoteRef.current = noteObj.note;

    // Full acoustic grand piano sound with generous natural decay
    playPianoKey(noteObj.freq, 2.6);

    // Light up key in vibrant purple
    setActiveKeys([noteObj.note]);
    setHudStatus(`${noteObj.note} - ${noteObj.label} (Gliding)`);

    if (glideClearTimerRef.current) clearTimeout(glideClearTimerRef.current);
    glideClearTimerRef.current = setTimeout(() => {
      if (!isPointerDownRef.current) {
        setActiveKeys([]);
      }
    }, 280);
  };

  const handlePointerDownKey = (noteObj: (typeof PIANO_NOTES)[0]) => {
    isPointerDownRef.current = true;
    lastGlidedNoteRef.current = null;
    triggerGlideNote(noteObj);
  };

  const handlePointerEnterKey = (noteObj: (typeof PIANO_NOTES)[0]) => {
    if (isPointerDownRef.current) {
      triggerGlideNote(noteObj);
    }
  };

  // Trackpad / Wheel scroll gliding
  const handleWheelGlide = (e: React.WheelEvent) => {
    // If scrolling horizontally or vertically over the piano, glide across notes
    const targetEl = document.elementFromPoint(e.clientX, e.clientY);
    const keyBtn = targetEl?.closest('[data-note]') as HTMLElement | null;
    const noteName = keyBtn?.getAttribute('data-note');

    if (noteName) {
      const noteObj = PIANO_NOTES.find((n) => n.note === noteName);
      if (noteObj && noteObj.note !== lastGlidedNoteRef.current) {
        triggerGlideNote(noteObj);
        return;
      }
    }

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 10) {
      const currentIdx = PIANO_NOTES.findIndex(
        (n) => n.note === (lastGlidedNoteRef.current || 'C4')
      );
      const step = delta > 0 ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(PIANO_NOTES.length - 1, currentIdx + step));
      triggerGlideNote(PIANO_NOTES[nextIdx]);
    }
  };

  // Touch move glissando for touchscreen & trackpad gestures
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    const keyBtn = targetEl?.closest('[data-note]') as HTMLElement | null;
    const noteName = keyBtn?.getAttribute('data-note');

    if (noteName) {
      const noteObj = PIANO_NOTES.find((n) => n.note === noteName);
      if (noteObj) {
        triggerGlideNote(noteObj);
      }
    }
  };

  // Press a predefined chord
  const pressChord = (chord: (typeof PIANO_CHORDS)[0]) => {
    chord.notes.forEach((noteName) => {
      const noteObj = PIANO_NOTES.find((n) => n.note === noteName);
      if (noteObj && !activeVoicesRef.current.has(noteObj.note)) {
        const stopFn = playPianoKey(noteObj.freq, 2.8);
        activeVoicesRef.current.set(noteObj.note, stopFn);
      }
    });

    const newActive = Array.from(activeVoicesRef.current.keys());
    setActiveKeys(newActive);
    setHudStatus(`${chord.name} Chord [${chord.keys.join(' • ')}]`);
  };

  const releaseChord = (chord: (typeof PIANO_CHORDS)[0]) => {
    chord.notes.forEach((noteName) => {
      const noteObj = PIANO_NOTES.find((n) => n.note === noteName);
      if (noteObj) {
        const stopFn = activeVoicesRef.current.get(noteObj.note);
        if (stopFn) stopFn();
        activeVoicesRef.current.delete(noteObj.note);
      }
    });

    const newActive = Array.from(activeVoicesRef.current.keys());
    setActiveKeys(newActive);
    updateHudLabel(newActive);
  };

  // Global releases
  const releaseAllNotes = () => {
    isPointerDownRef.current = false;
    lastGlidedNoteRef.current = null;
    activeVoicesRef.current.forEach((stopFn) => {
      try {
        stopFn();
      } catch {}
    });
    activeVoicesRef.current.clear();
    setActiveKeys([]);
  };

  // Keyboard shortcut listener (supports chords and polyphony)
  useEffect(() => {
    const isTyping = () => {
      const activeEl = document.activeElement as HTMLElement | null;
      return (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable)
      );
    };

    const findNoteFromEvent = (e: KeyboardEvent) => {
      const keyStr = e.key.toLowerCase();
      const codeStr = e.code;

      return PIANO_NOTES.find((n) => {
        const noteKey = n.key.toLowerCase();
        if (noteKey === keyStr) return true;
        if (n.key.toUpperCase() === e.key.toUpperCase()) return true;
        if (codeStr === `Key${n.key.toUpperCase()}`) return true;
        if (n.note === 'D#5' && (keyStr === 'p' || codeStr === 'KeyP')) return true;
        if (n.note === 'E5' && (keyStr === ';' || keyStr === ':' || codeStr === 'Semicolon')) return true;
        return false;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (isTyping()) return;

      const chordByNum = PIANO_CHORDS.find((c) => c.numKey === e.key);
      if (chordByNum) {
        e.preventDefault();
        pressChord(chordByNum);
        return;
      }

      const match = findNoteFromEvent(e);
      if (match) {
        e.preventDefault();
        pressKeyboardNote(match);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const chordByNum = PIANO_CHORDS.find((c) => c.numKey === e.key);
      if (chordByNum) {
        releaseChord(chordByNum);
        return;
      }

      const match = findNoteFromEvent(e);
      if (match) {
        releaseKeyboardNote(match);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        lastGlidedNoteRef.current = null;
        setTimeout(() => {
          if (!isPointerDownRef.current && activeVoicesRef.current.size === 0) {
            setActiveKeys([]);
          }
        }, 120);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', releaseAllNotes);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', releaseAllNotes);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
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

    const symbols = ['♪', '♫', '♩', '♬', '𝄞'];
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: Math.random() * 16 + 12,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -Math.random() * 0.7 - 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      for (let x = 0; x < width; x += 3) {
        const y = height * 0.55 + Math.cos(x * 0.006 - phase * 0.7) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

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
            Discovering the interplay between mathematical timing, frequency harmonics, polyphonic chord voicings,
            and sweeping acoustic glissandos.
          </p>
        </div>

        {/* Piano Instrument Console */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-950/90 border border-purple-900/30 shadow-2xl backdrop-blur-xl relative overflow-hidden mb-12">
          {/* Top Piano Header HUD */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-800/80">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-300">
                Acoustic Grand Synthesizer • Gliding & Polyphonic
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-neutral-400">
                STATUS: <span className="text-purple-400 font-bold tracking-wide">{hudStatus}</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-500 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                TAP • DRAG • SCROLL TO GLIDE
              </span>
            </div>
          </div>

          {/* Interactive Gliding Piano Keyboard */}
          <div
            className="relative flex justify-center overflow-x-auto py-6 select-none cursor-pointer"
            onWheel={handleWheelGlide}
            onTouchMove={handleTouchMove}
          >
            <div className="relative inline-flex bg-neutral-900 p-3 sm:p-4 rounded-2xl border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Natural White Keys */}
              <div className="flex gap-1.5 sm:gap-2">
                {whiteKeys.map((key) => {
                  const isCurrent = activeKeys.includes(key.note);
                  return (
                    <button
                      key={key.note}
                      data-note={key.note}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handlePointerDownKey(key);
                      }}
                      onMouseEnter={() => handlePointerEnterKey(key)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handlePointerDownKey(key);
                      }}
                      onTouchEnd={() => {
                        isPointerDownRef.current = false;
                        lastGlidedNoteRef.current = null;
                        setTimeout(() => setActiveKeys([]), 120);
                      }}
                      data-cursor="piano"
                      className={`relative w-10 sm:w-14 h-48 sm:h-64 rounded-b-lg flex flex-col justify-end items-center pb-4 transition-all duration-100 transform ${
                        isCurrent
                          ? 'bg-gradient-to-t from-purple-400 to-white translate-y-1 shadow-[0_0_25px_#a855f7] border-b-4 border-purple-500'
                          : 'bg-gradient-to-b from-neutral-100 to-neutral-200 hover:bg-neutral-50 text-neutral-800 shadow-md'
                      }`}
                    >
                      <span className={`text-[10px] sm:text-xs font-bold ${isCurrent ? 'text-purple-950 font-black' : 'text-neutral-700'}`}>
                        {key.note}
                      </span>
                      <span className={`text-[9px] font-mono mt-1 uppercase ${isCurrent ? 'text-purple-800 font-bold' : 'text-neutral-400'}`}>
                        [{key.key}]
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Accidental Black Keys (Positioned absolutely over white keys) */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 h-32 sm:h-40 pointer-events-none flex">
                {whiteKeys.map((wKey, index) => {
                  const sharpNoteName = wKey.note.slice(0, 1) + '#' + wKey.note.slice(1);
                  const blackKey = blackKeys.find((b) => b.note === sharpNoteName);

                  if (!blackKey) {
                    return <div key={`spacer-${index}`} className="w-10 sm:w-14 mr-1.5 sm:mr-2 flex-shrink-0" />;
                  }

                  const isCurrent = activeKeys.includes(blackKey.note);
                  return (
                    <div key={blackKey.note} className="w-10 sm:w-14 mr-1.5 sm:mr-2 relative flex-shrink-0">
                      <button
                        data-note={blackKey.note}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handlePointerDownKey(blackKey);
                        }}
                        onMouseEnter={() => handlePointerEnterKey(blackKey)}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handlePointerDownKey(blackKey);
                        }}
                        onTouchEnd={() => {
                          isPointerDownRef.current = false;
                          lastGlidedNoteRef.current = null;
                          setTimeout(() => setActiveKeys([]), 120);
                        }}
                        data-cursor="piano"
                        className={`pointer-events-auto absolute -right-3.5 sm:-right-4 w-7 sm:w-8 h-32 sm:h-40 rounded-b-md z-20 flex flex-col justify-end items-center pb-3 transition-all duration-100 border ${
                          isCurrent
                            ? 'bg-purple-600 border-purple-300 shadow-[0_0_25px_#c084fc] translate-y-0.5'
                            : 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 hover:bg-neutral-800 text-neutral-400 border-neutral-700 shadow-xl'
                        }`}
                      >
                        <span className={`text-[9px] font-bold ${isCurrent ? 'text-white' : 'text-neutral-300'}`}>
                          {blackKey.note}
                        </span>
                        <span className={`text-[8px] font-mono uppercase ${isCurrent ? 'text-purple-200' : 'text-purple-400'}`}>
                          [{blackKey.key}]
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Playable Chords Voicings Rack */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80">
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>ONE-TOUCH CHORDS (Click & Hold or press [1 - 6]):</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl">
                {PIANO_CHORDS.map((chord) => {
                  const isChordActive = chord.notes.every((n) => activeKeys.includes(n));
                  return (
                    <button
                      key={chord.name}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        pressChord(chord);
                      }}
                      onMouseUp={() => releaseChord(chord)}
                      onMouseLeave={() => releaseChord(chord)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        pressChord(chord);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        releaseChord(chord);
                      }}
                      onTouchCancel={() => releaseChord(chord)}
                      className={`group relative px-4 py-2 rounded-xl text-xs font-mono transition-all duration-150 border flex items-center gap-2 ${
                        isChordActive
                          ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105'
                          : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-purple-800/60 hover:text-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded bg-purple-950/80 text-purple-300 text-[10px] font-bold flex items-center justify-center border border-purple-800/40">
                        {chord.numKey}
                      </span>
                      <span className="font-semibold">{chord.symbol}</span>
                      <span className="text-[10px] text-neutral-500 group-hover:text-neutral-400">
                        [{chord.keys.join('+')}]
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] font-mono text-neutral-500 mt-2 text-center">
                ✨ <span className="text-purple-300 font-semibold">Gliding Piano Active</span>: Tap & drag across keys or scroll with your trackpad/mouse to sweep through notes with full grand piano resonance • Physical keyboard keys and chords [1-6] play with identical full intensity.
              </p>
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
