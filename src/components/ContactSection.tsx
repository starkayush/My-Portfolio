import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Globe, 
  MapPin, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const ContactSection: React.FC = () => {
  const [copiedInsta, setCopiedInsta] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyInsta = () => {
    navigator.clipboard.writeText('@starkayush_');
    setCopiedInsta(true);
    setTimeout(() => setCopiedInsta(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayushanand.aiml@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative bg-[#040407] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">
              <Mail className="w-3.5 h-3.5" />
              Direct Communication & Inquiries
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-['Cinzel',serif] tracking-wider">
              Get In Touch
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Open to high-impact software internships, hackathon collaborations, AI research initiatives,
            or an engaging discussion on cars and piano composition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Left Column: Socials & Direct Connect Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Instagram Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-neutral-900/60 border border-neutral-800 hover:border-pink-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <button
                  onClick={handleCopyInsta}
                  className="px-3 py-1 rounded-full text-[11px] font-mono text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedInsta ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Handle</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-pink-400 mb-1">
                INSTAGRAM
              </div>
              <h3 className="text-lg font-bold text-white mb-1">@starkayush_</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Cinematography clips, automobile stories, lifestyle & behind-the-scenes.
              </p>

              <a
                href="https://www.instagram.com/starkayush_/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-pink-400 transition-colors"
              >
                <span>Visit Instagram Profile</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-neutral-900/60 border border-neutral-800 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0077b5] flex items-center justify-center text-white shadow-lg">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-900/40">
                  VERIFIED PROFILE
                </span>
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-1">
                LINKEDIN
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Ayush Anand</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Professional network, B.Tech CSE AI/ML milestones & career opportunities.
              </p>

              <a
                href="https://www.linkedin.com/in/ayush-anand-864582427"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-blue-400 transition-colors"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Domain & Availability Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="font-semibold text-white">Status: Available</div>
                  <div className="text-neutral-400 text-[11px]">Open to domain experiences & projects</div>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-neutral-500" />
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-md relative">
              <h3 className="text-xl font-bold font-['Cinzel',serif] text-white mb-2">
                Send a Transmission
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Drop your message below. Whether for tech collaboration or discussing car tuning, I will reply promptly.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Message Transmitted!</h4>
                  <p className="text-xs text-neutral-300">
                    Thank you for reaching out, Ayush Anand has received your dispatch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Collaboration / Hackathon / Discussion"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your ideas or proposal here..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="view"
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Rolls-Royce Black Badge Inspired Luxury Footer */}
        <footer className="pt-12 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="font-['Cinzel',serif] text-sm text-neutral-300 font-bold uppercase tracking-wider">
              Ayush Anand
            </span>
            <span>•</span>
            <span>B.Tech CSE (AI & ML)</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-neutral-600">
            Crafted with Rolls-Royce Black Badge aesthetic • Engine & Acoustic Harmony
          </div>
        </footer>
      </div>
    </section>
  );
};
