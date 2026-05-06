import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

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
  heading,
  description,
}: Props) {
  const [filter, setFilter] = useState<
    'all' | 'high' | 'low'
  >('all');

  // 🔥 Hover Journey
  const [hoveredJourney, setHoveredJourney] =
    useState<number | null>(null);

  const [scrollPercent, setScrollPercent] =
    useState(0);

  const [isAtTop, setIsAtTop] =
    useState(true);

  const [isAtBottom, setIsAtBottom] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const filtered = journeys.filter(j => {
    if (filter === 'high')
      return j.conversion >= 70;

    if (filter === 'low')
      return j.conversion < 40;

    return true;
  });

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;

    if (!el) return;

    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = el;

    const maxScroll =
      scrollHeight - clientHeight;

    const pct =
      maxScroll > 0
        ? scrollTop / maxScroll
        : 0;

    setScrollPercent(Math.round(pct * 100));

    setIsAtTop(scrollTop <= 1);

    setIsAtBottom(
      scrollTop >= maxScroll - 1,
    );
  }, []);

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    el.addEventListener(
      'scroll',
      updateScrollState,
      { passive: true },
    );

    updateScrollState();

    return () =>
      el.removeEventListener(
        'scroll',
        updateScrollState,
      );
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

  const btnStyle = (
    disabled: boolean,
  ): React.CSSProperties => ({
    width: 34,
    height: 34,
    borderRadius: 8,
    border: '1px solid #e5e7eb',

    background: disabled
      ? '#f9fafb'
      : '#f1f5f9',

    color: disabled
      ? '#d1d5db'
      : '#374151',

    cursor: disabled
      ? 'not-allowed'
      : 'pointer',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: 16,
    fontWeight: 700,

    transition: 'background 0.15s',
  });

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#f7f9fc',
      }}
    >
      {/* ───────── MAIN AREA ───────── */}
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
        {/* ───────── TOP PANEL ───────── */}
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
          {/* Heading */}
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {heading || 'Heading'}
            </div>

            <div
              style={{
                fontSize: 13,
                color: '#64748b',
              }}
            >
              {description || 'Description'}
            </div>
          </div>

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {/* Summary */}
            <div
              style={{
                fontSize: 12,
                color: '#475569',
                fontWeight: 600,
              }}
            >
              Journeys:{' '}
              {summary?.totalJourneys || 0}
              {'  '}| Users:{' '}
              {journeys.length}
              {'  '}| Conversion:{' '}
              {summary?.avgConversion || 0}%
            </div>

            {/* Right Side Filters */}
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              {(
                ['all', 'high', 'low'] as const
              ).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,

                    border:
                      filter === f
                        ? '1px solid #6ee7b7'
                        : '1px solid #d1d5db',

                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,

                    background:
                      filter === f
                        ? '#dcfce7'
                        : '#ffffff',

                    color:
                      filter === f
                        ? '#047857'
                        : '#475569',
                  }}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ───────── JOURNEY LIST ───────── */}

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              marginTop: 40,
              color: '#94a3b8',
            }}
          >
            No data
          </div>
        )}

        {filtered.map((j, index) => (
          <div
            key={index}
            onMouseEnter={() =>
              setHoveredJourney(index)
            }
            onMouseLeave={() =>
              setHoveredJourney(null)
            }
            style={{
              borderRadius: 14,
              padding: 14,
              marginBottom: 12,

              background:
                hoveredJourney === index
                  ? '#f0fdf4'
                  : '#ffffff',

              border:
                hoveredJourney === index
                  ? '1px solid #6ee7b7'
                  : '1px solid #e5e7eb',

              boxShadow:
                '0 1px 2px rgba(0,0,0,0.04)',

              cursor: 'pointer',

              transition:
                'all 0.2s ease',
            }}
          >
            {/* Steps */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                alignItems: 'center',
              }}
            >
              {/* Index */}
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: '#dbeafe',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  fontSize: 11,
                  fontWeight: 700,

                  color: '#1d4ed8',

                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>

              {/* Steps */}
              {j.steps.map((step, i) => {
                const meta =
                  stepMeta[step] || {
                    emoji: '📍',
                  };

                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        background: '#f1f5f9',
                        padding: '6px 10px',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 500,
                      }}
                    >
                      {meta.emoji} {step}
                    </span>

                    {i !==
                      j.steps.length - 1 && (
                      <span
                        style={{
                          margin: '0 4px',
                          color: '#94a3b8',
                        }}
                      >
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Metrics */}
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: '#475569',
              }}
            >
              Users: {j.users}
              {'  '}| Avg: {j.avgTime}
              {'  '}|{' '}
              <span
                style={{
                  fontWeight: 700,

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

        <div style={{ height: 40 }} />
      </div>

      {/* ───────── RIGHT SCROLL BAR ───────── */}
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
        {/* Top */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <button
            onClick={scrollToTop}
            disabled={isAtTop}
            title="Go to top"
            style={btnStyle(isAtTop)}
          >
            ⤒
          </button>

          <button
            onClick={scrollUp}
            disabled={isAtTop}
            title="Scroll up"
            style={btnStyle(isAtTop)}
          >
            ↑
          </button>
        </div>

        {/* Percent */}
        <div
          style={{
            fontSize: 10,
            color: '#6b7280',
            fontWeight: 700,
          }}
        >
          {scrollPercent}%
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <button
            onClick={scrollDown}
            disabled={isAtBottom}
            title="Scroll down"
            style={btnStyle(isAtBottom)}
          >
            ↓
          </button>

          <button
            onClick={scrollToBottom}
            disabled={isAtBottom}
            title="Go to bottom"
            style={btnStyle(isAtBottom)}
          >
            ⤓
          </button>
        </div>
      </div>
    </div>
  );
}