import React, { useState, useEffect } from 'react';
import {
  Monitor, GraduationCap, Activity, Heart, Users,
  BookOpen, BookMarked, Landmark, CreditCard, Utensils,
  Fingerprint, Building2, Plane, FlaskConical, ShoppingCart,
  ChevronDown, ChevronRight, X,
  LayoutDashboard, Bell, Stethoscope, ChefHat,
} from 'lucide-react';

const FONT = 'Montserrat, system-ui, sans-serif';

const NAV_GROUPS = [
  {
    id: 'management',
    label: 'Management',
    defaultOpen: true,
    items: [
      { id: 'org-summary',       label: 'Organisation Summary', Icon: LayoutDashboard },
      { id: 'management-alerts', label: 'Alerts Centre',        Icon: Bell            },
      { id: 'dashboard',         label: 'Executive Dashboard',  Icon: Monitor         },
    ],
  },
  {
    id: 'colleges',
    label: 'Colleges',
    defaultOpen: false,
    items: [
      { id: 'colleges-overview',    label: 'Colleges Overview',  Icon: Building2       },
      { id: 'pg-admissions',        label: 'PG Admissions',      Icon: GraduationCap   },
      { id: 'mbbs-admissions',      label: 'MBBS Admissions',    Icon: Activity        },
      { id: 'allied-admissions',    label: 'Allied Admissions',  Icon: Users           },
      { id: 'nursing-admissions',   label: 'Nursing Admissions', Icon: Heart           },
      { id: 'pg-logbook',           label: 'PG Logbook',         Icon: BookOpen        },
      { id: 'ug-logbook',           label: 'UG Logbook',         Icon: BookMarked      },
      { id: 'library',              label: 'Library',            Icon: BookMarked, comingSoon: true },
      { id: 'asram-finance',        label: 'ASRAM Finance',      Icon: Landmark        },
      { id: 'asram-pay',            label: 'ASRAM Pay',          Icon: CreditCard      },
      { id: 'biometric-attendance', label: 'Attendance',         Icon: Fingerprint     },
      { id: 'hostels',              label: 'Hostels',            Icon: Building2       },
      { id: 'research',             label: 'Research Portal',    Icon: FlaskConical    },
      { id: 'indent',               label: 'Indent Portal',      Icon: ShoppingCart    },
    ],
  },
  {
    id: 'hospitals',
    label: 'Hospitals',
    defaultOpen: false,
    items: [
      { id: 'hospitals-overview', label: 'Hospitals Overview', Icon: Stethoscope },
      { id: 'travel-desk',        label: 'Travel Desk',        Icon: Plane       },
    ],
  },
  {
    id: 'food',
    label: 'Food & Kitchen',
    defaultOpen: false,
    items: [
      { id: 'food-kitchen', label: 'F&K Overview', Icon: ChefHat  },
      { id: 'a1-finance',   label: 'A1 Finance',   Icon: Utensils },
    ],
  },
];

function findGroupId(moduleId) {
  for (const g of NAV_GROUPS) {
    if (g.items.some(i => i.id === moduleId)) return g.id;
  }
  return null;
}

function useBreakpoint(breakpoint = 768) {
  const [isAbove, setIsAbove] = useState(() => window.innerWidth >= breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsAbove(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isAbove;
}

export default function Sidebar({ activeModule, onNavigate, isOpen, onClose }) {
  const isDesktop = useBreakpoint(768);

  const [expanded, setExpanded] = useState(() => {
    const init = {};
    const activeGroup = findGroupId(activeModule);
    NAV_GROUPS.forEach(g => {
      init[g.id] = g.defaultOpen || g.id === activeGroup;
    });
    return init;
  });

  useEffect(() => {
    const gId = findGroupId(activeModule);
    if (gId) {
      setExpanded(prev => prev[gId] ? prev : { ...prev, [gId]: true });
    }
  }, [activeModule]);

  const toggle = (groupId) => {
    setExpanded(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleNavigate = (itemId) => {
    onNavigate(itemId);
    if (!isDesktop && onClose) onClose();
  };

  const positionStyle = isDesktop
    ? { position: 'relative', zIndex: 30, transform: 'none', transition: 'none' }
    : {
        position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 200,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
      };

  return (
    <>
      {!isDesktop && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
            zIndex: 199,
          }}
        />
      )}
      <aside style={{
        width: 240, flexShrink: 0,
        background: 'linear-gradient(180deg, #1A3366 0%, #223F7F 50%, #1E3A7A 100%)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '2px 0 12px rgba(0,0,0,.18)',
        ...positionStyle,
      }}>
        <div style={{ padding: '13px 16px 11px', borderBottom: '1px solid rgba(255,255,255,.1)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 800, fontFamily: FONT, flexShrink: 0, letterSpacing: '-0.02em' }}>P</div>
              <div>
                <div style={{ color: 'white', fontFamily: FONT, fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>Periscope</div>
                <div style={{ color: '#93C5FD', fontFamily: FONT, fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 1 }}>Laila Management</div>
              </div>
            </div>
            {!isDesktop && (
              <button
                onClick={onClose}
                aria-label="Close sidebar"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(147,197,253,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, borderRadius: 6 }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0 16px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,.15) transparent' }}>
          {NAV_GROUPS.map(group => {
            const isGroupOpen = !!expanded[group.id];
            return (
              <div key={group.id} style={{ marginBottom: 2 }}>
                <button
                  onClick={() => toggle(group.id)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '6px 16px 4px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: FONT, fontSize: 9.5, fontWeight: 700, color: 'rgba(147,197,253,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{group.label}</span>
                  {isGroupOpen ? <ChevronDown size={11} color="rgba(147,197,253,0.5)" /> : <ChevronRight size={11} color="rgba(147,197,253,0.5)" />}
                </button>
                {isGroupOpen && group.items.map(item => {
                  const isActive = activeModule === item.id;
                  if (item.comingSoon) {
                    return (
                      <div key={String(item.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1px 8px', padding: '8px 10px', borderRadius: 7, color: 'rgba(191,219,254,.28)', cursor: 'default' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                          <item.Icon size={14} strokeWidth={1.5} />
                          <span style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 400 }}>{item.label}</span>
                        </div>
                        <span style={{ fontFamily: FONT, fontSize: 8.5, fontWeight: 700, color: 'rgba(147,197,253,.45)', background: 'rgba(147,197,253,.1)', padding: '1px 6px', borderRadius: 99, letterSpacing: '0.06em' }}>SOON</span>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={String(item.id)}
                      onClick={() => handleNavigate(item.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 9, width: 'calc(100% - 16px)', margin: '1px 8px', padding: '8px 10px', borderRadius: 7, border: 'none', background: isActive ? 'rgba(255,255,255,.16)' : 'transparent', color: isActive ? '#FFFFFF' : 'rgba(191,219,254,.75)', fontFamily: FONT, fontSize: 12.5, fontWeight: isActive ? 600 : 400, cursor: 'pointer', textAlign: 'left', transition: 'background .12s, color .12s', boxShadow: isActive ? 'inset 0 0 0 1px rgba(255,255,255,.12)' : 'none' }}
                      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.color = 'rgba(191,219,254,.95)'; } }}
                      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(191,219,254,.75)'; } }}
                    >
                      {isActive && <span style={{ position: 'absolute', left: 8, width: 3, height: 18, background: '#60A5FA', borderRadius: 99, marginLeft: -2 }} />}
                      <item.Icon size={14} strokeWidth={isActive ? 2.2 : 1.75} style={{ flexShrink: 0 }} />
                      {item.label}
                    </button>
                  );
                })}
                <div style={{ margin: '6px 16px 4px', borderTop: '1px solid rgba(255,255,255,.06)' }} />
              </div>
            );
          })}
        </div>
        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,.08)', flexShrink: 0 }}>
          <div style={{ fontFamily: FONT, fontSize: 10, color: 'rgba(147,197,253,.45)', textAlign: 'center' }}>Asram Colleges · AY 2026–27</div>
        </div>
      </aside>
    </>
  );
}
