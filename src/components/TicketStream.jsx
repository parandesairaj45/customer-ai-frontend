import React from 'react';
import { Flame, ArrowUpRight, Clock, Tag, Activity } from 'lucide-react';

const LIVE_STREAM_ITEMS = [
  {
    id: 'TICK-8041',
    sector: 'E-commerce',
    title: 'Damaged High-End GPU Shipment',
    snippet: 'Workstation RTX 4090 delivered with smashed cooler; bot declined refund claims.',
    priority: 'urgent',
    sentiment: 'Frustrated & Dissatisfied',
    time: '2m ago',
  },
  {
    id: 'TICK-8040',
    sector: 'Hospitality',
    title: 'Honeymoon Suite Bumped & Reallocated',
    snippet: 'Presidential suite given to executive walk-in; guest left without accommodation.',
    priority: 'urgent',
    sentiment: 'Distressed & Angry',
    time: '5m ago',
  },
  {
    id: 'TICK-8039',
    sector: 'Automotive',
    title: 'Brake Hydraulic Loss on Highway Exit',
    snippet: 'Warning indicator triggered right after $2,400 dealer maintenance service.',
    priority: 'urgent',
    sentiment: 'Extremely Alarmed',
    time: '8m ago',
  },
  {
    id: 'TICK-8038',
    sector: 'SaaS & Technology',
    title: 'Cloud DB Pool Lockup in Black Friday Surge',
    snippet: '45,000 checkout attempts failing with HTTP 504 gateway deadlocks.',
    priority: 'high',
    sentiment: 'Urgent & Anxious',
    time: '12m ago',
  },
  {
    id: 'TICK-8037',
    sector: 'Finance & Banking',
    title: 'Unauthorized Wire Transfer Frozen',
    snippet: 'Foreign exchange wire of $14,500 blocked without 2FA security notification.',
    priority: 'high',
    sentiment: 'Panicked & Inquisitive',
    time: '18m ago',
  },
];

export const TicketStream = ({ onSelectTicket }) => {
  return (
    <section style={{ maxWidth: '1240px', margin: '90px auto 0', padding: '0 24px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(255, 94, 0, 0.1)',
              border: '1px solid rgba(255, 94, 0, 0.3)',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              color: '#ff7e26',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ff5e00',
                animation: 'urgentPulse 1.4s infinite',
              }}
            />
            LIVE TELEMETRY STREAM
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Real-Time Sector Incident Radar
          </h2>
        </div>

        <span
          style={{
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            color: '#826c74',
          }}
        >
          CLICK ANY STREAM ITEM TO RUN DEEP NEURAL TRIAGE
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '18px',
        }}
      >
        {LIVE_STREAM_ITEMS.map((item) => (
          <div
            key={item.id}
            className="moving-border-card"
            onClick={() => onSelectTicket(item)}
            style={{
              padding: '22px',
              cursor: 'pointer',
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
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: '#ff7e26',
                  }}
                >
                  {item.id}
                </span>

                <span
                  className={item.priority === 'urgent' ? 'badge-urgent' : 'badge-high'}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.priority}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </h4>

              <p
                style={{
                  fontSize: '0.84rem',
                  color: '#c9b1b8',
                  lineHeight: 1.5,
                  marginBottom: '14px',
                }}
              >
                {item.snippet}
              </p>
            </div>

            <div
              style={{
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 94, 0, 0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ color: '#ff2a96', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={12} />
                {item.sentiment}
              </span>
              <span style={{ color: '#826c74', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
