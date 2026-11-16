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
import { playEngineStartSound, playEngineRevSound } from '../utils/audio';

export const GarageSection: React.FC = () => {
  const [isIgnited, setIsIgnited] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isRevving, setIsRevving] = useState(false);
  const [currentRpm, setCurrentRpm] = useState(850);
  const [activeTuningTab, setActiveTuningTab] = useState<'ecu' | 'components' | 'driving'>('ecu');
  const [ecuStage, setEcuStage] = useState<'stage1' | 'stage2' | 'track'>('stage2');

  const getStagePeakRpm = (stage: 'stage1' | 'stage2' | 'track') => {
    return stage === 'stage1' ? 7200 : stage === 'stage2' ? 7900 : 8500;
  };

  const getStageIdleRpm = (stage: 'stage1' | 'stage2' | 'track') => {
    return stage === 'stage1' ? 950 : stage === 'stage2' ? 1050 : 1150;
  };

  const getBaseBoost = (stage: 'stage1' | 'stage2' | 'track') => {
    return stage === 'stage1' ? 0.3 : stage === 'stage2' ? 0.4 : 0.5;
  };

  const getPeakBoost = (stage: 'stage1' | 'stage2' | 'track') => {
    return stage === 'stage1' ? 1.6 : stage === 'stage2' ? 2.2 : 2.9;
  };

  const getStageIntensity = (stage: 'stage1' | 'stage2' | 'track') => {
    return stage === 'stage1' ? 1.0 : stage === 'stage2' ? 1.18 : 1.38;
  };

  const getPowerAfr = (stage: 'stage1' | 'stage2' | 'track') => {
    return stage === 'stage1' ? 12.4 : stage === 'stage2' ? 11.8 : 11.2;
  };

  const getStageTorque = (stage: 'stage1' | 'stage2' | 'track', isRev: boolean) => {
    if (!isRev) {
      return stage === 'stage1' ? 75 : stage === 'stage2' ? 90 : 110;
    }
    return stage === 'stage1' ? 783 : stage === 'stage2' ? 858 : 928;
  };

  const getStageHp = (stage: 'stage1' | 'stage2' | 'track', isRev: boolean) => {
    if (!isRev) {
      return stage === 'stage1' ? 32 : stage === 'stage2' ? 38 : 45;
    }
    return stage === 'stage1' ? 845 : stage === 'stage2' ? 895 : 950;
  };

  const [currentBoost, setCurrentBoost] = useState(0.4);
  const [currentTorque, setCurrentTorque] = useState(90);
  const [currentHp, setCurrentHp] = useState(38);
  const [currentAfr, setCurrentAfr] = useState(14.7);
  const [afrState, setAfrState] = useState<'stoich' | 'rich' | 'lean'>('stoich');

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
          setCurrentRpm(getStageIdleRpm(ecuStage));
          setCurrentBoost(getBaseBoost(ecuStage));
          setCurrentTorque(getStageTorque(ecuStage, false));
          setCurrentHp(getStageHp(ecuStage, false));
          setCurrentAfr(14.7);
          setAfrState('stoich');
        }
      );
    } else {
      // Turn off
      setIsIgnited(false);
      setCurrentRpm(0);
      setCurrentBoost(0.0);
      setCurrentTorque(0);
      setCurrentHp(0);
      setCurrentAfr(0);
      setAfrState('stoich');
    }
  };

  const handleSelectStage = (stage: 'stage1' | 'stage2' | 'track') => {
    setEcuStage(stage);
    if (isIgnited && !isRevving) {
      setCurrentRpm(getStageIdleRpm(stage));
      setCurrentBoost(getBaseBoost(stage));
      setCurrentTorque(getStageTorque(stage, false));
      setCurrentHp(getStageHp(stage, false));
    }
  };

  const handleQuickRev = () => {
    if (!isIgnited || isRevving) return;
    setIsRevving(true);

    // Play enhanced matching engine rev sound scaled to current stage
    const intensity = getStageIntensity(ecuStage);
    playEngineRevSound(intensity);

    const peakRpm = getStagePeakRpm(ecuStage);
    const peakBoost = getPeakBoost(ecuStage);
    const peakTorque = getStageTorque(ecuStage, true);
    const peakHp = getStageHp(ecuStage, true);
    const powerAfr = getPowerAfr(ecuStage);

    // Initial rev surge: RPM shoots up to stage peak, boost spools, torque climbs, AFR enriches
    setCurrentRpm(peakRpm);
    setCurrentBoost(peakBoost);
    setCurrentTorque(peakTorque);
    setCurrentHp(peakHp);
    setCurrentAfr(powerAfr);
    setAfrState('rich');

    // On throttle lift (~550ms): Overrun fuel cutoff causes momentary lean sweep
    setTimeout(() => {
      setCurrentAfr(17.4);
      setAfrState('lean');
    }, 550);

    // Return cleanly to idle specifications for this stage
    setTimeout(() => {
      setCurrentRpm(getStageIdleRpm(ecuStage));
      setCurrentBoost(getBaseBoost(ecuStage));
      setCurrentTorque(getStageTorque(ecuStage, false));
      setCurrentHp(getStageHp(ecuStage, false));
      setCurrentAfr(14.7);
      setAfrState('stoich');
      setIsRevving(false);
    }, 950);
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
              Automotive Engineering & Curiosity
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-['Cinzel',serif] tracking-wider">
              The Dyno Lab & Garage
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Car segment fanatic, ECU remapping and  automotive component tuning enthusiast . Fascinated by mechanical precision, apex dynamics, and internal combustion engines.
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
          {/* Live Dyno Gauges Strip (5 Comprehensive Telemetry Meters) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {/* RPM Meter */}
            <div className={`p-5 rounded-2xl bg-neutral-900/60 border transition-all duration-300 relative overflow-hidden ${
              isRevving ? 'border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.3)]' : 'border-neutral-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>TACHOMETER</span>
                <span className={isRevving ? 'text-red-400 font-bold animate-pulse text-[10px]' : 'text-red-400 text-[10px]'}>
                  {isRevving ? '🔥 SURGING TO REDLINE' : `LIMIT ${getStagePeakRpm(ecuStage)}`}
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-white mb-1">
                {currentRpm.toLocaleString()} <span className="text-xs text-neutral-500 font-normal">RPM</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 h-full transition-all duration-200"
                  style={{ width: `${Math.min((currentRpm / 8500) * 100, 100)}%` }}
                />
              </div>
              {isIgnited && (
                <button
                  onClick={handleQuickRev}
                  disabled={isRevving}
                  data-cursor="engine"
                  className={`mt-3 w-full py-2 px-3 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                    isRevving
                      ? 'bg-red-950/80 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-[0.98]'
                      : 'bg-neutral-800/80 hover:bg-neutral-700/80 border-neutral-700 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 shadow-sm'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${isRevving ? 'text-red-400 animate-bounce' : 'text-cyan-400'}`} />
                  <span>{isRevving ? 'Engine Revving...' : 'Tap to Rev Engine'}</span>
                </button>
              )}
            </div>

            {/* Boost Pressure */}
            <div className={`p-5 rounded-2xl bg-neutral-900/60 border transition-all duration-300 relative overflow-hidden ${
              isRevving ? 'border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.25)]' : 'border-neutral-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>TURBO BOOST</span>
                <span className={isRevving ? 'text-cyan-400 font-bold animate-pulse text-[10px]' : 'text-neutral-500 text-[10px]'}>
                  {isRevving ? '⚡ SPOOLING / PEAK' : 'TWIN-SCROLL'}
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-cyan-400 mb-1 flex items-baseline gap-1">
                <span>{isIgnited ? currentBoost.toFixed(1) : '0.0'}</span>
                <span className="text-xs text-neutral-500 font-normal">BAR</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full transition-all duration-200"
                  style={{ width: `${Math.min((currentBoost / 3.0) * 100, 100)}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 mt-3">
                {isRevving ? 'Overboost spooling under throttle load' : 'Twin-scroll twin-turbo spool'}
              </div>
            </div>

            {/* Torque & Power Dyno Meter */}
            <div className={`p-5 rounded-2xl bg-neutral-900/60 border transition-all duration-300 relative overflow-hidden ${
              isRevving ? 'border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.25)]' : 'border-neutral-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>TORQUE OUTPUT</span>
                <span className={isRevving ? 'text-amber-400 font-bold animate-pulse text-[10px]' : 'text-neutral-500 text-[10px]'}>
                  {isRevving ? `⚡ +${ecuStage === 'stage1' ? '65' : ecuStage === 'stage2' ? '140' : '210'} Nm GAIN` : 'DYNO TORQUE'}
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-amber-400 mb-1 flex items-baseline gap-1">
                <span>{isIgnited ? currentTorque : '0'}</span>
                <span className="text-xs text-neutral-500 font-normal">Nm</span>
                {isIgnited && (
                  <span className="text-xs font-mono text-neutral-400 ml-1">
                    ({currentHp} HP)
                  </span>
                )}
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-full transition-all duration-200"
                  style={{ width: `${Math.min((currentTorque / 1000) * 100, 100)}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 mt-3">
                {isRevving
                  ? `${ecuStage === 'stage1' ? 'Stage 1 OEM+' : ecuStage === 'stage2' ? 'Stage 2 High-Flow' : 'Track Dyno Unlocked'} peak output`
                  : 'Parasitic idle torque baseline'}
              </div>
            </div>

            {/* Air-Fuel Ratio (AFR) */}
            <div className={`p-5 rounded-2xl bg-neutral-900/60 border transition-all duration-300 relative overflow-hidden ${
              !isIgnited
                ? 'border-neutral-800'
                : afrState === 'rich'
                ? 'border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                : afrState === 'lean'
                ? 'border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                : 'border-emerald-500/40'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>WIDEBAND AFR</span>
                <span className={`text-[10px] font-bold ${
                  !isIgnited
                    ? 'text-neutral-500'
                    : afrState === 'rich'
                    ? 'text-amber-400 animate-pulse'
                    : afrState === 'lean'
                    ? 'text-blue-400'
                    : 'text-emerald-400'
                }`}>
                  {!isIgnited
                    ? 'STANDBY'
                    : afrState === 'rich'
                    ? '⚡ POWER ENRICHMENT'
                    : afrState === 'lean'
                    ? 'OVERRUN CUT-OFF'
                    : 'STOICH (λ=1.0)'}
                </span>
              </div>
              <div className={`text-3xl font-black font-mono mb-1 flex items-baseline gap-1 ${
                !isIgnited
                  ? 'text-neutral-500'
                  : afrState === 'rich'
                  ? 'text-amber-400'
                  : afrState === 'lean'
                  ? 'text-blue-400'
                  : 'text-emerald-400'
              }`}>
                <span>{isIgnited ? currentAfr.toFixed(1) : '--.-'}</span>
                <span className="text-xs text-neutral-500 font-normal">: 1</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full transition-all duration-200 ${
                    !isIgnited
                      ? 'bg-neutral-700 w-0'
                      : afrState === 'rich'
                      ? 'bg-amber-400'
                      : afrState === 'lean'
                      ? 'bg-blue-400'
                      : 'bg-emerald-400'
                  }`}
                  style={{
                    width: isIgnited
                      ? `${Math.min(Math.max(((20 - currentAfr) / (20 - 10)) * 100, 10), 100)}%`
                      : '0%',
                  }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 mt-3">
                {!isIgnited
                  ? 'Bosch LSU 4.9 sensor standby'
                  : afrState === 'rich'
                  ? 'WOT power enrichment for peak cylinder torque'
                  : afrState === 'lean'
                  ? 'Fuel overrun cutoff on deceleration'
                  : 'Closed-loop stoichiometric lambda 1.0 trim'}
              </div>
            </div>

            {/* Oil & Coolant Temp */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-xs font-mono text-neutral-400 mb-2">OIL / COOLANT</div>
              <div className="text-3xl font-black font-mono text-emerald-400 mb-1">
                94° <span className="text-xs text-neutral-500 font-normal">CELSIUS</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-emerald-400 h-full"
                  style={{ width: isIgnited ? '72%' : '0%' }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 mt-3">Optimal operating temperature</div>
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
                      onClick={() => handleSelectStage(map.id as any)}
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
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isRevving ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    <span>ACTIVE PARAMETER CALIBRATION</span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors ${
                    isRevving
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 animate-pulse'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                  }`}>
                    {isRevving ? '⚡ DYNAMIC LOAD DETECTED' : 'CHECKSUM VALIDATED'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl bg-black/50 border transition-all duration-200 ${
                    isRevving ? 'border-amber-500/60 bg-amber-950/20 shadow-md' : 'border-neutral-800'
                  }`}>
                    <div className="text-xs text-neutral-400 mb-1">Ignition Timing Advance</div>
                    <div className="text-lg font-bold font-mono text-white">
                      {!isIgnited
                        ? '--.-° BTDC'
                        : isRevving
                        ? (ecuStage === 'stage1' ? '+24.5° BTDC' : ecuStage === 'stage2' ? '+28.2° BTDC' : '+33.0° BTDC')
                        : '+12.0° BTDC'}
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {isRevving
                        ? 'Advancing ignition spark for maximum cylinder flame velocity'
                        : 'Calibrated base idle timing table with anti-knock guard'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl bg-black/50 border transition-all duration-200 ${
                    isRevving ? 'border-cyan-500/60 bg-cyan-950/20 shadow-md' : 'border-neutral-800'
                  }`}>
                    <div className="text-xs text-neutral-400 mb-1">Variable Valve Timing (VVT)</div>
                    <div className="text-lg font-bold font-mono text-white">
                      {!isIgnited
                        ? 'OFFLINE'
                        : isRevving
                        ? (ecuStage === 'stage1' ? '+18.0° Overlap' : ecuStage === 'stage2' ? '+26.5° Overlap' : '+34.0° Extreme Overlap')
                        : '0.0° Neutral Cam Phase'}
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {isRevving
                        ? 'Aggressive cam overlap scavenging exhaust pulse under high boost'
                        : 'Optimized idle emissions and smooth idle combustion profile'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl bg-black/50 border transition-all duration-200 ${
                    isRevving ? 'border-purple-500/60 bg-purple-950/20 shadow-md' : 'border-neutral-800'
                  }`}>
                    <div className="text-xs text-neutral-400 mb-1">Throttle & Injector Duty (IDC)</div>
                    <div className="text-lg font-bold font-mono text-white">
                      {!isIgnited
                        ? '0.0% IDC'
                        : isRevving
                        ? (ecuStage === 'stage1' ? '72.4% IDC (14.8ms)' : ecuStage === 'stage2' ? '84.6% IDC (17.2ms)' : '94.8% IDC (20.4ms)')
                        : '2.4% IDC (1.1ms)'}
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {isRevving
                        ? 'Wide-open throttle high-flow injection delivering peak mass flow'
                        : 'Linear drive-by-wire calibration with instant off-idle response'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl bg-black/50 border transition-all duration-200 ${
                    isRevving ? 'border-red-500/60 bg-red-950/20 shadow-md' : 'border-neutral-800'
                  }`}>
                    <div className="text-xs text-neutral-400 mb-1">Cylinder Combustion Load (BMEP)</div>
                    <div className="text-lg font-bold font-mono text-white">
                      {!isIgnited
                        ? '0.0 BAR BMEP'
                        : isRevving
                        ? (ecuStage === 'stage1' ? '21.5 BAR BMEP' : ecuStage === 'stage2' ? '26.8 BAR BMEP' : '32.4 BAR BMEP')
                        : '1.8 BAR BMEP'}
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {isRevving
                        ? '🔥 Active overrun burble, pops & flame map active on decel'
                        : 'Clean deceleration overrun with catalytic thermal protection'}
                    </p>
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
