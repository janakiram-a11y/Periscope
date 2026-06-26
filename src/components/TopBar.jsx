import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

const FONT = 'Montserrat, system-ui, sans-serif';

const PAGE_LABELS = {
  null:                  'Overview',
  dashboard:             'Executive Dashboard',
  'pg-admissions':       'PG Admissions',
  'mbbs-admissions':     'MBBS Admissions',
  'allied-admissions':   'Allied Admissions',
  'nursing-admissions':  'Nursing Admissions',
  'pg-logbook':          'PG Logbook',
  'ug-logbook':          'UG Logbook',
  'asram-finance':       'ASRAM Finance',
  'asram-pay':           'ASRAM Pay',
  'a1-finance':          'A1 Finance',
  'biometric-attendance':'Biometric Attendance',
  'hostels':             'Hostels',
  'travel-desk':         'Travel Desk',
  research:              'Research Portal',
  indent:                'Indent Portal',
};

const GROUP_LABELS = {
  null:                  null,
  dashboard:             'Institution Overview',
  'pg-admissions':       'Admissions',
  'mbbs-admissions':     'Admissions',
  'allied-admissions':   'Admissions',
  'nursing-admissions':  'Admissions',
  'pg-logbook':          'Academics',
  'ug-logbook':          'Academics',
  'asram-finance':       'Finance',
  'asram-pay':           'Finance',
  'a1-finance':          'Finance',
  'biometric-attendance':'Operations',
  'hostels':             'Operations',
  'travel-desk':         'Operations',
  research:              'Portals',
  indent:                'Portals',
};

export default function TopBar({ activeModule }) {
  const pageLabel  = PAGE_LABELS[activeModule] ?? 'Overview';
  const groupLabel = GROUP_LABELS[activeModule];

  return (
    <header style={{
      height: 52,
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      boxShadow: '0 1px 2px rgba(0,0,0,.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      zIndex: 20,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontFamily: FONT, fontSize: 11.5, color: '#9CA3AF', fontWeight: 500 }}>Periscope</span>
        {groupLabel && (
          <>
            <ChevronRight size={11} color="#D1D5DB" />
            <span style={{ fontFamily: FONT, fontSize: 11.5, color: '#9CA3AF', fontWeight: 500 }}>{groupLabel}</span>
          </>
        )}
        <ChevronRight size={11} color="#D1D5DB" />
        <span style={{ fontFamily: FONT, fontSize: 12.5, color: '#223F7F', fontWeight: 700 }}>{pageLabel}</span>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{
          width: 34, height: 34, borderRadius: 8,
          border: '1px solid #E5E7EB', background: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <Bell size={15} color="#6B7280" />
          <span style={{
            position: 'absolute', top: 7, right: 7,
            width: 7, height: 7, borderRadius: '50%',
            background: '#EF4444', border: '2px solid white',
          }} />
        </button>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: '#223F7F',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 10.5, fontWeight: 700, fontFamily: FONT,
          letterSpacing: '0.05em',
        }}>LM</div>
      </div>
    </header>
  );
}
