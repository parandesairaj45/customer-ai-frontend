import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, Headphones, ArrowRight, Activity, Zap, ShieldCheck } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-transparent text-[var(--text-primary)]">
      {/* Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6a00] via-[#ff7a00] to-[#ff8a1f] flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.5)]">
            <Zap size={22} className="text-white fill-white" />
          </div>

          <span className="font-display font-extrabold text-xl tracking-tight text-white">
            RESOX <span className="text-fire-gradient">// AI</span>
          </span>
        </div>

        <div className="text-xs font-mono text-[var(--orange-bright)] px-3.5 py-1.5 rounded-full border border-[var(--orange-vibrant)]/35 bg-[var(--orange-primary)]/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--orange-vibrant)] animate-ping" />
          AI FEEDBACK INTELLIGENCE
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto my-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--orange-primary)]/10 border border-[var(--orange-vibrant)]/30 text-xs font-mono text-[var(--orange-bright)] mb-8 animate-card-in">
          <Sparkles size={14} />
          INTELLIGENT CUSTOMER EXPERIENCE & FEEDBACK PLATFORM
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white animate-card-in stagger-1">
          Transform Customer Experience with{' '}
          <span className="text-fire-gradient">
            ResoX AI
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto leading-relaxed animate-card-in stagger-2">
          Capture customer journey feedback across sectors with instant AI sentiment analysis, urgency triage, and actionable operational remedies.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md animate-card-in stagger-3">
          <button
            onClick={() => navigate('/login?role=customer')}
            className="btn-futuristic w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-3 cursor-pointer"
          >
            <User size={18} />
            <span>Customer Portal</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate('/login?role=support_agent')}
            className="btn-ghost-futuristic w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-3 border-[var(--border-card)] hover:border-[var(--orange-vibrant)] text-white cursor-pointer"
          >
            <Headphones size={18} className="text-[var(--orange-bright)]" />
            <span>Support Agent Login</span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left animate-card-in stagger-4">
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] backdrop-blur-md hover:border-[var(--orange-vibrant)]/50 transition-all">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--orange-bright)] mb-1">
              <Activity size={14} />
              <span>Real-Time Sentiment</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Instant emotional polarity scoring & distress index</p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] backdrop-blur-md hover:border-[var(--purple-vibrant)]/50 transition-all">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--purple-neon)] mb-1">
              <Zap size={14} />
              <span>Smart Urgency Triage</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Predictive priority classification based on customer impact</p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] backdrop-blur-md hover:border-[var(--cyan-bright)]/50 transition-all">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--cyan-bright)] mb-1">
              <ShieldCheck size={14} />
              <span>Remedy Synthesis</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Automated operational resolution protocols via Gemini</p>
          </div>
        </div>

        <div className="mt-8 text-sm text-[var(--text-muted)]">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-[var(--orange-bright)] hover:text-[var(--orange-vibrant)] font-semibold underline underline-offset-4 cursor-pointer transition-colors"
          >
            Create an account
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
        ResoX AI • Intelligent Customer Experience Platform • Powered by Gemini AI
      </footer>
    </div>
  );
};

export default LandingPage;