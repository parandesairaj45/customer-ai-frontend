import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, User, Headphones, Sparkles, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-[#070508] text-[#fbebee]">
      
      <div className="orb-1 pointer-events-none" />
      <div className="orb-2 pointer-events-none" />
      <div className="orb-3 pointer-events-none" />

      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-60" />

      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e50914] via-[#ff5e00] to-[#ff007f] flex items-center justify-center shadow-[0_0_20px_rgba(255,0,127,0.45)]">
            <Flame size={22} color="#fff" />
          </div>

          <span className="font-display font-extrabold text-xl tracking-tight text-white">
            RESOX <span className="text-fire-gradient">// AI</span>
          </span>
        </div>

        <div className="text-xs font-mono text-[#ff7e26] px-3 py-1.5 rounded-full border border-[#ff5e00]/30 bg-[#ff5e00]/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
          CUSTOMER INTELLIGENCE ENGINE
        </div>
      </header>


      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto my-12">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/30 text-xs font-mono text-[#ff2a96] mb-8">
          <Sparkles size={14} />
          AUTONOMOUS TRIAGE & RESOLUTION PLATFORM
        </div>


        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
          Intelligent Customer Support with{' '}
          <span className="text-fire-gradient">
            ResoX AI
          </span>
        </h1>


        <p className="text-base sm:text-lg text-[#c9b1b8] mb-12 max-w-xl mx-auto leading-relaxed">
          Submit customer complaints across multiple sectors and receive instant AI analysis, sentiment classification, priority triage, and actionable operational remedies.
        </p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md">

          <button
            onClick={() => navigate('/login?role=customer')}
            className="btn-futuristic w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-3"
          >
            <User size={18}/>
            Customer Login
            <ArrowRight size={16}/>
          </button>


          <button
            onClick={() => navigate('/login?role=support_agent')}
            className="btn-ghost-futuristic w-full sm:w-auto px-8 py-3.5 text-base flex items-center justify-center gap-3 border-[#ff007f]/50 hover:border-[#ff007f] text-white"
          >
            <Headphones size={18} color="#ff7e26"/>
            Support Agent Login
          </button>

        </div>


        <div className="mt-8 text-sm text-[#826c74]">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-[#ff7e26] hover:text-[#ff007f] font-semibold underline underline-offset-4"
          >
            Create an account
          </button>
        </div>

      </main>


      <footer className="relative z-10 w-full py-6 text-center text-xs font-mono text-[#826c74] border-t border-[#ff5e00]/15">
        ResoX AI • Powered by Gemini AI • Deep Red + Orange + Pink Theme
      </footer>

    </div>
  );
};


//

export default LandingPage;