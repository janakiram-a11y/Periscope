import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, CheckCircle, Building2, Stethoscope, Utensils, ChevronRight, Users, IndianRupee, AlertCircle } from 'lucide-react';
import { financialOverview, executiveKPIs, attentionItems, foodKitchenData } from '../data/dashboardData';
import { useBreakpoint } from '../hooks/useBreakpoint';

const FONT = 'Montserrat, system-ui, sans-serif';
const NAVY = '#223F7F';

const fmt = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const RAG = {
  green:  { bg: '#D1FAE5', color: '#065F46', dot: '#10B981', label: 'On Track'  },
  amber:  { bg: '#FEF3C7', color: '#92400E', dot: '#F59E0B', label: 'Attention' },
  red:    { bg: '#FEE2E2', color: '#991B1B', dot: '#EF4444', label: 'Critical'  },
};

function RagBadge({ status }) {
  const s = RAG[status] || RAG.green;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: s.bg, color: s.color, borderRadius: 99, padding: '2px 10px', fontFamily: FONT, fontSize: 11, fontWeight: 700 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}

function KpiCard({ icon: Icon, iconBg, label, value, sub, rag }) {
  return (
    <div style={{ background: 'white', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,.07)', display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={20} color="white" strokeWidth={2} />
        </div>
        {rag && <RagBadge status={rag} />}
      </div>
      <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: '#111827', lineHeight: 1.1, marginTop: 4, wordBreak: 'break-word', minWidth: 0 }}>{value}</div>
      <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: '#6B7280' }}>{label}</div>
      {sub && <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>{sub}</div>}
    </div>
  );
}

function DeptCard({ icon: Icon, color, dept, onClick, financials, counts, alerts, rag }) {
  return (
    <div
      onClick={onClick}
      style={{ background: 'white', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,.07)', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow .15s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.12)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.07)'}
    >
      <div style={{ background: color, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={20} color="white" strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 800, color: 'white' }}>{dept}</div>
            <RagBadge status={rag} />
          </div>
        </div>
        <ChevronRight size={20} color="rgba(255,255,255,.7)" />
      </div>
      <div style={{ padding: '18px 22px' }}>
        {/* Financials */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Financial</div>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, minWidth: 220 }}>
              {financials.map((f, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: NAVY, wordBreak: 'break-word' }}>{f.value}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: '#6B7280', marginTop: 2 }}>{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div style={{ borderTop: '1px solid #F3F4F6', marginBottom: 14 }} />
        {/* Counts */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
          {counts.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#374151' }}>{c.value}</div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>{c.label}</div>
            </div>
          ))}
        </div>
        {/* Alerts */}
        {alerts.length > 0 && (
          <div style={{ background: '#FEF2F2', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <AlertTriangle size={14} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ minWidth: 0, wordBreak: 'break-word' }}>
              {alerts.slice(0, 2).map((a, i) => (
                <div key={i} style={{ fontFamily: FONT, fontSize: 11, color: '#991B1B', lineHeight: 1.4 }}>{a}</div>
              ))}
              {alerts.length > 2 && <div style={{ fontFamily: FONT, fontSize: 10, color: '#B91C1C', marginTop: 2 }}>+{alerts.length - 2} more</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrgSummary({ onNavigate }) {
  const { isMobile, isTablet } = useBreakpoint();

  const criticalAlerts = attentionItems.filter(a => a.severity === 'critical');
  const highAlerts     = attentionItems.filter(a => a.severity === 'high');

  // Consolidated financials
  const totalDemand    = financialOverview.feeDemand.total + financialOverview.hostel.demand;
  const totalCollected = financialOverview.feeDemand.collected + financialOverview.hostel.collected;
  const totalPending   = totalDemand - totalCollected;

  const collegeFin = [
    { label: 'Demand',    value: fmt(financialOverview.feeDemand.total) },
    { label: 'Collected', value: fmt(financialOverview.feeDemand.collected) },
    { label: 'Rate',      value: `${financialOverview.feeDemand.rate}%` },
  ];
  const hospitalFin = [
    { label: 'GH Budget',  value: '₹60 L' },
    { label: 'SSH Budget', value: '₹55 L' },
    { label: 'Cancer Care',value: '₹28 L' },
  ];
  const foodFin = [
    { label: 'Mess Billing', value: fmt(foodKitchenData.messBilling.totalBilled) },
    { label: 'Collected',    value: fmt(foodKitchenData.messBilling.collected) },
    { label: 'A1 Payable',   value: fmt(foodKitchenData.vendorPayables.outstanding) },
  ];

  const bannerPadding = isMobile ? '20px 16px' : '28px 32px 24px';
  const bannerTitleSize = isMobile ? 20 : 24;
  const contentPadding = isMobile ? '20px 16px' : '28px 32px';
  const kpiGridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(5, 1fr)';
  const deptGridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(auto-fit, minmax(280px, 1fr))';

  return (
    <div style={{ fontFamily: FONT, minHeight: '100%', background: '#F8FAFC' }}>
      {/* Banner */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1E3A7A 50%, #2D5AA8 100%)`, padding: bannerPadding }}>
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: 'rgba(147,197,253,.8)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Laila Management · Periscope
        </div>
        <div style={{ fontFamily: FONT, fontSize: bannerTitleSize, fontWeight: 800, color: 'white', marginBottom: 4, wordBreak: 'break-word' }}>
          Organisation Summary
        </div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(191,219,254,.75)', flexWrap: 'wrap' }}>
          Asram Colleges · Academic Year 2026–27 · As of 26 Jun 2026
        </div>
      </div>

      <div style={{ padding: contentPadding, maxWidth: 1200 }}>
        {/* Top financial KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: kpiGridCols, gap: 16, marginBottom: 28 }}>
          <KpiCard icon={IndianRupee} iconBg="#223F7F" label="Total Fee Demand" value={fmt(totalDemand)} sub="College + Hostel fees" rag="amber" />
          <KpiCard icon={TrendingUp}  iconBg="#059669" label="Total Collected"  value={fmt(totalCollected)} sub={`${Math.round(totalCollected/totalDemand*100)}% collection rate`} rag="amber" />
          <KpiCard icon={TrendingDown} iconBg="#DC2626" label="Total Pending"    value={fmt(totalPending)} sub="Across all fee streams" rag="red" />
          <KpiCard icon={Users}        iconBg="#7C3AED" label="Total Students"   value="792" sub="MBBS + PG + Allied + Nursing" />
          <KpiCard icon={AlertCircle}  iconBg="#F97316" label="Alerts"           value={`${criticalAlerts.length} Critical`} sub={`${highAlerts.length} High priority`} rag="red" />
        </div>

        {/* Alert strip */}
        {criticalAlerts.length > 0 && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '14px 20px', marginBottom: 28, display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <AlertTriangle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>
                {criticalAlerts.length} Critical Issues Require Immediate Attention
              </div>
              {criticalAlerts.map(a => (
                <div key={a.id} style={{ fontFamily: FONT, fontSize: 12, color: '#B91C1C', lineHeight: 1.5 }}>
                  · {a.title} — {a.department}
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('management-alerts')}
              style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: '#DC2626', background: 'none', border: '1px solid #FECACA', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              View All Alerts
            </button>
          </div>
        )}

        {/* Department section header */}
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Departments
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: deptGridCols, gap: 20 }}>
          <DeptCard
            icon={Building2} color="#223F7F" dept="Colleges" rag="amber"
            onClick={() => onNavigate('colleges-overview')}
            financials={collegeFin}
            counts={[
              { value: '792', label: 'Students' },
              { value: '1,373', label: 'Staff' },
              { value: '84', label: 'Departments' },
            ]}
            alerts={[
              'DD/NEFT backlog — 47 payments (₹12.5 L) awaiting realisation',
              '38 student payments pending approval — clearance blocked',
            ]}
          />
          <DeptCard
            icon={Stethoscope} color="#0F766E" dept="Hospitals" rag="amber"
            onClick={() => onNavigate('hospitals-overview')}
            financials={hospitalFin}
            counts={[
              { value: '26', label: 'Wards' },
              { value: '18', label: 'Travel Claims' },
              { value: '₹3.2 L', label: 'Claim Pipeline' },
            ]}
            alerts={[
              'Travel Desk — no SLA at any approval stage, avg 5.8 days vs 3-day target',
            ]}
          />
          <DeptCard
            icon={Utensils} color="#B45309" dept="Food & Kitchen" rag="amber"
            onClick={() => onNavigate('food-kitchen')}
            financials={foodFin}
            counts={[
              { value: '7', label: 'Diners' },
              { value: '1,103', label: 'Seats' },
              { value: '112', label: 'Indents' },
            ]}
            alerts={[
              'A1 Finance — 3 overdue vendor invoices (₹1.75 L)',
              'Mess collection at 85% — ₹3.63 L outstanding',
            ]}
          />
        </div>
      </div>
    </div>
  );
}
