import React from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { Building2, Users, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { hostelDetail } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';
const D = hostelDetail;

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}
function Badge({ label, color, bg, size = 11 }) {
  return <span style={{ fontFamily: F, fontSize: size, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}
function Bar({ pct, color = '#7C3AED', h = 7 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

export default function Hostels() {
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Operations · Hostels"
        title="Hostels — ASRAM Residential Blocks"
        subtitle={`AsramPortal · 4 blocks · ${s.occupied} residents · ${s.collectionRate}% fee collection`}
        actions={
          <a href="https://login.orfus.in/asramportal" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: `${s.occupancyRate}%`, label: 'Occupancy Rate' }}
      />

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total Capacity"   value={s.totalCapacity}                               icon={Building2}     color="#7C3AED" />
        <StatCard label="Residents"        value={s.occupied}                                    icon={Users}         color="#059669" sub={`${s.occupancyRate}% occupancy`} />
        <StatCard label="Fee Collection"   value={`${s.collectionRate}%`}                        icon={CheckCircle}   color="#059669" />
        <StatCard label="Outstanding"      value={`₹${(s.billingDue / 100000).toFixed(2)} L`}   icon={AlertTriangle} color="#F97316" />
      </div>

      {/* Blocks */}
      <div>
        <SectionHeader title="Block-wise Occupancy" sub="Resident count and fee collection per hostel block" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {D.blocks.map(b => (
            <Card key={b.block} style={{ borderTop: `3px solid #7C3AED` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{b.block}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{b.type}</div>
                </div>
                <Badge label={`${b.occupancyRate}%`} color={b.occupancyRate >= 90 ? '#059669' : '#F97316'} bg={b.occupancyRate >= 90 ? '#D1FAE5' : '#FFEDD5'} size={13} />
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                {[
                  { l: 'Capacity', v: b.capacity, c: '#374151' },
                  { l: 'Occupied', v: b.occupied, c: '#059669' },
                  { l: 'Vacant',   v: b.capacity - b.occupied, c: b.capacity - b.occupied > 0 ? '#F97316' : '#059669' },
                ].map(({ l, v, c }) => (
                  <div key={l} style={{ flex: 1, textAlign: 'center', padding: '8px 6px', background: '#F9FAFB', borderRadius: 8 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>{l}</div>
                  </div>
                ))}
              </div>
              <Bar pct={b.occupancyRate} color="#7C3AED" h={8} />

              {/* Fee row */}
              <div style={{ marginTop: 12, padding: '10px 12px', background: b.rate < 90 ? '#FFF7ED' : '#F9FAFB', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>Fee Collection</span>
                  <Badge label={`${b.rate}%`} color={b.rate >= 90 ? '#059669' : '#F97316'} bg={b.rate >= 90 ? '#D1FAE5' : '#FFEDD5'} />
                </div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                  Pending: <strong style={{ color: '#F97316' }}>{formatINR(b.pending)}</strong>
                </div>
              </div>

              {D.pendingActions.filter(a => a.block === b.block).map((a, i) => (
                <div key={i} style={{ marginTop: 8, display: 'flex', gap: 6, padding: '8px 10px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8 }}>
                  <AlertTriangle size={12} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 11, color: '#991B1B' }}>{a.description}</span>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>

      {/* Fee components */}
      <div>
        <SectionHeader title="Fee Components" sub="Breakdown of hostel fee types" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Component', 'Per Student', 'Billed', 'Collected', 'Pending', 'Rate'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.feeComponents.map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: '#1F2937' }}>{f.component}</td>
                  <td style={{ padding: '10px 16px', color: '#374151' }}>{formatINR(f.perStudent)}</td>
                  <td style={{ padding: '10px 16px', color: '#374151' }}>{formatINR(f.totalBilled)}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 700, color: '#059669' }}>{formatINR(f.collected)}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 700, color: '#F97316' }}>{formatINR(f.pending)}</td>
                  <td style={{ padding: '10px 16px' }}><Badge label={`${f.rate}%`} color={f.rate >= 90 ? '#059669' : '#F97316'} bg={f.rate >= 90 ? '#D1FAE5' : '#FFEDD5'} /></td>
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
