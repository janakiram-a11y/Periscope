import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { Home, Users, IndianRupee, Clock, CheckCircle, ChevronLeft } from 'lucide-react';
import { formatINR } from '../../utils/format';
import { hostelDetail } from '../../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}

function Badge({ label, color, bg }) {
  return <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}

function CssBar({ pct, color = '#223F7F', height = 8 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

export default function HostelDept({ onBack }) {
  const d = hostelDetail;
  const [tab, setTab] = useState('blocks');

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · Hostels"
        title="Hostel Management"
        subtitle="4 blocks · Occupancy, billing, and collection management"
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: `${d.summary.occupancyRate}%`, label: 'Occupancy Rate' }}
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Capacity"    value={d.summary.totalCapacity}              icon={Home}        color="#223F7F" />
        <StatCard label="Occupied"          value={`${d.summary.occupied} / ${d.summary.totalCapacity}`} icon={Users} color="#059669" sub={`${d.summary.occupancyRate}% occupancy`} />
        <StatCard label="Billing Due"       value={formatINR(d.summary.billingDue)}      icon={IndianRupee} color="#F97316" />
        <StatCard label="Collection Rate"   value={`${d.summary.collectionRate}%`}       icon={CheckCircle} color={d.summary.collectionRate >= 80 ? '#059669' : '#F97316'} />
      </div>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #E5E7EB' }}>
        {[['blocks','Block Summary'],['billing','Billing & Collection'],['pending','Pending Actions']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 16px', fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid #223F7F' : '2px solid transparent',
            color: tab === id ? '#223F7F' : '#6B7280', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'blocks' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {d.blocks.map(({ block, type, capacity, occupied, available, occupancyRate, warden, contact }) => (
            <Card key={block}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{block}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{type} · Warden: {warden}</div>
                </div>
                <Badge
                  label={`${occupancyRate}%`}
                  color={occupancyRate >= 90 ? '#EF4444' : occupancyRate >= 80 ? '#F97316' : '#059669'}
                  bg={occupancyRate >= 90 ? '#FEE2E2' : occupancyRate >= 80 ? '#FFEDD5' : '#D1FAE5'}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                {[
                  { label: 'Capacity', value: capacity },
                  { label: 'Occupied', value: occupied, color: '#374151' },
                  { label: 'Available', value: available, color: available < 20 ? '#EF4444' : '#059669' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ flex: 1, background: '#F9FAFB', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: color || '#1F2937' }}>{value}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>

              <CssBar pct={occupancyRate} color={occupancyRate >= 90 ? '#EF4444' : occupancyRate >= 80 ? '#F97316' : '#059669'} height={8} />
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>{contact}</div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'billing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            {d.blocks.map(({ block, billing, collected, pending, rate }) => (
              <Card key={block} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 8 }}>{block}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#1F2937', marginBottom: 4 }}>{rate}%</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', marginBottom: 2 }}>{formatINR(collected)}</div>
                <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 8 }}>of {formatINR(billing)}</div>
                <CssBar pct={rate} color={rate >= 80 ? '#059669' : '#F97316'} height={6} />
                <div style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', marginTop: 6 }}>Pending: {formatINR(pending)}</div>
              </Card>
            ))}
          </div>

          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Components</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                  {['Component','Per Student','Total Billed','Collected','Pending','Rate'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.feeComponents.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{row.component}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{formatINR(row.perStudent)}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#374151' }}>{formatINR(row.totalBilled)}</td>
                    <td style={{ padding: '10px 14px', color: '#059669', fontWeight: 700 }}>{formatINR(row.collected)}</td>
                    <td style={{ padding: '10px 14px', color: '#EF4444', fontWeight: 700 }}>{formatINR(row.pending)}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge label={`${row.rate}%`} color={row.rate >= 80 ? '#059669' : '#F97316'} bg={row.rate >= 80 ? '#D1FAE5' : '#FFEDD5'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'pending' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {d.pendingActions.map((action, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, padding: '14px 16px',
              background: action.severity === 'critical' ? '#FEF2F2' : action.severity === 'high' ? '#FFF7ED' : '#FFFBEB',
              border: `1px solid ${action.severity === 'critical' ? '#FCA5A5' : action.severity === 'high' ? '#FDBA74' : '#FDE68A'}`,
              borderLeft: `4px solid ${action.severity === 'critical' ? '#EF4444' : action.severity === 'high' ? '#F97316' : '#F59E0B'}`,
              borderRadius: 10,
            }}>
              <Clock size={14} color={action.severity === 'critical' ? '#EF4444' : '#F97316'} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{action.title}</div>
                <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{action.description}</div>
                <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>{action.block}</div>
              </div>
              {action.count && <span style={{ fontSize: 20, fontWeight: 900, color: action.severity === 'critical' ? '#EF4444' : '#F97316', flexShrink: 0 }}>{action.count}</span>}
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 12 }} />
    </div>
  );
}
