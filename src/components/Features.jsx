import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Workflow, 
  BarChart3, 
  Gauge, 
  Compass, 
  Repeat
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Dual-Engine Model Fallback',
    tag: 'HIGH-AVAILABILITY ARCHITECTURE',
    desc: 'Intelligent multi-tier fallback orchestrator queries gemini-3.8-flash first; on quota limits or latency spikes, seamlessly switches to gemini-flash-latest with zero dropped requests.',
    icon: Repeat,
    metric: '99.99% Reliability',
  },
  {
    title: 'Zero-Fabrication Schema Guard',
    tag: 'STRICT JSON VALIDATION',
    desc: 'Every generation is constrained by native Gemini Type.OBJECT schemas and verified with Zod runtimes. Hallucinations and unstructured text are mathematically barred.',
    icon: ShieldCheck,
    metric: '100% Deterministic',
  },
  {
    title: 'Multi-Sector Domain Taxonomy',
    tag: 'CROSS-INDUSTRY PRECISION',
    desc: 'Context-calibrated for E-commerce shipping defects, Hospitality VIP reservations, Automotive mechanical diagnostics, and SaaS infrastructure outages.',
    icon: Compass,
    metric: '8+ Tailored Sectors',
  },
  {
    title: 'Sub-Second Sentiment Physics',
    tag: 'EMOTIONAL VALENCE SCALING',
    desc: 'Computes customer churn probability, urgency vectors, and emotional intensity to immediately surface urgent tickets for priority escalation.',
    icon: Zap,
    metric: '<800ms Average Turnaround',
  },
];

export const Features = () => {
  return (
    <section style={{ maxWidth: '1240px', margin: '90px auto 0', padding: '0 24px' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(255, 0, 127, 0.1)',
            border: '1px solid rgba(255, 0, 127, 0.35)',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: '#ff2a96',
            fontWeight: 600,
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}
        >
          <Cpu size={14} />
          QUANTUM ARCHITECTURE HIGHLIGHTS
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '14px',
          }}
        >
          Engineered for <span className="text-fire-gradient">Volatile Customer Inquiries</span>
        </h2>

        <p
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            color: '#c9b1b8',
            fontSize: '1.05rem',
          }}
        >
          Traditional support bots reply with generic platitudes. ResoX AI calculates the exact operational protocol required to prevent customer churn.
        </p>
      </div>

      {/* Grid of 4 Moving-Border Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {FEATURES.map((item, idx) => (
          <div
            key={item.title}
            className="moving-border-card"
            style={{
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.25), rgba(255, 94, 0, 0.2), rgba(255, 0, 127, 0.25))',
                    border: '1px solid rgba(255, 94, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 18px rgba(255, 94, 0, 0.2)',
                  }}
                >
                  {React.createElement(item.icon, { size: 22, color: '#ff5e00' })}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#ff2a96',
                    letterSpacing: '0.04em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 0, 127, 0.12)',
                    border: '1px solid rgba(255, 0, 127, 0.25)',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#c9b1b8',
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </div>

            <div
              style={{
                marginTop: '28px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 94, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.78rem', color: '#826c74', fontFamily: 'var(--font-mono)' }}>
                BENCHMARK
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: '#ff7e26',
                }}
              >
                {item.metric}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
