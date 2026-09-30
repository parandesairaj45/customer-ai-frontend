import React from 'react';
import { Flame, Cpu, ArrowRight } from 'lucide-react';

export const Navbar = ({ onScrollToConsole }) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: 'rgba(8, 4, 7, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 94, 0, 0.15)',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logomark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
          <div
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #e50914 0%, #ff5e00 50%, #ff007f 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(255, 0, 127, 0.5), 0 0 12px rgba(229, 9, 20, 0.4)',
            }}
          >
            <Flame size={24} color="#ffffff" />
            <div
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.35rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: '#ffffff' }}>RESOX</span>
              <span className="text-fire-gradient">// AI</span>
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: '#ff7e26',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Customer Resolution Core
            </div>
          </div>
        </div>

        {/* Live Engine Status Beacon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(255, 94, 0, 0.08)',
            border: '1px solid rgba(255, 94, 0, 0.28)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'flex',
              width: '8px',
              height: '8px',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: '#ff007f',
                opacity: 0.75,
                animation: 'urgentPulse 1.4s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                width: '8px',
                height: '8px',
                backgroundColor: '#ff5e00',
              }}
            />
          </span>
          <span style={{ color: '#fbebee' }}>AI CORE:</span>
          <span style={{ color: '#ff2a96', fontWeight: 600 }}>GEMINI 3.8 FLASH</span>
          <span style={{ color: '#826c74', fontSize: '0.72rem' }}>[FALLBACK READY]</span>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onScrollToConsole} className="btn-futuristic">
            <span>Analyze Ticket</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
