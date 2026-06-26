import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { CreditCard, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { asramPayDetail as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';
const L = formatINR;

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

const fc = r => r >= 85 ? '#059669' : r >= 70 ? '#F97316' : '#EF4444';

export default function ASRAMPay() {
  const [tab, setTab] = useState('fees');
  const s = D.feeSummary;
  const q = D.offlineQueues;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Finance · ASRAM Pay"
        title="ASRAM Pay — Student Fee Collections"
        subtitle={`AsramPortal · 5 fee types · ₹${(s.totalDemand / 10000000).toFixed(2)} Cr total demand`}
        actions={
          <a href="https://login.orfus.in/asramportal" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${s.collectionRate}%`, label: 'Collection Rate' }}
      />

      {/* Critical alerts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '4px solid #EF4444', borderRadius: 10 }}>
          <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>DD/NEFT Realisation Backlog — {q.ddNeft.count} Payments</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{L(q.ddNeft.amount)} pending manual bank confirmation — student records blocked. Avg age: {q.ddNeft.avgAge}</div>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#EF4444', flexShrink: 0 }}>{q.ddNeft.count}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FFF7ED', border: '1px solid #FED7AA', borderLeft: '4px solid #F97316', borderRadius: 10 }}>
          <AlertTriangle size={16} color="#F97316" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>Student Payments Awaiting Final Approval — {q.studentApproval.count}</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{L(q.studentApproval.amount)} realised but not approved — blocks student clearance. Avg age: {q.studentApproval.avgAge}</div>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#F97316', flexShrink: 0 }}>{q.studentApproval.count}</span>
        </div>
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Demand"  value={`₹${(s.totalDemand / 10000000).toFixed(2)} Cr`}    icon={CreditCard}    color="#223F7F" />
        <StatCard label="Collected"     value={`₹${(s.totalCollected / 10000000).toFixed(2)} Cr`} icon={CheckCircle}   color="#059669" sub={`${s.collectionRate}% rate`} />
        <StatCard label="Pending"       value={L(s.totalPending)}                                  icon={Clock}         color="#F97316" />
        <StatCard label="DD/NEFT Queue" value={q.ddNeft.count}                                     icon={AlertTriangle} color="#EF4444" sub={L(q.ddNeft.amount)} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #E5E7EB' }}>
        {[['fees','Fee Type Breakdown'],['modes','Payment Modes'],['queue','Offline Queue']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'fees' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {D.feeByType.map(f => (
            <Card key={f.type}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{f.type}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>Demand: {L(f.demand)}</div>
                </div>
                <Badge label={`${f.rate}%`} color={fc(f.rate)} bg={`${fc(f.rate)}18`} size={13} />
              </div>
              <Bar pct={f.rate} color={fc(f.rate)} h={10} />
              <div style={{ display: 'flex', gap: 20, marginTop: 8, fontSize: 11, color: '#9CA3AF' }}>
                <span>Collected: <strong style={{ color: '#059669' }}>{L(f.collected)}</strong></span>
                <span>Pending: <strong style={{ color: f.pending > 0 ? '#F97316' : '#059669' }}>{L(f.pending)}</strong></span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'modes' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Payment Mode', 'Count', 'Amount', 'Auto Realised'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.paymentModes.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1F2937' }}>{m.mode}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#374151' }}>{m.count.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#223F7F' }}>{L(m.amount)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {m.autoRealised
                      ? <Badge label="Auto" color="#059669" bg="#D1FAE5" />
                      : <Badge label="Manual" color="#F97316" bg="#FFEDD5" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'queue' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>Pending DD / NEFT Realisations</div>
              <Badge label={`${q.ddNeft.count} pending · ${L(q.ddNeft.amount)}`} color="#EF4444" bg="#FEF2F2" size={12} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 11 }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  {['Student', 'Roll No', 'Fee Type', 'Instrument', 'Amount', 'Submitted', 'Status'].map(h => (
                    <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {D.pendingDdNeft.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{r.student}</td>
                    <td style={{ padding: '10px 14px', color: '#6B7280' }}>{r.rollNo}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{r.feeType}</td>
                    <td style={{ padding: '10px 14px' }}><Badge label={r.instrument} color="#0891B2" bg="#E0F2FE" /></td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#223F7F' }}>{L(r.amount)}</td>
                    <td style={{ padding: '10px 14px', color: '#6B7280' }}>{r.submitted}</td>
                    <td style={{ padding: '10px 14px' }}><Badge label={r.status} color="#F97316" bg="#FFEDD5" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
