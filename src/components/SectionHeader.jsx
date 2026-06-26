import React from 'react';

const FONT = 'Montserrat, system-ui, sans-serif';

export default function SectionHeader({ title, sub, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', marginBottom: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 4, height: 20, borderRadius: 9999,
          background: '#223F7F', flexShrink: 0,
        }} />
        <div>
          <h2 style={{
            fontFamily: FONT,
            fontSize: 15, fontWeight: 700,
            color: '#1F2937', lineHeight: 1.3,
          }}>{title}</h2>
          {sub && (
            <p style={{
              fontFamily: FONT,
              fontSize: 11, color: '#9CA3AF',
              marginTop: 2, fontWeight: 400,
            }}>{sub}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
