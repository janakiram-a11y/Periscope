import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { GraduationCap, Users, Building2, BookOpen, ExternalLink, Info, IndianRupee } from 'lucide-react';
import { pgAdmissionsData as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';

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

const PROG_COLOR = { MD: '#223F7F', MS: '#059669', Diploma: '#F97316' };

const fc = r => r >= 85 ? '#059669' : r >= 75 ? '#F97316' : '#EF4444';

export default function PGAdmissions() {
  const [tab, setTab] = useState('enrollment');
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Admissions · PG"
        title="PG Admissions — Postgraduate Programs"
        subtitle={`AsramPortal · ${s.enrolled} active PG students across ${s.departments} clinical departments`}
        actions={
          <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: s.enrolled, label: 'Active PG Students' }}
      />

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="PG Students"       value={s.enrolled}                    icon={GraduationCap} color="#223F7F" />
        <StatCard label="Total Seats"       value={s.totalSeats}                  icon={Users}         color="#7C3AED" sub={`${s.fillRate}% filled`} />
        <StatCard label="Departments"       value={s.departments}                 icon={Building2}     color="#059669" sub="Clinical departments" />
        <StatCard label="Programs"          value={D.programs.length}             icon={BookOpen}      color="#0891B2" sub="MD · MS · Diploma" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #E5E7EB' }}>
        {[['enrollment','Enrollment'],['departments','Top Departments'],['fees','Fee Collection']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'enrollment' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        {/* Program breakdown */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 16 }}>Program-wise Enrollment</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {D.programs.map(p => (
              <div key={p.program}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: PROG_COLOR[p.program] }}>{p.program}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 8 }}>{p.departments} departments</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#1F2937' }}>{p.enrolled}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}> / {p.seats}</span>
                  </div>
                </div>
                <Bar pct={p.fillRate} color={PROG_COLOR[p.program]} h={8} />
                <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3, textAlign: 'right' }}>{p.fillRate}% filled</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quota breakdown */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 16 }}>Quota Distribution</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {D.quotas.map(q => (
              <div key={q.quota} style={{ padding: '12px 14px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{q.quota}</span>
                  <span style={{ fontSize: 16, fontWeight: 900, color: '#1F2937' }}>{q.rate}%</span>
                </div>
                <Bar pct={q.rate} color="#223F7F" h={7} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#9CA3AF' }}>
                  <span>Enrolled: <strong style={{ color: '#059669' }}>{q.enrolled}</strong></span>
                  <span>Seats: <strong style={{ color: '#374151' }}>{q.seats}</strong></span>
                  <span>Unfilled: <strong style={{ color: q.seats - q.enrolled > 0 ? '#F97316' : '#059669' }}>{q.seats - q.enrolled}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Logbook compliance note */}
          <div style={{ marginTop: 14, display: 'flex', gap: 8, padding: '10px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 8 }}>
            <Info size={13} color="#F97316" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 11, color: '#92400E' }}>{D.logbookNote}</div>
          </div>
        </Card>
      </div>}

      {tab === 'departments' && <div>
        <SectionHeader title="Top Departments by PG Enrollment" sub="Departments with highest number of active PG students" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['#','Department','Program','PG Students'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.topDepartments.map((d, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 16px', color: '#9CA3AF', fontWeight: 700 }}>{i + 1}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: '#1F2937' }}>{d.dept}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <Badge label={d.program} color={PROG_COLOR[d.program.split('/')[0]] || '#374151'} bg={`${PROG_COLOR[d.program.split('/')[0]] || '#374151'}18`} />
                  </td>
                  <td style={{ padding: '10px 16px', fontWeight: 800, fontSize: 15, color: '#223F7F' }}>{d.pgStudents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>}

      {tab === 'fees' && (() => {
        const f = D.fees;
        const fs = f.summary;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {fs.note && (
              <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderLeft: '4px solid #3B82F6', borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: '#1E40AF' }}>
                  <strong>Asram Finance Portal</strong> — {fs.note}
                  {fs.dueDate && fs.dueDate !== 'TBD' && <span style={{ marginLeft: 8, fontWeight: 700 }}>Due date: {fs.dueDate}</span>}
                </div>
              </div>
            )}
            {/* Fee KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { label: 'Total Fee Demand', value: formatINR(fs.totalDemand), color: '#7C3AED' },
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

            {/* Alert */}
            {f.alert && (
              <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: '#FFF7ED', border: '1px solid #FED7AA', borderLeft: '4px solid #F97316', borderRadius: 10 }}>
                <span style={{ fontSize: 12, color: '#92400E' }}>{f.alert}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {/* By program */}
              <Card>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Collection by Program</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {f.byProgram.map(p => (
                    <div key={p.program}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: PROG_COLOR[p.program] || '#374151' }}>{p.program}</span>
                          <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>{p.students} students · ₹{(p.annualFee/100000).toFixed(1)} L/yr</span>
                        </div>
                        <Badge label={`${p.rate}%`} color={fc(p.rate)} bg={`${fc(p.rate)}18`} />
                      </div>
                      <Bar pct={p.rate} color={fc(p.rate)} h={8} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: '#9CA3AF' }}>
                        <span>Collected: <strong style={{ color: '#059669' }}>{formatINR(p.collected)}</strong></span>
                        <span>Pending: <strong style={{ color: '#F97316' }}>{formatINR(p.pending)}</strong></span>
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
                        <Badge label={`${t.rate}%`} color={fc(t.rate)} bg={`${fc(t.rate)}18`} />
                      </div>
                      <Bar pct={t.rate} color={fc(t.rate)} h={6} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: '#9CA3AF' }}>
                        <span>Demand: {formatINR(t.demand)}</span>
                        <span style={{ color: t.pending > 0 ? '#F97316' : '#059669' }}>Pending: {formatINR(t.pending)}</span>
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
