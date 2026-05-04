import React, { useState, useRef, useEffect, useCallback } from 'react';

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
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = journeys.filter(j => {
    if (filter === 'high') return j.conversion >= 70;
    if (filter === 'low') return j.conversion < 40;
    return true;
  });

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    const pct = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollPercent(Math.round(pct * 100));
    setIsAtTop(scrollTop <= 1);
    setIsAtBottom(scrollTop >= maxScroll - 1);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setTimeout(updateScrollState, 50);
  }, [filter, updateScrollState]);

  const scrollUp = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop -= 200;
    setTimeout(updateScrollState, 50);
  };

  const scrollDown = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop += 200;
    setTimeout(updateScrollState, 50);
  };

  const scrollToTop = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setTimeout(updateScrollState, 50);
  };

  const scrollToBottom = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setTimeout(updateScrollState, 50);
  };

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: 34,
    height: 34,
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: disabled ? '#f9fafb' : '#f1f5f9',
    color: disabled ? '#d1d5db' : '#374151',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 700,
    transition: 'background 0.15s',
  });

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: '#f7f9fc' }}>

      {/* ── MAIN SCROLL AREA ── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'scroll',
          padding: '12px',
          paddingTop: 120,
          boxSizing: 'border-box',
        }}
      >
        {/* TOP PANEL */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 12,
            padding: 16,
            marginTop: 12,
            marginBottom: 16,
            border: '1px solid #e5e7eb',
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{heading}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{description}</div>
          </div>

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

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {(['all', 'high', 'low'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
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
              Journeys: {summary?.totalJourneys || 0} | Users: {journeys.length} | Conversion: {summary?.avgConversion || 0}%
            </div>
          </div>
        </div>

        {/* JOURNEY LIST */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 40, color: '#94a3b8' }}>No data</div>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
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
                  flexShrink: 0,
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
                      <span style={{ margin: '0 4px', color: '#94a3b8' }}>→</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 8, fontSize: 12 }}>
              Users: {j.users} | Avg: {j.avgTime} |{' '}
              <span
                style={{
                  fontWeight: 600,
                  color: j.conversion >= 70 ? 'green' : j.conversion >= 40 ? 'orange' : 'red',
                }}
              >
                {j.conversion}%
              </span>
            </div>
          </div>
        ))}

        <div style={{ height: 40 }} />
      </div>

      {/* ── SCROLL NAV BAR ── */}
      <div
        style={{
          width: 48,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          background: '#ffffff',
          borderLeft: '1px solid #e5e7eb',
        }}
      >
        {/* Top buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <button onClick={scrollToTop} disabled={isAtTop} title="Go to top" style={btnStyle(isAtTop)}>
            ⤒
          </button>
          <button onClick={scrollUp} disabled={isAtTop} title="Scroll up" style={btnStyle(isAtTop)}>
            ↑
          </button>
        </div>

        {/* Percent */}
        <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600 }}>
          {scrollPercent}%
        </div>

        {/* Bottom buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <button onClick={scrollDown} disabled={isAtBottom} title="Scroll down" style={btnStyle(isAtBottom)}>
            ↓
          </button>
          <button onClick={scrollToBottom} disabled={isAtBottom} title="Go to bottom" style={btnStyle(isAtBottom)}>
            ⤓
          </button>
        </div>
      </div>
    </div>
  );
}