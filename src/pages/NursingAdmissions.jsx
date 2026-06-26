import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { Heart, Users, GraduationCap, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { nursingAdmissionsData as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}
function Badge({ label, color, bg, size = 11 }) {
  return <span style={{ fontFamily: F, fontSize: size, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}
function Bar({ pct, color = '#BE185D', h = 7 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

const PROG_COLOR = { 'B.Sc Nursing': '#BE185D', 'GNM Nursing': '#9333EA' };

const fcc = r => r >= 85 ? '#059669' : r >= 75 ? '#F97316' : '#EF4444';

export default function NursingAdmissions() {
  const [tab, setTab] = useState('programs');
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Admissions · Nursing"
        title="Nursing Admissions — ASRAM College of Nursing"
        subtitle={`AsramPortal · B.Sc Nursing (80 seats) + GNM Nursing (40 seats) · ${s.academicYear || '2026–27'}`}
        actions={
          <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${s.fillRate}%`, label: 'Overall Fill Rate' }}
      />

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Seats"        value={s.totalSeats}          icon={GraduationCap} color="#BE185D" />
        <StatCard label="Enrolled"           value={s.enrolled}            icon={Users}         color="#059669" sub={`${s.fillRate}% fill rate`} />
        <StatCard label="Documents Verified" value={s.documentsComplete}   icon={CheckCircle}   color="#059669" />
        <StatCard label="Docs Pending"       value={s.documentsPending}    icon={Clock}         color={s.documentsPending > 0 ? '#F97316' : '#059669'} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #E5E7EB' }}>
        {[['programs','Programs & Quotas'],['pipeline','Admission Pipeline'],['fees','Fee Collection']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #BE185D' : '2px solid transparent',
            color: tab === id ? '#BE185D' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'programs' && <div>
        <SectionHeader title="Program-wise Enrollment" sub="Seat matrix by program and quota type" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {D.programs.map(p => {
            const color = PROG_COLOR[p.program] || '#BE185D';
            return (
              <Card key={p.program} style={{ borderTop: `3px solid ${color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{p.program}</div>
                    {p.subQuotas.length > 0 && (
                      <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>Sub-quotas: {p.subQuotas.join(', ')}</div>
                    )}
                  </div>
                  <span style={{ fontSize: 26, fontWeight: 900, color }}>{p.rate}%</span>
                </div>

                {/* Quota matrix */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {p.quotas.map(q => (
                    <div key={q.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F9FAFB', borderRadius: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{q.type}</span>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#6B7280' }}>{q.filled} / {q.seats}</span>
                        <Badge label={`${q.rate}%`} color={q.rate >= 95 ? '#059669' : '#F97316'} bg={q.rate >= 95 ? '#D1FAE5' : '#FFEDD5'} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total bar */}
                <div style={{ marginTop: 8 }}>
                  <Bar pct={p.rate} color={color} h={8} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#9CA3AF' }}>
                    <span>Total Enrolled: <strong style={{ color: '#059669' }}>{p.filled}</strong></span>
                    <span>Total Seats: <strong style={{ color: '#374151' }}>{p.seats}</strong></span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>}

      {tab === 'pipeline' && <div>
        <SectionHeader title="Admission Pipeline" sub="Application funnel for the current intake" />
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {D.pipeline.map((p, i) => {
              const maxCount = D.pipeline[0].count;
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', minWidth: 20 }}>{i + 1}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{p.stage}</span>
                      {p.note && <Badge label={p.note} color={p.color} bg={`${p.color}18`} />}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: p.color }}>{p.count.toLocaleString()}</span>
                  </div>
                  <Bar pct={Math.round((p.count / maxCount) * 100)} color={p.color} h={7} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>}

      {tab === 'fees' && (() => {
        const f = D.fees;
        const fs = f.summary;
        const anyOverdue = f.pendingStudents && f.pendingStudents.some(p => p.daysOverdue > 0);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {fs.note && (
              <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderLeft: '4px solid #3B82F6', borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: '#1E40AF' }}>
                  <strong>Asram Finance Portal</strong> — {fs.note}
                  {fs.dueDate && <span style={{ marginLeft: 8, fontWeight: 700 }}>Due date: {fs.dueDate}</span>}
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { label: 'Total Fee Demand', value: formatINR(fs.totalDemand), color: '#BE185D' },
                { label: 'Collected',        value: formatINR(fs.collected),   color: '#059669', sub: `${fs.collectionRate}%` },
                { label: 'Pending',          value: formatINR(fs.pending),     color: '#F97316' },
                { label: 'Fees Pending',     value: fs.feePendingCount,        color: '#F97316', sub: 'students' },
              ].map(({ label, value, color, sub }) => (
                <Card key={label} style={{ textAlign: 'center', borderTop: `3px solid ${color}` }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
                  {sub && <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{sub}</div>}
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', marginTop: 6 }}>{label}</div>
                </Card>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {/* By program */}
              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Collection by Program</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {f.byProgram.map(p => {
                    const color = PROG_COLOR[p.program] || '#BE185D';
                    return (
                      <div key={p.program}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <div>
                            <span style={{ fontSize: 12, fontWeight: 700, color }}>{p.program}</span>
                            <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>{p.students} students · ₹{(p.annualFee/100000).toFixed(1)} L/yr</span>
                          </div>
                          <Badge label={`${p.rate}%`} color={fcc(p.rate)} bg={`${fcc(p.rate)}18`} />
                        </div>
                        <Bar pct={p.rate} color={fcc(p.rate)} h={8} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: '#9CA3AF' }}>
                          <span>Collected: <strong style={{ color: '#059669' }}>{formatINR(p.collected)}</strong></span>
                          <span>Pending: <strong style={{ color: '#F97316' }}>{formatINR(p.pending)}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* By fee type */}
              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>By Fee Type</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {f.byType.map(t => (
                    <div key={t.type} style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{t.type}</span>
                        <Badge label={`${t.rate}%`} color={fcc(t.rate)} bg={`${fcc(t.rate)}18`} />
                      </div>
                      <Bar pct={t.rate} color={fcc(t.rate)} h={6} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: '#9CA3AF' }}>
                        <span>Demand: {formatINR(t.demand)}</span>
                        <span style={{ color: '#F97316' }}>Pending: {formatINR(t.pending)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Pending students */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{anyOverdue ? 'Fee Defaulters — Pending Recovery' : 'Fee Pending — Not Yet Due'}</div>
                <Badge label={`${f.pendingStudents.length} shown`} color="#F97316" bg="#FFEDD5" size={12} />
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    {['Student', 'Roll No', 'Program', 'Fee Type', 'Amount', 'Overdue'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {f.pendingStudents.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: p.daysOverdue > 20 ? '#FFF8F8' : '#fff' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{p.name}</td>
                      <td style={{ padding: '10px 14px', color: '#6B7280' }}>{p.rollNo}</td>
                      <td style={{ padding: '10px 14px' }}><Badge label={p.program} color="#BE185D" bg="#FCE7F3" /></td>
                      <td style={{ padding: '10px 14px', color: '#374151' }}>{p.feeType}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: '#374151' }}>{formatINR(p.amount)}</td>
                      <td style={{ padding: '10px 14px' }}>
                        {p.daysOverdue > 0
                          ? <Badge label={`${p.daysOverdue}d overdue`} color={p.daysOverdue > 20 ? '#EF4444' : '#F97316'} bg={p.daysOverdue > 20 ? '#FEE2E2' : '#FFEDD5'} />
                          : <Badge label="Not yet due" color="#0891B2" bg="#E0F2FE" />
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );
      })()}

      <div style={{ height: 12 }} />
    </div>
  );
}
