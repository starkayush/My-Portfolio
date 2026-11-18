// Web Audio API Sound Synthesizers (Zero external audio assets required)

let audioCtx: AudioContext | null = null;
let pianoCompressor: DynamicsCompressorNode | null = null;

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

function getPianoCompressor(ctx: AudioContext): DynamicsCompressorNode {
  if (!pianoCompressor || pianoCompressor.context !== ctx) {
    pianoCompressor = ctx.createDynamicsCompressor();
    pianoCompressor.threshold.setValueAtTime(-14, ctx.currentTime);
    pianoCompressor.knee.setValueAtTime(30, ctx.currentTime);
    pianoCompressor.ratio.setValueAtTime(10, ctx.currentTime);
    pianoCompressor.attack.setValueAtTime(0.003, ctx.currentTime);
    pianoCompressor.release.setValueAtTime(0.2, ctx.currentTime);
    pianoCompressor.connect(ctx.destination);
  }
  return pianoCompressor;
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
 * Concert Grand Piano Synthesizer with Physical String Acoustics:
 * - Percussive felt-hammer strike transient (12ms mechanical impact knock)
 * - Triple-string unison detuning (crystalline acoustic depth & singing chorusing)
 * - Inharmonic string partials with rapid high-frequency energy dissipation (eliminates reed/harmonium buzz)
 * - Dynamic timbre envelope (hammer strike opens bright, swiftly mellows into warm resonant tone)
 * - Soundboard spruce wood acoustic resonance chamber
 * - Smooth felt-damper key release
 */
export function playPianoKey(freq: number, duration: number = 2.8): () => void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const compressor = getPianoCompressor(ctx);

    // Master Piano Voice Gain
    const voiceGain = ctx.createGain();
    voiceGain.gain.setValueAtTime(0.85, now);

    // 1. SOUNDBOARD RESONANCE FILTER (Simulates spruce wooden soundboard body ~340Hz)
    const soundboardFilter = ctx.createBiquadFilter();
    soundboardFilter.type = 'peaking';
    soundboardFilter.frequency.setValueAtTime(340, now);
    soundboardFilter.Q.setValueAtTime(1.3, now);
    soundboardFilter.gain.setValueAtTime(3.5, now);

    // 2. DYNAMIC TIMBRAL LOWPASS FILTER (Bright attack -> warm woody body decay)
    const timberFilter = ctx.createBiquadFilter();
    timberFilter.type = 'lowpass';
    timberFilter.Q.setValueAtTime(1.1, now);
    const initialCutoff = Math.min(freq * 7.5, 7500);
    const settledCutoff = Math.min(freq * 2.2, 1800);
    timberFilter.frequency.setValueAtTime(initialCutoff, now);
    timberFilter.frequency.exponentialRampToValueAtTime(settledCutoff, now + 0.18);

    voiceGain.connect(soundboardFilter);
    soundboardFilter.connect(timberFilter);
    timberFilter.connect(compressor);

    const activeNodes: (AudioNode & { stop?: (when?: number) => void })[] = [];

    // 3. MECHANICAL HAMMER STRIKE TRANSIENT (Felt & Wood Thud - 12ms impulse)
    // Hammer click oscillator (rapid pitch drop: 280Hz -> 45Hz)
    const hammerOsc = ctx.createOscillator();
    hammerOsc.type = 'sine';
    hammerOsc.frequency.setValueAtTime(Math.min(freq * 1.5, 320), now);
    hammerOsc.frequency.exponentialRampToValueAtTime(45, now + 0.015);

    const hammerGain = ctx.createGain();
    hammerGain.gain.setValueAtTime(0.24, now);
    hammerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

    hammerOsc.connect(hammerGain);
    hammerGain.connect(voiceGain);
    hammerOsc.start(now);
    hammerOsc.stop(now + 0.02);
    activeNodes.push(hammerOsc);

    // 4. TRIPLE UNISON STRINGS (Natural Chorus & Acoustic Breadth)
    // String A: Center pitch
    const str1 = ctx.createOscillator();
    str1.type = 'sine';
    str1.frequency.setValueAtTime(freq, now);

    const str1Gain = ctx.createGain();
    str1Gain.gain.setValueAtTime(0.001, now);
    str1Gain.gain.linearRampToValueAtTime(0.38, now + 0.005);
    str1Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    str1.connect(str1Gain);
    str1Gain.connect(voiceGain);
    str1.start(now);
    str1.stop(now + duration);
    activeNodes.push(str1);

    // String B: Subtle sharp unison (+1.2 cents)
    const str2 = ctx.createOscillator();
    str2.type = 'sine';
    str2.frequency.setValueAtTime(freq * 1.0007, now);

    const str2Gain = ctx.createGain();
    str2Gain.gain.setValueAtTime(0.001, now);
    str2Gain.gain.linearRampToValueAtTime(0.20, now + 0.005);
    str2Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.95);
    str2.connect(str2Gain);
    str2Gain.connect(voiceGain);
    str2.start(now);
    str2.stop(now + duration);
    activeNodes.push(str2);

    // String C: Subtle flat unison (-1.2 cents)
    const str3 = ctx.createOscillator();
    str3.type = 'sine';
    str3.frequency.setValueAtTime(freq * 0.9993, now);

    const str3Gain = ctx.createGain();
    str3Gain.gain.setValueAtTime(0.001, now);
    str3Gain.gain.linearRampToValueAtTime(0.20, now + 0.005);
    str3Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.95);
    str3.connect(str3Gain);
    str3Gain.connect(voiceGain);
    str3.start(now);
    str3.stop(now + duration);
    activeNodes.push(str3);

    // 5. INHARMONIC OVERTONES (Fast-decaying crystalline string partials)
    // 2nd Harmonic (slight inharmonicity factor: x2.002)
    const harm2 = ctx.createOscillator();
    harm2.type = 'sine';
    harm2.frequency.setValueAtTime(freq * 2.002, now);

    const harm2Gain = ctx.createGain();
    harm2Gain.gain.setValueAtTime(0.001, now);
    harm2Gain.gain.linearRampToValueAtTime(0.14, now + 0.004);
    harm2Gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(duration * 0.55, 1.2));
    harm2.connect(harm2Gain);
    harm2Gain.connect(voiceGain);
    harm2.start(now);
    harm2.stop(now + duration);
    activeNodes.push(harm2);

    // 3rd Harmonic (fast decay: dies in ~0.35s)
    const harm3 = ctx.createOscillator();
    harm3.type = 'sine';
    harm3.frequency.setValueAtTime(freq * 3.006, now);

    const harm3Gain = ctx.createGain();
    harm3Gain.gain.setValueAtTime(0.001, now);
    harm3Gain.gain.linearRampToValueAtTime(0.06, now + 0.003);
    harm3Gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    harm3.connect(harm3Gain);
    harm3Gain.connect(voiceGain);
    harm3.start(now);
    harm3.stop(now + 0.4);
    activeNodes.push(harm3);

    // 6. FELT DAMPER RELEASE (When user lifts key or mouse)
    let isReleased = false;
    return () => {
      if (isReleased) return;
      isReleased = true;
      try {
        const releaseNow = ctx.currentTime;
        voiceGain.gain.cancelScheduledValues(releaseNow);
        voiceGain.gain.setValueAtTime(voiceGain.gain.value, releaseNow);
        // Smooth acoustic damper dampens the vibrating strings over 140ms
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, releaseNow + 0.14);
        setTimeout(() => {
          activeNodes.forEach((node) => {
            try {
              if (node.stop) node.stop();
              node.disconnect();
            } catch {}
          });
        }, 160);
      } catch {}
    };
  } catch (err) {
    console.warn('Piano audio error:', err);
    return () => {};
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
