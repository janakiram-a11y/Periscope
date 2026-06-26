import React from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { IndianRupee, AlertTriangle, Clock, CheckCircle, ChevronLeft, Utensils } from 'lucide-react';
import { formatINR } from '../../utils/format';
import { a1FinanceDetail } from '../../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}

function Badge({ label, color, bg }) {
  return <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}

function CssBar({ pct, color = '#223F7F', height = 6 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

export default function A1FinanceDept({ onBack }) {
  const d = a1FinanceDetail;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · A1 Finance"
        title="A1 Services — Canteen & Vendor Finance"
        subtitle="External canteen vendor · 11 revenue channels · College payable (liability) management"
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: formatINR(d.summary.outstanding), label: 'Outstanding Payable' }}
      />

      {/* Note */}
      <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: '#FFF7ED', border: '1px solid #FED7AA', borderLeft: '4px solid #F97316', borderRadius: 10 }}>
        <AlertTriangle size={16} color="#F97316" style={{ flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 12, color: '#92400E', fontWeight: 500 }}>
          A1 Services is an external vendor. The amounts shown represent <strong>college liability</strong> — what Asram Colleges owes A1 for canteen services, hostel meals, and other provisions. This is NOT revenue to the college.
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Services Value"  value={formatINR(d.summary.totalServicesValue)} icon={IndianRupee}   color="#223F7F" />
        <StatCard label="Outstanding Payable"   value={formatINR(d.summary.outstanding)}        icon={AlertTriangle} color="#EF4444" />
        <StatCard label="Overdue Invoices"      value={d.summary.overdueInvoices}               icon={Clock}         color="#F97316" />
        <StatCard label="Settled This Month"    value={formatINR(d.summary.settledThisMonth)}   icon={CheckCircle}   color="#059669" />
      </div>

      {/* Revenue channels */}
      <div>
        <SectionHeader title="11 Revenue Channels" sub="A1 service categories — value billed vs outstanding" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {d.channels.map(({ channel, billed, outstanding, invoices, status }) => (
            <Card key={channel} style={{ padding: '14px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Utensils size={14} color="#6B7280" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{channel}</span>
                </div>
                <Badge
                  label={status}
                  color={status === 'Cleared' ? '#059669' : status === 'Partial' ? '#F97316' : '#EF4444'}
                  bg={status === 'Cleared' ? '#D1FAE5' : status === 'Partial' ? '#FFEDD5' : '#FEE2E2'}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6B7280', marginBottom: 6 }}>
                <span>Billed: <strong style={{ color: '#374151' }}>{formatINR(billed)}</strong></span>
                <span>Outstanding: <strong style={{ color: outstanding > 0 ? '#EF4444' : '#059669' }}>{formatINR(outstanding)}</strong></span>
                <span>{invoices} invoices</span>
              </div>
              <CssBar
                pct={outstanding > 0 ? Math.round((outstanding / billed) * 100) : 0}
                color={outstanding > 0 ? '#EF4444' : '#D1FAE5'}
                height={4}
              />
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3 }}>
                {outstanding > 0 ? `${Math.round((outstanding / billed) * 100)}% outstanding` : 'Fully cleared'}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Aging */}
      <div>
        <SectionHeader title="Invoice Aging" sub="Outstanding payable by age bucket" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {d.agingBuckets.map(({ bucket, count, amount, severity }) => (
            <Card key={bucket} style={{ textAlign: 'center', borderTop: `3px solid ${severity === 'critical' ? '#EF4444' : severity === 'high' ? '#F97316' : severity === 'medium' ? '#F59E0B' : '#D1D5DB'}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 8 }}>{bucket}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: severity === 'critical' ? '#EF4444' : severity === 'high' ? '#F97316' : '#374151' }}>{count}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>invoices</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#1F2937' }}>{formatINR(amount)}</div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ height: 12 }} />
    </div>
  );
}
