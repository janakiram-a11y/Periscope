import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { GraduationCap, Users, CheckCircle, Clock, AlertTriangle, ExternalLink, IndianRupee } from 'lucide-react';
import { mbbsAdmissionsData as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';
const NAV = D.summary.sourceUrl;

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}
function Badge({ label, color, bg, size = 11 }) {
  return <span style={{ fontFamily: F, fontSize: size, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}
function Bar({ pct, color = '#223F7F', h = 7 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

export default function MBBSAdmissions() {
  const [tab, setTab] = useState('quotas');
  const s = D.summary;

  const fillColor = (r) => r >= 95 ? '#059669' : r >= 85 ? '#223F7F' : r >= 70 ? '#F97316' : '#EF4444';

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Admissions · MBBS"
        title="MBBS Admissions — ASRAM College of Medicine"
        subtitle={`AsramPortal · ${s.academicYear} · Intake: ${s.totalSeats} seats`}
        actions={
          <a href={NAV} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${s.fillRate}%`, label: 'Seat Fill Rate' }}
      />

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        <StatCard label="Total Seats"        value={s.totalSeats}                          icon={GraduationCap} color="#223F7F" />
        <StatCard label="Enrolled"           value={s.enrolled}                            icon={Users}        color="#059669" sub={`${s.fillRate}% fill rate`} />
        <StatCard label="Unfilled"           value={s.unfilled}                            icon={Clock}        color={s.unfilled > 0 ? '#F97316' : '#059669'} />
        <StatCard label="Documents Verified" value={s.documentsComplete}                   icon={CheckCircle}  color="#059669" />
        <StatCard label="Documents Pending"  value={s.documentsPending}                    icon={AlertTriangle} color={s.documentsPending > 0 ? '#EF4444' : '#059669'} />
      </div>

      {/* Pending actions alert */}
      {D.pendingActions.length > 0 && D.pendingActions.map((a, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FFF7ED', border: '1px solid #FDBA74', borderLeft: '4px solid #F97316', borderRadius: 10 }}>
          <AlertTriangle size={16} color="#F97316" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{a.title}</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{a.description}</div>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#F97316', marginLeft: 'auto', flexShrink: 0 }}>{a.count}</span>
        </div>
      ))}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #E5E7EB' }}>
        {[['quotas','Quota Breakdown'],['pipeline','Admission Pipeline'],['subquotas','Sub-Quota Detail'],['fees','Fee Collection']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {/* QUOTA BREAKDOWN */}
      {tab === 'quotas' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {D.quotas.map(q => (
            <Card key={q.quota}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{q.quota}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{q.filled} enrolled of {q.seats} seats</div>
                </div>
                <span style={{ fontSize: 28, fontWeight: 900, color: fillColor(q.rate) }}>{q.rate}%</span>
              </div>
              <Bar pct={q.rate} color={fillColor(q.rate)} h={10} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#9CA3AF' }}>
                <span>Filled: <strong style={{ color: '#059669' }}>{q.filled}</strong></span>
                <span>Unfilled: <strong style={{ color: q.seats - q.filled > 0 ? '#F97316' : '#059669' }}>{q.seats - q.filled}</strong></span>
                <span>Total: <strong style={{ color: '#374151' }}>{q.seats}</strong></span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ADMISSION PIPELINE */}
      {tab === 'pipeline' && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 18 }}>Admission Funnel — {s.academicYear}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {D.pipeline.map((p, i) => {
              const maxCount = D.pipeline[0].count;
              const pct = Math.round((p.count / maxCount) * 100);
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
                  <Bar pct={pct} color={p.color} h={8} />
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* SUB-QUOTA DETAIL */}
      {tab === 'subquotas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {D.quotas.map(q => (
            <Card key={q.quota}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>{q.quota} — Sub-Quota Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.subQuotas.map(sq => (
                  <div key={sq.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{sq.name}</div>
                      <Bar pct={sq.rate} color={fillColor(sq.rate)} h={5} />
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 100 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#1F2937' }}>{sq.filled} / {sq.seats}</div>
                      <Badge label={`${sq.rate}%`} color={fillColor(sq.rate)} bg={`${fillColor(sq.rate)}18`} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* FEE COLLECTION */}
      {tab === 'fees' && (() => {
        const f = D.fees;
        const fs = f.summary;
        const fc2 = r => r >= 85 ? '#059669' : r >= 75 ? '#F97316' : '#EF4444';
        const anyOverdue = f.pendingStudents && f.pendingStudents.some(p => p.daysOverdue > 0);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Context banner */}
            {fs.note && (
              <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderLeft: '4px solid #3B82F6', borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: '#1E40AF' }}>
                  <strong>Asram Finance Portal</strong> — {fs.note}
                  {fs.dueDate && <span style={{ marginLeft: 8, fontWeight: 700 }}>Due date: {fs.dueDate}</span>}
                </div>
              </div>
            )}
            {/* Fee KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { label: 'Total Fee Demand', value: formatINR(fs.totalDemand), color: '#223F7F' },
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
              {/* By quota */}
              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Collection by Quota</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {f.byQuota.map(q => (
                    <div key={q.quota}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{q.quota}</span>
                          <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>{q.students} students · ₹{(q.annualFee/100000).toFixed(1)} L/yr</span>
                        </div>
                        <Badge label={`${q.rate}%`} color={fc2(q.rate)} bg={`${fc2(q.rate)}18`} />
                      </div>
                      <Bar pct={q.rate} color={fc2(q.rate)} h={8} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: '#9CA3AF' }}>
                        <span>Collected: <strong style={{ color: '#059669' }}>{formatINR(q.collected)}</strong></span>
                        <span>Pending: <strong style={{ color: '#F97316' }}>{formatINR(q.pending)}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* By fee type */}
              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Collection by Type</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {f.byType.map(t => (
                    <div key={t.type} style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{t.type}</span>
                        <Badge label={`${t.rate}%`} color={fc2(t.rate)} bg={`${fc2(t.rate)}18`} />
                      </div>
                      <Bar pct={t.rate} color={fc2(t.rate)} h={6} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: '#9CA3AF' }}>
                        <span>Demand: {formatINR(t.demand)}</span>
                        <span style={{ color: t.pending > 0 ? '#F97316' : '#059669' }}>Pending: {formatINR(t.pending)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Pending students */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{anyOverdue ? 'Fee Defaulters — Immediate Follow-up Required' : 'Fee Pending — Not Yet Due'}</div>
                <Badge label={`${f.pendingStudents.length} shown`} color="#F97316" bg="#FFEDD5" size={12} />
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    {['Student', 'Roll No', 'Quota', 'Fee Type', 'Amount', 'Status'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {f.pendingStudents.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: p.daysOverdue > 30 ? '#FFF8F8' : '#fff' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{p.name}</td>
                      <td style={{ padding: '10px 14px', color: '#6B7280' }}>{p.rollNo}</td>
                      <td style={{ padding: '10px 14px' }}><Badge label={p.quota} color="#223F7F" bg="#EEF2FF" /></td>
                      <td style={{ padding: '10px 14px', color: '#374151' }}>{p.feeType}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: '#374151' }}>{formatINR(p.amount)}</td>
                      <td style={{ padding: '10px 14px' }}>
                        {p.daysOverdue > 0
                          ? <Badge label={`${p.daysOverdue}d overdue`} color={p.daysOverdue > 30 ? '#EF4444' : '#F97316'} bg={p.daysOverdue > 30 ? '#FEE2E2' : '#FFEDD5'} />
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

      {/* Source note */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 14px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
        <div style={{ fontSize: 11, color: '#9CA3AF' }}>
          Source: <strong style={{ color: '#374151' }}>AsramPortal</strong> · Admission data reflects current enrolment status. Sub-quota structure: Management Quota (S1–Service, S2–Non-Service, S3) and Convener Quota (CQ). Real seat data from discovery: 150 total, 142 filled.
        </div>
      </div>

      <div style={{ height: 12 }} />
    </div>
  );
}
