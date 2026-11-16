import React, { useState } from 'react';
import { 
  Gauge, 
  Flame, 
  Zap, 
  Sliders, 
  Activity, 
  RotateCcw, 
  CheckCircle, 
  ShieldAlert,
  ArrowUpRight,
  Radio
} from 'lucide-react';
import { playEngineStartSound } from '../utils/audio';

export const GarageSection: React.FC = () => {
  const [isIgnited, setIsIgnited] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [currentRpm, setCurrentRpm] = useState(850);
  const [activeTuningTab, setActiveTuningTab] = useState<'ecu' | 'components' | 'driving'>('ecu');
  const [ecuStage, setEcuStage] = useState<'stage1' | 'stage2' | 'track'>('stage2');

  const handleToggleEngine = () => {
    if (isStarting) return;

    if (!isIgnited) {
      // Start ignition sequence with Web Audio
      setIsStarting(true);
      playEngineStartSound(
        () => {
          // Crank begins
        },
        () => {
          // Engine has started and sound has cleanly stopped
          setIsStarting(false);
          setIsIgnited(true);
          setCurrentRpm(1100);
        }
      );
    } else {
      // Turn off
      setIsIgnited(false);
      setCurrentRpm(0);
    }
  };

  const handleQuickRev = () => {
    if (!isIgnited) return;
    setCurrentRpm(6800);
    setTimeout(() => {
      setCurrentRpm(1100);
    }, 700);
  };

  return (
    <section id="garage" className="py-24 px-6 relative bg-[#06070a] border-t border-red-950/40 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1f0808_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-red-500 uppercase mb-3">
              <Flame className="w-3.5 h-3.5" />
              Automotive Engineering & Passion
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-['Cinzel',serif] tracking-wider">
              The Dyno Lab & Garage
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Car segment fanatic, ECU remapping enthusiast, and automotive component tuner.
            Fascinated by mechanical precision, apex dynamics, and internal combustion engines.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 1. POWER START / STOP IGNITION CONSOLE */}
        {/* ============================================================== */}
        <div className="mb-14 p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          {/* Carbon Fiber Background overlay */}
          <div className="absolute inset-0 bg-carbon-pattern opacity-60 pointer-events-none" />

          {/* Engine Status Top Pill */}
          <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 mb-8 backdrop-blur-md">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isStarting
                  ? 'bg-amber-400 animate-ping shadow-[0_0_12px_#fbbf24]'
                  : isIgnited
                  ? 'bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]'
                  : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
              }`}
            />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
              {isStarting
                ? 'CRANKING STARTER MOTOR...'
                : isIgnited
                ? 'V12 ENGINE ACTIVE • TELEMETRY ONLINE'
                : 'ENGINE STANDBY • PRESS START TO ACTIVATE'}
            </span>
          </div>

          {/* The Billet Aluminum Start / Stop Button */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative group">
              {/* Pulsing Outer Ring Glow */}
              <div
                className={`absolute -inset-4 rounded-full blur-xl transition-opacity duration-700 pointer-events-none ${
                  isIgnited
                    ? 'bg-red-600/40 opacity-90'
                    : isStarting
                    ? 'bg-amber-500/60 opacity-100 animate-pulse'
                    : 'bg-red-600/20 opacity-40 group-hover:opacity-75'
                }`}
              />

              {/* Bezel Ring */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2.5 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black border-2 border-neutral-600/60 shadow-2xl flex items-center justify-center">
                <button
                  onClick={handleToggleEngine}
                  disabled={isStarting}
                  data-cursor="engine"
                  className={`w-full h-full rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 border ${
                    isIgnited
                      ? 'bg-gradient-to-br from-red-600 to-red-950 border-red-400 text-white shadow-[inset_0_2px_8px_rgba(255,255,255,0.4)]'
                      : isStarting
                      ? 'bg-gradient-to-br from-amber-600 to-amber-950 border-amber-400 text-white animate-pulse'
                      : 'bg-gradient-to-br from-neutral-800 to-neutral-950 border-red-500/50 text-neutral-200 hover:border-red-400 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    POWER
                  </span>
                  <span className="text-sm sm:text-base font-extrabold font-['Cinzel',serif] tracking-wider uppercase my-0.5">
                    {isStarting ? 'IGNITING' : isIgnited ? 'STOP' : 'START'}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                    ENGINE
                  </span>
                </button>
              </div>
            </div>

            <p className="mt-5 text-xs text-neutral-400 font-mono tracking-wider">
              {isIgnited
                ? 'Engine running in dyno test cell. Sound stops cleanly upon ignition.'
                : 'Click button to crank and fire the internal combustion engine'}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. DYNAMIC TELEMETRY & TUNING COMPARTMENTS */}
        {/* ============================================================== */}
        <div
          className={`transition-all duration-700 ${
            isIgnited
              ? 'opacity-100 translate-y-0'
              : 'opacity-50 blur-[1px] pointer-events-none'
          }`}
        >
          {/* Live Dyno Gauges Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {/* RPM Meter */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>TACHOMETER</span>
                <span className="text-red-400">REDLINE 8500</span>
              </div>
              <div className="text-3xl font-black font-mono text-white mb-1">
                {currentRpm.toLocaleString()} <span className="text-xs text-neutral-500 font-normal">RPM</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min((currentRpm / 8500) * 100, 100)}%` }}
                />
              </div>
              {isIgnited && (
                <button
                  onClick={handleQuickRev}
                  className="mt-3 text-[10px] font-mono tracking-wider uppercase text-cyan-400 hover:text-cyan-300 underline"
                >
                  [ Tap to Rev Engine ]
                </button>
              )}
            </div>

            {/* Boost Pressure */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-xs font-mono text-neutral-400 mb-2">TURBO BOOST</div>
              <div className="text-3xl font-black font-mono text-cyan-400 mb-1">
                {ecuStage === 'stage1' ? '1.4' : ecuStage === 'stage2' ? '1.9' : '2.4'}{' '}
                <span className="text-xs text-neutral-500 font-normal">BAR</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2">Twin-scroll twin-turbo spool</div>
            </div>

            {/* Air-Fuel Ratio (AFR) */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-xs font-mono text-neutral-400 mb-2">WIDEBAND AFR</div>
              <div className="text-3xl font-black font-mono text-amber-400 mb-1">
                12.4 <span className="text-xs text-neutral-500 font-normal">: 1</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2">Stoichiometric high-load trim</div>
            </div>

            {/* Oil & Coolant Temp */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-xs font-mono text-neutral-400 mb-2">OIL / COOLANT</div>
              <div className="text-3xl font-black font-mono text-emerald-400 mb-1">
                94° <span className="text-xs text-neutral-500 font-normal">CELSIUS</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2">Optimal operating temperature</div>
            </div>
          </div>

          {/* Compartment Tabs: ECU Tuning / Component Tuning / Driving Passion */}
          <div className="flex border-b border-neutral-800 mb-8">
            <button
              onClick={() => setActiveTuningTab('ecu')}
              className={`pb-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors relative ${
                activeTuningTab === 'ecu'
                  ? 'text-red-400 border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              ECU Remapping & Maps
            </button>
            <button
              onClick={() => setActiveTuningTab('components')}
              className={`pb-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors relative ${
                activeTuningTab === 'components'
                  ? 'text-red-400 border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Component Tuning
            </button>
            <button
              onClick={() => setActiveTuningTab('driving')}
              className={`pb-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors relative ${
                activeTuningTab === 'driving'
                  ? 'text-red-400 border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Driving Soul & Passion
            </button>
          </div>

          {/* TAB 1: ECU REMAPPING */}
          {activeTuningTab === 'ecu' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Selector */}
              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                  SELECT FLASH MAP
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'stage1', name: 'Stage 1 OEM+', hp: '+45 HP', torque: '+65 Nm' },
                    { id: 'stage2', name: 'Stage 2 Aggressive', hp: '+95 HP', torque: '+140 Nm' },
                    { id: 'track', name: 'Track Dyno Unlocked', hp: '+150 HP', torque: '+210 Nm' },
                  ].map((map) => (
                    <button
                      key={map.id}
                      onClick={() => setEcuStage(map.id as any)}
                      className={`w-full p-4 rounded-xl text-left border transition-all ${
                        ecuStage === map.id
                          ? 'border-red-500 bg-red-950/30 shadow-lg'
                          : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm text-white mb-1">
                        <span>{map.name}</span>
                        <span className="text-red-400 font-mono text-xs">{map.hp}</span>
                      </div>
                      <div className="text-xs text-neutral-400">Torque boost: {map.torque}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ECU Parameter Matrix */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    ACTIVE PARAMETER CALIBRATION
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                    CHECKSUM VALIDATED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/50 border border-neutral-800">
                    <div className="text-xs text-neutral-400 mb-1">Ignition Timing Advance</div>
                    <div className="text-lg font-bold font-mono text-white">+5.2° BTDC</div>
                    <p className="text-[11px] text-neutral-500 mt-1">Calibrated to prevent pre-ignition knock at high boost</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-neutral-800">
                    <div className="text-xs text-neutral-400 mb-1">Variable Valve Timing (VVT)</div>
                    <div className="text-lg font-bold font-mono text-white">Aggressive Overlap</div>
                    <p className="text-[11px] text-neutral-500 mt-1">Optimized scavenge velocity across top RPM band</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-neutral-800">
                    <div className="text-xs text-neutral-400 mb-1">Throttle Map Sensitivity</div>
                    <div className="text-lg font-bold font-mono text-white">1:1 Linear Sport</div>
                    <p className="text-[11px] text-neutral-500 mt-1">Eliminates drive-by-wire latency for instant throttle response</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-neutral-800">
                    <div className="text-xs text-neutral-400 mb-1">Speed Limiter & Burble Map</div>
                    <div className="text-lg font-bold font-mono text-white">Unrestricted + Pop/Overrun</div>
                    <p className="text-[11px] text-neutral-500 mt-1">Clean deceleration burble with catalytic protection</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPONENT TUNING */}
          {activeTuningTab === 'components' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">FORCED INDUCTION</div>
                <h4 className="text-base font-bold text-white mb-2">Turbocharger Spool & Wastegates</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Analyzing compressor maps, A/R ratios, ceramic ball bearings, and electronic wastegate duty cycles to maximize volumetric efficiency without turbo lag.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">CHASSIS & CORNERING</div>
                <h4 className="text-base font-bold text-white mb-2">Suspension Geometry & Damping</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Camber, caster, toe alignment, and coilover rebound/compression tuning to dial in razor-sharp turn-in authority and eliminate understeer.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">POWERTRAIN HARDWARE</div>
                <h4 className="text-base font-bold text-white mb-2">Forged Internals & Exhaust Flow</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  High-flow catalytic converters, equal-length headers for harmonic exhaust scavenging, forged connecting rods, and uprated injectors.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: DRIVING SOUL & PASSION */}
          {activeTuningTab === 'driving' && (
            <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 relative">
              <h3 className="text-2xl font-bold font-['Cinzel',serif] text-white mb-4">
                The Anatomy of Pure Driving Passion
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-3xl mb-4">
                "Driving is not merely commuting; it is an intimate conversation between human senses and mechanical engineering."
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-3xl mb-6">
                From feeling tire slip angles through the chassis to executing rev-matched downshifts, understanding how every valve, piston, and differential behaves under load turns driving into an art form. My curiosity for cars fuels my problem-solving in computing systems—both demand deep respect for architecture, tolerances, and responsiveness.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-neutral-400">
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Mechanical Empathy</span>
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Apex Precision</span>
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Naturally Aspirated & Twin-Turbo</span>
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Telemetry Analysis</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
