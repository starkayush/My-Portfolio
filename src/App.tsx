import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EngineeringSection } from './components/EngineeringSection';
import { StorytellingSection } from './components/StorytellingSection';
import { GarageSection } from './components/GarageSection';
import { PianoSection } from './components/PianoSection';
import { ContactSection } from './components/ContactSection';

export const App: React.FC = () => {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050508] text-neutral-100 selection:bg-cyan-500 selection:text-black">
      {/* 1. Ultra-Smooth Rolls-Royce Black Badge Gliding Custom Cursor */}
      <CustomCursor />

      {/* 2. Entrance Intro Interface (Press ENTER to launch) */}
      {!isEntered && (
        <IntroScreen onEnter={() => setIsEntered(true)} />
      )}

      {/* 3. Main Portfolio Experience */}
      <div
        className={`transition-all duration-1000 ${
          isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Navbar />
        <main>
          {/* Main B.Tech CSE AI/ML Hero & Highlights */}
          <HeroSection />

          {/* Core Engineering, Systems, Python, AI/ML, Prompting & Hackathons */}
          <EngineeringSection />

          {/* Cinematography & Storytelling by Pictures and Videos */}
          <StorytellingSection />

          {/* Automobile & Engine Compartment: V12 Dyno Lab with Power Start/Stop */}
          <GarageSection />

          {/* Musical Compartment: Dedicated Gliding Interactive Piano & Acoustic Lounge */}
          <PianoSection />

          {/* Dedicated Contact Details (Instagram, LinkedIn, Direct Transmission) */}
          <ContactSection />
        </main>
      </div>
    </div>
  );
};

export default App;
