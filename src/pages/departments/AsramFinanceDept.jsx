import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { IndianRupee, Clock, CheckCircle, AlertTriangle, ChevronLeft, FileText } from 'lucide-react';
import { formatINR } from '../../utils/format';
import { asramFinanceDetail } from '../../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}

function Badge({ label, color, bg }) {
  return <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}

const SEV_COLOR = { critical: '#EF4444', high: '#F97316', medium: '#F59E0B' };
const SEV_BG    = { critical: '#FEF2F2', high: '#FFF7ED', medium: '#FFFBEB' };

export default function AsramFinanceDept({ onBack }) {
  const d = asramFinanceDetail;
  const [tab, setTab] = useState('overview');

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · ASRAM Finance"
        title="ASRAM Finance — Financial Oversight"
        subtitle="Consolidated financial management: fee receipts, hostel billing, approvals, and accounts"
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: d.approvalQueues.reduce((s, q) => s + q.count, 0), label: 'Pending Approvals' }}
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Revenue"       value={formatINR(d.summary.totalRevenue)}    icon={IndianRupee}   color="#223F7F" />
        <StatCard label="Total Collected"     value={formatINR(d.summary.totalCollected)}  icon={CheckCircle}   color="#059669" sub={`${d.summary.collectionRate}% overall rate`} />
        <StatCard label="Total Pending"       value={formatINR(d.summary.totalPending)}    icon={Clock}         color="#F97316" />
        <StatCard label="Approval Queue"      value={d.approvalQueues.reduce((s, q) => s + q.count, 0)} icon={FileText} color="#7C3AED" />
      </div>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #E5E7EB', paddingBottom: 0 }}>
        {[['overview','Overview'],['approvals','Approval Queues'],['hostel','Hostel Finance'],['transactions','Recent Transactions']].map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Revenue Streams</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {d.revenueStreams.map(({ stream, amount, pct, status }) => (
                <div key={stream} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{stream}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{pct}% of total</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#1F2937' }}>{formatINR(amount)}</div>
                    <Badge label={status} color={status === 'On Track' ? '#059669' : '#F97316'} bg={status === 'On Track' ? '#D1FAE5' : '#FFEDD5'} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Financial Risks</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {d.financialRisks.map((risk, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: SEV_BG[risk.severity], borderRadius: 8, borderLeft: `3px solid ${SEV_COLOR[risk.severity]}` }}>
                  <AlertTriangle size={14} color={SEV_COLOR[risk.severity]} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{risk.title}</div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{risk.description}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: SEV_COLOR[risk.severity], marginTop: 4 }}>{formatINR(risk.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'approvals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {d.approvalQueues.map(({ type, count, oldestAge, avgAmount, status }) => (
            <Card key={type}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{type}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>Oldest: {oldestAge} · Avg: {formatINR(avgAmount)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: status === 'normal' ? '#374151' : '#F97316' }}>{count}</div>
                  <Badge label={status === 'normal' ? 'Normal' : 'Backlog'} color={status === 'normal' ? '#059669' : '#F97316'} bg={status === 'normal' ? '#D1FAE5' : '#FFEDD5'} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'hostel' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {d.hostelFinance.blocks.map(({ block, billing, collected, pending, rate }) => (
            <Card key={block} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 10 }}>{block}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#1F2937', marginBottom: 4 }}>{rate}%</div>
              <div style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>{formatINR(collected)}</div>
              <div style={{ fontSize: 10, color: '#9CA3AF' }}>of {formatINR(billing)}</div>
              <div style={{ marginTop: 8 }}>
                <Badge label={`${formatINR(pending)} pending`} color="#F97316" bg="#FFEDD5" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'transactions' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Date','Description','Category','Amount','Type','Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.recentTransactions.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.date}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{row.description}</td>
                  <td style={{ padding: '10px 14px', color: '#374151' }}>{row.category}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: row.type === 'credit' ? '#059669' : '#EF4444' }}>
                    {row.type === 'credit' ? '+' : '−'}{formatINR(row.amount)}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <Badge label={row.type} color={row.type === 'credit' ? '#059669' : '#EF4444'} bg={row.type === 'credit' ? '#D1FAE5' : '#FEE2E2'} />
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <Badge label={row.status} color={row.status === 'Realised' ? '#059669' : '#F97316'} bg={row.status === 'Realised' ? '#D1FAE5' : '#FFEDD5'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
