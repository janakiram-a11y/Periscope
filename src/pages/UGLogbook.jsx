import React from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { BookMarked, Users, AlertTriangle, ExternalLink } from 'lucide-react';
import { ugLogbookData as D } from '../data/dashboardData';

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

const rateColor = r => r >= 80 ? '#059669' : r >= 65 ? '#F97316' : '#EF4444';

export default function UGLogbook() {
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Academics · UG Logbook"
        title="UG Attendance — MBBS Class Attendance"
        subtitle={`AsramPortal · Today: ${s.classesToday} classes · Avg attendance ${s.avgAttendanceRate}%`}
        actions={
          <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open Attendance Portal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${s.avgAttendanceRate}%`, label: 'Avg Attendance' }}
      />

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Classes Today"     value={s.classesToday}            icon={BookMarked}    color="#223F7F" />
        <StatCard label="Active Courses"    value={s.activeCourses}           icon={Users}         color="#7C3AED" />
        <StatCard label="Avg Attendance"    value={`${s.avgAttendanceRate}%`} icon={Users}         color={rateColor(s.avgAttendanceRate)} />
        <StatCard label="Low Att. Alerts"   value={D.classesLive.filter(c => Math.round(c.present / c.strength * 100) < 70).length} icon={AlertTriangle} color="#F97316" />
      </div>

      {/* Course summary */}
      <div>
        <SectionHeader title="Course Summary" sub="Today's attendance by MBBS year" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {D.courses.map(c => (
            <Card key={c.course} style={{ borderTop: `3px solid ${rateColor(c.avgRate)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{c.course}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                    {c.classesToday} class{c.classesToday !== 1 ? 'es' : ''} today · {c.totalStrength} students
                  </div>
                </div>
                <Badge label={`${c.avgRate}%`} color={rateColor(c.avgRate)} bg={`${rateColor(c.avgRate)}18`} size={13} />
              </div>
              <Bar pct={c.avgRate} color={rateColor(c.avgRate)} h={9} />
            </Card>
          ))}
        </div>
      </div>

      {/* Class-level table */}
      <div>
        <SectionHeader title="Today's Classes — Session Detail" sub={`${s.classesToday} MBBS sessions on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`} />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Subject', 'Type', 'Year', 'Faculty', 'Strength', 'Present', 'Absent', 'Rate'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.classesLive.map((c, i) => {
                const rate = Math.round(c.present / c.strength * 100);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: rate < 70 ? '#FFFBEB' : i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>
                      {c.subject}
                      {c.subject === 'ENT Theory' && <Badge label="Live Data" color="#7C3AED" bg="#EDE9FE" size={9} style={{ marginLeft: 6 }} />}
                    </td>
                    <td style={{ padding: '10px 14px' }}><Badge label={c.type} color="#374151" bg="#F3F4F6" /></td>
                    <td style={{ padding: '10px 14px', fontSize: 11, color: '#6B7280' }}>{c.course}</td>
                    <td style={{ padding: '10px 14px', fontSize: 11, color: '#9CA3AF' }}>{c.faculty || '—'}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#374151' }}>{c.strength}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#059669' }}>{c.present}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#EF4444' }}>{c.absent}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge label={`${rate}%`} color={rateColor(rate)} bg={`${rateColor(rate)}18`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Low attendance note */}
      {D.classesLive.filter(c => Math.round(c.present / c.strength * 100) < 70).length > 0 && (
        <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FFF7ED', border: '1px solid #FED7AA', borderLeft: '4px solid #F97316', borderRadius: 10 }}>
          <AlertTriangle size={15} color="#F97316" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>
              {D.classesLive.filter(c => Math.round(c.present / c.strength * 100) < 70).length} Classes Below 70% Attendance
            </div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>
              {D.classesLive.filter(c => Math.round(c.present / c.strength * 100) < 70).map(c => c.subject).join(', ')} — students below attendance threshold risk debarment.
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
