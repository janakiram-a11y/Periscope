import React from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { Utensils, AlertTriangle, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { a1FinanceDetail as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';
const L = formatINR;

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}
function Badge({ label, color, bg, size = 11 }) {
  return <span style={{ fontFamily: F, fontSize: size, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}

const STATUS_C = {
  'Cleared': { color: '#059669', bg: '#D1FAE5' },
  'Partial': { color: '#F97316', bg: '#FFEDD5' },
  'Overdue': { color: '#EF4444', bg: '#FEE2E2' },
};
const AGING_C = { low: '#059669', medium: '#EAB308', high: '#F97316', critical: '#EF4444' };

export default function A1Finance() {
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Finance · A1 Finance"
        title="A1 Finance — Canteen & Catering Services"
        subtitle={`AsramPortal · A1 Services vendor · 11 service channels · ${s.overdueInvoices} overdue invoices`}
        actions={
          <a href="https://login.orfus.in/asramportal" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: L(s.outstanding), label: 'Outstanding' }}
      />

      {/* Critical alert */}
      <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '4px solid #EF4444', borderRadius: 10 }}>
        <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{s.overdueInvoices} Overdue Invoices — Service Continuity Risk</div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>Nursing Canteen, Staff Canteen, Faculty Dining and Event Catering invoices overdue — vendor may suspend services if unresolved.</div>
        </div>
        <span style={{ fontSize: 22, fontWeight: 900, color: '#EF4444', flexShrink: 0, marginLeft: 'auto' }}>{s.overdueInvoices}</span>
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Services Value" value={L(s.totalServicesValue)} icon={Utensils}     color="#D97706" />
        <StatCard label="Outstanding"          value={L(s.outstanding)}        icon={Clock}        color="#EF4444" />
        <StatCard label="Overdue Invoices"     value={s.overdueInvoices}       icon={AlertTriangle} color="#EF4444" />
        <StatCard label="Settled This Month"   value={L(s.settledThisMonth)}   icon={CheckCircle}  color="#059669" />
      </div>

      {/* Channel breakdown */}
      <div>
        <SectionHeader title="Service Channel Breakdown — 11 Channels" sub="Billing and outstanding per A1 service channel" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Channel', 'Billed', 'Outstanding', 'Invoices', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.channels.map((c, i) => {
                const sc = STATUS_C[c.status] || STATUS_C['Partial'];
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: c.status === 'Overdue' ? '#FFF8F8' : i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 600, color: '#1F2937' }}>{c.channel}</td>
                    <td style={{ padding: '10px 16px', color: '#374151' }}>{L(c.billed)}</td>
                    <td style={{ padding: '10px 16px', fontWeight: 700, color: c.outstanding > 0 ? '#EF4444' : '#059669' }}>
                      {c.outstanding > 0 ? L(c.outstanding) : '—'}
                    </td>
                    <td style={{ padding: '10px 16px', color: '#6B7280' }}>{c.invoices}</td>
                    <td style={{ padding: '10px 16px' }}><Badge label={c.status} color={sc.color} bg={sc.bg} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Aging buckets */}
      <div>
        <SectionHeader title="Outstanding Aging Analysis" sub="Age profile of unpaid A1 invoices" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {D.agingBuckets.map(b => {
            const c = AGING_C[b.severity];
            return (
              <Card key={b.bucket} style={{ borderTop: `3px solid ${c}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 6 }}>{b.bucket}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: c }}>{b.count}</div>
                <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>invoices</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#374151', marginTop: 8 }}>{L(b.amount)}</div>
                <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>outstanding</div>
                <div style={{ marginTop: 10, padding: '4px 8px', background: `${c}18`, borderRadius: 6, display: 'inline-block' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c, textTransform: 'capitalize' }}>{b.severity} risk</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* College liability note */}
      <div style={{ padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderLeft: '4px solid #F59E0B', borderRadius: 10 }}>
        <div style={{ fontSize: 12, color: '#92400E', fontWeight: 500 }}>
          <strong>Note:</strong> A1 Services operates as a private vendor providing catering to all Asram institutions. Outstanding balances represent institutional liability — delays affect vendor continuity. Invoice approval TAT target: 7 days. Current avg: 4.2 days (on-track).
        </div>
      </div>

      <div style={{ height: 12 }} />
    </div>
  );
}
