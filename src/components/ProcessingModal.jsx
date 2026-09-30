import React from 'react';
import { Cpu, Brain, Tag, Sparkles, CheckCircle2, Loader2, ShieldCheck, Zap } from 'lucide-react';

export const STEPS = [
  {
    title: 'Understanding your issue...',
    subtitle: 'Extracting semantic entities & customer intent context',
    icon: Brain,
    detail: 'Tokenizing input stream and mapping domain semantics',
  },
  {
    title: 'Analyzing customer sentiment...',
    subtitle: 'Evaluating emotional distress, urgency tone & friction index',
    icon: Zap,
    detail: 'Calibrating multi-dimensional emotional valence scale',
  },
  {
    title: 'Classifying category...',
    subtitle: 'Matching sector-specific operational taxonomy',
    icon: Tag,
    detail: 'Resolving SLA tier and incident classification',
  },
  {
    title: 'Generating smart recommendation...',
    subtitle: 'Synthesizing proactive next operational step',
    icon: Sparkles,
    detail: 'Verifying strict JSON schema and actionable resolution',
  },
];

export const ProcessingModal = ({ isOpen, currentStepIndex = 0, progress = 15, sector = 'General' }) => {
  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIndex] || STEPS[0];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(6, 4, 6, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '20px',
      }}
    >
      {/* Background glowing radiant core */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 0, 127, 0.22) 0%, rgba(255, 94, 0, 0.18) 45%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          animation: 'orbPulse1 8s infinite ease-in-out',
        }}
      />

      {/* Main Holographic Container */}
      <div
        className="moving-border-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          padding: '36px',
          backgroundColor: 'rgba(16, 8, 14, 0.94)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(229, 9, 20, 0.4), 0 0 50px rgba(255, 0, 127, 0.25)',
        }}
      >
        {/* Laser Scanning Beam */}
        <div className="scanline-beam" />

        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(255, 0, 127, 0.15)',
                border: '1px solid rgba(255, 0, 127, 0.4)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: '#ff2a96',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ff007f',
                  boxShadow: '0 0 10px #ff007f',
                  animation: 'urgentPulse 1s infinite',
                }}
              />
              QUANTUM NEURAL PIPELINE
            </span>
            <span
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: '#ff7e26',
                background: 'rgba(255, 94, 0, 0.12)',
                border: '1px solid rgba(255, 94, 0, 0.3)',
                padding: '6px 12px',
                borderRadius: '999px',
              }}
            >
              SECTOR: {sector.toUpperCase()}
            </span>
          </div>

          <div
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: '#fbebee',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Cpu size={15} color="#ff5e00" />
            <span style={{ color: '#ff7e26' }}>MODEL:</span> gemini-3.8-flash
          </div>
        </div>

        {/* Central Glowing Core Animation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '24px 0 32px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '110px',
              height: '110px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            {/* Outer rotating dashed ring */}
            <div className="pulse-ring-outer" />
            {/* Inner reverse dotted ring */}
            <div className="pulse-ring-inner" />

            {/* Glowing Center Core */}
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e50914, #ff5e00, #ff007f)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'neuralCorePulse 2.4s infinite ease-in-out',
                boxShadow: '0 0 30px #ff007f, 0 0 50px #ff5e00',
              }}
            >
              {React.createElement(currentStep.icon, {
                size: 34,
                color: '#ffffff',
                strokeWidth: 2.2,
                style: { filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' },
              })}
            </div>
          </div>

          {/* Active Step Headline */}
          <h3
            className="text-fire-gradient glow-text-ping"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '6px',
            }}
          >
            {currentStep.title}
          </h3>

          <p
            style={{
              color: '#c9b1b8',
              fontSize: '0.95rem',
              textAlign: 'center',
              maxWidth: '460px',
            }}
          >
            {currentStep.subtitle}
          </p>
        </div>

        {/* Glowing Progress Bar */}
        <div style={{ margin: '24px 0 28px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
            }}
          >
            <span style={{ color: '#ff7e26', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Loader2 size={13} className="animate-spin" color="#ff7e26" />
              SYNCHRONIZING AI AGENTS...
            </span>
            <span style={{ color: '#ff007f', fontWeight: 700 }}>{Math.round(progress)}%</span>
          </div>

          <div
            style={{
              height: '8px',
              backgroundColor: 'rgba(255, 94, 0, 0.15)',
              borderRadius: '999px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 0, 127, 0.25)',
            }}
          >
            <div
              className="glow-progress-bar"
              style={{
                height: '100%',
                width: `${progress}%`,
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '999px',
              }}
            />
          </div>
        </div>

        {/* Step-by-Step Sequence Milestones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          {STEPS.map((step, idx) => {
            const isCompleted = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;
            const isPending = currentStepIndex < idx;

            return (
              <div
                key={step.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: isCurrent
                    ? 'rgba(255, 0, 127, 0.12)'
                    : isCompleted
                    ? 'rgba(255, 94, 0, 0.07)'
                    : 'rgba(20, 10, 16, 0.4)',
                  border: isCurrent
                    ? '1px solid rgba(255, 0, 127, 0.6)'
                    : isCompleted
                    ? '1px solid rgba(255, 94, 0, 0.35)'
                    : '1px solid rgba(255, 94, 0, 0.08)',
                  transition: 'all 0.35s ease',
                  boxShadow: isCurrent ? '0 0 20px rgba(255, 0, 127, 0.25)' : 'none',
                }}
              >
                {/* Status Indicator Icon */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: isCompleted
                      ? '#ff5e00'
                      : isCurrent
                      ? '#ff007f'
                      : 'rgba(255, 255, 255, 0.06)',
                    boxShadow: isCurrent
                      ? '0 0 12px #ff007f'
                      : isCompleted
                      ? '0 0 8px #ff5e00'
                      : 'none',
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} color="#ffffff" strokeWidth={2.5} />
                  ) : isCurrent ? (
                    <Loader2 size={16} color="#ffffff" className="animate-spin" />
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#826c74', fontFamily: 'var(--font-mono)' }}>
                      {idx + 1}
                    </span>
                  )}
                </div>

                {/* Step Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        color: isCurrent
                          ? '#ffffff'
                          : isCompleted
                          ? '#fbebee'
                          : '#826c74',
                      }}
                    >
                      {step.title}
                    </span>
                    {isCurrent && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#ff2a96',
                          letterSpacing: '0.04em',
                        }}
                      >
                        PROCESSING...
                      </span>
                    )}
                    {isCompleted && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#ff7e26',
                        }}
                      >
                        RESOLVED ✓
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: isCurrent ? '#ff9440' : '#826c74',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Safety & Fallback Notice */}
        <div
          style={{
            marginTop: '22px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 94, 0, 0.14)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: '#826c74',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#ff5e00" />
            DUAL-MODEL FALLBACK ACTIVE
          </span>
          <span style={{ color: '#c9b1b8' }}>ZERO-HALLUCINATION ENFORCED</span>
        </div>
      </div>
    </div>
  );
};
