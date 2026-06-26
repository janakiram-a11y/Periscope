import React from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { Plane, AlertTriangle, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { travelDeskDetail as D } from '../data/dashboardData';
import { formatINR } from '../utils/format';

const F = 'Montserrat, system-ui, sans-serif';
const L = formatINR;

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,.06)', padding: '20px 22px', ...style }}>{children}</div>;
}
function Badge({ label, color, bg, size = 11 }) {
  return <span style={{ fontFamily: F, fontSize: size, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 99, display: 'inline-block' }}>{label}</span>;
}
function Bar({ pct, color = '#0891B2', h = 7 }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: 99, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: 99 }} />
    </div>
  );
}

const STAGE_COLOR = ['#223F7F', '#7C3AED', '#0891B2', '#F97316', '#059669'];
const RISK_C = { low: '#059669', medium: '#EAB308', high: '#F97316', critical: '#EF4444' };

export default function TravelDesk() {
  const s = D.summary;

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: F }}>

      <PageBanner
        crumb="Operations · Travel Desk"
        title="Travel Desk — Employee Travel Claims"
        subtitle={`AsramPortal · 5-stage approval pipeline · ${s.claimsInPipeline} claims in progress`}
        actions={
          <a href="https://login.orfus.in/asramportal" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, color: '#fff', fontFamily: F, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            Open AsramPortal <ExternalLink size={13} />
          </a>
        }
        stat={{ value: L(s.pendingValue), label: 'Pending Claims Value' }}
      />

      {/* No-SLA alert */}
      <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '4px solid #EF4444', borderRadius: 10 }}>
        <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>No SLA Defined at Any Stage — Avg TAT {s.avgApprovalTAT} vs 3-day Target</div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>The 5-stage approval pipeline has no time limits configured. Without SLA gates, claims stall at Finance Verify (avg 3.1 days) and Accounts Approval (avg 2.8 days). Recommend management action.</div>
        </div>
      </div>

      {/* KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Claims in Pipeline" value={s.claimsInPipeline}          icon={Plane}         color="#0891B2" />
        <StatCard label="Pending Value"       value={L(s.pendingValue)}            icon={Clock}         color="#F97316" />
        <StatCard label="Avg Approval TAT"    value={s.avgApprovalTAT}             icon={AlertTriangle} color="#EF4444" />
        <StatCard label="Approved YTD"        value={L(s.approvedYTD)}             icon={CheckCircle}   color="#059669" />
      </div>

      {/* Pipeline stages */}
      <div>
        <SectionHeader title="Approval Pipeline — 5 Stages" sub="Claim count and TAT at each approval stage" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {D.stages.map((st, i) => {
            const color = STAGE_COLOR[i] || '#374151';
            return (
              <Card key={i} style={{ padding: '14px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color, minWidth: 22 }}>{i + 1}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{st.name}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                        Avg TAT: {st.avgTAT}
                        {st.maxAge && ` · Max age: ${st.maxAge}`}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Badge label="No SLA" color="#EF4444" bg="#FEE2E2" />
                    <span style={{ fontSize: 24, fontWeight: 900, color }}>{st.count}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        {/* Claims by type */}
        <div>
          <SectionHeader title="Claims by Type" sub="Local · Outstation · International" />
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {D.claimsByType.map(c => {
                const pct = Math.round((c.count / s.claimsInPipeline) * 100);
                return (
                  <div key={c.type}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{c.type}</span>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#0891B2' }}>{c.count}</span>
                        <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 4 }}>claims · {L(c.totalValue)}</span>
                      </div>
                    </div>
                    <Bar pct={pct} color="#0891B2" h={7} />
                    <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>Avg: {L(c.avgValue)}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Aging */}
        <div>
          <SectionHeader title="Aging Analysis" sub="Time-in-pipeline distribution" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {D.agingBuckets.map(b => {
              const c = RISK_C[b.risk];
              return (
                <Card key={b.bucket} style={{ padding: '14px 16px', borderLeft: `3px solid ${c}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937' }}>{b.bucket}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{L(b.amount)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: c }}>{b.count}</span>
                      <div style={{ fontSize: 10, color: '#9CA3AF' }}>claims</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pending claims */}
      <div>
        <SectionHeader title="Pending Claims — In-Pipeline" sub="Active claims with stage and TAT" />
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Claimant', 'Department', 'Type', 'Amount', 'Current Stage', 'TAT'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.pendingClaims.map((c, i) => {
                const sc = STAGE_COLOR[c.stageIndex] || '#374151';
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 600, color: '#1F2937' }}>{c.claimant}</td>
                    <td style={{ padding: '10px 16px', color: '#6B7280' }}>{c.department}</td>
                    <td style={{ padding: '10px 16px' }}><Badge label={c.type} color="#0891B2" bg="#E0F2FE" /></td>
                    <td style={{ padding: '10px 16px', fontWeight: 700, color: '#374151' }}>{L(c.amount)}</td>
                    <td style={{ padding: '10px 16px' }}><Badge label={c.stage} color={sc} bg={`${sc}18`} /></td>
                    <td style={{ padding: '10px 16px' }}>
                      <Badge label={c.tat} color={parseInt(c.tat) >= 4 ? '#EF4444' : '#059669'} bg={parseInt(c.tat) >= 4 ? '#FEE2E2' : '#D1FAE5'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      <div style={{ height: 12 }} />
    </div>
  );
}
