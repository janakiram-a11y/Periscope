import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  ShoppingCart, CheckCircle, Clock, Building2, Wallet, AlertCircle,
  IndianRupee,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import PageBanner from '../components/PageBanner';
import {
  indentKPIs, indentByInstitution, indentApprovalPipeline,
  indentRecentActivity, indentFinancials, indentBudgetByInstitution,
} from '../data/mockData';

const FONT = 'Montserrat, system-ui, sans-serif';

const STATUS_COLORS = {
  'Pending Admin':    '#F97316',
  'Pending Approver': '#223F7F',
  'Completed':        '#059669',
  'Rejected':         '#EF4444',
};

function formatINR(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

function formatINRFull(n) {
  return '₹' + n.toLocaleString('en-IN');
}

const spendPct     = Math.round((indentFinancials.totalBudgetUsed / indentFinancials.totalBudgetAllocated) * 100 * 10) / 10;
const completedPct = Math.round((indentFinancials.completedSpend / indentFinancials.totalPipelineValue) * 100);
const pipelinePct  = Math.min(
  Math.round((indentFinancials.totalPipelineValue / indentFinancials.totalBudgetAllocated) * 100),
  100 - spendPct,
);

export default function IndentOverview() {
  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      <PageBanner
        crumb="Portal / Indent"
        title="Indent Portal"
        subtitle="Purchase requisitions and budget overview across 15 institutions"
        stat={{ value: indentKPIs.total, label: 'Indents' }}
      />

      {/* Financial overview banner */}
      <div style={{
        background: '#FFFFFF', borderRadius: 16, padding: '24px 28px',
        border: '1px solid #C7D2FE',
        boxShadow: '0 1px 2px rgba(0,0,0,.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <IndianRupee size={16} color="#223F7F" />
          <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: '#223F7F', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Financial Overview — All Institutions
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          {[
            { label: 'Total Budget Allocated', value: formatINR(indentFinancials.totalBudgetAllocated),     sub: 'Across all active institutions', accent: '#223F7F' },
            { label: 'Total Spend to Date',    value: formatINRFull(indentFinancials.totalBudgetUsed),       sub: `${spendPct}% of total budget used`,   accent: '#059669' },
            { label: 'Procurement Pipeline',   value: formatINRFull(indentFinancials.totalPipelineValue),    sub: 'Value of indents in approval',         accent: '#F97316' },
            { label: 'Completed Procurement',  value: formatINRFull(indentFinancials.completedSpend),        sub: `${completedPct}% of pipeline fulfilled`, accent: '#7C3AED' },
          ].map(kpi => (
            <div key={kpi.label} style={{
              background: '#F9FAFB', borderRadius: 10, padding: '16px 18px',
              border: '1px solid #E5E7EB',
            }}>
              <div style={{ fontFamily: FONT, fontSize: 10, color: '#6B7280', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{kpi.label}</div>
              <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: kpi.accent, letterSpacing: '-0.5px' }}>{kpi.value}</div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF', marginTop: 5 }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Budget utilisation bar */}
        <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '14px 18px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 13, color: '#1F2937', fontWeight: 600 }}>Organisation-wide Budget Utilisation</span>
            <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#223F7F' }}>{spendPct}% Used · {formatINR(indentFinancials.totalBudgetRemaining)} Remaining</span>
          </div>
          <div style={{ height: 10, borderRadius: 5, background: '#E5E7EB', overflow: 'hidden', display: 'flex', gap: 2 }}>
            <div style={{ width: `${spendPct}%`, background: 'linear-gradient(90deg, #059669, #10B981)', borderRadius: 5 }} />
            <div style={{ width: `${pipelinePct}%`, background: '#F97316', borderRadius: 5 }} />
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 11, color: '#059669' }}>● Spent</span>
            <span style={{ fontFamily: FONT, fontSize: 11, color: '#F97316' }}>● In Pipeline</span>
            <span style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>● Available</span>
          </div>
        </div>
      </div>

      {/* Activity KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        <StatCard label="Total Indents"   value={indentKPIs.total}        sub="All institutions"     icon={ShoppingCart} color="#374151" />
        <StatCard label="In Approval"     value={indentKPIs.inApproval}   sub="Awaiting action"      icon={Clock}        color="#F97316" />
        <StatCard label="Completed"       value={indentKPIs.completed}    sub="Fully processed"      icon={CheckCircle}  color="#059669" />
        <StatCard label="Rejected"        value={indentKPIs.rejected}     sub="Did not proceed"      icon={AlertCircle}  color="#EF4444" />
        <StatCard label="Institutions"    value={indentKPIs.institutions}  sub="Active institutions"  icon={Building2}    color="#3B82F6" />
      </div>

      {/* Budget utilisation by institution */}
      <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px 24px', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
        <SectionHeader title="Budget Utilisation by Institution" sub="Allocated vs. spent — all registered institutions" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {indentBudgetByInstitution.map(b => {
            const pct      = b.pct;
            const barColor = pct > 80 ? '#EF4444' : pct > 50 ? '#F97316' : pct > 0 ? '#059669' : '#E5E7EB';
            const txtColor = pct > 80 ? '#EF4444' : pct > 50 ? '#F97316' : pct > 0 ? '#059669' : '#9CA3AF';
            return (
              <div key={b.code} style={{ padding: '12px 14px', background: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{b.inst}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{b.activeIndents > 0 ? `${b.activeIndents} active indent(s)` : 'No active indents'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: txtColor }}>{pct > 0 ? pct.toFixed(1) + '%' : '0%'}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>utilised</div>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: '#E5E7EB', overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ width: `${Math.max(pct, pct > 0 ? 1 : 0)}%`, height: '100%', background: barColor, borderRadius: 3 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>Spent: <span style={{ color: '#374151', fontWeight: 600 }}>{formatINRFull(b.used)}</span></span>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>Budget: <span style={{ color: '#374151', fontWeight: 600 }}>{formatINR(b.allocated)}</span></span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 14, padding: '12px 16px', background: '#EEF2FF', borderRadius: 10, border: '1px solid #C7D2FE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 13, color: '#223F7F', fontWeight: 500 }}>Total budget across all {indentBudgetByInstitution.length} institutions</span>
          <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 800, color: '#223F7F' }}>{formatINR(indentFinancials.totalBudgetAllocated)}</span>
        </div>
      </div>

      {/* Approval pipeline + Recent indents */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Approval pipeline */}
        <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px 24px', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
          <SectionHeader title="Approval Pipeline" sub="Indents at each workflow step right now" />
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={indentApprovalPipeline} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="step" tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: FONT }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: FONT }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB', fontFamily: FONT }}
                formatter={(v) => [v + ' indent(s)', 'Count']}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {indentApprovalPipeline.map(entry => (
                  <Cell key={entry.step} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: '#6B7280', marginBottom: 10, fontWeight: 500 }}>Workflow chain: Organisation → Institute</div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
              {['Submit', 'L1 Approve', 'Director', 'CEO', 'L4 Approve', 'Purchase', 'Acquisition', '✓ Done'].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span style={{
                    fontFamily: FONT, fontSize: 10, fontWeight: 600,
                    color: i < 7 ? '#223F7F' : '#059669',
                    background: i < 7 ? '#EEF2FF' : '#ECFDF5',
                    border: `1px solid ${i < 7 ? '#C7D2FE' : '#A7F3D0'}`,
                    borderRadius: 4, padding: '2px 7px',
                  }}>{step}</span>
                  {i < arr.length - 1 && <span style={{ color: '#D1D5DB', fontSize: 11 }}>›</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px 24px', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
          <SectionHeader title="Recent Indents" sub="Latest purchase requisitions raised" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {indentRecentActivity.map((indent, i) => (
              <div key={indent.id} style={{
                padding: '10px 0',
                borderBottom: i < indentRecentActivity.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: STATUS_COLORS[indent.status] + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShoppingCart size={15} color={STATUS_COLORS[indent.status]} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {indent.title}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                    {indent.inst} · {indent.daysAgo === 0 ? 'Today' : `${indent.daysAgo}d ago`}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#1F2937' }}>{formatINRFull(indent.amount)}</div>
                  <div style={{
                    fontFamily: FONT, fontSize: 10, fontWeight: 600,
                    color: STATUS_COLORS[indent.status],
                    background: STATUS_COLORS[indent.status] + '18',
                    borderRadius: 4, padding: '1px 6px', marginTop: 3, display: 'inline-block',
                  }}>{indent.status}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F3F4F6', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Total Pipeline',     value: formatINRFull(indentFinancials.totalPipelineValue),    color: '#1F2937' },
              { label: 'Pending Approval',   value: formatINRFull(indentFinancials.pendingApprovalValue),  color: '#F97316' },
              { label: 'Completed',          value: formatINRFull(indentFinancials.completedSpend),        color: '#059669' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center', padding: 8, background: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF' }}>{item.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: item.color, marginTop: 3 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
