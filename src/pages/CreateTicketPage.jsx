import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  AlertTriangle,
  Brain,
  Tag,
  Zap,
  Activity,
  MessageSquareHeart,
  TrendingUp
} from 'lucide-react';
import SpeechMicButton from '../components/SpeechMicButton';

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
  { title: 'Understanding experience context...', desc: 'Extracting semantic journey context & customer intent', icon: Brain },
  { title: 'Classifying feedback topic...', desc: 'Matching sector operational taxonomy & category', icon: Tag },
  { title: 'Evaluating sentiment & urgency...', desc: 'Evaluating emotional polarity & customer impact index', icon: Zap },
  { title: 'Synthesizing CX recommendation...', desc: 'Synthesizing proactive operational remedy protocol', icon: Sparkles },
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
      const response = await api.post('/api/tickets', {
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
            customerResponse: ticket.ai_customer_response || ticket.resolution_notes,
            status: ticket.status ? (ticket.status === 'open' ? 'Submitted / Under Review' : ticket.status) : 'Submitted / Under Review',
            sector: ticket.sector,
          });
        }, 400);
      }, remaining);
    } catch (err) {
      clearInterval(interval);
      setIsProcessing(false);
      setError(err.response?.data?.error || err.message || 'Failed to submit experience feedback. Please check connection.');
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
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] flex flex-col relative overflow-hidden">
      {/* Top Header */}
      <header className="relative z-10 w-full bg-[var(--bg-card)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/customer" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#ff6a00] via-[#ff7a00] to-[#ff8a1f] flex items-center justify-center shadow-[0_0_10px_rgba(255,106,0,0.5)]">
              <Zap size={13} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-sm text-white">RESOX AI</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-6 py-10">
        <div className="mb-8 text-center sm:text-left animate-card-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--orange-primary)]/10 border border-[var(--orange-vibrant)]/35 text-[11px] font-mono text-[var(--orange-bright)] mb-3">
            <MessageSquareHeart size={13} />
            CUSTOMER FEEDBACK INGESTION
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Share Your Customer Experience
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Share your customer journey or feedback. ResoX AI provides real-time sentiment analysis, urgency triage, and synthesized operational actions.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm mb-6 animate-card-in">
            <AlertTriangle size={18} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form or Result View */}
        {!aiResult ? (
          <div className="moving-border-card p-6 sm:p-8 animate-card-in stagger-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sector Dropdown */}
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                  Operational Business Sector
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#13151c] border border-[var(--border-card)] focus:border-[var(--orange-vibrant)] text-white text-sm outline-none transition-all cursor-pointer shadow-inner"
                >
                  {SECTORS.map((sec) => (
                    <option key={sec} value={sec} className="bg-[#181a22] text-white">
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Description Textarea */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    Experience Details & Feedback
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[11px] font-mono text-[var(--text-muted)]">Voice input:</span>
                    <SpeechMicButton
                      onTranscript={(text) => {
                        setIssueDescription((prev) => (prev ? `${prev.trim()} ${text}` : text));
                      }}
                      title="Dictate experience details with microphone"
                    />
                  </div>
                </div>
                <textarea
                  required
                  rows={5}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Share your experience details, feedback, journey friction, or service expectations..."
                  className="w-full p-4 rounded-xl bg-[#13151c] border border-[var(--border-card)] focus:border-[var(--orange-vibrant)] text-white placeholder-[var(--text-muted)] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,106,0,0.22)] resize-y shadow-inner"
                />
                <div className="flex justify-between items-center mt-1 text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Minimum 5 characters required</span>
                  <span>{issueDescription.length} characters</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || issueDescription.trim().length < 5}
                className="btn-futuristic w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Submit & Run AI Experience Analysis</span>
              </button>
            </form>
          </div>
        ) : (
          /* AI Results Display */
          <div className="space-y-6 animate-card-in">
            {/* Top Success Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--orange-primary)]/20 via-[var(--purple-deep)]/25 to-[var(--bg-card)] border border-[var(--orange-vibrant)]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle size={22} className="text-[var(--orange-bright)] shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-sm text-white">Experience Record Created & Analyzed</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Stored securely with Experience Ticket ID #{aiResult.id?.slice(0, 8)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full uppercase font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {aiResult.status || 'Submitted / Under Review'}
                </span>
                <span className={`text-xs font-mono px-3 py-1 rounded-full uppercase font-bold ${getPriorityStyle(aiResult.priority)}`}>
                  {aiResult.priority} PRIORITY
                </span>
              </div>
            </div>

            {/* AI Result Details Card */}
            <div className="moving-border-card p-6 sm:p-8 space-y-6">
              {/* Summary */}
              <div>
                <span className="text-xs font-mono text-[var(--orange-bright)] block mb-1 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp size={13} />
                  AI Experience Summary
                </span>
                <p className="text-base text-white leading-relaxed font-medium">
                  "{aiResult.summary}"
                </p>
              </div>

              {/* AI Customer Response */}
              {aiResult.customerResponse && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--orange-primary)]/15 via-[#181a24] to-[#12141c] border border-[var(--orange-vibrant)]/35 space-y-1.5">
                  <span className="text-xs font-mono text-[var(--orange-bright)] font-bold flex items-center gap-1.5 uppercase">
                    <MessageSquareHeart size={14} />
                    AI Customer Response
                  </span>
                  <p className="text-sm text-white leading-relaxed font-normal">
                    {aiResult.customerResponse}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                {/* Category */}
                <div className="p-3.5 rounded-xl bg-[#13151c] border border-[var(--border-card)]">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block mb-1">CATEGORY</span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Layers size={14} className="text-[var(--orange-bright)]" />
                    <span>{aiResult.category}</span>
                  </div>
                </div>

                {/* Priority */}
                <div className="p-3.5 rounded-xl bg-[#13151c] border border-[var(--border-card)]">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block mb-1">TRIAGE PRIORITY</span>
                  <div className="text-sm font-bold uppercase text-[var(--orange-bright)]">
                    {aiResult.priority}
                  </div>
                </div>

                {/* Sentiment */}
                <div className="p-3.5 rounded-xl bg-[#13151c] border border-[var(--border-card)]">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block mb-1">DETECTED SENTIMENT</span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Activity size={14} className="text-[var(--orange-bright)]" />
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-purple-500/15 text-[var(--purple-neon)] border border-purple-500/30">
                      {aiResult.sentiment}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-4 rounded-xl bg-[var(--orange-primary)]/10 border border-[var(--orange-vibrant)]/30">
                <span className="text-xs font-mono text-[var(--orange-bright)] block mb-1 font-bold flex items-center gap-1.5">
                  <Sparkles size={14} />
                  RECOMMENDED ACTION PROTOCOL
                </span>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {aiResult.recommendedAction}
                </p>
              </div>

              {/* Navigation Options */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => {
                    setAiResult(null);
                    setIssueDescription('');
                  }}
                  className="btn-ghost-futuristic text-xs py-2.5 px-4 w-full sm:w-auto cursor-pointer"
                >
                  Share Another Experience
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/customer')}
                  className="btn-futuristic text-xs py-2.5 px-6 w-full sm:w-auto cursor-pointer"
                >
                  Go to Experience Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cinematic AI Processing Sequence Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="moving-border-card w-full max-w-lg p-8 bg-[#181a24] text-center relative overflow-hidden shadow-2xl">
            <div className="scanline-beam" />

            {/* Animated Neural Core */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="pulse-ring-outer" />
              <div className="pulse-ring-inner" />
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff6a00] via-[#ff7a00] to-[#ff8a1f] flex items-center justify-center shadow-[0_0_30px_rgba(255,106,0,0.7)] animate-pulse">
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
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              {PROCESSING_STEPS[currentStep]?.desc}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-[#13151c] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)] mb-6">
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
                        ? 'bg-[var(--orange-primary)]/15 border border-[var(--orange-vibrant)]/45 text-white font-bold'
                        : isDone
                        ? 'text-[var(--orange-bright)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isDone
                          ? 'bg-[var(--orange-vibrant)] text-white font-bold'
                          : isCurr
                          ? 'bg-[var(--purple-vibrant)] text-white animate-spin'
                          : 'bg-white/10 text-[var(--text-muted)]'
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
