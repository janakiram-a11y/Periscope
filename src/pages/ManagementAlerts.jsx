import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, ChevronRight, Filter } from 'lucide-react';
import { attentionItems, tatSlaData } from '../data/dashboardData';
import { useBreakpoint } from '../hooks/useBreakpoint';
import PageBanner from '../components/PageBanner';

const FONT = 'Montserrat, system-ui, sans-serif';
const NAVY = '#223F7F';

const SEVERITY = {
  critical: { bg: '#FEF2F2', border: '#FECACA', icon: '#DC2626', badge: '#FEE2E2', badgeText: '#991B1B', label: 'Critical', Icon: AlertTriangle },
  high:     { bg: '#FFFBEB', border: '#FDE68A', icon: '#D97706', badge: '#FEF3C7', badgeText: '#92400E', label: 'High',     Icon: AlertTriangle },
  medium:   { bg: '#F0F9FF', border: '#BAE6FD', icon: '#0284C7', badge: '#E0F2FE', badgeText: '#0369A1', label: 'Medium',   Icon: AlertCircle  },
  low:      { bg: '#F0FDF4', border: '#BBF7D0', icon: '#16A34A', badge: '#DCFCE7', badgeText: '#15803D', label: 'Low',      Icon: Info         },
};

const TYPE_LABEL = {
  financial:  'Financial',
  process:    'Process',
  operational:'Operational',
  compliance: 'Compliance',
};

function AlertCard({ item, onNavigate }) {
  const s = SEVERITY[item.severity] || SEVERITY.medium;
  const { Icon } = s;
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', minWidth: 0 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 0 1px ${s.border}` }}>
        <Icon size={18} color={s.icon} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: '#111827', wordBreak: 'break-word', minWidth: 0 }}>{item.title}</div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
            <span style={{ background: s.badge, color: s.badgeText, borderRadius: 99, padding: '2px 8px', fontFamily: FONT, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
              {s.label}
            </span>
            <span style={{ background: '#F3F4F6', color: '#6B7280', borderRadius: 99, padding: '2px 8px', fontFamily: FONT, fontSize: 10, fontWeight: 600 }}>
              {TYPE_LABEL[item.type] || item.type}
            </span>
          </div>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#374151', lineHeight: 1.6, marginBottom: 8, wordBreak: 'break-word' }}>
          {item.description}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}>
            <strong>Department:</strong> {item.department}
          </span>
          {item.age && item.age !== '—' && (
            <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}>
              <strong>Age:</strong> {item.age}
            </span>
          )}
          {item.count !== null && item.count !== undefined && (
            <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}>
              <strong>Count:</strong> {item.count}
            </span>
          )}
          {item.deptId && (
            <button
              onClick={() => onNavigate(item.deptId)}
              style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: `1px solid ${s.border}`, borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontFamily: FONT, fontSize: 11, fontWeight: 600, color: s.icon }}
            >
              View Module <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SlaRow({ row, i, isMobile }) {
  const slaColors = { breached: '#DC2626', warning: '#D97706', 'on-track': '#059669' };
  const slaBg     = { breached: '#FEF2F2', warning: '#FFFBEB', 'on-track': '#F0FDF4' };

  if (isMobile) {
    return (
      <div style={{ padding: '12px 14px', background: i % 2 === 0 ? 'white' : '#FAFAFA', borderRadius: i === 0 ? '10px 10px 0 0' : i === tatSlaData.length - 1 ? '0 0 10px 10px' : 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: '#111827', wordBreak: 'break-word' }}>{row.process}</div>
            <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{row.department} · {row.responsible}</div>
          </div>
          <span style={{ background: slaBg[row.status], color: slaColors[row.status], borderRadius: 99, padding: '3px 10px', fontFamily: FONT, fontSize: 10.5, fontWeight: 700, textTransform: 'capitalize', flexShrink: 0 }}>
            {row.status === 'on-track' ? 'On Track' : row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}><strong>Current:</strong> {row.currentTAT}</span>
          <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}><strong>Target:</strong> {row.targetTAT}</span>
          {row.breach && <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: '#DC2626' }}><strong>Variance:</strong> {row.breach}</span>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 0.8fr 1fr', gap: 8, padding: '10px 14px', alignItems: 'center', background: i % 2 === 0 ? 'white' : '#FAFAFA', borderRadius: i === 0 ? '10px 10px 0 0' : i === tatSlaData.length - 1 ? '0 0 10px 10px' : 0 }}>
      <div>
        <div style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: '#111827' }}>{row.process}</div>
        <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{row.department} · {row.responsible}</div>
      </div>
      <div style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 700, color: '#374151', textAlign: 'center' }}>{row.currentTAT}</div>
      <div style={{ fontFamily: FONT, fontSize: 12, color: '#6B7280', textAlign: 'center' }}>{row.targetTAT}</div>
      <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: row.breach ? '#DC2626' : '#059669', textAlign: 'center' }}>
        {row.breach || '—'}
      </div>
      <div style={{ textAlign: 'center' }}>
        <span style={{ background: slaBg[row.status], color: slaColors[row.status], borderRadius: 99, padding: '3px 10px', fontFamily: FONT, fontSize: 10.5, fontWeight: 700, textTransform: 'capitalize' }}>
          {row.status === 'on-track' ? 'On Track' : row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      </div>
    </div>
  );
}

export default function ManagementAlerts({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const { isMobile, isTablet } = useBreakpoint();

  const filtered = filter === 'all' ? attentionItems : attentionItems.filter(a => a.severity === filter);
  const counts = {
    critical: attentionItems.filter(a => a.severity === 'critical').length,
    high:     attentionItems.filter(a => a.severity === 'high').length,
    medium:   attentionItems.filter(a => a.severity === 'medium').length,
  };
  const slaBreached = tatSlaData.filter(r => r.status === 'breached');

  const contentPadding = isMobile ? '20px 16px' : '28px 32px';

  const bannerStats = (
    <div style={{ display: 'flex', gap: isMobile ? 8 : 10, flexWrap: 'wrap', marginTop: 10 }}>
      {[
        { label: 'Critical',     value: counts.critical,    color: '#FCA5A5' },
        { label: 'High',         value: counts.high,        color: '#FCD34D' },
        { label: 'Medium',       value: counts.medium,      color: '#93C5FD' },
        { label: 'SLA Breached', value: slaBreached.length, color: '#F9A8D4' },
      ].map((k, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 10,
          padding: isMobile ? '8px 12px' : '10px 16px',
        }}>
          <div style={{ fontFamily: FONT, fontSize: isMobile ? 20 : 24, fontWeight: 800, color: k.color, lineHeight: 1.1 }}>{k.value}</div>
          <div style={{ fontFamily: FONT, fontSize: 10.5, color: 'rgba(255,255,255,.65)', marginTop: 3 }}>{k.label}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: FONT, minHeight: '100%', background: '#F8FAFC' }}>
      <div style={{ padding: isMobile ? '20px 16px' : '28px 32px 0' }}>
        <PageBanner
          crumb="MANAGEMENT DASHBOARD"
          title="Alerts Centre"
          actions={bannerStats}
        />
      </div>

      <div style={{ padding: contentPadding, maxWidth: 1100 }}>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {[
            { key: 'all',      label: `All (${attentionItems.length})` },
            { key: 'critical', label: `Critical (${counts.critical})` },
            { key: 'high',     label: `High (${counts.high})` },
            { key: 'medium',   label: `Medium (${counts.medium})` },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                fontFamily: FONT, fontSize: 12, fontWeight: 700,
                padding: '7px 16px', borderRadius: 99, border: 'none', cursor: 'pointer',
                background: filter === f.key ? NAVY : 'white',
                color: filter === f.key ? 'white' : '#374151',
                boxShadow: '0 1px 3px rgba(0,0,0,.08)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Alert cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {filtered.map(item => (
            <AlertCard key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </div>

        {/* SLA Table */}
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
          SLA & TAT Monitoring
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,.07)', overflow: 'hidden', minWidth: isMobile ? 'unset' : 560 }}>
            {/* Header — hidden on mobile, rows use card layout instead */}
            {!isMobile && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 0.8fr 1fr', gap: 8, padding: '10px 14px', background: '#F3F4F6', borderBottom: '1px solid #E5E7EB' }}>
                {['Process', 'Current TAT', 'Target', 'Variance', 'Status'].map((h, i) => (
                  <div key={i} style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, color: '#6B7280', textAlign: i > 0 ? 'center' : 'left', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </div>
                ))}
              </div>
            )}
            {tatSlaData.map((row, i) => <SlaRow key={i} row={row} i={i} isMobile={isMobile} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
