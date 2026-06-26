import React from 'react';
import { Stethoscope, Plane, ShoppingBag, AlertTriangle, ExternalLink, Clock, Activity, Wifi, WifiOff } from 'lucide-react';
import { financialOverview, travelDeskDetail, departmentCards, attentionItems } from '../data/dashboardData';
import { useBreakpoint } from '../hooks/useBreakpoint';
import PageBanner from '../components/PageBanner';

const FONT = 'Montserrat, system-ui, sans-serif';
const TEAL = '#0F766E';

const fmt = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

function Card({ children, style }) {
  return (
    <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,.07)', padding: '20px 22px', minWidth: 0, ...style }}>
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
      <div style={{ textAlign: 'right', minWidth: 0 }}>
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: valueColor || '#111827', wordBreak: 'break-word' }}>{value}</div>
        {sub && <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{sub}</div>}
      </div>
    </div>
  );
}

const hospitals = [
  { name: 'ASRAM General Hospital',         short: 'ASRAM GH',       budget: 6000000, color: '#0F766E', beds: 850, specialties: 28, status: 'active' },
  { name: 'ASRAM Super Specialty Hospital', short: 'ASRAM SSH',       budget: 5500000, color: '#0891B2', beds: 350, specialties: 18, status: 'active' },
  { name: 'ASRAM Cancer Care Centre',       short: 'Cancer Care',     budget: 2800000, color: '#7C3AED', beds: 120, specialties:  6, status: 'active' },
];

const totalBudget = hospitals.reduce((s, h) => s + h.budget, 0);
const hospitalAlerts = attentionItems.filter(a => a.deptId === 'travel-desk');

const pendingTravelValue = financialOverview.travelClaims.pendingValue;
const travelStages = financialOverview.travelClaims.byStage;

export default function HospitalsOverview({ onNavigate }) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const contentPadding = isMobile ? '20px 16px' : '28px 32px';

  const hospitalGridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)';
  const twoColGridCols = isMobile ? '1fr' : '1fr 1fr';

  const bannerStats = (
    <div style={{ display: 'flex', gap: isMobile ? 8 : 10, flexWrap: 'wrap', marginTop: 10 }}>
      {[
        { label: 'Hospitals',        value: '3' },
        { label: 'Combined Budget',  value: fmt(totalBudget) },
        { label: 'Travel Pipeline',  value: fmt(pendingTravelValue) },
        { label: 'Ward Diet Orders', value: '84' },
      ].map((k, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 10,
          padding: isMobile ? '8px 12px' : '10px 16px',
          minWidth: 0,
        }}>
          <div style={{ fontFamily: FONT, fontSize: isMobile ? 16 : 20, fontWeight: 800, color: 'white', wordBreak: 'break-word', lineHeight: 1.1 }}>{k.value}</div>
          <div style={{ fontFamily: FONT, fontSize: 10.5, color: 'rgba(255,255,255,.65)', marginTop: 3 }}>{k.label}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: FONT, minHeight: '100%', background: '#F8FAFC' }}>
      <div style={{ padding: isMobile ? '20px 16px' : '28px 32px 0' }}>
        <PageBanner
          crumb="DEPARTMENT OVERVIEW"
          title="Hospitals"
          actions={bannerStats}
          background="linear-gradient(135deg, #0F766E 0%, #115E59 60%, #134E4A 100%)"
        />
      </div>

      <div style={{ padding: contentPadding, maxWidth: 1200 }}>

        {/* Travel alert */}
        {hospitalAlerts.length > 0 && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 18px', marginBottom: 24, display: 'flex', gap: 10, overflow: 'hidden' }}>
            <AlertTriangle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ minWidth: 0, wordBreak: 'break-word' }}>
              {hospitalAlerts.map(a => (
                <div key={a.id} style={{ fontFamily: FONT, fontSize: 12, color: '#991B1B', lineHeight: 1.6 }}>
                  <strong>{a.title}</strong> — {a.description}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hospital procurement budget cards */}
        <SectionTitle>Hospital Procurement Budgets</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: hospitalGridCols, gap: 16, marginBottom: 24 }}>
          {hospitals.map((h, i) => (
            <Card key={i} style={{ borderTop: `4px solid ${h.color}` }}>
              <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 4, wordBreak: 'break-word' }}>{h.name}</div>
              <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, color: h.color, marginBottom: 8, wordBreak: 'break-word' }}>{fmt(h.budget)}</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: '#374151' }}>{h.beds}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>Beds</div>
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: '#374151' }}>{h.specialties}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>Specialties</div>
                </div>
              </div>
              <div style={{ marginTop: 12, background: '#F0FDF4', borderRadius: 8, padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Activity size={12} color="#059669" />
                <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: '#065F46' }}>Operational</span>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: twoColGridCols, gap: 20, marginBottom: 24 }}>

          {/* Travel Desk */}
          <Card>
            <SectionTitle>Travel Claims Pipeline</SectionTitle>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', flex: 1, minWidth: 100, background: '#F9FAFB', borderRadius: 10, padding: '12px 8px' }}>
                <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, color: '#D97706', wordBreak: 'break-word' }}>18</div>
                <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>Claims in Pipeline</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1, minWidth: 100, background: '#F9FAFB', borderRadius: 10, padding: '12px 8px' }}>
                <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, color: '#DC2626', wordBreak: 'break-word' }}>{fmt(pendingTravelValue)}</div>
                <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>Pipeline Value</div>
              </div>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 11.5, fontWeight: 600, color: '#374151', marginBottom: 10 }}>Approval Stages</div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              {travelStages.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < travelStages.length - 1 ? '1px solid #F3F4F6' : 'none', minWidth: 0 }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151' }}>{s.stage}</span>
                  <div style={{ textAlign: 'right', minWidth: 0 }}>
                    <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: '#223F7F', wordBreak: 'break-word' }}>{s.count} claims</span>
                    <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{fmt(s.value)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, background: '#FEF2F2', borderRadius: 10, padding: '10px 12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                <AlertTriangle size={13} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: FONT, fontSize: 11, color: '#991B1B', wordBreak: 'break-word' }}>
                  No SLA defined at any of the 5 approval stages. Avg TAT 5.8 days vs 3-day target.
                </span>
              </div>
            </div>
          </Card>

          {/* HIMS Integration placeholder */}
          <Card>
            <SectionTitle>Clinical Systems Integration</SectionTitle>
            <div style={{ background: '#F0FDF4', borderRadius: 12, padding: '20px', marginBottom: 16, textAlign: 'center' }}>
              <Activity size={28} color="#059669" style={{ marginBottom: 8 }} />
              <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#065F46', marginBottom: 4, wordBreak: 'break-word' }}>
                Hospital Information Management
              </div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: '#6B7280', wordBreak: 'break-word' }}>
                Patient data, OPD statistics, ward occupancy, and clinical KPIs pending HIMS integration
              </div>
            </div>

            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              {[
                { system: 'HIMS — Patient Registry',      status: 'pending', note: 'Integration scoped'    },
                { system: 'HIMS — OPD Statistics',        status: 'pending', note: 'Integration scoped'    },
                { system: 'HIMS — Ward Occupancy',        status: 'pending', note: 'Integration scoped'    },
                { system: 'Campus Kitchen — Patient Diet', status: 'active',  note: '84 active diet orders' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none', minWidth: 0 }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151', wordBreak: 'break-word', marginRight: 8 }}>{s.system}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                    {s.status === 'active'
                      ? <span style={{ background: '#D1FAE5', color: '#065F46', borderRadius: 99, padding: '2px 8px', fontFamily: FONT, fontSize: 10.5, fontWeight: 700 }}>Live</span>
                      : <span style={{ background: '#F3F4F6', color: '#6B7280', borderRadius: 99, padding: '2px 8px', fontFamily: FONT, fontSize: 10.5, fontWeight: 700 }}>Pending</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Note */}
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '14px 20px', overflow: 'hidden' }}>
          <div style={{ fontFamily: FONT, fontSize: 12, color: '#1D4ED8', lineHeight: 1.6, wordBreak: 'break-word' }}>
            <strong>Note:</strong> Detailed patient census, OPD throughput, revenue, and clinical KPIs are pending integration with the Hospital Information Management System (HIMS).
            Procurement budgets shown are indent allocations from the Indent Portal. Campus Kitchen patient diet module is live across 26 wards.
          </div>
        </div>
      </div>
    </div>
  );
}
