import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { Users, GraduationCap, CheckCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { alliedAdmissionsData as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}
function Badge({ label, color, bg, size = 11 }) {
  return <span style={{ fontFamily: F, fontSize: size, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}
function Bar({ pct, color = '#0891B2', h = 7 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}
const fc = (r) => r >= 95 ? '#059669' : r >= 85 ? '#0891B2' : r >= 70 ? '#F97316' : '#EF4444';

export default function AlliedAdmissions() {
  const [tab, setTab] = useState('programs');
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Admissions · Allied Health"
        title="Allied Admissions — Allied Health Sciences"
        subtitle={`Allied Dashboard · ${s.totalSeats} seats across 7 Allied Health programs`}
        actions={
          <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open Allied Dashboard <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${s.fillRate}%`, label: 'Overall Fill Rate' }}
      />

      {/* Note about Allied identity */}
      <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderLeft: '4px solid #3B82F6', borderRadius: 10 }}>
        <div style={{ fontSize: 12, color: '#1E40AF', fontWeight: 500 }}>
          Allied Health Sciences operates as a <strong>separate college identity</strong> from ASRAM College of Medicine, sharing AsramPortal infrastructure. Academic scheduling and attendance are tracked through the Allied Dashboard.
        </div>
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        <StatCard label="Total Seats"         value={s.totalSeats}           icon={GraduationCap}  color="#0891B2" />
        <StatCard label="Enrolled"            value={s.enrolled}             icon={Users}           color="#059669" sub={`${s.fillRate}% fill`} />
        <StatCard label="Unfilled Seats"      value={s.unfilled}             icon={Clock}           color={s.unfilled > 0 ? '#F97316' : '#059669'} />
        <StatCard label="Documents Verified"  value={s.documentsComplete}    icon={CheckCircle}     color="#059669" />
        <StatCard label="Documents Pending"   value={s.documentsPending}     icon={AlertTriangle}   color={s.documentsPending > 0 ? '#EF4444' : '#059669'} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #E5E7EB' }}>
        {[['programs','Programs'],['quotas','Quota Breakdown'],['pipeline','Pipeline'],['fees','Fee Collection']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #0891B2' : '2px solid transparent',
            color: tab === id ? '#0891B2' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'programs' && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 16 }}>Program-wise Seat Fill — 7 Allied Health Programs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {D.programs.map(p => (
              <div key={p.program}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{p.program}</span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>{p.filled} / {p.seats} seats</span>
                    <Badge label={`${p.rate}%`} color={fc(p.rate)} bg={`${fc(p.rate)}18`} />
                  </div>
                </div>
                <Bar pct={p.rate} color={fc(p.rate)} h={8} />
                {p.seats - p.filled > 0 && (
                  <div style={{ fontSize: 10, color: '#F97316', marginTop: 2 }}>{p.seats - p.filled} seats unfilled</div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'quotas' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {D.quotas.map(q => (
            <Card key={q.quota}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>{q.quota}</div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                {[
                  { l: 'Seats', v: q.seats, c: '#374151' },
                  { l: 'Filled', v: q.filled, c: '#059669' },
                  { l: 'Unfilled', v: q.seats - q.filled, c: q.seats - q.filled > 0 ? '#F97316' : '#059669' },
                ].map(({ l, v, c }) => (
                  <div key={l} style={{ flex: 1, textAlign: 'center', padding: '10px 8px', background: '#F9FAFB', borderRadius: 8 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <Bar pct={q.rate} color="#0891B2" h={10} />
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0891B2', marginTop: 8, textAlign: 'right' }}>{q.rate}% filled</div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'pipeline' && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 16 }}>Admission Funnel</div>
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
      )}

      {tab === 'fees' && (() => {
        const f = D.fees;
        const fs = f.summary;
        const fcc = r => r >= 85 ? '#059669' : r >= 75 ? '#F97316' : '#EF4444';
        const PROG_COLORS = ['#0891B2','#7C3AED','#059669','#223F7F','#D97706','#BE185D','#6B7280'];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {fs.note && (
              <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderLeft: '4px solid #3B82F6', borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: '#1E40AF' }}>
                  <strong>Asram Finance Portal</strong> — {fs.note}
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { label: 'Total Fee Demand', value: formatINR(fs.totalDemand), color: '#0891B2' },
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

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14 }}>
              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Collection by Program — 7 Allied Programs</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {f.byProgram.map((p, i) => (
                    <div key={p.program}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: PROG_COLORS[i % PROG_COLORS.length] }}>{p.program}</span>
                          <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>{p.students} students</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ fontSize: 11, color: '#9CA3AF' }}>{formatINR(p.pending)} pending</span>
                          <Badge label={`${p.rate}%`} color={fcc(p.rate)} bg={`${fcc(p.rate)}18`} />
                        </div>
                      </div>
                      <Bar pct={p.rate} color={fcc(p.rate)} h={6} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>By Fee Type</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {f.byType.map(t => (
                    <div key={t.type} style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{t.type}</span>
                        <Badge label={`${t.rate}%`} color={fcc(t.rate)} bg={`${fcc(t.rate)}18`} />
                      </div>
                      <Bar pct={t.rate} color={fcc(t.rate)} h={5} />
                      <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>
                        Demand {formatINR(t.demand)} · Pending <span style={{ color: '#F97316', fontWeight: 700 }}>{formatINR(t.pending)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );
      })()}

      <div style={{ height: 12 }} />
    </div>
  );
}
