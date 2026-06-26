import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  FileText, CheckCircle, Clock, XCircle, TrendingUp,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import PageBanner from '../components/PageBanner';
import {
  researchKPIs, researchByCollege, researchMonthlyTrend,
  researchStageBreakdown, researchRecentApplications, researchCommittees,
} from '../data/mockData';

const FONT = 'Montserrat, system-ui, sans-serif';

const STAGE_COLORS = {
  SUB: '#6B7280', SCI: '#223F7F', ETH: '#F97316', IRC: '#7C3AED', MGT: '#059669',
};

const LIFECYCLE_STEPS = [
  { step: 1, label: 'Proposal Submission',      sub: 'Application ID issued',     color: '#223F7F' },
  { step: 2, label: 'Scientific Committee',      sub: 'Technical & academic review', color: '#1A5FA8' },
  { step: 3, label: 'Ethics Committee (IEC)',     sub: 'Compliance & safety',        color: '#F97316' },
  { step: 4, label: 'IRC Approval',              sub: 'Institutional funding review', color: '#7C3AED' },
  { step: 5, label: 'Management Approval',       sub: 'Final authorization',         color: '#059669' },
];

export default function ResearchOverview() {
  const [range, setRange] = useState('6M');

  const trendData = range === '3M'
    ? researchMonthlyTrend.slice(-3)
    : range === '12M'
      ? [...researchMonthlyTrend,
          { month: 'Jan', submitted: 11, approved: 7 }, { month: 'Feb', submitted: 8, approved: 5 },
          { month: 'Mar', submitted: 6, approved: 4 }, { month: 'Apr', submitted: 10, approved: 6 },
          { month: 'May', submitted: 7, approved: 5 }, { month: 'Jun', submitted: 5, approved: 3 }]
      : researchMonthlyTrend;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      <PageBanner
        crumb="Portal / Dashboard"
        title="Research Insights"
        subtitle="Real-time overview of research activities across all colleges"
        stat={{ value: researchKPIs.total, label: 'Total' }}
      />

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        <StatCard label="Total Applications"  value={researchKPIs.total}           sub="All time"                icon={FileText}     color="#374151" />
        <StatCard label="In Approval Review"  value={researchKPIs.inApprovalReview} sub="Scientific / IEC"       icon={Clock}        color="#F97316" />
        <StatCard label="In Funding Review"   value={researchKPIs.inFundingReview}  sub="IRC / Management"       icon={TrendingUp}   color="#3B82F6" />
        <StatCard label="Approved"            value={researchKPIs.approved}         sub="Successfully processed" icon={CheckCircle}  color="#059669" />
        <StatCard label="Rejected"            value={researchKPIs.rejected}         sub="Did not meet criteria"  icon={XCircle}      color="#EF4444" />
      </div>

      {/* College stats + Stage funnel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>

        {/* College cards */}
        <div>
          <SectionHeader title="College Proposal Stats" sub="Applications and approvals per institution" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {researchByCollege.map(c => {
              const approvedPct = c.total > 0 ? Math.round((c.approved / c.total) * 100) : 0;
              const reviewPct   = c.total > 0 ? Math.round((c.inReview / c.total) * 100) : 0;
              return (
                <div key={c.name} style={{
                  background: '#FFF', borderRadius: 12,
                  border: '1px solid #E5E7EB',
                  borderTop: `3px solid ${c.color}`,
                  padding: '18px 20px',
                  boxShadow: '0 1px 2px rgba(0,0,0,.06)',
                  display: 'flex', flexDirection: 'column', gap: 12,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: c.color + '10', pointerEvents: 'none' }} />

                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: c.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{c.name}</div>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{c.fullName}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { label: 'Applications', value: c.total,    color: '#374151' },
                      { label: 'Approved',     value: c.approved, color: '#059669' },
                    ].map(m => (
                      <div key={m.label}>
                        <div style={{ fontFamily: FONT, fontSize: 9, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{m.label}</div>
                        <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, color: m.color, letterSpacing: '-0.5px' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: 10, borderTop: '1px solid #F3F4F6' }}>
                    <div style={{ height: 5, borderRadius: 3, background: '#F1F5F9', overflow: 'hidden', display: 'flex', marginBottom: 8 }}>
                      <div style={{ width: `${approvedPct}%`, background: '#059669' }} />
                      <div style={{ width: `${reviewPct}%`, background: c.color, opacity: 0.5 }} />
                    </div>
                    <button style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: FONT, fontSize: 10, fontWeight: 700,
                      color: c.color, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: 0, display: 'flex', alignItems: 'center', gap: 4,
                    }}>View Department Stats ↗</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage pipeline */}
        <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px 22px', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
          <SectionHeader title="Review Pipeline" sub="Applications at each stage" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {researchStageBreakdown.map(s => (
              <div key={s.stage} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: s.color + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: s.color }}>{s.stage}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151' }}>{s.label}</span>
                    <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: s.color }}>{s.count}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: '#F1F5F9', overflow: 'hidden' }}>
                    <div style={{ width: `${(s.count / researchKPIs.total) * 100}%`, height: '100%', background: s.color, borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Committees */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 10 }}>Review Committees</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {researchCommittees.map(c => (
                <div key={c.code} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: c.color + '12', border: `1px solid ${c.color}30`,
                  borderRadius: 9999, padding: '3px 10px',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: FONT, fontSize: 11, color: c.color, fontWeight: 600 }}>{c.code}</span>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}>{c.members}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trend chart + Recent submissions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>

        {/* Trend chart */}
        <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px 22px', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#1F2937' }}>Monthly Submission Trends</div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>Submissions vs approvals</div>
            </div>
            {/* Chart period toggle */}
            <div style={{ display: 'flex', gap: 1, background: '#F3F4F6', padding: 3, borderRadius: 8 }}>
              {['3M', '6M', '12M'].map(r => (
                <button key={r} onClick={() => setRange(r)} style={{
                  padding: '4px 10px', borderRadius: 6, border: 'none',
                  background: range === r ? '#223F7F' : 'transparent',
                  color: range === r ? '#FFF' : '#6B7280',
                  fontFamily: FONT, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  transition: 'all .15s',
                }}>{r}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: FONT }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: FONT }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,.08)', fontFamily: FONT }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontFamily: FONT }} />
              <Line type="monotone" dataKey="submitted" stroke="#223F7F" strokeWidth={2} dot={{ r: 3 }} name="Submitted" />
              <Line type="monotone" dataKey="approved"  stroke="#059669" strokeWidth={2} dot={{ r: 3 }} name="Approved" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent applications */}
        <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px 22px', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
          <SectionHeader title="Recent Submissions" sub="Latest research proposals" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {researchRecentApplications.map((app, i) => {
              const stageColor = STAGE_COLORS[app.stage] || '#6B7280';
              return (
                <div key={app.id} style={{
                  padding: '10px 0',
                  borderBottom: i < researchRecentApplications.length - 1 ? '1px solid #F3F4F6' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.title}</div>
                      <div style={{ fontFamily: FONT, fontSize: 10, color: '#9CA3AF', marginTop: 3 }}>{app.pi} · {app.college} · {app.daysAgo === 0 ? 'Today' : `${app.daysAgo}d ago`}</div>
                    </div>
                    <span style={{
                      flexShrink: 0,
                      background: stageColor + '18', color: stageColor,
                      border: `1px solid ${stageColor}30`,
                      borderRadius: 9999, padding: '2px 8px',
                      fontFamily: FONT, fontSize: 10, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{app.stage}</span>
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: '#D1D5DB', marginTop: 3 }}>{app.id}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Research Lifecycle */}
      <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px 22px', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
        <SectionHeader title="Research Lifecycle" sub="Standard approval pathway for all proposals" />
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
          {LIFECYCLE_STEPS.map((s, i, arr) => (
            <React.Fragment key={s.step}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 150, padding: '0 8px', flex: 1 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: s.color, color: '#FFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 700, fontFamily: FONT, flexShrink: 0,
                  boxShadow: `0 0 0 4px ${s.color}20`,
                }}>{s.step}</div>
                {/* Step badge */}
                <div style={{
                  marginTop: 10,
                  background: s.color, color: 'white',
                  borderRadius: 9999, padding: '2px 10px',
                  fontFamily: FONT, fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>Step {s.step}</div>
                <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: '#374151', marginTop: 6, textAlign: 'center' }}>{s.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 10, color: '#9CA3AF', textAlign: 'center', marginTop: 2 }}>{s.sub}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
                  <div style={{ width: 20, height: 2, background: '#E5E7EB' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
}
