import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { Users, Fingerprint, Building2, ChevronLeft, AlertTriangle } from 'lucide-react';
import { attendanceDetail } from '../../data/dashboardData';

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

export default function AttendanceDept({ initialTab = 'employee', onBack }) {
  const [tab, setTab] = useState(initialTab === 'biometric-attendance' || initialTab === 'employee' ? 'employee' : 'student');
  const d = attendanceDetail;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · Attendance"
        title="Attendance — Biometric & Academic"
        subtitle={`${d.employee.totalEmployees} employees · ${d.employee.totalDepartments} departments · ${d.devices.total} biometric devices`}
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: `${d.employee.rate}%`, label: 'Employee Attendance Today' }}
      />

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #E5E7EB' }}>
        {[['employee','Employee Attendance'],['student','Student Attendance'],['devices','Biometric Devices']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'employee' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            <StatCard label="Total Employees"  value={d.employee.totalEmployees.toLocaleString()} icon={Users}     color="#223F7F" />
            <StatCard label="Present Today"    value={d.employee.present}                         icon={Users}     color="#059669" sub={`${d.employee.rate}%`} />
            <StatCard label="Absent Today"     value={d.employee.absent}                          icon={AlertTriangle} color="#EF4444" />
            <StatCard label="Departments"      value={d.employee.totalDepartments}                icon={Building2} color="#7C3AED" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Attendance Summary</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Present',  count: d.employee.present,   color: '#059669', pct: Math.round(d.employee.present / d.employee.totalEmployees * 100) },
                  { label: 'Absent',   count: d.employee.absent,    color: '#EF4444', pct: Math.round(d.employee.absent / d.employee.totalEmployees * 100) },
                  { label: 'Half Day', count: d.employee.halfDay,   color: '#F97316', pct: Math.round(d.employee.halfDay / d.employee.totalEmployees * 100) },
                  { label: 'On Leave', count: d.employee.onLeave,   color: '#7C3AED', pct: Math.round(d.employee.onLeave / d.employee.totalEmployees * 100) },
                ].map(({ label, count, color, pct }) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color }}>{count} ({pct}%)</span>
                    </div>
                    <CssBar pct={pct} color={color} />
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Top Absent Departments</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {d.employee.topAbsentDepts.map(({ dept, absent, total, rate }) => (
                  <div key={dept} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: rate > 40 ? '#FEF2F2' : '#F9FAFB', borderRadius: 8, border: `1px solid ${rate > 40 ? '#FCA5A5' : '#F3F4F6'}` }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{dept}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>{absent} absent of {total}</div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 800, color: rate > 40 ? '#EF4444' : '#F97316' }}>{rate}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {tab === 'student' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            <StatCard label="Classes Today"     value={d.student.classesToday}      icon={Building2} color="#223F7F" />
            <StatCard label="Active Courses"    value={d.student.activeCourses}     icon={Users}     color="#7C3AED" />
            <StatCard label="Avg Attendance"    value={`${d.student.avgRate}%`}     icon={Users}     color={d.student.avgRate >= 75 ? '#059669' : '#F97316'} />
          </div>

          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>MBBS Class Attendance — Today</div>
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Live data from academic attendance system</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                  {['Subject','Type','Year','Present','Absent','Strength','Rate'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.student.classes.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{row.subject}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge label={row.type} color="#223F7F" bg="#EFF6FF" />
                    </td>
                    <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.year}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#059669' }}>{row.present}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#EF4444' }}>{row.absent}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{row.strength}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge
                        label={`${Math.round(row.present / row.strength * 100)}%`}
                        color={row.present / row.strength >= 0.75 ? '#059669' : '#EF4444'}
                        bg={row.present / row.strength >= 0.75 ? '#D1FAE5' : '#FEE2E2'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}

      {tab === 'devices' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            <StatCard label="Total Devices"   value={d.devices.total}   icon={Fingerprint} color="#223F7F" />
            <StatCard label="Online"          value={d.devices.online}  icon={Fingerprint} color="#059669" />
            <StatCard label="Offline"         value={d.devices.offline} icon={AlertTriangle} color="#EF4444" sub="Requires attention" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
            {d.devices.list.map(dev => (
              <Card key={dev.id} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: dev.status === 'online' ? '#D1FAE5' : '#FEE2E2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Fingerprint size={20} color={dev.status === 'online' ? '#059669' : '#EF4444'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{dev.name}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{dev.location}</div>
                </div>
                <Badge label={dev.status} color={dev.status === 'online' ? '#059669' : '#EF4444'} bg={dev.status === 'online' ? '#D1FAE5' : '#FEE2E2'} />
              </Card>
            ))}
          </div>
        </>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
