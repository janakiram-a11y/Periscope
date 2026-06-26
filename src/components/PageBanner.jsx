import React from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const FONT = 'Montserrat, system-ui, sans-serif';

export default function PageBanner({ crumb, title, subtitle, actions, stat }) {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{
      background: 'linear-gradient(135deg, #223F7F 0%, #1A5FA8 100%)',
      borderRadius: 16,
      padding: isMobile ? '24px 20px' : '28px 32px',
      color: 'white',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -32, right: -32,
        width: 160, height: 160, borderRadius: '50%',
        background: 'rgba(255,255,255,.05)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -48, right: 120,
        width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(255,255,255,.03)', pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: isMobile ? 12 : 0,
        position: 'relative',
      }}>
        <div>
          {crumb && (
            <div style={{
              fontFamily: FONT, fontSize: 10, fontWeight: 700,
              color: '#93C5FD', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 6,
            }}>{crumb}</div>
          )}
          <h1 style={{
            fontFamily: FONT,
            fontSize: isMobile ? 20 : 24,
            fontWeight: 700,
            color: 'white', lineHeight: 1.2, marginBottom: subtitle ? 5 : 0,
          }}>{title}</h1>
          {subtitle && (
            <p style={{
              fontFamily: FONT, fontSize: 12, color: 'rgba(255,255,255,.7)', margin: 0,
            }}>{subtitle}</p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
          {stat && (
            <div style={{ textAlign: isMobile ? 'left' : 'right', marginRight: 4 }}>
              <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 800, color: 'white', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: FONT, fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{stat.label}</div>
            </div>
          )}
          {actions && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
