import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { BookOpen, Users, Clock, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { pgLogbookDetail as D } from '../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}
function Badge({ label, color, bg, size = 11 }) {
  return <span style={{ fontFamily: F, fontSize: size, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}
function Bar({ pct, color = '#7C3AED', h = 7 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

const STATUS_C = {
  Approved:  { color: '#059669', bg: '#D1FAE5' },
  Verified:  { color: '#0891B2', bg: '#E0F2FE' },
  Pending:   { color: '#F97316', bg: '#FFEDD5' },
  Rejected:  { color: '#EF4444', bg: '#FEE2E2' },
};
const SECTION_C = { Academic: '#223F7F', Clinical: '#059669', Procedures: '#7C3AED', WPBA: '#0891B2', Awards: '#D97706' };

export default function PGLogbook() {
  const [tab, setTab] = useState('sections');
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Academics · PG Logbook"
        title="PG Logbook — Postgraduate E-Logbook"
        subtitle={`pglogbook.orfus.in · ${s.activeStudents} active PG students · 5 sections · 16 modules`}
        actions={
          <a href="https://login.orfus.in/pglogbook" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open PG Logbook <ExternalLink size={13} />
          </a>
        }
        stat={{ value: s.pendingVerification.toLocaleString(), label: 'Pending Verification' }}
      />

      {/* Alert */}
      <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FFF7ED', border: '1px solid #FED7AA', borderLeft: '4px solid #F97316', borderRadius: 10 }}>
        <AlertTriangle size={16} color="#F97316" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>1,840 Entries Pending Faculty Supervisor Verification</div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>First-level supervisor sign-offs are the bottleneck — 24% of all logbook entries await initial verification. Academic compliance at risk for final-year students.</div>
        </div>
        <span style={{ fontSize: 22, fontWeight: 900, color: '#F97316', flexShrink: 0 }}>1,840</span>
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Active PG Students"  value={s.activeStudents.toLocaleString()}      icon={Users}        color="#7C3AED" />
        <StatCard label="Total Entries"        value={s.totalEntries.toLocaleString()}         icon={BookOpen}     color="#223F7F" />
        <StatCard label="Pending Verification" value={s.pendingVerification.toLocaleString()} icon={Clock}        color="#F97316" />
        <StatCard label="Approved This Month"  value={s.approvedThisMonth.toLocaleString()}   icon={CheckCircle}  color="#059669" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #E5E7EB' }}>
        {[['sections','Sections'],['modules','Modules'],['status','Status Distribution'],['workflow','Approval Workflow']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #7C3AED' : '2px solid transparent',
            color: tab === id ? '#7C3AED' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'sections' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {D.sections.map(sec => {
            const color = SECTION_C[sec.name] || '#374151';
            const pendingPct = Math.round((sec.pendingVerification / sec.totalEntries) * 100);
            return (
              <Card key={sec.name} style={{ borderLeft: `4px solid ${color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color }}>Section: {sec.name}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{sec.modules} modules · {sec.description}</div>
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#1F2937' }}>{sec.totalEntries.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '8px 6px', background: '#F9FAFB', borderRadius: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#374151' }}>{sec.totalEntries.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>Total</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '8px 6px', background: '#FFF7ED', borderRadius: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#F97316' }}>{sec.pendingVerification.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>Pending</div>
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <Bar pct={pendingPct} color="#F97316" h={6} />
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3 }}>{pendingPct}% of entries pending verification</div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === 'modules' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Module', 'Section', 'Total', 'Pending', 'Verified', 'Approved', 'Rejected'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.modules.map((m, i) => {
                const secColor = SECTION_C[m.section] || '#374151';
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td style={{ padding: '9px 14px', fontWeight: 600, color: '#1F2937' }}>{m.name}</td>
                    <td style={{ padding: '9px 14px' }}><Badge label={m.section} color={secColor} bg={`${secColor}18`} /></td>
                    <td style={{ padding: '9px 14px', fontWeight: 700, color: '#374151' }}>{m.total}</td>
                    <td style={{ padding: '9px 14px', fontWeight: 700, color: '#F97316' }}>{m.pending}</td>
                    <td style={{ padding: '9px 14px', color: '#0891B2' }}>{m.verified}</td>
                    <td style={{ padding: '9px 14px', fontWeight: 700, color: '#059669' }}>{m.approved}</td>
                    <td style={{ padding: '9px 14px', color: '#EF4444' }}>{m.rejected}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'status' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {D.statusDistribution.map(st => {
            const sc = STATUS_C[st.status] || { color: '#374151', bg: '#F3F4F6' };
            return (
              <Card key={st.status} style={{ textAlign: 'center', borderTop: `3px solid ${sc.color}` }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: sc.color }}>{st.count.toLocaleString()}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginTop: 6 }}>{st.status}</div>
                <div style={{ marginTop: 10 }}>
                  <Badge label={`${st.pct}%`} color={sc.color} bg={sc.bg} size={12} />
                </div>
                <div style={{ marginTop: 10 }}>
                  <Bar pct={st.pct} color={sc.color} h={6} />
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === 'workflow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {D.approvalWorkflow.map((w, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#9CA3AF' }}>Level {i + 1}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{w.role}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{w.note}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Avg TAT: {w.avgTAT}</div>
                </div>
                <span style={{ fontSize: 28, fontWeight: 900, color: w.pending > 500 ? '#EF4444' : '#F97316' }}>
                  {w.pending.toLocaleString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
