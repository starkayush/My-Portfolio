import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Gauge, Music, Mail, Film, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'AI & Engineering', href: '#engineering', icon: Cpu },
    { label: 'Storytelling', href: '#cinematography', icon: Film },
    { label: 'The Garage', href: '#garage', icon: Gauge, badge: 'V12' },
    { label: 'Piano Lounge', href: '#music', icon: Music },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050508]/85 backdrop-blur-md border-b border-neutral-800/60 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          data-cursor="view"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-700/80 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <span className="font-['Cinzel',serif] text-xs font-bold text-neutral-200 group-hover:text-cyan-400">
              AA
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider font-['Cinzel',serif] uppercase text-white group-hover:text-neutral-200">
              Ayush Anand
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400">
              CSE • AI / ML
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/40 border border-neutral-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                data-cursor="link"
                className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white transition-all duration-200 hover:bg-white/5 flex items-center gap-1.5 group"
              >
                <Icon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950/80 text-red-400 border border-red-800/40 font-mono font-bold">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA - Let's Talk */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            data-cursor="link"
            className="text-xs uppercase font-mono tracking-widest px-4 py-2 rounded-full border border-neutral-700 hover:border-cyan-400 text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-850 transition-all duration-300"
          >
            Connect
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07070b]/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-900/50 text-red-400 font-mono">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
            <div className="pt-4 mt-2 border-t border-neutral-800">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="w-full block text-center py-2.5 rounded-lg bg-neutral-100 text-black text-xs font-semibold tracking-wider uppercase shadow-md"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
