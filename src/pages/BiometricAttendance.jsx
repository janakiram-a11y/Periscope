import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { Fingerprint, Users, AlertTriangle, CheckCircle, Wifi, WifiOff, ExternalLink, Clock } from 'lucide-react';
import { attendanceDetail as D } from '../data/dashboardData';

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

export default function BiometricAttendance() {
  const [tab, setTab] = useState('employee');
  const e = D.employee;
  const dev = D.devices;
  const st = D.student;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Operations · Biometric Attendance"
        title="Biometric Attendance — ASRAM Institutions"
        subtitle={`AsramPortal · ${e.totalEmployees} employees · ${dev.total} devices (${dev.online} online, ${dev.offline} offline)`}
        actions={
          <a href="https://login.orfus.in/asramportal/attendance" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open Attendance Portal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${e.rate}%`, label: 'Employee Presence Rate' }}
      />

      {/* Device offline alert */}
      {dev.offline > 0 && (
        <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '4px solid #EF4444', borderRadius: 10 }}>
          <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{dev.offline} Biometric Devices Offline — Attendance Data Incomplete</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>Staff Block B (BIO-09) and Allied Health Wing (BIO-17) not syncing. Absent count of {e.absent} may be inflated.</div>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#EF4444', flexShrink: 0 }}>{dev.offline}</span>
        </div>
      )}

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        <StatCard label="Total Employees"   value={e.totalEmployees.toLocaleString()} icon={Users}        color="#223F7F" />
        <StatCard label="Present Today"     value={e.present.toLocaleString()}         icon={CheckCircle}  color="#059669" sub={`${e.rate}%`} />
        <StatCard label="Absent"            value={e.absent.toLocaleString()}           icon={AlertTriangle} color="#EF4444" />
        <StatCard label="Half Day"          value={e.halfDay.toLocaleString()}          icon={Users}        color="#F97316" />
        <StatCard label="On Leave"          value={e.onLeave.toLocaleString()}          icon={Clock}        color="#0891B2" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #E5E7EB' }}>
        {[['employee','Employee Attendance'],['students','Student Classes'],['devices','Device Status']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'employee' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 16 }}>Today's Summary — {e.totalDepartments} Departments</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Present',  value: e.present,  pct: Math.round(e.present / e.totalEmployees * 100),  color: '#059669' },
                { label: 'Absent',   value: e.absent,   pct: Math.round(e.absent / e.totalEmployees * 100),   color: '#EF4444' },
                { label: 'Half Day', value: e.halfDay,  pct: Math.round(e.halfDay / e.totalEmployees * 100),  color: '#F97316' },
                { label: 'On Leave', value: e.onLeave,  pct: Math.round(e.onLeave / e.totalEmployees * 100),  color: '#0891B2' },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{r.label}</span>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: r.color }}>{r.value.toLocaleString()}</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 6 }}>{r.pct}%</span>
                    </div>
                  </div>
                  <Bar pct={r.pct} color={r.color} h={7} />
                </div>
              ))}
            </div>
          </Card>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Highest Absence Departments</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {e.topAbsentDepts.map((d, i) => (
                <Card key={i} style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{d.dept}</span>
                    <Badge label={`${d.rate}% absent`} color="#EF4444" bg="#FEE2E2" />
                  </div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{d.absent} absent of {d.total} total</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'students' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>Today's Classes — {st.classesToday} MBBS Classes</div>
            <Badge label={`Avg ${st.avgRate}%`} color={rateColor(st.avgRate)} bg={`${rateColor(st.avgRate)}18`} size={12} />
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['Subject', 'Type', 'Year', 'Time', 'Faculty', 'Present', 'Absent', 'Rate'].map(h => (
                  <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.student.classes.map((c, i) => {
                const rate = Math.round(c.present / c.strength * 100);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: rate < 70 ? '#FFFBEB' : i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{c.subject}</td>
                    <td style={{ padding: '10px 14px' }}><Badge label={c.type} color="#374151" bg="#F3F4F6" /></td>
                    <td style={{ padding: '10px 14px', color: '#6B7280', fontSize: 11 }}>{c.year}</td>
                    <td style={{ padding: '10px 14px', color: '#9CA3AF', fontSize: 11 }}>—</td>
                    <td style={{ padding: '10px 14px', color: '#6B7280', fontSize: 11 }}>—</td>
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
      )}

      {tab === 'devices' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {dev.list.map(d => (
            <Card key={d.id} style={{ padding: '14px 16px', borderLeft: `3px solid ${d.status === 'online' ? '#059669' : '#EF4444'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{d.id} · {d.location}</div>
                </div>
                {d.status === 'online'
                  ? <Wifi size={16} color="#059669" />
                  : <WifiOff size={16} color="#EF4444" />}
              </div>
            </Card>
          ))}
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
