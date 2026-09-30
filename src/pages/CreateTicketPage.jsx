import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { 
  Flame, 
  ArrowLeft, 
  Sparkles, 
  Send, 
  CheckCircle, 
  Layers, 
  HeartHandshake, 
  AlertTriangle,
  RotateCw,
  Cpu,
  Brain,
  Tag,
  Zap,
  Activity
} from 'lucide-react';

const SECTORS = [
  'E-commerce',
  'Hospitality',
  'Automotive',
  'SaaS & Technology',
  'Healthcare',
  'Finance & Banking',
  'Retail',
  'Other',
];

const PROCESSING_STEPS = [
  { title: 'Understanding issue...', desc: 'Extracting semantic problem context & customer intent', icon: Brain },
  { title: 'Classifying problem...', desc: 'Matching sector operational taxonomy & category', icon: Tag },
  { title: 'Checking urgency...', desc: 'Evaluating emotional sentiment & customer distress index', icon: Zap },
  { title: 'Generating solution...', desc: 'Synthesizing proactive operational remedy protocol', icon: Sparkles },
];

export const CreateTicketPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sector, setSector] = useState('E-commerce');
  const [issueDescription, setIssueDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(10);
  const [error, setError] = useState('');
  const [aiResult, setAiResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issueDescription.trim() || isProcessing) return;

    setError('');
    setIsProcessing(true);
    setCurrentStep(0);
    setProgress(15);
    setAiResult(null);

    const startTime = Date.now();

    // Cinematic sequence timer for the 4 steps:
    // 1. Understanding issue
    // 2. Classifying problem
    // 3. Checking urgency
    // 4. Generating solution
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 800) {
        setCurrentStep(0);
        setProgress(Math.min(28, 15 + (elapsed / 800) * 13));
      } else if (elapsed < 1600) {
        setCurrentStep(1);
        setProgress(Math.min(56, 28 + ((elapsed - 800) / 800) * 28));
      } else if (elapsed < 2400) {
        setCurrentStep(2);
        setProgress(Math.min(84, 56 + ((elapsed - 1600) / 800) * 28));
      } else {
        setCurrentStep(3);
        setProgress(Math.min(98, 84 + ((elapsed - 2400) / 800) * 14));
      }
    }, 50);

    try {
      const response = await api.post('/tickets', {
        sector,
        issue_description: issueDescription.trim(),
      });

      const ticket = response.data?.ticket;
      const remaining = Math.max(0, 3000 - (Date.now() - startTime));

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          setAiResult({
            id: ticket.id,
            summary: ticket.ai_summary,
            category: ticket.ai_category,
            priority: ticket.ai_priority,
            sentiment: ticket.ai_sentiment,
            recommendedAction: ticket.ai_recommended_action,
            sector: ticket.sector,
          });
        }, 400);
      }, remaining);
    } catch (err) {
      clearInterval(interval);
      setIsProcessing(false);
      setError(err.response?.data?.error || err.message || 'Failed to submit ticket. Please check connection.');
    }
  };

  const getPriorityStyle = (lvl) => {
    switch (lvl?.toLowerCase()) {
      case 'urgent':
        return 'badge-urgent';
      case 'high':
        return 'badge-high';
      case 'medium':
        return 'badge-medium';
      default:
        return 'badge-low';
    }
  };

  return (
    <div className="min-h-screen bg-[#070508] text-[#fbebee] flex flex-col relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="orb-1 pointer-events-none" />
      <div className="orb-2 pointer-events-none" />
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-40" />

      {/* Top Header */}
      <header className="relative z-10 w-full bg-[#0d070b]/80 backdrop-blur-md border-b border-[#ff5e00]/15 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/customer" className="flex items-center gap-2 text-sm text-[#c9b1b8] hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-[#ff5e00]" />
            <span className="font-display font-bold text-sm text-white">RESOX AI</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-6 py-10">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Submit Customer Complaint
          </h1>
          <p className="text-sm text-[#c9b1b8]">
            Provide details of your issue. ResoX AI will analyze, categorize, and synthesize an operational resolution.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#e50914]/15 border border-[#e50914]/40 text-[#ff3344] text-sm mb-6">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form or Result View */}
        {!aiResult ? (
          <div className="moving-border-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sector Dropdown */}
              <div>
                <label className="block text-xs font-mono text-[#c9b1b8] mb-2 uppercase tracking-wider">
                  Operational Business Sector
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0508] border border-[#ff5e00]/30 focus:border-[#ff007f] text-white text-sm outline-none transition-all cursor-pointer"
                >
                  {SECTORS.map((sec) => (
                    <option key={sec} value={sec} className="bg-[#120810] text-white">
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Issue Description Textarea */}
              <div>
                <label className="block text-xs font-mono text-[#c9b1b8] mb-2 uppercase tracking-wider">
                  Complaint Description
                </label>
                <textarea
                  required
                  rows={5}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Clearly describe the problem encountered, order details, or unexpected failure..."
                  className="w-full p-4 rounded-xl bg-[#0a0508] border border-[#ff5e00]/30 focus:border-[#ff007f] text-white placeholder-[#826c74] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,0,127,0.25)] resize-y"
                />
                <div className="flex justify-between items-center mt-1 text-[11px] font-mono text-[#826c74]">
                  <span>Minimum 5 characters required</span>
                  <span>{issueDescription.length} characters</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || issueDescription.trim().length < 5}
                className="btn-futuristic w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles size={16} />
                <span>Submit & Run AI Analysis</span>
              </button>
            </form>
          </div>
        ) : (
          /* AI Results Display */
          <div className="space-y-6 animate-card-in">
            {/* Top Success Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#e50914]/20 via-[#ff5e00]/20 to-[#ff007f]/20 border border-[#ff007f]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle size={22} className="text-[#ff5e00]" />
                <div>
                  <h3 className="font-display font-bold text-sm text-white">Ticket Created & Analyzed</h3>
                  <p className="text-xs text-[#c9b1b8]">Stored securely with Ticket ID #{aiResult.id?.slice(0, 8)}</p>
                </div>
              </div>
              <span className={`text-xs font-mono px-3 py-1 rounded-full uppercase font-bold ${getPriorityStyle(aiResult.priority)}`}>
                {aiResult.priority} PRIORITY
              </span>
            </div>

            {/* AI Result Details Card */}
            <div className="moving-border-card p-6 sm:p-8 space-y-6">
              {/* Summary */}
              <div>
                <span className="text-xs font-mono text-[#ff7e26] block mb-1 uppercase tracking-wider">
                  AI Summary
                </span>
                <p className="text-base text-white leading-relaxed font-medium">
                  "{aiResult.summary}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#ff5e00]/15">
                {/* Category */}
                <div className="p-3.5 rounded-xl bg-[#0a0508] border border-[#ff5e00]/20">
                  <span className="text-[11px] font-mono text-[#826c74] block mb-1">CATEGORY</span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Layers size={14} className="text-[#ff5e00]" />
                    <span>{aiResult.category}</span>
                  </div>
                </div>

                {/* Priority */}
                <div className="p-3.5 rounded-xl bg-[#0a0508] border border-[#ff5e00]/20">
                  <span className="text-[11px] font-mono text-[#826c74] block mb-1">TRIAGE PRIORITY</span>
                  <div className="text-sm font-bold uppercase text-[#ff3344]">
                    {aiResult.priority}
                  </div>
                </div>

                {/* Sentiment */}
                <div className="p-3.5 rounded-xl bg-[#0a0508] border border-[#ff5e00]/20">
                  <span className="text-[11px] font-mono text-[#826c74] block mb-1">DETECTED SENTIMENT</span>
                  <div className="text-sm font-bold text-[#ff2a96] flex items-center gap-1.5">
                    <Activity size={14} />
                    <span>{aiResult.sentiment}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-4 rounded-xl bg-[#ff007f]/10 border border-[#ff007f]/30">
                <span className="text-xs font-mono text-[#ff2a96] block mb-1 font-bold flex items-center gap-1.5">
                  <Sparkles size={14} />
                  RECOMMENDED ACTION
                </span>
                <p className="text-sm text-[#fbebee] leading-relaxed">
                  {aiResult.recommendedAction}
                </p>
              </div>

              {/* Navigation Options */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#ff5e00]/15">
                <button
                  type="button"
                  onClick={() => {
                    setAiResult(null);
                    setIssueDescription('');
                  }}
                  className="btn-ghost-futuristic text-xs py-2.5 px-4 w-full sm:w-auto"
                >
                  Submit Another Ticket
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/customer')}
                  className="btn-futuristic text-xs py-2.5 px-6 w-full sm:w-auto"
                >
                  Go to My Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cinematic AI Processing Sequence Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="moving-border-card w-full max-w-lg p-8 bg-[#10070e] text-center relative overflow-hidden">
            <div className="scanline-beam" />

            {/* Animated Neural Core */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="pulse-ring-outer" />
              <div className="pulse-ring-inner" />
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#e50914] via-[#ff5e00] to-[#ff007f] flex items-center justify-center shadow-[0_0_30px_rgba(255,0,127,0.7)] animate-pulse">
                {React.createElement(PROCESSING_STEPS[currentStep]?.icon || Brain, {
                  size: 26,
                  color: '#fff',
                })}
              </div>
            </div>

            {/* Current Step Title */}
            <h3 className="font-display text-xl font-bold text-white mb-1.5 text-fire-gradient">
              {PROCESSING_STEPS[currentStep]?.title}
            </h3>
            <p className="text-xs text-[#c9b1b8] mb-6">
              {PROCESSING_STEPS[currentStep]?.desc}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-[#180812] h-2 rounded-full overflow-hidden border border-[#ff5e00]/25 mb-6">
              <div
                className="glow-progress-bar h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* 4 Steps Checklist */}
            <div className="space-y-2 text-left">
              {PROCESSING_STEPS.map((step, idx) => {
                const isDone = currentStep > idx;
                const isCurr = currentStep === idx;
                return (
                  <div
                    key={step.title}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-mono transition-all ${
                      isCurr
                        ? 'bg-[#ff007f]/15 border border-[#ff007f]/40 text-white font-bold'
                        : isDone
                        ? 'text-[#ff7e26]'
                        : 'text-[#826c74]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isDone
                          ? 'bg-[#ff5e00] text-white'
                          : isCurr
                          ? 'bg-[#ff007f] text-white animate-spin'
                          : 'bg-white/10 text-[#826c74]'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </span>
                    <span>{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateTicketPage;
