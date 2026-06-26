import React from 'react';
import PageBanner from '../components/PageBanner';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import {
  Users, Building2, Fingerprint, GraduationCap, IndianRupee,
  AlertTriangle, Clock, ChevronRight, ArrowRight,
  CheckCircle, TrendingDown, Activity, BookOpen, CreditCard,
} from 'lucide-react';
import { formatINR } from '../utils/format';
import {
  executiveKPIs, attendanceSummary, financialOverview,
  departmentCards, attentionItems, tatSlaData,
} from '../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

// ── Colour helpers ────────────────────────────────────────────────────────────
const HEALTH_COLOR  = { good: '#059669', warning: '#F97316', critical: '#EF4444' };
const HEALTH_BG     = { good: '#D1FAE5', warning: '#FFEDD5', critical: '#FEE2E2' };
const HEALTH_LABEL  = { good: 'Healthy',  warning: 'Attention', critical: 'Critical' };
const SLA_COLOR     = { 'on-track': '#059669', warning: '#F97316', breached: '#EF4444' };
const SLA_BG        = { 'on-track': '#D1FAE5', warning: '#FFEDD5', breached: '#FEE2E2' };
const SLA_LABEL     = { 'on-track': 'On Track', warning: 'Warning', breached: 'Breached' };
const SEV_COLOR     = { critical: '#EF4444', high: '#F97316', medium: '#F59E0B' };
const SEV_BG        = { critical: '#FEF2F2', high: '#FFF7ED', medium: '#FFFBEB' };
const SEV_BORDER    = { critical: '#EF4444', high: '#F97316', medium: '#F59E0B' };
const TYPE_COLOR    = { financial: '#223F7F', compliance: '#7C3AED', operational: '#059669', process: '#0891B2' };
const TYPE_BG       = { financial: '#EFF6FF', compliance: '#F5F3FF', operational: '#ECFDF5', process: '#EFF9FF' };

// ── Mini components ───────────────────────────────────────────────────────────
function Card({ children, style }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB',
      boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px',
      ...style,
    }}>{children}</div>
  );
}

function CssBar({ pct: p, color = '#223F7F', height = 6, bg = '#E5E7EB' }) {
  return (
    <div style={{ background: bg, borderRadius: 99, height, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(p, 100)}%`, height: '100%', background: color, borderRadius: 99, transition: 'width .4s' }} />
    </div>
  );
}

function Badge({ label, color, bg, size = 11 }) {
  return (
    <span style={{
      fontFamily: F, fontSize: size, fontWeight: 700,
      color, background: bg, padding: '2px 8px', borderRadius: 99,
      display: 'inline-block', letterSpacing: '0.02em',
    }}>{label}</span>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export default function PeriscopeDashboard({ onNavigate }) {

  const { feeDemand, offlineQueues, hostel, a1Payable, travelClaims } = financialOverview;
  const totalPendingFinancial = feeDemand.pending + hostel.pending + a1Payable.outstanding + travelClaims.pendingValue;
  const critical = attentionItems.filter(i => i.severity === 'critical').length;
  const breached  = tatSlaData.filter(i => i.status === 'breached').length;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      {/* ── PAGE BANNER ── */}
      <PageBanner
        crumb="Periscope · Laila Management"
        title="Management Dashboard"
        subtitle={`Asram Colleges · Academic Year 2026–2027 · As of 22 Jun 2026`}
        stat={{ value: executiveKPIs.pendingApprovals, label: 'Pending Approvals' }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — EXECUTIVE SUMMARY
      ════════════════════════════════════════════════════════════════════ */}
      <div>
        <SectionHeader title="Executive Summary" sub="Institution-wide KPIs at a glance" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
          <StatCard label="Total Students"    value={executiveKPIs.totalStudents.toLocaleString()}   icon={GraduationCap} color="#223F7F" />
          <StatCard label="Total Employees"   value={executiveKPIs.totalEmployees.toLocaleString()}  icon={Users}         color="#059669" />
          <StatCard label="Departments"       value={executiveKPIs.totalDepartments}                 icon={Building2}     color="#7C3AED" />
          <StatCard label="Active Admissions" value={executiveKPIs.totalAdmissions}                  icon={BookOpen}      color="#0891B2" />
          <StatCard label="Biometric Devices" value={`${executiveKPIs.devicesOnline}/${executiveKPIs.biometricDevices}`} icon={Fingerprint} color={executiveKPIs.devicesOffline > 0 ? '#F97316' : '#059669'} sub={`${executiveKPIs.devicesOffline} offline`} />
        </div>
      </div>

      {/* Summary status row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

        {/* Attendance Today */}
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Attendance Today</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>Employee</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: attendanceSummary.employee.rate < 70 ? '#F97316' : '#059669' }}>
                  {attendanceSummary.employee.rate}%
                </span>
              </div>
              <CssBar pct={attendanceSummary.employee.rate} color="#F97316" />
              <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11, color: '#6B7280' }}>
                <span>Present: <strong style={{ color: '#059669' }}>{attendanceSummary.employee.present}</strong></span>
                <span>Absent: <strong style={{ color: '#EF4444' }}>{attendanceSummary.employee.absent}</strong></span>
                <span>Leave: <strong>{attendanceSummary.employee.onLeave}</strong></span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>Student (MBBS)</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#223F7F' }}>{attendanceSummary.student.classesToday} classes</span>
              </div>
              <div style={{ fontSize: 11, color: '#6B7280' }}>
                Sample — ENT Theory: <strong style={{ color: '#059669' }}>159</strong> present / <strong style={{ color: '#EF4444' }}>89</strong> absent of 248
              </div>
            </div>
          </div>
        </Card>

        {/* Financial Snapshot */}
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Financial Health</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Fee Demand',        value: formatINR(feeDemand.total),   color: '#223F7F' },
              { label: 'Fee Collected',     value: formatINR(feeDemand.collected), color: '#059669' },
              { label: 'Total Pending',     value: formatINR(totalPendingFinancial), color: '#EF4444' },
              { label: 'Collection Rate',   value: `${feeDemand.rate}%`,          color: feeDemand.rate >= 80 ? '#059669' : feeDemand.rate >= 60 ? '#F97316' : '#EF4444' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: '#F9FAFB', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color, marginTop: 3 }}>{value}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts Snapshot */}
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Alerts & Compliance</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: AlertTriangle, label: 'Critical Issues',       value: critical,  color: '#EF4444', bg: '#FEE2E2' },
              { icon: Clock,         label: 'SLA Breached',          value: breached,   color: '#F97316', bg: '#FFEDD5' },
              { icon: IndianRupee,   label: 'Financial Risk Items',  value: attentionItems.filter(i => i.type === 'financial').length, color: '#223F7F', bg: '#EFF6FF' },
              { icon: CheckCircle,   label: 'Departments Healthy',   value: departmentCards.filter(d => d.health === 'good').length,   color: '#059669', bg: '#D1FAE5' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', background: bg, borderRadius: 8 }}>
                <Icon size={14} color={color} />
                <span style={{ flex: 1, fontSize: 12, color: '#374151', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color }}>{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — FINANCIAL OVERVIEW
      ════════════════════════════════════════════════════════════════════ */}
      <div>
        <SectionHeader title="Financial Overview" sub="Revenue, collections, pending amounts, and liabilities across all departments" />

        {/* Top financial row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 14 }}>
          {[
            { label: 'Total Fee Demand',  value: formatINR(feeDemand.total),     sub: 'Current academic year',        color: '#223F7F', icon: IndianRupee },
            { label: 'Fee Collected',     value: formatINR(feeDemand.collected),  sub: `${feeDemand.rate}% collection rate`, color: '#059669', icon: CheckCircle },
            { label: 'Fee Pending',       value: formatINR(feeDemand.pending),    sub: 'Receivable outstanding',       color: '#F97316', icon: Clock },
            { label: 'Total Liabilities', value: formatINR(a1Payable.outstanding + travelClaims.pendingValue), sub: 'A1 payable + travel claims', color: '#EF4444', icon: TrendingDown },
          ].map(({ label, value, sub, color, icon: Icon }) => (
            <StatCard key={label} label={label} value={value} sub={sub} icon={Icon} color={color} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

          {/* Fee collection by type */}
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Fee Collection by Type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {feeDemand.byType.map(({ type, demand, collected, pending, rate }) => (
                <div key={type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{type}</span>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>{formatINR(collected)} / {formatINR(demand)}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: rate >= 80 ? '#059669' : rate >= 60 ? '#F97316' : '#EF4444', minWidth: 36, textAlign: 'right' }}>{rate}%</span>
                    </div>
                  </div>
                  <CssBar pct={rate} color={rate >= 80 ? '#059669' : rate >= 60 ? '#F97316' : '#EF4444'} />
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>Pending: {formatINR(pending)}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Offline queues + liabilities */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Offline Payment Queues</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'DD / NEFT Awaiting Realisation', count: offlineQueues.ddNeft.count,      amount: offlineQueues.ddNeft.amount,      severity: 'critical' },
                  { label: 'Arogyasree (Govt Disbursement)', count: offlineQueues.arogyasree.count,  amount: offlineQueues.arogyasree.amount,  severity: 'high' },
                  { label: 'Student Payment Final Approval', count: offlineQueues.studentApproval.count, amount: offlineQueues.studentApproval.amount, severity: 'high' },
                ].map(({ label, count, amount, severity }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: SEV_BG[severity], borderRadius: 8, borderLeft: `3px solid ${SEV_BORDER[severity]}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{label}</div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>{formatINR(amount)}</div>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: SEV_COLOR[severity], minWidth: 28, textAlign: 'right' }}>{count}</span>
                    <span style={{ fontSize: 10, color: SEV_COLOR[severity], fontWeight: 600 }}>items</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>Liabilities & Commitments</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { label: 'A1 Services Outstanding',  value: formatINR(a1Payable.outstanding), note: `${a1Payable.overdueInvoices} overdue invoices`, color: '#EF4444' },
                  { label: 'Travel Claims Pipeline',   value: formatINR(travelClaims.pendingValue), note: `${travelClaims.claimsInPipeline} claims in ${travelClaims.byStage.length} stages`, color: '#F97316' },
                  { label: 'Hostel Pending',           value: formatINR(hostel.pending),           note: `${hostel.rate}% collection rate`,            color: '#F97316' },
                  { label: 'Procurement Pipeline',     value: formatINR(financialOverview.indents.pipeline), note: `${financialOverview.indents.pendingApproval} indents pending`, color: '#223F7F' },
                ].map(({ label, value, note, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: 8, background: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{label}</div>
                      <div style={{ fontSize: 10, color: '#9CA3AF' }}>{note}</div>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color }}>{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — DEPARTMENT OVERVIEW CARDS
      ════════════════════════════════════════════════════════════════════ */}
      <div>
        <SectionHeader title="Department Overview" sub="Health status, KPIs, approval queues, and SLA compliance per department" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {departmentCards.map(dept => (
            <DeptCard key={dept.id} dept={dept} onClick={() => dept.hasDetail && !dept.comingSoon && onNavigate(dept.id)} />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — ATTENTION REQUIRED
      ════════════════════════════════════════════════════════════════════ */}
      <div>
        <SectionHeader
          title="Attention Required"
          sub="Critical issues, pending approvals, SLA breaches, and financial risks — sorted by severity"
          action={
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge label={`${critical} Critical`} color="#EF4444" bg="#FEE2E2" />
              <Badge label={`${attentionItems.filter(i => i.severity === 'high').length} High`} color="#F97316" bg="#FFEDD5" />
              <Badge label={`${attentionItems.filter(i => i.severity === 'medium').length} Medium`} color="#F59E0B" bg="#FFFBEB" />
            </div>
          }
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {attentionItems.map(item => (
            <div key={item.id} style={{
              background: SEV_BG[item.severity],
              border: `1px solid ${SEV_BORDER[item.severity]}22`,
              borderLeft: `4px solid ${SEV_BORDER[item.severity]}`,
              borderRadius: 10, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 90 }}>
                <Badge label={item.severity.toUpperCase()} color={SEV_COLOR[item.severity]} bg={`${SEV_COLOR[item.severity]}22`} size={10} />
                <Badge label={item.type} color={TYPE_COLOR[item.type]} bg={TYPE_BG[item.type]} size={10} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{item.title}</div>
                <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{item.description}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{item.department}</span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>Age: {item.age}</span>
                {item.count !== null && (
                  <span style={{ fontSize: 16, fontWeight: 800, color: SEV_COLOR[item.severity] }}>{item.count}</span>
                )}
              </div>
              {item.deptId && (
                <button
                  onClick={() => onNavigate(item.deptId)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px',
                    background: 'white', border: `1px solid ${SEV_BORDER[item.severity]}44`,
                    borderRadius: 6, cursor: 'pointer', color: SEV_COLOR[item.severity],
                    fontFamily: F, fontSize: 11, fontWeight: 600, flexShrink: 0,
                  }}
                >
                  View <ArrowRight size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — TAT & SLA MONITORING
      ════════════════════════════════════════════════════════════════════ */}
      <div>
        <SectionHeader
          title="TAT & SLA Monitoring"
          sub="Turn-Around Time vs. targets across all approval processes"
          action={
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge label={`${breached} Breached`} color="#EF4444" bg="#FEE2E2" />
              <Badge label={`${tatSlaData.filter(t => t.status === 'warning').length} Warning`} color="#F97316" bg="#FFEDD5" />
              <Badge label={`${tatSlaData.filter(t => t.status === 'on-track').length} On Track`} color="#059669" bg="#D1FAE5" />
            </div>
          }
        />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Process','Department','Current TAT','Target TAT','Breach','Responsible','Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tatSlaData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>
                    {row.process}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {row.deptId ? (
                      <button onClick={() => onNavigate(row.deptId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#223F7F', fontFamily: F, fontSize: 12, fontWeight: 600, padding: 0, textDecoration: 'underline dotted' }}>
                        {row.department}
                      </button>
                    ) : (
                      <span style={{ color: '#374151' }}>{row.department}</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: SLA_COLOR[row.status] }}>{row.currentTAT}</td>
                  <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.targetTAT}</td>
                  <td style={{ padding: '10px 14px' }}>
                    {row.breach ? (
                      <span style={{ fontSize: 11, fontWeight: 700, color: row.status === 'warning' ? '#F97316' : '#EF4444' }}>{row.breach}</span>
                    ) : <span style={{ color: '#D1FAE5', fontSize: 11 }}>—</span>}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.responsible}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <Badge label={SLA_LABEL[row.status]} color={SLA_COLOR[row.status]} bg={SLA_BG[row.status]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Bottom padding */}
      <div style={{ height: 12 }} />
    </div>
  );
}

// ── Department card component ─────────────────────────────────────────────────
function DeptCard({ dept, onClick }) {
  const hc = HEALTH_COLOR[dept.health];
  const hb = HEALTH_BG[dept.health];
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0,0,0,.06)', overflow: 'hidden',
        cursor: dept.hasDetail && !dept.comingSoon ? 'pointer' : 'default',
        transition: 'box-shadow .15s, transform .15s',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => { if (dept.hasDetail && !dept.comingSoon) { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: dept.color }} />

      <div style={{ padding: '14px 16px', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1F2937', fontFamily: F, lineHeight: 1.3 }}>{dept.name}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
            <Badge label={HEALTH_LABEL[dept.health]} color={hc} bg={hb} size={10} />
            {dept.comingSoon && <Badge label="Coming Soon" color="#6B7280" bg="#F3F4F6" size={10} />}
          </div>
        </div>

        {/* Key metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
          {dept.metrics.map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#6B7280', fontFamily: F }}>{label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#1F2937', fontFamily: F }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: F }}>Approval Queue</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: dept.approvalQueue > 20 ? '#EF4444' : dept.approvalQueue > 5 ? '#F97316' : '#374151', fontFamily: F }}>{dept.approvalQueue}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: F }}>Avg TAT</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#374151', fontFamily: F }}>{dept.avgTAT}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: F }}>SLA</span>
            <Badge label={SLA_LABEL[dept.slaStatus]} color={SLA_COLOR[dept.slaStatus]} bg={SLA_BG[dept.slaStatus]} size={10} />
          </div>
        </div>
      </div>

      {/* Footer */}
      {dept.hasDetail && !dept.comingSoon && (
        <div style={{
          padding: '8px 16px', background: '#F9FAFB', borderTop: '1px solid #F3F4F6',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: F }}>Updated {dept.lastUpdated}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: dept.color, fontSize: 11, fontWeight: 600, fontFamily: F }}>
            View Details <ChevronRight size={12} />
          </div>
        </div>
      )}
    </div>
  );
}
