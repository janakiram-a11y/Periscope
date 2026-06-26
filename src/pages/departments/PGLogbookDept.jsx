import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { BookOpen, Clock, CheckCircle, Users, ChevronLeft, AlertTriangle } from 'lucide-react';
import { pgLogbookDetail } from '../../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}

function Badge({ label, color, bg }) {
  return <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}

const STATUS_COLOR = { Pending: '#F97316', Verified: '#3B82F6', Approved: '#059669', Rejected: '#EF4444' };
const STATUS_BG    = { Pending: '#FFEDD5', Verified: '#EFF6FF', Approved: '#D1FAE5', Rejected: '#FEE2E2' };

export default function PGLogbookDept({ onBack }) {
  const d = pgLogbookDetail;
  const [tab, setTab] = useState('overview');

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · PG Logbook"
        title="PG E-Logbook — Academic Records"
        subtitle="5 sections · 18+ modules · Entry verification and approval workflow"
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: d.summary.pendingVerification, label: 'Pending Verification' }}
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Active PG Students"       value={d.summary.activeStudents}      icon={Users}     color="#223F7F" />
        <StatCard label="Total Entries"            value={d.summary.totalEntries.toLocaleString()} icon={BookOpen} color="#7C3AED" />
        <StatCard label="Pending Verification"     value={d.summary.pendingVerification}  icon={Clock}     color="#F97316" />
        <StatCard label="Approved This Month"      value={d.summary.approvedThisMonth}    icon={CheckCircle} color="#059669" />
      </div>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #E5E7EB' }}>
        {[['overview','Section Overview'],['modules','All Modules'],['workflow','Approval Workflow']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
          {d.sections.map(({ name, modules, totalEntries, pendingVerification, description }) => (
            <Card key={name} style={{ borderTop: '3px solid #223F7F' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#223F7F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{name}</div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 12, lineHeight: 1.4 }}>{description}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>Modules</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{modules}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>Entries</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{totalEntries.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>Pending</span>
                  <Badge label={pendingVerification} color={pendingVerification > 50 ? '#EF4444' : '#F97316'} bg={pendingVerification > 50 ? '#FEE2E2' : '#FFEDD5'} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'modules' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Module','Section','Total Entries','Pending','Verified','Approved','Rejected'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.modules.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{row.name}</td>
                  <td style={{ padding: '10px 14px' }}><Badge label={row.section} color="#223F7F" bg="#EFF6FF" /></td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#374151' }}>{row.total.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#F97316' }}>{row.pending}</td>
                  <td style={{ padding: '10px 14px', color: '#3B82F6' }}>{row.verified}</td>
                  <td style={{ padding: '10px 14px', color: '#059669' }}>{row.approved}</td>
                  <td style={{ padding: '10px 14px', color: '#EF4444' }}>{row.rejected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'workflow' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Status Distribution</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {d.statusDistribution.map(({ status, count, pct }) => (
                <div key={status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Badge label={status} color={STATUS_COLOR[status]} bg={STATUS_BG[status]} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: STATUS_COLOR[status] }}>{count.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ background: '#E5E7EB', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: STATUS_COLOR[status], borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Approval Workflow</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {d.approvalWorkflow.map(({ role, pending, avgTAT, note }) => (
                <div key={role} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{role}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{note}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#F97316' }}>{pending}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>Avg {avgTAT}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
