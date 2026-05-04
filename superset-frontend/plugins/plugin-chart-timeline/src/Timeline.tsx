import React, { useState } from 'react';

type Journey = {
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
heading?: string;
description?: string;
sideText?: string;
};

const stepMeta: Record<string, { emoji: string }> = {
login: { emoji: '🔐' },
view: { emoji: '👁' },
booked: { emoji: '📅' },
confirmed: { emoji: '✅' },
completed: { emoji: '🎉' },
};

export default function Timeline({
journeys = [],
summary,
heading = 'Patient Journey Reconstruction',
description = 'End-to-end paths users take',
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
overflowY: 'auto',
background: '#f7f9fc',

    // 🔥 TOP SPACE FIX
    paddingTop: 370,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  }}
>
  {/* 🔥 TOP PANEL */}
  <div
    style={{
      background: '#ffffff',
      borderRadius: 12,
      padding: 16,

      marginTop: 12,     // 🔥 extra spacing from top
      marginBottom: 16,

      border: '1px solid #e5e7eb',
    }}
  >
    {/* HEADER */}
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{heading}</div>
      <div style={{ fontSize: 12, color: '#64748b' }}>
        {description}
      </div>
    </div>

    {/* INFO PANEL */}
    <div
      style={{
        background: '#f1f5f9',
        padding: 10,
        borderRadius: 8,
        fontSize: 12,
        marginBottom: 12,
      }}
    >
      {sideText}
    </div>

    {/* FILTER + SUMMARY */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {['all', 'high', 'low'].map(f => (
        <button
          key={f}
          onClick={() => setFilter(f as 'all' | 'high' | 'low')}
          style={{
            padding: '5px 12px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            background: filter === f ? '#3b82f6' : '#e5e7eb',
            color: filter === f ? '#fff' : '#000',
          }}
        >
          {f}
        </button>
      ))}

      <div style={{ marginLeft: 'auto', fontSize: 12 }}>
        Journeys: {summary?.totalJourneys || 0} | Users: {journeys.length} | Conversion:{' '}
        {summary?.avgConversion || 0}%
      </div>
    </div>
  </div>

  {/* 🔥 JOURNEY LIST */}
  <div>
    {filtered.length === 0 && (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        No data
      </div>
    )}

    {filtered.map((j, index) => (
      <div
        key={index}
        style={{
          borderRadius: 12,
          padding: 14,
          marginBottom: 12,
          background: '#ffffff',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* STEPS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {index + 1}
          </div>

          {j.steps.map((step, i) => {
            const meta = stepMeta[step] || { emoji: '📍' };

            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    background: '#f1f5f9',
                    padding: '5px 8px',
                    borderRadius: 999,
                    fontSize: 11,
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
          Users: {j.users} | Avg: {j.avgTime} |{' '}
          <span
            style={{
              fontWeight: 600,
              color:
                j.conversion >= 70
                  ? 'green'
                  : j.conversion >= 40
                  ? 'orange'
                  : 'red',
            }}
          >
            {j.conversion}%
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

);
}
