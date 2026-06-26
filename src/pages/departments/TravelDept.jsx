import React from 'react';
import PageBanner from '../../components/PageBanner';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { Plane, Clock, IndianRupee, CheckCircle, AlertTriangle, ChevronLeft, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/format';
import { travelDeskDetail } from '../../data/dashboardData';

const F = 'Montserrat, system-ui, sans-serif';

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}

function Badge({ label, color, bg }) {
  return <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}

const STAGE_COLOR = ['#6B7280','#F59E0B','#3B82F6','#8B5CF6','#059669'];

export default function TravelDept({ onBack }) {
  const d = travelDeskDetail;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Management Dashboard · Travel Desk"
        title="Travel Desk — Claim Management"
        subtitle="5-stage travel claim approval: Faculty → HOD → HR → Finance → Accounts"
        actions={
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 600 }}>
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
        }
        stat={{ value: d.summary.claimsInPipeline, label: 'Claims in Pipeline' }}
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Pipeline Value"   value={formatINR(d.summary.pendingValue)}   icon={IndianRupee} color="#223F7F" />
        <StatCard label="Claims in Flight" value={d.summary.claimsInPipeline}          icon={Plane}       color="#7C3AED" />
        <StatCard label="Avg Approval TAT" value={d.summary.avgApprovalTAT}            icon={Clock}       color="#F97316" sub="No SLA enforced" />
        <StatCard label="Approved YTD"     value={formatINR(d.summary.approvedYTD)}    icon={CheckCircle} color="#059669" />
      </div>

      {/* 5-stage approval pipeline */}
      <div>
        <SectionHeader title="Approval Stage Pipeline" sub="Current claims count and avg TAT at each approval stage" />
        <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
          {d.stages.map((stage, i) => (
            <React.Fragment key={stage.name}>
              <Card style={{ flex: 1, textAlign: 'center', borderTop: `3px solid ${STAGE_COLOR[i]}`, borderRadius: i === 0 ? '12px 0 0 12px' : i === d.stages.length - 1 ? '0 12px 12px 0' : 0, borderRight: i < d.stages.length - 1 ? '0' : '1px solid #E5E7EB', borderLeft: i === 0 ? '1px solid #E5E7EB' : '0' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: STAGE_COLOR[i], textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Stage {i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>{stage.name}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: STAGE_COLOR[i], lineHeight: 1.1, marginBottom: 6 }}>{stage.count}</div>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>Avg TAT: <strong style={{ color: '#374151' }}>{stage.avgTAT}</strong></div>
                {stage.maxAge && <div style={{ fontSize: 10, color: '#EF4444', marginTop: 4 }}>Max age: {stage.maxAge}</div>}
              </Card>
              {i < d.stages.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px', background: '#F9FAFB', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
                  <ArrowRight size={16} color="#D1D5DB" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Claims by type + pending table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Claims by Type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.claimsByType.map(({ type, count, totalValue, avgValue }) => (
              <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #F3F4F6' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{type}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>Avg: {formatINR(avgValue)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#1F2937' }}>{formatINR(totalValue)}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>{count} claims</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 14 }}>Aging Analysis</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 10 }}>Claims pending by age bucket</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.agingBuckets.map(({ bucket, count, amount, risk }) => (
              <div key={bucket} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                background: risk === 'high' ? '#FEF2F2' : risk === 'medium' ? '#FFFBEB' : '#F9FAFB',
                borderRadius: 8, borderLeft: `3px solid ${risk === 'high' ? '#EF4444' : risk === 'medium' ? '#F59E0B' : '#D1D5DB'}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{bucket}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{formatINR(amount)}</div>
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, color: risk === 'high' ? '#EF4444' : risk === 'medium' ? '#F59E0B' : '#374151' }}>{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent pending claims */}
      <div>
        <SectionHeader title="Claims Awaiting Action" sub="Pending at current stage — sorted by age" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Claimant','Department','Type','Amount','Current Stage','Submitted','TAT So Far'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.pendingClaims.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1F2937' }}>{row.claimant}</td>
                  <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.department}</td>
                  <td style={{ padding: '10px 14px', color: '#374151' }}>{row.type}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1F2937' }}>{formatINR(row.amount)}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <Badge label={row.stage} color={STAGE_COLOR[row.stageIndex]} bg={`${STAGE_COLOR[row.stageIndex]}18`} />
                  </td>
                  <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.submitted}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: parseInt(row.tat) > 7 ? '#EF4444' : parseInt(row.tat) > 4 ? '#F97316' : '#374151' }}>{row.tat}</td>
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
