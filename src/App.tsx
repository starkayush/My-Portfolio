import React, { useState, useEffect } from 'react';
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

  // Disable page scrolling while on the Intro/Enter screen, enable once entered
  useEffect(() => {
    if (!isEntered) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isEntered]);

  return (
    <div
      className={`relative ${
        isEntered ? 'min-h-screen' : 'h-screen max-h-screen overflow-hidden'
      } bg-[#050508] text-neutral-100 selection:bg-cyan-500 selection:text-black`}
    >
      {/* 1. Ultra-Smooth Rolls-Royce Black Badge Gliding Custom Cursor */}
      <CustomCursor />

      {/* 2. Entrance Intro Interface (Press ENTER to launch) */}
      {!isEntered && (
        <IntroScreen onEnter={() => setIsEntered(true)} />
      )}

      {/* 3. Main Portfolio Experience */}
      <div
        className={`transition-all duration-1000 ${
          isEntered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none h-0 max-h-0 overflow-hidden'
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
