import React from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { Landmark, AlertTriangle, TrendingUp, Clock, ExternalLink } from 'lucide-react';
import { asramFinanceDetail as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';
const L = formatINR;
const Cr = formatINR;

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
const SEVER_C = { critical: '#EF4444', high: '#F97316', medium: '#EAB308' };

export default function ASRAMFinance() {
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Finance · ASRAM Finance"
        title="ASRAM Finance — Institutional Accounts Overview"
        subtitle={`AsramPortal · ${Cr(s.totalRevenue)} total revenue demand · ${s.collectionRate}% collected`}
        actions={
          <a href="https://login.orfus.in/asramportal" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${s.collectionRate}%`, label: 'Collection Rate' }}
      />

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Revenue Demand" value={Cr(s.totalRevenue)}    icon={Landmark}    color="#223F7F" />
        <StatCard label="Total Collected"       value={Cr(s.totalCollected)}  icon={TrendingUp}  color="#059669" />
        <StatCard label="Total Pending"         value={L(s.totalPending)}     icon={Clock}       color="#F97316" />
        <StatCard label="Collection Rate"       value={`${s.collectionRate}%`} icon={Landmark}   color="#059669" />
      </div>

      {/* Approval queues */}
      <div>
        <SectionHeader title="Approval Queues" sub="Items awaiting action — ordered by urgency" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {D.approvalQueues.map((q, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px',
              background: q.status === 'backlog' ? '#FFF7ED' : '#F9FAFB',
              border: `1px solid ${q.status === 'backlog' ? '#FED7AA' : '#E5E7EB'}`,
              borderLeft: `4px solid ${q.status === 'backlog' ? '#F97316' : '#E5E7EB'}`,
              borderRadius: 10,
            }}>
              {q.status === 'backlog' && <AlertTriangle size={15} color="#F97316" style={{ flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{q.type}</div>
                <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                  Oldest: {q.oldestAge} · Avg amount: {L(q.avgAmount)}
                </div>
              </div>
              <span style={{ fontSize: 28, fontWeight: 900, color: q.status === 'backlog' ? '#F97316' : '#374151' }}>{q.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        {/* Revenue streams */}
        <div>
          <SectionHeader title="Revenue Streams" sub="Collected amounts by fee category" />
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {D.revenueStreams.map(r => (
                <div key={r.stream}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{r.stream}</span>
                      <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>{r.pct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#223F7F' }}>{L(r.amount)}</span>
                      <Badge label={r.status} color={r.status === 'On Track' ? '#059669' : '#F97316'} bg={r.status === 'On Track' ? '#D1FAE5' : '#FFEDD5'} />
                    </div>
                  </div>
                  <Bar pct={r.pct} color={r.status === 'On Track' ? '#059669' : '#F97316'} h={6} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Financial risks */}
        <div>
          <SectionHeader title="Financial Risk Flags" sub="Items requiring management attention" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {D.financialRisks.map((r, i) => {
              const c = SEVER_C[r.severity] || '#374151';
              return (
                <Card key={i} style={{ borderLeft: `3px solid ${c}`, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{r.title}</div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{r.description}</div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: c, flexShrink: 0, marginLeft: 12 }}>{L(r.amount)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hostel finance */}
      <div>
        <SectionHeader title="Hostel Block Finance" sub="Fee billing and collection per hostel block" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Block', 'Billed', 'Collected', 'Pending', 'Rate'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.hostelFinance.blocks.map((b, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1F2937' }}>{b.block}</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>{L(b.billing)}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#059669' }}>{L(b.collected)}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#F97316' }}>{L(b.pending)}</td>
                  <td style={{ padding: '12px 16px' }}><Badge label={`${b.rate}%`} color={b.rate >= 90 ? '#059669' : '#F97316'} bg={b.rate >= 90 ? '#D1FAE5' : '#FFEDD5'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Recent transactions */}
      <div>
        <SectionHeader title="Recent Transactions" sub="Latest credit and debit entries" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Date', 'Description', 'Category', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.recentTransactions.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 16px', color: '#9CA3AF' }}>{t.date}</td>
                  <td style={{ padding: '10px 16px', color: '#374151', maxWidth: 260 }}>{t.description}</td>
                  <td style={{ padding: '10px 16px' }}><Badge label={t.category} color="#223F7F" bg="#EEF2FF" /></td>
                  <td style={{ padding: '10px 16px', fontWeight: 700, color: t.type === 'credit' ? '#059669' : '#EF4444' }}>
                    {t.type === 'credit' ? '+' : '−'}{L(t.amount)}
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <Badge label={t.status}
                      color={t.status === 'Realised' ? '#059669' : '#F97316'}
                      bg={t.status === 'Realised' ? '#D1FAE5' : '#FFEDD5'} />
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
