// Web Audio API Sound Synthesizers (Zero external audio assets required)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * High-performance realistic engine ignition sequence:
 * 1. Starter motor cranking pulses (1.2s)
 * 2. Ignition catch and combustion burst (up to ~3,400 RPM surge)
 * 3. Graceful decrescendo and CLEAN STOP as the engine settles
 */
export function playEngineStartSound(onStart?: () => void, onComplete?: () => void) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    if (onStart) onStart();

    // Master Gain for Engine
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.connect(ctx.destination);

    // Filter to simulate exhaust resonant acoustics
    const exhaustFilter = ctx.createBiquadFilter();
    exhaustFilter.type = 'lowpass';
    exhaustFilter.frequency.setValueAtTime(250, now);
    exhaustFilter.Q.setValueAtTime(3.5, now);
    exhaustFilter.connect(masterGain);

    // 1. STARTER MOTOR CRANK (0 to 1.2s)
    const starterOsc = ctx.createOscillator();
    starterOsc.type = 'sawtooth';
    starterOsc.frequency.setValueAtTime(28, now); // Low starter chug
    starterOsc.frequency.linearRampToValueAtTime(36, now + 1.2);

    const starterGain = ctx.createGain();
    starterGain.gain.setValueAtTime(0.3, now);
    starterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

    starterOsc.connect(starterGain);
    starterGain.connect(exhaustFilter);

    starterOsc.start(now);
    starterOsc.stop(now + 1.3);

    // Starter rapid compression click bursts
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 1.3, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(140, now);
    noiseFilter.Q.setValueAtTime(4.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(exhaustFilter);

    noiseSource.start(now);
    noiseSource.stop(now + 1.3);

    // 2. V12 IGNITION FIRE & SURGE (1.1s to 2.8s)
    const fireTime = now + 1.15;

    // Multi-cylinder harmonic oscillators
    const cyl1 = ctx.createOscillator();
    const cyl2 = ctx.createOscillator();
    const cyl3 = ctx.createOscillator();

    cyl1.type = 'sawtooth';
    cyl2.type = 'triangle';
    cyl3.type = 'sawtooth';

    // Pitch sweep: crank transition -> roar -> idle settling
    cyl1.frequency.setValueAtTime(45, fireTime);
    cyl1.frequency.exponentialRampToValueAtTime(195, fireTime + 0.45); // Roar peak (~3,500 RPM)
    cyl1.frequency.exponentialRampToValueAtTime(70, fireTime + 1.7); // Settling

    cyl2.frequency.setValueAtTime(90, fireTime);
    cyl2.frequency.exponentialRampToValueAtTime(390, fireTime + 0.45);
    cyl2.frequency.exponentialRampToValueAtTime(140, fireTime + 1.7);

    cyl3.frequency.setValueAtTime(22.5, fireTime);
    cyl3.frequency.exponentialRampToValueAtTime(98, fireTime + 0.45);
    cyl3.frequency.exponentialRampToValueAtTime(35, fireTime + 1.7);

    // Dynamic Filter opening during the roar
    exhaustFilter.frequency.setValueAtTime(250, fireTime);
    exhaustFilter.frequency.exponentialRampToValueAtTime(1600, fireTime + 0.4);
    exhaustFilter.frequency.exponentialRampToValueAtTime(280, fireTime + 1.8);

    const combustionGain = ctx.createGain();
    combustionGain.gain.setValueAtTime(0.001, fireTime);
    combustionGain.gain.exponentialRampToValueAtTime(0.75, fireTime + 0.2); // Roar volume
    combustionGain.gain.linearRampToValueAtTime(0.35, fireTime + 1.0);
    // Clean stop as requested by user
    combustionGain.gain.exponentialRampToValueAtTime(0.001, fireTime + 1.85);

    cyl1.connect(combustionGain);
    cyl2.connect(combustionGain);
    cyl3.connect(combustionGain);
    combustionGain.connect(exhaustFilter);

    cyl1.start(fireTime);
    cyl2.start(fireTime);
    cyl3.start(fireTime);

    cyl1.stop(fireTime + 1.9);
    cyl2.stop(fireTime + 1.9);
    cyl3.stop(fireTime + 1.9);

    // Master volume envelope
    masterGain.gain.setValueAtTime(0.4, now);
    masterGain.gain.setValueAtTime(0.7, fireTime);
    masterGain.gain.exponentialRampToValueAtTime(0.001, fireTime + 1.9);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3100);
  } catch (err) {
    console.warn('Web Audio error:', err);
    if (onComplete) onComplete();
  }
}

/**
 * Dynamic Engine Throttle Rev Sound
 * Shares the exact same deep, throaty V12 acoustic voice as the start ignition roar,
 * enhanced with immediate throttle bite, higher rev sweep, and deceleration settling.
 */
export function playEngineRevSound(intensity: number = 1.0) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Master Rev Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(Math.min(0.85 * intensity, 1.0), now + 0.12);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.55);
    masterGain.connect(ctx.destination);

    // Resonant Exhaust Filter (Identical acoustic profile to start sound's combustion chamber)
    const exhaustFilter = ctx.createBiquadFilter();
    exhaustFilter.type = 'lowpass';
    exhaustFilter.Q.setValueAtTime(3.6, now);
    exhaustFilter.frequency.setValueAtTime(260, now);
    exhaustFilter.frequency.exponentialRampToValueAtTime(Math.min(1600 * intensity, 2200), now + 0.35); // Sweeps open during rev
    exhaustFilter.frequency.exponentialRampToValueAtTime(280, now + 1.4); // Settles back down
    exhaustFilter.connect(masterGain);

    // Multi-cylinder harmonic oscillators (exact matching architecture from start sound)
    const cyl1 = ctx.createOscillator();
    const cyl2 = ctx.createOscillator();
    const cyl3 = ctx.createOscillator();

    cyl1.type = 'sawtooth';
    cyl2.type = 'triangle';
    cyl3.type = 'sawtooth';

    // Frequencies: Idle baseline (70Hz) -> Enhanced rev surge (~215Hz-260Hz depending on intensity) -> Settling
    const peakFreq1 = Math.min(220 * intensity, 275);
    const peakFreq2 = peakFreq1 * 2;
    const peakFreq3 = peakFreq1 * 0.5;

    cyl1.frequency.setValueAtTime(70, now);
    cyl1.frequency.exponentialRampToValueAtTime(peakFreq1, now + 0.35);
    cyl1.frequency.exponentialRampToValueAtTime(70, now + 1.4);

    cyl2.frequency.setValueAtTime(140, now);
    cyl2.frequency.exponentialRampToValueAtTime(peakFreq2, now + 0.35);
    cyl2.frequency.exponentialRampToValueAtTime(140, now + 1.4);

    cyl3.frequency.setValueAtTime(35, now);
    cyl3.frequency.exponentialRampToValueAtTime(peakFreq3, now + 0.35);
    cyl3.frequency.exponentialRampToValueAtTime(35, now + 1.4);

    // Combustion gain envelope: instant throttle punch -> sustained roar -> clean stop
    const combustionGain = ctx.createGain();
    combustionGain.gain.setValueAtTime(0.001, now);
    combustionGain.gain.exponentialRampToValueAtTime(0.85, now + 0.15); // Fast throttle catch
    combustionGain.gain.linearRampToValueAtTime(0.35, now + 0.85);
    combustionGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // Clean stop

    cyl1.connect(combustionGain);
    cyl2.connect(combustionGain);
    cyl3.connect(combustionGain);
    combustionGain.connect(exhaustFilter);

    cyl1.start(now);
    cyl2.start(now);
    cyl3.start(now);

    cyl1.stop(now + 1.55);
    cyl2.stop(now + 1.55);
    cyl3.stop(now + 1.55);

    // Subtle turbocharger aerodynamic spool whistle in sync with rev
    const turboOsc = ctx.createOscillator();
    turboOsc.type = 'sine';
    turboOsc.frequency.setValueAtTime(1600, now + 0.05);
    turboOsc.frequency.exponentialRampToValueAtTime(3800 * intensity, now + 0.35);
    turboOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.9);

    const turboGain = ctx.createGain();
    turboGain.gain.setValueAtTime(0.001, now);
    turboGain.gain.linearRampToValueAtTime(0.12 * intensity, now + 0.25);
    turboGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

    turboOsc.connect(turboGain);
    turboGain.connect(masterGain);

    turboOsc.start(now + 0.05);
    turboOsc.stop(now + 1.0);

  } catch (err) {
    console.warn('Web Audio Rev error:', err);
  }
}

/**
 * Rich Polyphonic Grand Piano Synthesizer
 */
export function playPianoKey(freq: number, duration: number = 2.0) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Fundamental & Harmonics
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // Second harmonic

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now); // Third harmonic

    // Piano key hammer strike attack & smooth acoustic decay
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const gain3 = ctx.createGain();

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.45, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.18, now + 0.012);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    gain3.gain.setValueAtTime(0.001, now);
    gain3.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.4);

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    const masterPiano = ctx.createGain();
    masterPiano.gain.value = 0.85;

    gain1.connect(masterPiano);
    gain2.connect(masterPiano);
    gain3.connect(masterPiano);

    // Slight lowpass to give warm wood resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = Math.min(freq * 6, 8000);

    masterPiano.connect(filter);
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  } catch (err) {
    console.warn('Piano audio error:', err);
  }
}

// Standard musical notes frequencies map
export const PIANO_NOTES = [
  { note: 'C4', key: 'A', freq: 261.63, isBlack: false, label: 'Do' },
  { note: 'C#4', key: 'W', freq: 277.18, isBlack: true, label: 'C#' },
  { note: 'D4', key: 'S', freq: 293.66, isBlack: false, label: 'Re' },
  { note: 'D#4', key: 'E', freq: 311.13, isBlack: true, label: 'D#' },
  { note: 'E4', key: 'D', freq: 329.63, isBlack: false, label: 'Mi' },
  { note: 'F4', key: 'F', freq: 349.23, isBlack: false, label: 'Fa' },
  { note: 'F#4', key: 'T', freq: 369.99, isBlack: true, label: 'F#' },
  { note: 'G4', key: 'G', freq: 392.00, isBlack: false, label: 'Sol' },
  { note: 'G#4', key: 'Y', freq: 415.30, isBlack: true, label: 'G#' },
  { note: 'A4', key: 'H', freq: 440.00, isBlack: false, label: 'La' },
  { note: 'A#4', key: 'U', freq: 466.16, isBlack: true, label: 'A#' },
  { note: 'B4', key: 'J', freq: 493.88, isBlack: false, label: 'Si' },
  { note: 'C5', key: 'K', freq: 523.25, isBlack: false, label: 'Do' },
  { note: 'C#5', key: 'O', freq: 554.37, isBlack: true, label: 'C#' },
  { note: 'D5', key: 'L', freq: 587.33, isBlack: false, label: 'Re' },
  { note: 'D#5', key: 'P', freq: 622.25, isBlack: true, label: 'D#' },
  { note: 'E5', key: ';', freq: 659.25, isBlack: false, label: 'Mi' },
];
