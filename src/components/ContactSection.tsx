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
  ShieldCheck,
  Code
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

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const ContactSection: React.FC = () => {
  const [copiedInsta, setCopiedInsta] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedGithub, setCopiedGithub] = useState(false);
  const [copiedTwitter, setCopiedTwitter] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const targetEmail = 'starayush.in@gmail.com';

  const handleCopyInsta = () => {
    navigator.clipboard.writeText('@starkayush_');
    setCopiedInsta(true);
    setTimeout(() => setCopiedInsta(false), 2000);
  };

  const handleCopyGithub = () => {
    navigator.clipboard.writeText('https://github.com/starkayush');
    setCopiedGithub(true);
    setTimeout(() => setCopiedGithub(false), 2000);
  };

  const handleCopyTwitter = () => {
    navigator.clipboard.writeText('@starkayush_');
    setCopiedTwitter(true);
    setTimeout(() => setCopiedTwitter(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Direct transmission to starayush.in@gmail.com via mailto handler
    const mailtoSubject = encodeURIComponent(formData.subject || `Portfolio Transmission from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\n---\nSent via Ayush Anand Portfolio Transmission Console`
    );
    const mailtoUrl = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Trigger user's mail client directly to starayush.in@gmail.com
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4500);
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
            Open to high-impact software internships, hackathon collaborations, AI research initiatives, or an engaging discussion on cars, tech , life and love.
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

            {/* GitHub Card (Down the LinkedIn Profile) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-neutral-900/60 border border-neutral-800 hover:border-neutral-400/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center text-white shadow-lg">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <button
                  onClick={handleCopyGithub}
                  className="px-3 py-1 rounded-full text-[11px] font-mono text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedGithub ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-neutral-300 mb-1">
                GITHUB
              </div>
              <h3 className="text-lg font-bold text-white mb-1">@starkayush</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Code repositories, algorithms, AI/ML experiments, and open-source projects.
              </p>

              <a
                href="https://github.com/starkayush"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-white transition-colors"
              >
                <span>Explore GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Twitter / X Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-neutral-900/60 border border-neutral-800 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-black border border-neutral-700/80 flex items-center justify-center text-white shadow-lg">
                  <TwitterXIcon className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyTwitter}
                  className="px-3 py-1 rounded-full text-[11px] font-mono text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedTwitter ? (
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

              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                X / TWITTER
              </div>
              <h3 className="text-lg font-bold text-white mb-1">@starkayush_</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Tech thoughts, AI updates, car enthusiast dispatches, and life reflections.
              </p>

              <a
                href="https://x.com/starkayush_"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-cyan-400 transition-colors"
              >
                <span>Follow on X (Twitter)</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <div>
                  <div className="font-semibold text-white">Direct Inbox:</div>
                  <a
                    href="mailto:starayush.in@gmail.com"
                    className="text-cyan-400 hover:underline font-mono text-[11px]"
                  >
                    starayush.in@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-[10px] flex items-center gap-1 transition-colors"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
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
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold font-['Cinzel',serif] text-white">
                  Send a Transmission
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                  DESTINATION: {targetEmail}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-6">
                Transmit your message directly to my email (<span className="text-cyan-400 font-mono">{targetEmail}</span>). Whether for tech collaboration, AI systems, hackathons, or car tuning, I will reply promptly.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Transmission Dispatched!</h4>
                  <p className="text-xs text-neutral-300 mb-2">
                    Your transmission has been forwarded directly to <span className="text-cyan-400 font-mono font-bold">{targetEmail}</span>.
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Your email application has been launched with your prefilled message.
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
                      placeholder="Project Collaboration / Hackathon / Cars & Tech"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your ideas, project proposal, or thoughts on tech, life and love..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="view"
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Transmit Message to starayush.in@gmail.com</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Rolls-Royce Black Badge Inspired Luxury Footer */}
        <footer className="pt-12 border-t border-neutral-900 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-xs text-neutral-500 font-mono">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-3">
              <span className="font-['Cinzel',serif] text-base text-neutral-200 font-bold uppercase tracking-wider">
                Ayush Anand
              </span>
              <span>•</span>
              <span className="text-neutral-400">B.Tech CSE (AI & ML)</span>
            </div>

            {/* Email ID below name for further contact */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider">Further Contact:</span>
              <a
                href={`mailto:${targetEmail}`}
                className="text-cyan-400 hover:text-cyan-300 font-medium tracking-wide underline transition-colors"
              >
                {targetEmail}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};
