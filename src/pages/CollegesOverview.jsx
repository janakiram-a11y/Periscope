import React from 'react';
import { GraduationCap, Users, BookOpen, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Fingerprint, FlaskConical, ShoppingCart, IndianRupee } from 'lucide-react';
import { financialOverview, executiveKPIs, attendanceDetail, attentionItems } from '../data/dashboardData';

const FONT = 'Montserrat, system-ui, sans-serif';
const NAVY = '#223F7F';

const fmt = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

function SectionTitle({ children }) {
  return (
    <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14, marginTop: 4 }}>
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,.07)', padding: '20px 22px', ...style }}>
      {children}
    </div>
  );
}

function MetricRow({ label, value, sub, valueColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #F3F4F6' }}>
      <span style={{ fontFamily: FONT, fontSize: 12.5, color: '#374151' }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: valueColor || NAVY }}>{value}</div>
        {sub && <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>{sub}</div>}
      </div>
    </div>
  );
}

function BarCell({ pct, color }) {
  return (
    <div style={{ background: '#F3F4F6', borderRadius: 99, height: 6, width: '100%', overflow: 'hidden', marginTop: 4 }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color || NAVY, borderRadius: 99 }} />
    </div>
  );
}

const admissions = [
  { program: 'MBBS',              seats: 150, enrolled: 142, fillRate: 94.7, color: '#059669' },
  { program: 'PG (MD/MS/Diploma)',seats: 360, enrolled: 340, fillRate: 94.4, color: '#7C3AED' },
  { program: 'Allied Health',     seats: 210, enrolled: 192, fillRate: 91.4, color: '#0891B2' },
  { program: 'Nursing',           seats: 120, enrolled: 118, fillRate: 98.3, color: '#BE185D' },
];

const feeDemand = financialOverview.feeDemand;
const collegeAlerts = attentionItems.filter(a =>
  ['asram-pay', 'asram-finance', 'pg-logbook', 'biometric-attendance'].includes(a.deptId)
);

export default function CollegesOverview({ onNavigate }) {
  const totalStudents = admissions.reduce((s, a) => s + a.enrolled, 0);

  return (
    <div style={{ fontFamily: FONT, minHeight: '100%', background: '#F8FAFC' }}>
      {/* Banner */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1E3A7A 60%, #2D5AA8 100%)`, padding: '28px 32px 24px' }}>
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: 'rgba(147,197,253,.8)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Department Overview
        </div>
        <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 4 }}>Colleges</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Students', value: totalStudents.toLocaleString() },
            { label: 'Staff',    value: '1,373' },
            { label: 'Departments', value: '84' },
            { label: 'Fee Demand', value: fmt(feeDemand.total) },
          ].map((kpi, i) => (
            <div key={i}>
              <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: 'white' }}>{kpi.value}</div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(191,219,254,.75)' }}>{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '28px 32px', maxWidth: 1200 }}>

        {/* Alerts */}
        {collegeAlerts.filter(a => a.severity === 'critical').length > 0 && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 18px', marginBottom: 24, display: 'flex', gap: 10 }}>
            <AlertTriangle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              {collegeAlerts.filter(a => a.severity === 'critical').map(a => (
                <div key={a.id} style={{ fontFamily: FONT, fontSize: 12, color: '#991B1B', lineHeight: 1.6 }}>
                  <strong>{a.title}</strong> — {a.description}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>

          {/* Fee Collection */}
          <Card>
            <SectionTitle>Fee Collection</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Demand',    value: fmt(feeDemand.total),     color: NAVY },
                { label: 'Collected', value: fmt(feeDemand.collected),  color: '#059669' },
                { label: 'Pending',   value: fmt(feeDemand.pending),    color: '#DC2626' },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '10px 0', background: '#F9FAFB', borderRadius: 10 }}>
                  <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#6B7280', marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
            {feeDemand.byType.map((row, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151' }}>{row.type}</span>
                  <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: row.rate < 50 ? '#DC2626' : row.rate < 80 ? '#D97706' : '#059669' }}>
                    {row.rate}%
                  </span>
                </div>
                <BarCell pct={row.rate} color={row.rate < 50 ? '#EF4444' : row.rate < 80 ? '#F59E0B' : '#10B981'} />
              </div>
            ))}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
              <MetricRow label="Hostel Demand"   value={fmt(financialOverview.hostel.demand)}    sub={`${financialOverview.hostel.rate}% collected`} />
              <MetricRow label="Hostel Collected" value={fmt(financialOverview.hostel.collected)} />
            </div>
          </Card>

          {/* Admissions */}
          <Card>
            <SectionTitle>Admissions — AY 2026–27</SectionTitle>
            {admissions.map((a, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: '#374151' }}>{a.program}</span>
                  <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 800, color: a.color }}>{a.fillRate}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarCell pct={a.fillRate} color={a.color} />
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280', whiteSpace: 'nowrap' }}>{a.enrolled} / {a.seats}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 14px', background: '#EFF6FF', borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 700, color: NAVY }}>Total Enrolled</span>
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 800, color: NAVY }}>{totalStudents} / {admissions.reduce((s, a) => s + a.seats, 0)}</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#3B82F6', marginTop: 3 }}>
                Overall fill rate: {Math.round(totalStudents / admissions.reduce((s, a) => s + a.seats, 0) * 100)}%
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>

          {/* Attendance */}
          <Card>
            <SectionTitle>Staff Attendance — Today</SectionTitle>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 800, color: '#D97706' }}>58.3%</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF' }}>Attendance Rate</div>
            </div>
            <MetricRow label="Total Staff"  value="1,373" />
            <MetricRow label="Present"      value="801"   valueColor="#059669" />
            <MetricRow label="Absent"       value="572"   valueColor="#DC2626" />
            <MetricRow label="Half Day"     value="780"   valueColor="#D97706" />
            <MetricRow label="On Leave"     value="21"    />
            <MetricRow label="Devices Offline" value="2 / 24" valueColor="#D97706" />
            <div style={{ marginTop: 12 }}>
              <div style={{ fontFamily: FONT, fontSize: 11.5, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Top Absent Departments</div>
              {attendanceDetail.employee.topAbsentDepts.slice(0, 3).map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280' }}>{d.dept}</span>
                  <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#DC2626' }}>{d.rate}% absent</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Research */}
          <Card>
            <SectionTitle>Research Portal</SectionTitle>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 800, color: NAVY }}>39</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF' }}>Total Proposals</div>
            </div>
            {[
              { label: 'Approved',   value: '14', color: '#059669' },
              { label: 'In Review',  value: '18', color: '#D97706' },
              { label: 'Draft',      value: '7',  color: '#9CA3AF' },
            ].map((r, i) => (
              <MetricRow key={i} label={r.label} value={r.value} valueColor={r.color} />
            ))}
            <div style={{ marginTop: 12, background: '#EFF6FF', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280', marginBottom: 2 }}>Estimated Funding</div>
              <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: NAVY }}>₹1.875 Cr</div>
              <div style={{ fontFamily: FONT, fontSize: 10.5, color: '#9CA3AF' }}>Across approved proposals</div>
            </div>
          </Card>

          {/* Indent Portal */}
          <Card>
            <SectionTitle>Indent Portal</SectionTitle>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 800, color: NAVY }}>₹4.275 Cr</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF' }}>Total Budget Allocated</div>
            </div>
            {[
              { label: 'Spent',         value: fmt(financialOverview.indents.spent),            sub: '0.7% utilised' },
              { label: 'In Pipeline',   value: fmt(financialOverview.indents.pipeline),          sub: 'Pending purchase' },
              { label: 'Pending Approval', value: `${financialOverview.indents.pendingApproval} indents`, valueColor: '#D97706' },
            ].map((r, i) => (
              <MetricRow key={i} label={r.label} value={r.value} sub={r.sub} valueColor={r.valueColor} />
            ))}
            <div style={{ marginTop: 12, background: '#FFFBEB', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <AlertTriangle size={14} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ fontFamily: FONT, fontSize: 11, color: '#92400E' }}>
                  7 purchase indents awaiting multi-level approval — ₹14.08 L at risk of delay
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
