import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Flame, 
  Zap, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  Layers, 
  ShoppingBag, 
  Hotel, 
  Car, 
  Activity, 
  CloudLightning, 
  Building2
} from 'lucide-react';

const SECTORS = [
  { id: 'E-commerce', label: 'E-commerce', icon: ShoppingBag },
  { id: 'Hospitality', label: 'Hospitality', icon: Hotel },
  { id: 'Automotive', label: 'Automotive', icon: Car },
  { id: 'SaaS & Technology', label: 'SaaS & Cloud', icon: CloudLightning },
  { id: 'Healthcare', label: 'Healthcare', icon: Activity },
  { id: 'Finance & Banking', label: 'Finance', icon: Building2 },
];

const PRESETS = [
  {
    sector: 'E-commerce',
    label: 'GPU Shipment Damaged',
    description: 'Ordered a $1,850 workstation GPU for client deployment; arrived smashed in water-damaged packaging and customer service bot closed my ticket without refund.',
  },
  {
    sector: 'Hospitality',
    label: 'Honeymoon Suite Bumped',
    description: 'Checked into our booked honeymoon suite after a 14-hour flight. Front desk gave our room to an executive and offered vouchers valid only next month.',
  },
  {
    sector: 'Automotive',
    label: 'Brake Failure Post-Service',
    description: 'Total brake hydraulic warning light flashing red and pedal sinks straight to the floor 2 hours after picking up vehicle from authorized $2,400 brake service.',
  },
  {
    sector: 'SaaS & Technology',
    label: 'Prod DB Deadlock Outage',
    description: 'Production database connection pool deadlocked during cyber week launch; 45,000 active checkout sessions failing with HTTP 504 and revenue loss climbing.',
  },
];

export const Hero = ({ onAnalyze, isProcessing }) => {
  const [selectedSector, setSelectedSector] = useState('E-commerce');
  const [issueText, setIssueText] = useState(PRESETS[0].description);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issueText.trim() || isProcessing) return;
    onAnalyze(selectedSector, issueText.trim());
  };

  const handleApplyPreset = (preset) => {
    setSelectedSector(preset.sector);
    setIssueText(preset.description);
  };

  return (
    <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 0' }}>
      {/* Top Floating Badge */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, rgba(229, 9, 20, 0.15), rgba(255, 94, 0, 0.15), rgba(255, 0, 127, 0.15))',
            border: '1px solid rgba(255, 0, 127, 0.4)',
            boxShadow: '0 0 25px rgba(255, 0, 127, 0.25)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ff007f',
              boxShadow: '0 0 10px #ff007f',
              animation: 'urgentPulse 1.2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#ff2a96',
            }}
          >
            NEXT-GEN AI RESOLUTION CORE
          </span>
          <span style={{ color: '#826c74', fontSize: '0.8rem' }}>•</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#ff7e26' }}>
            DUAL-MODEL FALLBACK READY
          </span>
        </div>
      </div>

      {/* Main Kinetic Headline */}
      <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto 24px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}
        >
          Autonomous Customer Intelligence at{' '}
          <span className="text-fire-gradient">Quantum Velocity</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: '#c9b1b8',
            lineHeight: 1.6,
            maxWidth: '740px',
            margin: '0 auto',
          }}
        >
          Transform volatile customer distress signals into high-precision operational remedies. Powered by{' '}
          <span style={{ color: '#ff7e26', fontWeight: 600 }}>Gemini 3.8 Flash</span> with instant zero-downtime fallback.
        </p>
      </div>

      {/* Interactive Live AI Console Card */}
      <div
        id="live-console"
        className="moving-border-card"
        style={{
          maxWidth: '920px',
          margin: '36px auto 0',
          padding: '36px',
          position: 'relative',
        }}
      >
        {isFocused && <div className="scanline-beam" />}

        {/* Console Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#ff5e00',
                boxShadow: '0 0 10px #ff5e00',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: '#fff',
              }}
            >
              Real-Time Issue Ingestion Console
            </span>
          </div>

          <span
            style={{
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: '#ff2a96',
              background: 'rgba(255, 0, 127, 0.12)',
              border: '1px solid rgba(255, 0, 127, 0.3)',
              padding: '4px 12px',
              borderRadius: '999px',
            }}
          >
            ACTIVE STREAM // LIVE AI
          </span>
        </div>

        {/* Sector Selection Pills */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: '#c9b1b8',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            1. Select Operational Sector:
          </label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {SECTORS.map((sec) => {
              const isSelected = selectedSector === sec.id;
              const IconComp = sec.icon;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSelectedSector(sec.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    color: isSelected ? '#ffffff' : '#c9b1b8',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(229, 9, 20, 0.8), rgba(255, 94, 0, 0.8))'
                      : 'rgba(25, 12, 20, 0.7)',
                    border: isSelected
                      ? '1px solid #ff007f'
                      : '1px solid rgba(255, 94, 0, 0.2)',
                    boxShadow: isSelected ? '0 0 20px rgba(255, 0, 127, 0.4)' : 'none',
                    transform: isSelected ? 'scale(1.03)' : 'none',
                  }}
                >
                  <IconComp size={15} color={isSelected ? '#ffffff' : '#ff7e26'} />
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scenario Presets Bar */}
        <div style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: '#c9b1b8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              2. Or Test High-Impact Presets:
            </span>
            <span style={{ fontSize: '0.74rem', color: '#ff7e26', fontFamily: 'var(--font-mono)' }}>
              1-CLICK AUTOFILL
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#fbebee',
                  backgroundColor: 'rgba(32, 14, 25, 0.65)',
                  border: '1px solid rgba(255, 94, 0, 0.22)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ff007f';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 0, 127, 0.35)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 94, 0, 0.22)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.color = '#fbebee';
                }}
              >
                <Zap size={12} color="#ff5e00" />
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <textarea
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={4}
              placeholder="Describe the raw customer problem or paste ticket transcript here..."
              style={{
                width: '100%',
                padding: '16px 18px',
                borderRadius: '14px',
                backgroundColor: 'rgba(10, 5, 9, 0.85)',
                border: isFocused
                  ? '1px solid #ff007f'
                  : '1px solid rgba(255, 94, 0, 0.3)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'vertical',
                boxShadow: isFocused
                  ? '0 0 25px rgba(255, 0, 127, 0.3), inset 0 0 12px rgba(229, 9, 20, 0.15)'
                  : 'none',
                transition: 'all 0.25s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '14px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#826c74',
                pointerEvents: 'none',
              }}
            >
              {issueText.length} characters
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#c9b1b8',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Cpu size={14} color="#ff7e26" />
              <span>Engine:</span>
              <span style={{ color: '#ff2a96', fontWeight: 600 }}>gemini-3.8-flash</span>
              <span style={{ color: '#826c74' }}>→ gemini-flash-latest</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !issueText.trim()}
              className="btn-futuristic"
              style={{
                opacity: isProcessing || !issueText.trim() ? 0.6 : 1,
                cursor: isProcessing || !issueText.trim() ? 'not-allowed' : 'pointer',
                padding: '14px 34px',
                fontSize: '1rem',
              }}
            >
              {isProcessing ? (
                <>
                  <RotateCw size={18} className="animate-spin" color="#fff" />
                  <span>Executing Neural Pipeline...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} color="#fff" />
                  <span>Analyze with Gemini AI</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Metrics Strip */}
      <div
        style={{
          maxWidth: '920px',
          margin: '32px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          { label: 'Neural Latency', val: '< 750ms', sub: 'Sub-second response' },
          { label: 'Triage Precision', val: '99.4%', sub: 'Schema constrained' },
          { label: 'Model Redundancy', val: 'Dual-Tier', sub: 'Instant fallback' },
          { label: 'Zero-Fabrication', val: '100%', sub: 'Deterministic audit' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(18, 8, 15, 0.65)',
              border: '1px solid rgba(255, 94, 0, 0.16)',
              textAlign: 'center',
            }}
          >
            <div
              className="text-fire-gradient"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.65rem',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '4px',
              }}
            >
              {stat.val}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff' }}>{stat.label}</div>
            <div style={{ fontSize: '0.72rem', color: '#826c74', fontFamily: 'var(--font-mono)' }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
