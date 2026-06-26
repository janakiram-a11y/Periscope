import React from 'react';

const FONT = 'Montserrat, system-ui, sans-serif';

export default function StatCard({ label, value, sub, icon: Icon, color = '#374151' }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 12,
      padding: '20px 20px',
      boxShadow: '0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.1)',
      border: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: FONT,
          fontSize: 12, color: '#6B7280', fontWeight: 500,
          lineHeight: 1.4, flex: 1, paddingRight: 8,
        }}>{label}</span>
        {Icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: color + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={18} color={color} />
          </div>
        )}
      </div>
      <div style={{
        fontFamily: FONT,
        fontSize: 30, fontWeight: 800,
        color: color,
        letterSpacing: '-0.5px', lineHeight: 1,
      }}>{value}</div>
      {sub && (
        <div style={{
          fontFamily: FONT,
          fontSize: 11, color: '#9CA3AF', fontWeight: 400,
        }}>{sub}</div>
      )}
    </div>
  );
}
