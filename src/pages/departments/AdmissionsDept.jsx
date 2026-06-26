import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { GraduationCap, Users, ChevronLeft, Clock, CheckCircle } from 'lucide-react';
import { admissionsDetail } from '../../data/dashboardData';

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

const TABS = [
  { id: 'pg-admissions',      label: 'PG Admissions' },
  { id: 'mbbs-admissions',    label: 'MBBS Admissions' },
  { id: 'allied-admissions',  label: 'Allied Health' },
  { id: 'nursing-admissions', label: 'Nursing' },
];

export default function AdmissionsDept({ initialTab = 'mbbs-admissions', onBack }) {
  const [tab, setTab] = useState(initialTab);
  const d = admissionsDetail[tab];

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · Admissions"
        title="Admissions — All Programs"
        subtitle="MBBS, PG, Allied Health, and Nursing admission lifecycle tracking"
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: Object.values(admissionsDetail).reduce((s, v) => s + v.summary.totalAdmissions, 0), label: 'Total Admissions' }}
      />

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #E5E7EB' }}>
        {TABS.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Admissions"   value={d.summary.totalAdmissions}  icon={GraduationCap} color="#223F7F" />
        <StatCard label="Intake Capacity"    value={d.summary.intake}            icon={Users}         color="#7C3AED" />
        <StatCard label="Pending Docs"       value={d.summary.pendingDocs}       icon={Clock}         color="#F97316" sub="Document verification" />
        <StatCard label="Admissions Complete" value={d.summary.complete}         icon={CheckCircle}   color="#059669" />
      </div>

      {/* Quota breakdown + pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Quota / Category Breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.quotas.map(({ quota, seats, filled, pct }) => (
              <div key={quota}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{quota}</span>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>{filled} / {seats} seats · <strong style={{ color: '#374151' }}>{pct}%</strong></span>
                </div>
                <CssBar pct={pct} color={pct >= 90 ? '#059669' : pct >= 70 ? '#223F7F' : '#F97316'} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Admission Pipeline</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.pipeline.map(({ stage, count, color, note }) => (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, borderLeft: `3px solid ${color}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{stage}</div>
                  {note && <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{note}</div>}
                </div>
                <span style={{ fontSize: 20, fontWeight: 900, color, minWidth: 36, textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pending actions */}
      {d.pendingActions && d.pendingActions.length > 0 && (
        <div>
          <SectionHeader title="Pending Actions" sub="Items requiring immediate attention" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.pendingActions.map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FEF3C7', borderLeft: '3px solid #F59E0B', borderRadius: 10 }}>
                <Clock size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{action.title}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{action.description}</div>
                </div>
                {action.count && <span style={{ fontSize: 16, fontWeight: 800, color: '#F59E0B' }}>{action.count}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
