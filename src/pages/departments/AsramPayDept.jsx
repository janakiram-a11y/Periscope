import React from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { IndianRupee, Clock, CheckCircle, AlertTriangle, CreditCard, Banknote, ChevronLeft } from 'lucide-react';
import { formatINR } from '../../utils/format';
import { asramPayDetail } from '../../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>
  );
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

export default function AsramPayDept({ onBack }) {
  const d = asramPayDetail;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · AsramPay"
        title="AsramPay — Fee Payment Portal"
        subtitle="Fee lifecycle management: Demand → Collection → Realisation"
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: d.offlineQueues.ddNeft.count + d.offlineQueues.arogyasree.count + d.offlineQueues.studentApproval.count, label: 'Pending Actions' }}
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Fee Demand"   value={formatINR(d.feeSummary.totalDemand)}     icon={IndianRupee}   color="#223F7F" />
        <StatCard label="Collected"          value={formatINR(d.feeSummary.totalCollected)}   icon={CheckCircle}   color="#059669" sub={`${d.feeSummary.collectionRate}% rate`} />
        <StatCard label="Pending"            value={formatINR(d.feeSummary.totalPending)}     icon={Clock}         color="#F97316" />
        <StatCard label="Online (Auto)"      value={formatINR(d.feeSummary.onlineRealised)}   icon={CreditCard}    color="#0891B2" sub="Auto-realised" />
      </div>

      {/* Fee by type + payment modes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Collection by Category</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.feeByType.map(({ type, demand, collected, rate }) => (
              <div key={type}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{type}</span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>{formatINR(collected)} / {formatINR(demand)}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: rate >= 80 ? '#059669' : rate >= 60 ? '#F97316' : '#EF4444', minWidth: 36, textAlign: 'right' }}>{rate}%</span>
                  </div>
                </div>
                <CssBar pct={rate} color={rate >= 80 ? '#059669' : rate >= 60 ? '#F97316' : '#EF4444'} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Payment Channels</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.paymentModes.map(({ mode, amount, count, autoRealised }) => (
              <div key={mode} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                <Banknote size={16} color="#6B7280" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{mode}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{count} transactions</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#1F2937' }}>{formatINR(amount)}</div>
                  {autoRealised && <div style={{ fontSize: 10, color: '#059669', fontWeight: 600 }}>Auto-realised</div>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Offline Approval Queues */}
      <div>
        <SectionHeader title="Offline Payment Queues" sub="Manual reconciliation required — sorted by priority" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {[
            { label: 'DD / NEFT Realisation', data: d.offlineQueues.ddNeft, color: '#EF4444', note: 'Bank confirmation pending' },
            { label: 'Arogyasree Disbursement', data: d.offlineQueues.arogyasree, color: '#F97316', note: 'Govt portal reconciliation' },
            { label: 'Student Payment Approval', data: d.offlineQueues.studentApproval, color: '#F97316', note: 'Student exemption review' },
          ].map(({ label, data, color, note }) => (
            <Card key={label} style={{ borderTop: `3px solid ${color}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937', marginBottom: 10 }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color }}>{data.count}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 4 }}>{formatINR(data.amount)}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>{note}</div>
              {data.avgAge && <div style={{ fontSize: 11, color: '#6B7280', marginTop: 6 }}>Avg age: <strong>{data.avgAge}</strong></div>}
            </Card>
          ))}
        </div>
      </div>

      {/* Recent DD/NEFT transactions */}
      <div>
        <SectionHeader title="Pending DD / NEFT Transactions" sub="Awaiting bank realisation confirmation" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Student','Roll No.','Fee Type','Amount','Instrument','Submitted','Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.pendingDdNeft.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{row.student}</td>
                  <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.rollNo}</td>
                  <td style={{ padding: '10px 14px', color: '#374151' }}>{row.feeType}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1F2937' }}>{formatINR(row.amount)}</td>
                  <td style={{ padding: '10px 14px', color: '#374151' }}>{row.instrument}</td>
                  <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.submitted}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <Badge label={row.status} color="#F97316" bg="#FFEDD5" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div style={{ height: 12 }} />
    </div>
  );
}
