import React, { useState } from 'react';

type Journey = {
  sessionId: string;
  steps: string[];
  users: number;
  avgTime: string;
  conversion: number;
};

type Props = {
  journeys: Journey[];
  summary?: {
    totalJourneys: number;
    avgConversion: number;
  };

  // 🔥 MANUAL TEXTS
  heading?: string;
  description?: string;
  sideText?: string;
};

const stepMeta: any = {
  login: { emoji: '🔐' },
  view: { emoji: '👁' },
  booked: { emoji: '📅' },
  confirmed: { emoji: '✅' },
  completed: { emoji: '🎉' },
};

export default function Timeline({
  journeys = [],
  summary,
  heading = 'Dashboard',
  description = 'Overview',
  sideText = 'Details panel',
}: Props) {
  const [filter, setFilter] = useState<'all' | 'high' | 'low'>('all');

  const filtered = journeys.filter(j => {
    if (filter === 'high') return j.conversion >= 70;
    if (filter === 'low') return j.conversion < 40;
    return true;
  });

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#f8fafc',
      }}
    >
      {/* 🔥 TOP HEADER */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #e5e7eb',
          background: '#fff',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600 }}>{heading}</div>
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          {description}
        </div>
      </div>

      {/* 🔥 MAIN LAYOUT */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* 🔥 LEFT SIDE PANEL */}
        <div
          style={{
            width: 260,
            borderRight: '1px solid #e5e7eb',
            padding: 16,
            background: '#fff',
          }}
        >
          <div
            style={{
              background: '#f1f5f9',
              padding: 12,
              borderRadius: 8,
              fontSize: 13,
            }}
          >
            {sideText}
          </div>

          {/* 🔥 FILTER */}
          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 8, fontSize: 12, color: '#6b7280' }}>
              Filter
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              {['all', 'high', 'low'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    background:
                      filter === f
                        ? f === 'low'
                          ? '#22c55e'
                          : '#3b82f6'
                        : '#e5e7eb',
                    color: filter === f ? '#fff' : '#000',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* 🔥 SUMMARY */}
            <div style={{ marginTop: 12, fontSize: 12 }}>
              <div>Journeys: {summary?.totalJourneys || 0}</div>
              <div>Users: {journeys.length}</div>
              <div>Conversion: {summary?.avgConversion || 0}%</div>
            </div>
          </div>
        </div>

        {/* 🔥 RIGHT SIDE CONTENT */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 16,

            // 🔥 SCROLL FIX
            height: 'calc(100vh - 180px)',
          }}
        >
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
              No data
            </div>
          )}

          {filtered.map((j, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                padding: 14,
                marginBottom: 12,
                background: '#fff',
              }}
            >
              {/* STEPS */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {j.steps.map((step, i) => {
                  const meta = stepMeta[step] || { emoji: '📍' };

                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          background: '#f1f5f9',
                          padding: '5px 8px',
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      >
                        {meta.emoji} {step}
                      </span>

                      {i !== j.steps.length - 1 && (
                        <span style={{ margin: '0 4px' }}>→</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* METRICS */}
              <div style={{ marginTop: 8, fontSize: 12 }}>
                {j.users} | {j.avgTime} |{' '}
                <span
                  style={{
                    color:
                      j.conversion >= 70
                        ? 'green'
                        : j.conversion >= 40
                        ? 'orange'
                        : 'red',
                    fontWeight: 600,
                  }}
                >
                  {j.conversion}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}