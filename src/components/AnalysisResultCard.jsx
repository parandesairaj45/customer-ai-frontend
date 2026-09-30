import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Copy, 
  Sparkles, 
  Send, 
  Flame, 
  HeartHandshake, 
  Activity, 
  Layers, 
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export const AnalysisResultCard = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!result) return null;

  const { summary, category, priority, sentiment, recommendedAction, sector, issueDescription } = result;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Issue Summary: ${summary}\nCategory: ${category}\nPriority: ${priority}\nSentiment: ${sentiment}\nRecommended Action: ${recommendedAction}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 3000);
  };

  const getPriorityClass = (lvl) => {
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
    <div style={{ marginTop: '48px', width: '100%', maxWidth: '1080px', marginInline: 'auto' }}>
      {/* Top Banner / Results Status */}
      <div
        className="animate-card-in"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderRadius: '16px',
          background: 'linear-gradient(90deg, rgba(229, 9, 20, 0.25), rgba(255, 94, 0, 0.18), rgba(255, 0, 127, 0.2))',
          border: '1px solid rgba(255, 0, 127, 0.35)',
          marginBottom: '28px',
          boxShadow: '0 8px 30px rgba(229, 9, 20, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #e50914, #ff007f)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px #ff007f',
            }}
          >
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
              Autonomous Resolution Protocol Generated
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#c9b1b8' }}>
              Synthesized by Gemini Neural Engine • Structured & Schema Validated
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleCopy}
            className="btn-ghost-futuristic"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >
            <Copy size={14} color="#ff7e26" />
            {copied ? 'Copied to Clipboard!' : 'Copy Protocol'}
          </button>
          {onReset && (
            <button
              onClick={onReset}
              className="btn-ghost-futuristic"
              style={{ fontSize: '0.82rem', padding: '8px 16px', borderColor: 'rgba(255, 0, 127, 0.4)' }}
            >
              Analyze Another
            </button>
          )}
        </div>
      </div>

      {/* Main Grid of Intelligent Result Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '28px',
        }}
      >
        {/* Card 1: Executive Summary */}
        <div className="moving-border-card animate-card-in stagger-1" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: '#ff7e26',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                letterSpacing: '0.05em',
              }}
            >
              <Activity size={14} />
              EXECUTIVE SUMMARY
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '999px',
                background: 'rgba(255, 94, 0, 0.15)',
                color: '#ff9440',
                border: '1px solid rgba(255, 94, 0, 0.3)',
              }}
            >
              {sector || 'General'}
            </span>
          </div>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#ffffff',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            "{summary}"
          </p>

          {issueDescription && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(10, 4, 8, 0.65)',
                border: '1px solid rgba(255, 94, 0, 0.1)',
                fontSize: '0.8rem',
                color: '#a39198',
                maxHeight: '75px',
                overflowY: 'auto',
              }}
            >
              <span style={{ color: '#ff5e00', fontWeight: 600 }}>Raw Signal: </span>
              {issueDescription}
            </div>
          )}
        </div>

        {/* Card 2: Priority & Category Triage */}
        <div className="moving-border-card animate-card-in stagger-2" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: '#ff2a96',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                letterSpacing: '0.05em',
              }}
            >
              <ShieldAlert size={14} />
              TRIAGE & CLASSIFICATION
            </span>
            <div
              className={getPriorityClass(priority)}
              style={{
                padding: '4px 14px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Flame size={13} />
              {priority} PRIORITY
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.75rem', color: '#826c74', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
              SPECIALIZED CATEGORY
            </div>
            <div
              style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Layers size={18} color="#ff5e00" />
              {category}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: '#826c74', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
              CUSTOMER SENTIMENT SPECTRUM
            </div>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 0, 127, 0.1)',
                border: '1px solid rgba(255, 0, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <HeartHandshake size={18} color="#ff007f" />
              <span style={{ color: '#ff2a96', fontWeight: 600, fontSize: '0.95rem' }}>
                {sentiment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Actionable Operational Playbook (Full Width) */}
      <div className="moving-border-card animate-card-in stagger-3" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 94, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 94, 0, 0.5)',
              }}
            >
              <ArrowUpRight size={18} color="#ff7e26" />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                Prescribed Next Operational Action
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#c9b1b8' }}>
                Instant operational remedy designed to resolve root friction and protect customer LTV
              </p>
            </div>
          </div>

          <span
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(229, 9, 20, 0.18)',
              border: '1px solid rgba(229, 9, 20, 0.5)',
              color: '#ff3344',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            SLA ACCELERATED
          </span>
        </div>

        {/* Action Callout Box */}
        <div
          style={{
            padding: '20px 24px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.12), rgba(255, 94, 0, 0.12), rgba(255, 0, 127, 0.12))',
            border: '1px solid rgba(255, 94, 0, 0.35)',
            marginBottom: '24px',
            boxShadow: 'inset 0 0 20px rgba(255, 0, 127, 0.08)',
          }}
        >
          <p
            style={{
              color: '#ffffff',
              fontSize: '1.08rem',
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            {recommendedAction}
          </p>
        </div>

        {/* Action Dispatch Triggers */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px' }}>
          <button
            onClick={handleDispatch}
            className="btn-futuristic"
            style={{ padding: '12px 28px' }}
          >
            {dispatched ? (
              <>
                <CheckCircle size={18} color="#fff" />
                Dispatching to Support Team...
              </>
            ) : (
              <>
                <Send size={18} color="#fff" />
                Execute Operational Protocol
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
