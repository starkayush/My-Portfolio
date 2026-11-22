import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Server, 
  GitBranch, 
  Globe, 
  Palette, 
  Trophy, 
  Target, 
  Compass, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  FileCode2
} from 'lucide-react';

export const EngineeringSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'dev' | 'systems'>('all');

  const skills = [
    {
      title: 'Artificial Intelligence & ML',
      category: 'ai',
      badge: 'Academic Core',
      desc: 'Pursuing B.Tech CSE specialization in AI/ML. Exploring neural paradigms, data pipelines, predictive intelligence, and foundational machine learning architectures.',
      tags: ['Neural Networks', 'ML Models', 'Data Analysis', 'Deep Learning'],
      accent: 'from-cyan-500/20 to-blue-500/20',
      borderAccent: 'hover:border-cyan-400',
      icon: Cpu,
    },
    {
      title: 'Python Language Mastery',
      category: 'ai',
      badge: 'Primary Language',
      desc: 'Writing clean, idiomatic Python for algorithmic problem solving, backend logic, data transformation, and building AI prototypes with efficient computational complexity.',
      tags: ['Python 3', 'Object-Oriented', 'Algorithms', 'Automation Scripts'],
      accent: 'from-amber-500/20 to-yellow-500/20',
      borderAccent: 'hover:border-amber-400',
      icon: Code2,
    },
    {
      title: 'How Systems Work',
      category: 'systems',
      badge: 'Architecture',
      desc: 'In-depth mental model of computer systems: low-level execution, memory allocation, process scheduling, system calls, network sockets, and hardware-software interaction.',
      tags: ['System Architecture', 'OS Concepts', 'Memory & Caches', 'Process Lifecycle'],
      accent: 'from-emerald-500/20 to-teal-500/20',
      borderAccent: 'hover:border-emerald-400',
      icon: Server,
    },
    {
      title: 'Modern Frontend Engineering',
      category: 'dev',
      badge: 'User Interface',
      desc: 'Building silky, responsive user interfaces that adapt seamlessly to smartphones, tablets, and ultra-wide screens with sleek dark luxury styling and micro-interactions.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UX', 'Web Standards'],
      accent: 'from-indigo-500/20 to-purple-500/20',
      borderAccent: 'hover:border-indigo-400',
      icon: Globe,
    },
    {
      title: 'HTML, CSS & Web Foundations',
      category: 'dev',
      badge: 'Web Fundamentals',
      desc: 'Mastery of foundational web architecture: semantic HTML5 markup, responsive CSS3 styling & modern Flexbox/Grid layouts, along with core JavaScript for DOM interaction and dynamic browser events.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'Responsive Layouts'],
      accent: 'from-orange-500/20 to-amber-500/20',
      borderAccent: 'hover:border-orange-400',
      icon: FileCode2,
    },
    {
      title: 'Prompt Websites & Vercel Edge',
      category: 'dev',
      badge: 'Rapid Shipping',
      desc: 'Expertise in architecting generative prompt-powered web applications and deploying them to global edge networks via Vercel with zero-downtime CI/CD.',
      tags: ['Prompt Engineering', 'Vercel Deployment', 'Edge Functions', 'Rapid Prototyping'],
      accent: 'from-purple-500/20 to-pink-500/20',
      borderAccent: 'hover:border-purple-400',
      icon: Sparkles,
    },
    {
      title: 'Git & GitHub Workflows',
      category: 'dev',
      badge: 'Version Control',
      desc: 'Proficient in version control, branch isolation, merge conflict resolution, pull request management, and maintaining structured commit histories.',
      tags: ['Git CLI', 'GitHub', 'Feature Branching', 'Collaborative PRs'],
      accent: 'from-orange-500/20 to-red-500/20',
      borderAccent: 'hover:border-orange-400',
      icon: GitBranch,
    },
    {
      title: 'Logo & Visual Brand Design',
      category: 'dev',
      badge: 'Brand Identity',
      desc: 'Designing sharp vector logos, bespoke brand marks, typography hierarchies, and visual aesthetics that give technological projects immediate recognizability.',
      tags: ['Logo Design', 'Vector Identity', 'Color Theory', 'Visual Hierarchy'],
      accent: 'from-rose-500/20 to-pink-500/20',
      borderAccent: 'hover:border-rose-400',
      icon: Palette,
    },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory || (activeCategory === 'dev' && (s.category === 'dev' || s.category === 'systems')));

  return (
    <section id="engineering" className="py-24 px-6 relative bg-[#06060a] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Technical Competencies & Systems
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-['Cinzel',serif] tracking-wider">
              Engineering & AI Core
            </h2>
          </div>
          
          <p className="text-sm text-neutral-400 max-w-md">
            Synthesizing academic rigor in B.Tech CSE (AI & ML) with practical software shipping,
            systems intuition, and creative execution.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-white text-black font-semibold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            All Competencies
          </button>
          <button
            onClick={() => setActiveCategory('ai')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === 'ai'
                ? 'bg-cyan-500 text-black font-semibold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            AI, ML & Python
          </button>
          <button
            onClick={() => setActiveCategory('dev')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === 'dev'
                ? 'bg-indigo-500 text-white font-semibold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Frontend & Systems
          </button>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                data-cursor="view"
                className={`relative group p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 transition-all duration-300 ${skill.borderAccent} hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden`}
              >
                {/* Background Subtle Gradient Glow */}
                <div className={`absolute -right-12 -top-12 w-36 h-36 rounded-full bg-gradient-to-br ${skill.accent} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-white group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase px-2.5 py-1 rounded bg-neutral-950/80 border border-neutral-800">
                      {skill.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-['Inter',sans-serif] group-hover:text-neutral-100">
                    {skill.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-5 min-h-[55px]">
                    {skill.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800/60 text-neutral-300 border border-neutral-700/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hackathons, Mindset & Future Goals Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hackathons Card */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-neutral-900/70 to-neutral-950/90 border border-neutral-800 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
              Battle-Tested
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2 Hackathons Competed</h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Experienced the adrenaline of rapid 24-48 hour builds. Successfully turned conceptual ideas into functional code prototypes under strict time constraints.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full-stack sprint execution & live demo delivery</span>
            </div>
          </div>

          {/* Independent Decision Maker Card */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-neutral-900/70 to-neutral-950/90 border border-neutral-800 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
              Core Philosophy
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Autonomous Decision Maker</h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              "I learned to take my own decisions." Embracing calculated risks, evaluating technical trade-offs autonomously, and standing firmly behind self-directed solutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>High ownership, self-starter, resilient under ambiguity</span>
            </div>
          </div>

          {/* Future Goals & Hackathons Card */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-neutral-900/70 to-neutral-950/90 border border-neutral-800 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-1">
              Vision & Trajectory
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ambitious Future Goals</h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Focused on participating in major upcoming national/international hackathons, solving high-impact computational problems, and open to exploratory domain experiences.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Targeting cutting-edge AI ventures & engineering roles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
