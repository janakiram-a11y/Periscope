import React from 'react';
import { ArrowRight, FlaskConical, ShoppingCart } from 'lucide-react';
import { modules } from '../data/mockData';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';

const FONT = 'Montserrat, system-ui, sans-serif';

const icons = { research: FlaskConical, indent: ShoppingCart };

export default function Landing({ onSelect }) {
  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageBanner
        crumb="Periscope / Overview"
        title="Laila Management Overview"
        subtitle="A unified executive view of all departmental applications across Asram Colleges."
      />

      <div>
        <SectionHeader title="Active Modules" sub="Select a module to view its real-time dashboard" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16, maxWidth: 800,
        }}>
          {modules.map(mod => {
            const Icon = icons[mod.id];
            return <ModuleCard key={mod.id} mod={mod} Icon={Icon} onSelect={onSelect} />;
          })}
          <ComingSoonCard />
        </div>
      </div>

      <p style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF', letterSpacing: '0.05em' }}>
        Periscope · Single source of truth for Laila Management · Asram Colleges
      </p>
    </div>
  );
}

function ModuleCard({ mod, Icon, onSelect }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={() => onSelect(mod.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: 12,
        border: `1px solid ${hovered ? '#C7D2FE' : '#E5E7EB'}`,
        borderTop: `3px solid #223F7F`,
        padding: '22px 22px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        boxShadow: hovered
          ? '0 8px 20px -4px rgba(34,63,127,0.15), 0 4px 8px -4px rgba(34,63,127,0.1)'
          : '0 1px 2px rgba(0,0,0,.06)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: '#EEF2FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} color="#223F7F" />
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: hovered ? '#EEF2FF' : '#F3F4F6',
          border: `1px solid ${hovered ? '#C7D2FE' : '#E5E7EB'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .15s',
        }}>
          <ArrowRight size={14} color={hovered ? '#223F7F' : '#9CA3AF'} />
        </div>
      </div>

      <h3 style={{
        fontFamily: FONT, fontSize: 15, fontWeight: 700,
        color: '#1F2937', marginBottom: 4,
      }}>{mod.name}</h3>
      <p style={{
        fontFamily: FONT, fontSize: 12, color: '#6B7280',
        marginBottom: 18, lineHeight: 1.55, fontWeight: 400,
      }}>{mod.tagline}</p>

      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {mod.metrics.map(m => (
          <div key={m.label}>
            <div style={{
              fontFamily: FONT, fontSize: 20, fontWeight: 800,
              color: '#223F7F', letterSpacing: '-0.5px', lineHeight: 1.1,
            }}>{m.value}</div>
            <div style={{
              fontFamily: FONT, fontSize: 10, color: '#9CA3AF',
              marginTop: 3, lineHeight: 1.3, letterSpacing: '0.02em',
            }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669' }} />
        <span style={{ fontFamily: FONT, fontSize: 10, color: '#9CA3AF' }}>{mod.url}</span>
      </div>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div style={{
      background: 'rgba(255,255,255,.6)',
      borderRadius: 12,
      border: '1.5px dashed #C7D2FE',
      padding: 22,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: 180, gap: 10,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: '#EEF2FF', border: '1px solid #C7D2FE',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT, fontSize: 20, color: '#A5B4FC', fontWeight: 700,
      }}>+</div>
      <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: '#6B7280' }}>More modules coming soon</div>
      <div style={{ fontFamily: FONT, fontSize: 11, color: '#9CA3AF', textAlign: 'center', lineHeight: 1.5 }}>
        HR, Admissions, Finance, and more
      </div>
    </div>
  );
}
