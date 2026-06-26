import React from 'react';
import { Utensils, Package, AlertTriangle, ChefHat, Users, Building2, Activity, CheckCircle, Clock } from 'lucide-react';
import { foodKitchenData, attentionItems } from '../data/dashboardData';
import { useBreakpoint } from '../hooks/useBreakpoint';

const FONT = 'Montserrat, system-ui, sans-serif';
const AMBER = '#B45309';

const fmt = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

function Card({ children, style }) {
  return (
    <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,.07)', padding: '20px 22px', ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
      {children}
    </div>
  );
}

function MetricRow({ label, value, sub, valueColor, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: last ? 'none' : '1px solid #F3F4F6' }}>
      <span style={{ fontFamily: FONT, fontSize: 12.5, color: '#374151' }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: valueColor || '#111827', wordBreak: 'break-word' }}>{value}</div>
        {sub && <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{sub}</div>}
      </div>
    </div>
  );
}

function BarCell({ pct, color }) {
  return (
    <div style={{ background: '#F3F4F6', borderRadius: 99, height: 7, flex: 1, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

const statusColor = { received: '#10B981', 'in-transit': '#F59E0B', pending: '#9CA3AF' };
const statusLabel = { received: 'Received', 'in-transit': 'In Transit', pending: 'Pending' };

const foodAlerts = attentionItems.filter(a => a.deptId === 'a1-finance');

export default function FoodKitchenOverview() {
  const { isMobile, isTablet } = useBreakpoint();
  const d = foodKitchenData;
  const mess = d.messBilling;
  const vendor = d.vendorPayables;
  const indents = d.ingredientIndents;

  const bannerPadding = isMobile ? '20px 16px' : '28px 32px 24px';
  const bannerTitleSize = isMobile ? 20 : 24;
  const contentPadding = isMobile ? '20px 16px' : '28px 32px';

  const kpiCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)';
  const twoCols = isMobile ? '1fr' : '1fr 1fr';
  const threeCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr';

  return (
    <div style={{ fontFamily: FONT, minHeight: '100%', background: '#F8FAFC' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #92400E 0%, #B45309 50%, #D97706 100%)', padding: bannerPadding }}>
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: 'rgba(253,230,138,.85)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Department Overview
        </div>
        <div style={{ fontFamily: FONT, fontSize: bannerTitleSize, fontWeight: 800, color: 'white', marginBottom: 8 }}>Food & Kitchen</div>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[
            { label: 'Dining Facilities', value: `${d.summary.totalDiners}` },
            { label: 'Total Seats',       value: `${d.summary.totalSeats.toLocaleString()}` },
            { label: 'Mess Billing',      value: fmt(mess.totalBilled) },
            { label: 'Ingredient Indents',value: `${d.summary.totalIngredientIndents}` },
            { label: 'Hospital Wards',    value: `${d.patientDiet.totalWards}` },
          ].map((k, i) => (
            <div key={i}>
              <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: 'white', wordBreak: 'break-word' }}>{k.value}</div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(253,230,138,.75)' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: contentPadding, maxWidth: 1200 }}>

        {/* System ramp-up notice */}
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '12px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start', overflow: 'hidden' }}>
          <Activity size={16} color="#2563EB" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontFamily: FONT, fontSize: 12, color: '#1D4ED8', wordBreak: 'break-word' }}>
            <strong>System Status:</strong> Campus Kitchen (kitchen.orfus.in) went live May 2026. Core mess operations and patient diet active. Subscription and À la Carte modules in ramp-up.
          </div>
        </div>

        {/* Alerts */}
        {foodAlerts.length > 0 && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 18px', marginBottom: 24, display: 'flex', gap: 10, overflow: 'hidden' }}>
            <AlertTriangle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ wordBreak: 'break-word' }}>
              {foodAlerts.map(a => (
                <div key={a.id} style={{ fontFamily: FONT, fontSize: 12, color: '#991B1B', lineHeight: 1.6 }}>
                  <strong>{a.title}</strong> — {a.description}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: kpiCols, gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Mess Billed',     value: fmt(mess.totalBilled),   color: AMBER,     sub: `${d.summary.totalSeats} seat capacity` },
            { label: 'Mess Collected',  value: fmt(mess.collected),      color: '#059669', sub: `${mess.collectionRate}% collection` },
            { label: 'Mess Pending',    value: fmt(mess.pending),        color: '#DC2626', sub: 'Outstanding hostel mess dues' },
            { label: 'Vendor Payable',  value: fmt(vendor.outstanding),  color: '#DC2626', sub: `${vendor.overdueInvoices} overdue invoices` },
          ].map((k, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 12, padding: '16px 18px', boxShadow: '0 1px 4px rgba(0,0,0,.07)', minWidth: 0 }}>
              <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, color: k.color, wordBreak: 'break-word' }}>{k.value}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: '#374151', margin: '4px 0 2px' }}>{k.label}</div>
              <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: twoCols, gap: 20, marginBottom: 20 }}>

          {/* Mess Billing by Block */}
          <Card>
            <SectionTitle>Mess Billing — by Hostel Block</SectionTitle>
            <div style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280', marginBottom: 14 }}>
              ₹3,200 / student / month · 756 students
            </div>
            {mess.byBlock.map((b, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151' }}>{b.block}</span>
                  <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: b.rate < 85 ? '#DC2626' : '#059669' }}>
                    {b.rate}%
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarCell pct={b.rate} color={b.rate < 85 ? '#EF4444' : '#10B981'} />
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                    {b.students} students
                  </span>
                </div>
                <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF', marginTop: 2 }}>
                  {fmt(b.collected)} collected · {fmt(b.pending)} pending
                </div>
              </div>
            ))}
          </Card>

          {/* A1 Vendor Payables */}
          <Card>
            <SectionTitle>A1 Vendor Payables</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Outstanding', value: fmt(vendor.outstanding), color: '#DC2626' },
                { label: 'Overdue Invoices', value: `${vendor.overdueInvoices}`, color: '#DC2626' },
                { label: 'Total Channels', value: `${vendor.channels}`, color: AMBER },
                { label: 'Settled This Month', value: fmt(vendor.settledThisMonth), color: '#059669' },
              ].map((m, i) => (
                <div key={i} style={{ background: '#F9FAFB', borderRadius: 10, padding: '10px 12px', minWidth: 0 }}>
                  <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 800, color: m.color, wordBreak: 'break-word' }}>{m.value}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#6B7280', marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FONT, fontSize: 11.5, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Overdue Channels</div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              {vendor.overdueChannels.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < vendor.overdueChannels.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151' }}>{c.channel}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: '#DC2626', wordBreak: 'break-word' }}>{fmt(c.outstanding)}</div>
                    <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{c.daysOverdue}d overdue</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: threeCols, gap: 20 }}>

          {/* Dining Facilities */}
          <Card>
            <SectionTitle>Dining Facilities</SectionTitle>
            {d.diningFacilities.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < d.diningFacilities.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: '#374151' }}>{f.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{f.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: AMBER }}>{f.seats}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: '#9CA3AF' }}>seats</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12, background: '#FFFBEB', borderRadius: 10, padding: '8px 12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: AMBER }}>Total Capacity</span>
              <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 800, color: AMBER }}>{d.summary.totalSeats.toLocaleString()} seats</span>
            </div>
          </Card>

          {/* Ingredient Indents */}
          <Card>
            <SectionTitle>Ingredient Indents</SectionTitle>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: AMBER }}>{indents.totalIndents}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF' }}>Total Indents Raised</div>
            </div>
            {indents.byStatus.map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151' }}>{s.status}</span>
                  <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: statusColor[s.status.toLowerCase().replace(' ', '-')] || '#374151' }}>{s.count}</span>
                </div>
                <BarCell pct={s.pct} color={statusColor[s.status.toLowerCase().replace(' ', '-')] || '#9CA3AF'} />
              </div>
            ))}
            <div style={{ marginTop: 14, borderTop: '1px solid #F3F4F6', paddingTop: 12 }}>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280', marginBottom: 4 }}>Estimated Procurement Value</div>
              <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: AMBER, wordBreak: 'break-word' }}>{fmt(indents.estimatedTotalValue)}</div>
              <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>Extrapolated from 112 indents</div>
            </div>
          </Card>

          {/* Patient Diet */}
          <Card>
            <SectionTitle>Patient Diet — Hospital Integration</SectionTitle>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: '#0F766E' }}>{d.patientDiet.totalWards}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF' }}>Wards Connected</div>
            </div>
            <MetricRow label="Active Diet Orders" value={`${d.patientDiet.activeOrders}`} valueColor="#0F766E" />
            <MetricRow label="Meals Served Today" value={d.patientDiet.mealsServedToday === 0 ? 'Ramp-up' : d.patientDiet.mealsServedToday} valueColor="#9CA3AF" />
            <div style={{ marginTop: 12 }}>
              {d.patientDiet.hospitals.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < d.patientDiet.hospitals.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#374151' }}>{h.name}</span>
                  <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#0F766E' }}>{h.wards} wards</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, background: '#F0FDF4', borderRadius: 10, padding: '8px 12px' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <CheckCircle size={13} color="#059669" />
                <span style={{ fontFamily: FONT, fontSize: 11, color: '#065F46' }}>Diet types: {d.patientDiet.mealTypes.join(', ')}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
