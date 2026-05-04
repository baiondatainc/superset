import React from 'react';

type Props = {
  title?: string;
  value?: number;
  prevValue?: number;
  icon?: string;
};

const Icon = ({ type, color }: any) => {
  const size = 20;

  switch (type) {
    case 'error':
      return (
        <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2zm0 14h-1v-4h2v4h-1zm0 4h-1v-2h2v2h-1z" />
        </svg>
      );

    case 'user':
      return (
        <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
        </svg>
      );

    case 'clock':
      return (
        <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
          <path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm1 11h-4V6h2v4h2z" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
          <path d="M3 13h2v-2H3v2zm4 0h14v-2H7v2z" />
        </svg>
      );
  }
};

export default function EchartsKpi(props: Props) {
  const value = Number(props.value ?? 0);
  const prev = Number(props.prevValue ?? 0);

  const percent =
    prev > 0 ? (((value - prev) / prev) * 100).toFixed(1) : '0';

  const isUp = value > prev;
  const isDown = value < prev;

  const color = isUp ? '#16a34a' : isDown ? '#dc2626' : '#64748b';
  const bg = isUp ? '#ecfdf5' : isDown ? '#fef2f2' : '#f1f5f9';

  return (
    <div
      style={{
        borderRadius: 12,
        padding: 16,
        background: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
      }}
    >
      {/* ICON */}
      <div
        style={{
          background: bg,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Icon type={props.icon || 'user'} color={color} />
      </div>

      {/* CONTENT */}
      <div style={{ textAlign: 'right', flex: 1, marginLeft: 12 }}>
        <div style={{ fontSize: 13, color: '#64748b' }}>
          {props.title}
        </div>

        <div style={{ fontSize: 26, fontWeight: 600 }}>
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </div>

        <div style={{ fontSize: 12, color }}>
          {isUp ? '↑' : isDown ? '↓' : '→'} {percent}% vs prev period
        </div>
      </div>
    </div>
  );
}