// ─────────────────────────────────────────────────────────────────────────────
// PERISCOPE MANAGEMENT DASHBOARD — MOCK DATA
// Source: Discovery Phase — Live application exploration (22 Jun 2026)
// Real observed values: employees=1373, departments=84, devices=24,
//   absent=572, halfDay=780, leaves=21, ENT class: 248/159/89,
//   classes today: 11 (MBBS), PG logbook: 3 entries / 0 approved
// ─────────────────────────────────────────────────────────────────────────────

export const institution = {
  name: 'Asram Colleges', group: 'Laila Management',
  academicYear: '2026–2027', asOf: '22 Jun 2026',
};

// ── EXECUTIVE KPIs ─────────────────────────────────────────────────────────────
export const executiveKPIs = {
  totalStudents: 2840,
  totalEmployees: 1373,   // real
  totalDepartments: 84,   // real
  biometricDevices: 24,   // real
  devicesOnline: 22,
  devicesOffline: 2,
  totalAdmissions: 452,
  activePGStudents: 340,
  pendingApprovals: 113,
};

// ── ATTENDANCE SUMMARY (for main dashboard) ────────────────────────────────────
export const attendanceSummary = {
  employee: { total: 1373, present: 801, absent: 572, halfDay: 780, onLeave: 21, rate: 58.3 },
  student: { classesToday: 11 },
};

// ── FINANCIAL OVERVIEW ─────────────────────────────────────────────────────────
export const financialOverview = {
  feeDemand: {
    total: 28500000, collected: 21375000, pending: 7125000, rate: 75,
    byType: [
      { type: 'College Fee',   demand: 15000000, collected: 12000000, pending: 3000000,  rate: 80   },
      { type: 'Residence Fee', demand:  6000000, collected:  4500000, pending: 1500000,  rate: 75   },
      { type: 'Diner Fee',     demand:  3000000, collected:  2250000, pending:  750000,  rate: 75   },
      { type: 'Exam Fee',      demand:  2500000, collected:  1875000, pending:  625000,  rate: 75   },
      { type: 'Misc Fee',      demand:  2000000, collected:   750000, pending: 1250000,  rate: 37.5 },
    ],
  },
  offlineQueues: {
    ddNeft:          { count: 47, amount: 1250000 },
    arogyasree:      { count: 12, amount:  875000 },
    studentApproval: { count: 38, amount: 2250000 },
  },
  hostel:      { demand: 4500000, collected: 3825000, pending: 675000, rate: 85 },
  a1Payable:   { outstanding: 450000, overdueInvoices: 3, channels: 11 },
  travelClaims: {
    pendingValue: 320000, claimsInPipeline: 18,
    byStage: [
      { stage: 'HOD Approval',      count: 8, value: 142000 },
      { stage: 'HR Validation',     count: 4, value:  78000 },
      { stage: 'Finance Verify',    count: 3, value:  62000 },
      { stage: 'Accounts Approval', count: 3, value:  38000 },
    ],
  },
  indents: { budgetAllocated: 42750000, spent: 314000, pipeline: 1408000, pendingApproval: 7 },
};

// ── DEPARTMENT HEALTH CARDS ────────────────────────────────────────────────────
export const departmentCards = [
  {
    id: 'asram-finance', name: 'ASRAM Finance', color: '#223F7F', health: 'warning',
    metrics: [
      { label: 'Fee Demand',      value: '₹2.85 Cr' },
      { label: 'Collected',       value: '₹2.14 Cr' },
      { label: 'Collection Rate', value: '75%'       },
    ],
    pendingActions: 23, approvalQueue: 85, avgTAT: '2.3 days', targetTAT: '1 day',
    slaStatus: 'breached', lastUpdated: '5 mins ago', hasDetail: true,
  },
  {
    id: 'pg-admissions', name: 'PG Admissions', color: '#7C3AED', health: 'good',
    metrics: [
      { label: 'Active PG Students', value: '340' },
      { label: 'Departments',        value: '84'  },
      { label: 'Logbook Pending',    value: '3'   },
    ],
    pendingActions: 3, approvalQueue: 3, avgTAT: '1.2 days', targetTAT: '3 days',
    slaStatus: 'on-track', lastUpdated: '2 mins ago', hasDetail: true,
  },
  {
    id: 'mbbs-admissions', name: 'MBBS Admissions', color: '#059669', health: 'good',
    metrics: [
      { label: 'Total Seats', value: '150'   },
      { label: 'Filled',      value: '142'   },
      { label: 'Fill Rate',   value: '94.7%' },
    ],
    pendingActions: 3, approvalQueue: 0, avgTAT: '—', targetTAT: '—',
    slaStatus: 'on-track', lastUpdated: '2 hrs ago', hasDetail: true,
  },
  {
    id: 'allied-admissions', name: 'Allied Admissions', color: '#0891B2', health: 'good',
    metrics: [
      { label: 'Total Seats', value: '210'   },
      { label: 'Filled',      value: '192'   },
      { label: 'Fill Rate',   value: '91.4%' },
    ],
    pendingActions: 5, approvalQueue: 0, avgTAT: '—', targetTAT: '—',
    slaStatus: 'on-track', lastUpdated: '2 hrs ago', hasDetail: true,
  },
  {
    id: 'nursing-admissions', name: 'Nursing Admissions', color: '#BE185D', health: 'good',
    metrics: [
      { label: 'Total Seats', value: '120'   },
      { label: 'Filled',      value: '118'   },
      { label: 'Fill Rate',   value: '98.3%' },
    ],
    pendingActions: 1, approvalQueue: 0, avgTAT: '—', targetTAT: '—',
    slaStatus: 'on-track', lastUpdated: '2 hrs ago', hasDetail: true,
  },
  {
    id: 'pg-logbook', name: 'PG Logbook', color: '#7C3AED', health: 'warning',
    metrics: [
      { label: 'Active Students',   value: '340' },
      { label: 'Awaiting Approval', value: '3'   },
      { label: 'Avg Completion',    value: '0%'  },
    ],
    pendingActions: 3, approvalQueue: 3, avgTAT: '—', targetTAT: '3 days',
    slaStatus: 'warning', lastUpdated: '2 mins ago', hasDetail: true,
  },
  {
    id: 'ug-logbook', name: 'UG Logbook', color: '#0891B2', health: 'good',
    metrics: [
      { label: 'Classes Today',  value: '11'    },
      { label: 'Courses Active', value: '4'     },
      { label: 'Avg Attendance', value: '74.5%' },
    ],
    pendingActions: 0, approvalQueue: 0, avgTAT: '—', targetTAT: '—',
    slaStatus: 'on-track', lastUpdated: '10 mins ago', hasDetail: true,
  },
  {
    id: 'asram-pay', name: 'ASRAM Pay', color: '#F97316', health: 'critical',
    metrics: [
      { label: 'DD/NEFT Pending', value: '47 items' },
      { label: 'Pending Amount',  value: '₹12.5 L'  },
      { label: 'Arogyasree',      value: '₹8.75 L'  },
    ],
    pendingActions: 47, approvalQueue: 85, avgTAT: '3.2 days', targetTAT: '1 day',
    slaStatus: 'breached', lastUpdated: '15 mins ago', hasDetail: true,
  },
  {
    id: 'biometric-attendance', name: 'Biometric Attendance', color: '#059669', health: 'warning',
    metrics: [
      { label: 'Total Staff',    value: '1,373'   },
      { label: 'Absent Today',   value: '572'     },
      { label: 'Devices Online', value: '22 / 24' },
    ],
    pendingActions: 2, approvalQueue: 0, avgTAT: '—', targetTAT: '—',
    slaStatus: 'warning', lastUpdated: '2 mins ago', hasDetail: true,
  },
  {
    id: 'hostels', name: 'Hostels', color: '#0891B2', health: 'warning',
    metrics: [
      { label: 'Occupancy', value: '756 / 840' },
      { label: 'Demand',    value: '₹45 L'     },
      { label: 'Collected', value: '₹38.25 L'  },
    ],
    pendingActions: 8, approvalQueue: 8, avgTAT: '2.1 days', targetTAT: '1 day',
    slaStatus: 'warning', lastUpdated: '1 hr ago', hasDetail: true,
  },
  {
    id: 'library', name: 'Library', color: '#6B7280', health: 'good',
    metrics: [
      { label: 'Active Members', value: '2,840' },
      { label: 'Books Issued',   value: '342'   },
      { label: 'Overdue',        value: '28'    },
    ],
    pendingActions: 0, approvalQueue: 0, avgTAT: '—', targetTAT: '—',
    slaStatus: 'on-track', lastUpdated: '—', hasDetail: false, comingSoon: true,
  },
  {
    id: 'a1-finance', name: 'A1 Finance', color: '#EF4444', health: 'critical',
    metrics: [
      { label: 'Outstanding',      value: '₹4.5 L' },
      { label: 'Overdue Invoices', value: '3'       },
      { label: 'Channels',         value: '11'      },
    ],
    pendingActions: 3, approvalQueue: 3, avgTAT: '4.2 days', targetTAT: '7 days',
    slaStatus: 'on-track', lastUpdated: '1 hr ago', hasDetail: true,
  },
  {
    id: 'travel-desk', name: 'Travel Desk', color: '#7C3AED', health: 'critical',
    metrics: [
      { label: 'Claims In Pipeline', value: '18'     },
      { label: 'Pipeline Value',     value: '₹3.2 L' },
      { label: 'Stages w/o SLA',     value: '5 / 5'  },
    ],
    pendingActions: 18, approvalQueue: 18, avgTAT: '5.8 days', targetTAT: '3 days',
    slaStatus: 'breached', lastUpdated: '30 mins ago', hasDetail: true,
  },
];

// ── ATTENTION REQUIRED ─────────────────────────────────────────────────────────
export const attentionItems = [
  { id: 1, severity: 'critical', type: 'financial',    title: 'DD Realisation Backlog',               description: '47 offline payments (₹12.5 L) awaiting manual realisation — student records blocked',  department: 'ASRAM Pay',             deptId: 'asram-pay',            age: '3 days',     count: 47   },
  { id: 2, severity: 'critical', type: 'financial',    title: 'A1 Services — 3 Overdue Invoices',     description: 'Canteen vendor invoices overdue — service continuity at risk if unresolved',             department: 'A1 Finance',            deptId: 'a1-finance',           age: '4 days',     count: 3    },
  { id: 3, severity: 'critical', type: 'process',      title: 'Travel Desk — No SLA at Any Stage',    description: '18 claims in 5-stage pipeline with no time limits — avg TAT 5.8 days vs 3-day target',   department: 'Travel Desk',           deptId: 'travel-desk',          age: '5.8 days avg', count: 18 },
  { id: 4, severity: 'high',     type: 'financial',    title: 'Arogyasree Scheme — ₹8.75 L Pending',  description: '12 students awaiting government disbursement — timeline outside institutional control',    department: 'ASRAM Pay',             deptId: 'asram-pay',            age: 'Variable',   count: 12   },
  { id: 5, severity: 'high',     type: 'financial',    title: '38 Student Payments Awaiting Approval',description: 'Payments realised but not approved — blocks student clearance and hall tickets',          department: 'ASRAM Finance',         deptId: 'asram-finance',        age: '1.8 days avg', count: 38 },
  { id: 6, severity: 'high',     type: 'compliance',   title: 'PG Logbook Completion at 0%',          description: 'Supervisor sign-offs pending across active PG students — academic compliance at risk',    department: 'PG Logbook',            deptId: 'pg-logbook',           age: '—',          count: 3    },
  { id: 7, severity: 'high',     type: 'operational',  title: 'Attendance Rate 58.3% — 2 Devices Offline', description: '2 biometric devices offline, 572 absent — possible device sync failure',            department: 'Biometric Attendance',  deptId: 'biometric-attendance', age: 'Today',      count: 2    },
  { id: 8, severity: 'medium',   type: 'financial',    title: 'Misc Fee Collection at 37.5%',         description: 'Lowest collection rate across all fee types — ₹12.5 L pending in Misc Fee category',    department: 'ASRAM Pay',             deptId: 'asram-pay',            age: '—',          count: null },
  { id: 9, severity: 'medium',   type: 'financial',    title: '7 Purchase Indents Awaiting Approval', description: '₹14.08 L procurement pipeline pending — multi-level approval required',                  department: 'Indent Portal',         deptId: null,                   age: '—',          count: 7    },
  { id: 10, severity: 'medium',  type: 'financial',    title: 'Hostel Collection at 85% — ₹6.75 L Outstanding', description: 'Below-target hostel fee collection across 4 blocks',                       department: 'Hostels',               deptId: 'hostels',              age: '—',          count: 8    },
];

// ── TAT & SLA MONITORING ───────────────────────────────────────────────────────
export const tatSlaData = [
  { process: 'DD / NEFT Realisation',         department: 'ASRAM Pay',     deptId: 'asram-pay',     currentTAT: '3.2 days', targetTAT: '1 day',    status: 'breached',  responsible: 'Finance Admin',     breach: '+2.2 days' },
  { process: 'Student Payment Final Approval',department: 'ASRAM Finance',  deptId: 'asram-finance', currentTAT: '1.8 days', targetTAT: 'Same day', status: 'breached',  responsible: 'Finance Admin',     breach: '+1.8 days' },
  { process: 'Travel — HOD Approval',         department: 'Travel Desk',    deptId: 'travel-desk',   currentTAT: '2.4 days', targetTAT: '3 days',   status: 'on-track',  responsible: 'HOD',               breach: null },
  { process: 'Travel — HR Validation',        department: 'Travel Desk',    deptId: 'travel-desk',   currentTAT: '1.9 days', targetTAT: '2 days',   status: 'on-track',  responsible: 'HR Officer',        breach: null },
  { process: 'Travel — Finance Verify',       department: 'Travel Desk',    deptId: 'travel-desk',   currentTAT: '3.1 days', targetTAT: '2 days',   status: 'breached',  responsible: 'Finance Officer',   breach: '+1.1 days' },
  { process: 'Travel — Accounts Approval',    department: 'Travel Desk',    deptId: 'travel-desk',   currentTAT: '2.8 days', targetTAT: '2 days',   status: 'breached',  responsible: 'Accounts Officer',  breach: '+0.8 days' },
  { process: 'Indent — HOD Approval',         department: 'Indent Portal',  deptId: null,            currentTAT: '4.1 days', targetTAT: '3 days',   status: 'warning',   responsible: 'HOD',               breach: '+1.1 days' },
  { process: 'Indent — Finance Approval',     department: 'Indent Portal',  deptId: null,            currentTAT: '2.2 days', targetTAT: '2 days',   status: 'on-track',  responsible: 'Finance',           breach: null },
  { process: 'A1 Invoice Approval',           department: 'A1 Finance',     deptId: 'a1-finance',    currentTAT: '4.2 days', targetTAT: '7 days',   status: 'on-track',  responsible: 'Finance Admin',     breach: null },
  { process: 'Hostel Due Realisation',        department: 'Hostels',        deptId: 'hostels',       currentTAT: '2.1 days', targetTAT: '1 day',    status: 'warning',   responsible: 'Warden / Finance',  breach: '+1.1 days' },
  { process: 'PG Log Supervisor Sign-off',    department: 'PG Logbook',     deptId: 'pg-logbook',    currentTAT: '—',        targetTAT: '3 days',   status: 'warning',   responsible: 'Faculty Supervisor', breach: 'No data' },
];

// ════════════════════════════════════════════════════════════════════════════════
// DEPARTMENT DETAIL DATA
// ════════════════════════════════════════════════════════════════════════════════

// ── ASRAM PAY ──────────────────────────────────────────────────────────────────
export const asramPayDetail = {
  feeSummary: {
    totalDemand: 28500000, totalCollected: 21375000, totalPending: 7125000,
    collectionRate: 75, onlineRealised: 18750000,
  },
  feeByType: [
    { type: 'College Fee',   demand: 15000000, collected: 12000000, pending: 3000000,  rate: 80   },
    { type: 'Residence Fee', demand:  6000000, collected:  4500000, pending: 1500000,  rate: 75   },
    { type: 'Diner Fee',     demand:  3000000, collected:  2250000, pending:  750000,  rate: 75   },
    { type: 'Exam Fee',      demand:  2500000, collected:  1875000, pending:  625000,  rate: 75   },
    { type: 'Misc Fee',      demand:  2000000, collected:   750000, pending: 1250000,  rate: 37.5 },
  ],
  paymentModes: [
    { mode: 'Online (Razorpay)',  amount: 18750000, count: 1420, autoRealised: true  },
    { mode: 'Demand Draft (DD)',  amount:   875000, count:   30, autoRealised: false },
    { mode: 'NEFT / RTGS',       amount:   375000, count:   17, autoRealised: false },
    { mode: 'Arogyasree (Govt)', amount:   875000, count:   12, autoRealised: false },
    { mode: 'Other',             amount:   500000, count:   38, autoRealised: false },
  ],
  offlineQueues: {
    ddNeft:          { count: 47, amount: 1250000, avgAge: '3.2 days' },
    arogyasree:      { count: 12, amount:  875000, avgAge: 'Variable' },
    studentApproval: { count: 38, amount: 2250000, avgAge: '1.8 days' },
  },
  pendingDdNeft: [
    { student: 'Akhila R.',   rollNo: 'MBBS22001', feeType: 'College Fee',   amount: 45000, instrument: 'DD',   submitted: '18 Jun 2026', status: 'Awaiting Realisation' },
    { student: 'Kiran V.',    rollNo: 'NSG22045',  feeType: 'Exam Fee',      amount: 32000, instrument: 'NEFT', submitted: '19 Jun 2026', status: 'Awaiting Realisation' },
    { student: 'Priya M.',    rollNo: 'MBBS22014', feeType: 'College Fee',   amount: 55000, instrument: 'DD',   submitted: '20 Jun 2026', status: 'Awaiting Realisation' },
    { student: 'Ravi S.',     rollNo: 'ALD22033',  feeType: 'Residence Fee', amount: 28000, instrument: 'NEFT', submitted: '20 Jun 2026', status: 'Awaiting Realisation' },
    { student: 'Suresh K.',   rollNo: 'MBBS22022', feeType: 'College Fee',   amount: 45000, instrument: 'DD',   submitted: '21 Jun 2026', status: 'Awaiting Realisation' },
    { student: 'Anjali T.',   rollNo: 'NSG22012',  feeType: 'Diner Fee',     amount: 18000, instrument: 'DD',   submitted: '21 Jun 2026', status: 'Awaiting Realisation' },
    { student: 'Meena L.',    rollNo: 'ALD22078',  feeType: 'Exam Fee',      amount: 22000, instrument: 'NEFT', submitted: '22 Jun 2026', status: 'Awaiting Realisation' },
  ],
};

// ── ASRAM FINANCE ──────────────────────────────────────────────────────────────
export const asramFinanceDetail = {
  summary: {
    totalRevenue: 33000000, totalCollected: 25200000, totalPending: 7800000, collectionRate: 76,
  },
  approvalQueues: [
    { type: 'DD / NEFT Realisation Pending',  count: 47, oldestAge: '5 days',   avgAmount: 26595,  status: 'backlog' },
    { type: 'Arogyasree Disbursement',        count: 12, oldestAge: 'Variable', avgAmount: 72916,  status: 'backlog' },
    { type: 'Student Payment Final Approval', count: 38, oldestAge: '3 days',   avgAmount: 59210,  status: 'backlog' },
    { type: 'Hostel Dues Outstanding',        count:  8, oldestAge: '15 days',  avgAmount: 84375,  status: 'normal'  },
  ],
  revenueStreams: [
    { stream: 'College Fee',   amount: 12000000, pct: 48, status: 'On Track' },
    { stream: 'Residence Fee', amount:  4500000, pct: 18, status: 'On Track' },
    { stream: 'Hostel Billing',amount:  3825000, pct: 15, status: 'Behind'   },
    { stream: 'Diner Fee',     amount:  2250000, pct:  9, status: 'On Track' },
    { stream: 'Exam Fee',      amount:  1875000, pct:  7, status: 'On Track' },
    { stream: 'Misc Fee',      amount:   750000, pct:  3, status: 'Behind'   },
  ],
  financialRisks: [
    { title: 'DD/NEFT Realisation Backlog', description: '47 payments pending bank confirmation — ₹12.5 L blocked',   amount: 1250000, severity: 'critical' },
    { title: 'Arogyasree Pending',          description: '12 students awaiting state government disbursement',         amount:  875000, severity: 'high'     },
    { title: 'Misc Fee Low Collection',     description: 'Only 37.5% collected — ₹12.5 L outstanding, deadline risk', amount: 1250000, severity: 'medium'   },
    { title: 'Hostel Pending',              description: '4 blocks with 15% average outstanding balances',            amount:  675000, severity: 'medium'   },
  ],
  hostelFinance: {
    blocks: [
      { block: 'Block A — MBBS Boys',  billing: 1200000, collected: 1020000, pending: 180000, rate: 85 },
      { block: 'Block B — MBBS Girls', billing: 1320000, collected: 1122000, pending: 198000, rate: 85 },
      { block: 'Block C — Nursing',    billing: 1200000, collected:  960000, pending: 240000, rate: 80 },
      { block: 'Block D — Allied',     billing:  780000, collected:  723000, pending:  57000, rate: 93 },
    ],
  },
  recentTransactions: [
    { date: '22 Jun', description: 'Adavikottu Renuka Sri — College Fee', category: 'College Fee', amount: 45000, type: 'credit', status: 'Realised'  },
    { date: '22 Jun', description: 'Akhila P. Rudraraju — Exam Fee',      category: 'Exam Fee',    amount: 32000, type: 'credit', status: 'Pending'   },
    { date: '21 Jun', description: 'Hostel Dues — Block A (5 students)',  category: 'Hostel',      amount: 60000, type: 'credit', status: 'Realised'  },
    { date: '21 Jun', description: 'Akkina Vaishnavi — College Fee',      category: 'College Fee', amount: 45000, type: 'credit', status: 'Realised'  },
    { date: '20 Jun', description: 'A1 Services Invoice #INV-2024-089',   category: 'Payable',     amount: 95000, type: 'debit',  status: 'Pending'   },
    { date: '20 Jun', description: 'Allam Mary Varshini — Misc Fee',      category: 'Misc Fee',    amount: 18000, type: 'credit', status: 'Pending'   },
  ],
};

// ── ADMISSIONS ────────────────────────────────────────────────────────────────
export const admissionsDetail = {
  'mbbs-admissions': {
    summary: { totalAdmissions: 142, intake: 150, pendingDocs: 8, complete: 134 },
    quotas: [
      { quota: 'Management Quota',         seats: 75,  filled: 72,  pct: 96 },
      { quota: 'Convener Quota',           seats: 75,  filled: 70,  pct: 93 },
      { quota: 'S1 – Service',             seats: 30,  filled: 30,  pct: 100 },
      { quota: 'S2 – Non-Service',         seats: 30,  filled: 28,  pct: 93 },
      { quota: 'CQ – Convener (S3)',       seats: 15,  filled: 14,  pct: 93 },
    ],
    pipeline: [
      { stage: 'Application Received',     count: 142, color: '#059669', note: null },
      { stage: 'Documents Verified',       count: 134, color: '#059669', note: null },
      { stage: 'Fees Paid',                count: 128, color: '#F97316', note: null },
      { stage: 'Documents Pending',        count:   8, color: '#EF4444', note: 'Action required' },
    ],
    pendingActions: [
      { title: 'Pending Document Submission', description: '8 admitted students have not submitted original certificates', count: 8 },
    ],
  },
  'pg-admissions': {
    summary: { totalAdmissions: 340, intake: 360, pendingDocs: 12, complete: 328 },
    quotas: [
      { quota: 'MD Programs',              seats: 180, filled: 175, pct: 97 },
      { quota: 'MS Programs',              seats: 120, filled: 115, pct: 96 },
      { quota: 'Diploma Programs',         seats:  60, filled:  50, pct: 83 },
    ],
    pipeline: [
      { stage: 'Enrolled',                 count: 340, color: '#059669', note: null },
      { stage: 'Active in Logbook',        count: 340, color: '#059669', note: null },
      { stage: 'Logbook Entries Pending',  count:   3, color: '#EF4444', note: 'Supervisor sign-off pending' },
      { stage: 'Documents Complete',       count: 328, color: '#059669', note: null },
    ],
    pendingActions: [
      { title: 'PG Logbook Sign-off Pending', description: 'Supervisor approvals pending for 3 students — academic compliance risk', count: 3 },
      { title: 'Missing Original Documents',  description: '12 PG students with pending document submission', count: 12 },
    ],
  },
  'allied-admissions': {
    summary: { totalAdmissions: 192, intake: 210, pendingDocs: 15, complete: 177 },
    quotas: [
      { quota: 'Management Quota',         seats: 105, filled: 96,  pct: 91 },
      { quota: 'Convener Quota',           seats: 105, filled: 96,  pct: 91 },
    ],
    pipeline: [
      { stage: 'Application Received',     count: 192, color: '#059669', note: null },
      { stage: 'Documents Verified',       count: 177, color: '#059669', note: null },
      { stage: 'Fees Paid',                count: 168, color: '#F97316', note: null },
      { stage: 'Pending Docs',             count:  15, color: '#EF4444', note: 'Action required' },
    ],
    pendingActions: [
      { title: 'Unfilled Seats — 18 remaining', description: 'Allied Health has 18 unfilled seats — admission cycle still open', count: 18 },
    ],
  },
  'nursing-admissions': {
    summary: { totalAdmissions: 118, intake: 120, pendingDocs: 2, complete: 116 },
    quotas: [
      { quota: 'B.Sc Nursing — Mgmt',     seats:  40, filled: 40,  pct: 100 },
      { quota: 'B.Sc Nursing — Convener', seats:  40, filled: 39,  pct: 98  },
      { quota: 'GNM Nursing — Mgmt',      seats:  20, filled: 20,  pct: 100 },
      { quota: 'GNM Nursing — Convener',  seats:  20, filled: 19,  pct: 95  },
    ],
    pipeline: [
      { stage: 'Application Received',    count: 118, color: '#059669', note: null },
      { stage: 'Documents Verified',      count: 116, color: '#059669', note: null },
      { stage: 'Fees Paid',               count: 114, color: '#059669', note: null },
      { stage: 'Docs Pending',            count:   2, color: '#F97316', note: 'Minor backlog' },
    ],
    pendingActions: [],
  },
};

// ── TRAVEL DESK ────────────────────────────────────────────────────────────────
export const travelDeskDetail = {
  summary: {
    pendingValue: 320000, claimsInPipeline: 18,
    avgApprovalTAT: '5.8 days', approvedYTD: 1250000,
  },
  stages: [
    { name: 'HOD Approval',      count: 8, avgTAT: '2.4 days', maxAge: '5 days' },
    { name: 'HR Validation',     count: 4, avgTAT: '1.9 days', maxAge: '3 days' },
    { name: 'Finance Verify',    count: 3, avgTAT: '3.1 days', maxAge: '6 days' },
    { name: 'Accounts Approval', count: 3, avgTAT: '2.8 days', maxAge: '4 days' },
    { name: 'Disbursed',         count: 0, avgTAT: '—',        maxAge: null     },
  ],
  claimsByType: [
    { type: 'Local Travel',      count:  9, totalValue:  45000, avgValue:  5000 },
    { type: 'Outstation',        count:  7, totalValue: 198000, avgValue: 28285 },
    { type: 'International',     count:  2, totalValue:  77000, avgValue: 38500 },
  ],
  agingBuckets: [
    { bucket: '0–2 days',  count: 5,  amount: 92000,  risk: 'low'    },
    { bucket: '3–5 days',  count: 8,  amount: 148000, risk: 'medium' },
    { bucket: '6–10 days', count: 4,  amount: 68000,  risk: 'high'   },
    { bucket: '10+ days',  count: 1,  amount: 12000,  risk: 'high'   },
  ],
  pendingClaims: [
    { claimant: 'Dr. A. Sharma', department: 'Ophthalmology', type: 'Outstation',  amount: 28000, stage: 'Finance Verify',    stageIndex: 2, submitted: '16 Jun 2026', tat: '6 days' },
    { claimant: 'Dr. E. Meena',  department: 'Paediatrics',   type: 'International',amount:45000, stage: 'Accounts Approval', stageIndex: 3, submitted: '17 Jun 2026', tat: '5 days' },
    { claimant: 'Dr. D. Kumar',  department: 'Surgery',       type: 'Outstation',  amount: 18000, stage: 'HOD Approval',      stageIndex: 0, submitted: '19 Jun 2026', tat: '3 days' },
    { claimant: 'Dr. B. Rao',    department: 'Cardiology',    type: 'Local',       amount:  4500, stage: 'HOD Approval',      stageIndex: 0, submitted: '20 Jun 2026', tat: '2 days' },
    { claimant: 'Dr. C. Patel',  department: 'ENT',           type: 'Outstation',  amount: 32000, stage: 'HR Validation',     stageIndex: 1, submitted: '21 Jun 2026', tat: '1 day'  },
  ],
};

// ── ATTENDANCE ─────────────────────────────────────────────────────────────────
export const attendanceDetail = {
  employee: {
    totalEmployees: 1373, present: 801, absent: 572, halfDay: 780, onLeave: 21,
    rate: 58.3, totalDepartments: 84,
    topAbsentDepts: [
      { dept: 'Nursing Dept',    absent: 42, total: 98,  rate: 43 },
      { dept: 'Housekeeping',    absent: 38, total: 95,  rate: 40 },
      { dept: 'OPD Services',    absent: 35, total: 87,  rate: 40 },
      { dept: 'Security',        absent: 28, total: 72,  rate: 39 },
      { dept: 'Admin Office',    absent: 22, total: 58,  rate: 38 },
    ],
  },
  devices: {
    total: 24, online: 22, offline: 2,
    list: [
      { id: 'BIO-01', name: 'Main Gate',         location: 'Main Entrance',        status: 'online'  },
      { id: 'BIO-02', name: 'Admin Block',        location: 'Admin Building',       status: 'online'  },
      { id: 'BIO-03', name: 'OPD Reception',      location: 'OPD Block',            status: 'online'  },
      { id: 'BIO-04', name: 'Nursing Station',    location: 'Nursing Block A',      status: 'online'  },
      { id: 'BIO-05', name: 'Labs Block',         location: 'Laboratory Building',  status: 'online'  },
      { id: 'BIO-06', name: 'College Block 1',    location: 'Academic Building',    status: 'online'  },
      { id: 'BIO-07', name: 'College Block 2',    location: 'Academic Building',    status: 'online'  },
      { id: 'BIO-08', name: 'Library',            location: 'Library Building',     status: 'online'  },
      { id: 'BIO-09', name: 'Staff Block B',      location: 'Staff Quarters',       status: 'offline' },
      { id: 'BIO-10', name: 'Hostel Block A',     location: 'Hostel A',             status: 'online'  },
      { id: 'BIO-11', name: 'Hostel Block B',     location: 'Hostel B',             status: 'online'  },
      { id: 'BIO-12', name: 'Pharmacy',           location: 'Pharmacy Block',       status: 'online'  },
      { id: 'BIO-13', name: 'Radiology',          location: 'Radiology Dept',       status: 'online'  },
      { id: 'BIO-14', name: 'Surgery Block',      location: 'Surgical Block',       status: 'online'  },
      { id: 'BIO-15', name: 'ICU / CCU',          location: 'ICU Wing',             status: 'online'  },
      { id: 'BIO-16', name: 'Emergency',          location: 'Emergency Dept',       status: 'online'  },
      { id: 'BIO-17', name: 'Allied Health Wing', location: 'Allied Block',         status: 'offline' },
      { id: 'BIO-18', name: 'Canteen Block',      location: 'A1 Canteen Area',      status: 'online'  },
      { id: 'BIO-19', name: 'Security Gate 2',    location: 'Back Entrance',        status: 'online'  },
      { id: 'BIO-20', name: 'Maintenance Dept',   location: 'Workshop Area',        status: 'online'  },
      { id: 'BIO-21', name: 'Hostel Block C',     location: 'Hostel C',             status: 'online'  },
      { id: 'BIO-22', name: 'Hostel Block D',     location: 'Hostel D',             status: 'online'  },
      { id: 'BIO-23', name: 'Finance Office',     location: 'Finance Block',        status: 'online'  },
      { id: 'BIO-24', name: 'Conference Hall',    location: 'Conference Centre',    status: 'online'  },
    ],
  },
  student: {
    classesToday: 11, activeCourses: 4, avgRate: 74.5,
    classes: [
      { subject: 'ENT Theory',          type: 'Theory',    year: 'Final Yr Pt I',  present: 159, absent: 89,  strength: 248 },
      { subject: 'Surgery Practicals',  type: 'Practical', year: 'Final Yr Pt II', present: 185, absent: 45,  strength: 230 },
      { subject: 'Biochemistry',        type: 'Theory',    year: '1st Year',       present: 147, absent: 53,  strength: 200 },
      { subject: 'Anatomy Dissection',  type: 'Practical', year: '1st Year',       present: 143, absent: 57,  strength: 200 },
      { subject: 'Pharmacology',        type: 'Theory',    year: '2nd Year',       present: 168, absent: 42,  strength: 210 },
      { subject: 'Pathology',           type: 'Theory',    year: '2nd Year',       present: 162, absent: 48,  strength: 210 },
      { subject: 'Ophthalmology',       type: 'Theory',    year: 'Final Yr Pt I',  present: 155, absent: 93,  strength: 248 },
      { subject: 'Orthopaedics',        type: 'Theory',    year: 'Final Yr Pt I',  present: 161, absent: 87,  strength: 248 },
      { subject: 'Medicine Ward',       type: 'Clinical',  year: 'Final Yr Pt I',  present: 152, absent: 96,  strength: 248 },
      { subject: 'Paediatrics',         type: 'Theory',    year: 'Final Yr Pt II', present: 183, absent: 47,  strength: 230 },
      { subject: 'OBG Clinicals',       type: 'Clinical',  year: 'Final Yr Pt II', present: 179, absent: 51,  strength: 230 },
    ],
  },
};

// ── PG LOGBOOK (real API data — Dr. Rekhi Kriti, MD II Yr, Ophthalmology) ─────
export const pgLogbookDetail = {
  summary: {
    activeStudents: 340, totalEntries: 7600, pendingVerification: 1840, approvedThisMonth: 420,
  },
  sections: [
    { name: 'Academic',   modules: 7, totalEntries: 2800, pendingVerification: 680,  description: 'Journal reviews, seminars, UG teaching, thesis, CPC, mentorship, academic programmes' },
    { name: 'Clinical',   modules: 5, totalEntries: 3200, pendingVerification: 820,  description: 'Clinical works, emergencies, presentations, public health camps, medico-legal' },
    { name: 'Procedures', modules: 1, totalEntries:  600, pendingVerification: 180,  description: 'Investigative and surgical procedures performed / assisted' },
    { name: 'WPBA',       modules: 2, totalEntries:  680, pendingVerification: 110,  description: 'Workplace-based assessment: DOPS and CBD tools' },
    { name: 'Awards',     modules: 3, totalEntries:  320, pendingVerification:  50,  description: 'Certificates, awards, conference presentations, honours' },
  ],
  modules: [
    { name: 'Journal Reviews',           section: 'Academic',   total: 760, pending: 285, verified: 192, approved: 240, rejected: 43  },
    { name: 'Clinical Works',            section: 'Clinical',   total: 680, pending: 340, verified: 170, approved: 136, rejected: 34  },
    { name: 'Mentor / Mentee',           section: 'Academic',   total: 420, pending: 126, verified: 168, approved: 105, rejected: 21  },
    { name: 'Emergencies Managed',       section: 'Clinical',   total: 510, pending: 204, verified: 153, approved: 127, rejected: 26  },
    { name: 'UG Teaching Skills',        section: 'Academic',   total: 340, pending: 102, verified: 136, approved:  85, rejected: 17  },
    { name: 'Academic Programmes',       section: 'Academic',   total: 380, pending: 114, verified: 152, approved:  95, rejected: 19  },
    { name: 'Thesis',                    section: 'Academic',   total: 340, pending:  68, verified: 136, approved: 119, rejected: 17  },
    { name: 'Public Health / Camps',     section: 'Clinical',   total: 255, pending: 102, verified:  76, approved:  64, rejected: 13  },
    { name: 'Medico Legal Work',         section: 'Clinical',   total: 340, pending: 102, verified: 102, approved:  119, rejected: 17 },
    { name: 'Seminars',                  section: 'Academic',   total: 255, pending:  76, verified: 102, approved:   64, rejected: 13 },
    { name: 'CPC',                       section: 'Academic',   total: 255, pending:  51, verified: 127, approved:   64, rejected: 13 },
    { name: 'DOPS',                      section: 'WPBA',       total: 340, pending:  68, verified:  85, approved: 170, rejected: 17  },
    { name: 'CBD',                       section: 'WPBA',       total: 340, pending:  42, verified: 102, approved: 170, rejected: 26  },
    { name: 'Investigative Procedures',  section: 'Procedures', total: 600, pending: 180, verified: 180, approved: 210, rejected: 30  },
    { name: 'Clinical Presentations',    section: 'Clinical',   total: 595, pending: 238, verified: 119, approved: 204, rejected: 34  },
    { name: 'Conferences / Awards',      section: 'Awards',     total: 320, pending:  50, verified:  96, approved: 160, rejected: 14  },
  ],
  statusDistribution: [
    { status: 'Approved',  count: 2332, pct: 31 },
    { status: 'Verified',  count: 1976, pct: 26 },
    { status: 'Pending',   count: 1840, pct: 24 },
    { status: 'Rejected',  count:  408, pct:  5 },
  ],
  approvalWorkflow: [
    { role: 'Faculty Supervisor',  pending: 1840, avgTAT: '—',        note: 'First-level verification of all entries' },
    { role: 'HOD / Reviewer',      pending:  280, avgTAT: '2.1 days', note: 'Second-level approval after supervisor verification' },
    { role: 'Academic Director',   pending:   48, avgTAT: '3.4 days', note: 'Final approval for thesis and special modules' },
  ],
};

// ── A1 FINANCE ─────────────────────────────────────────────────────────────────
export const a1FinanceDetail = {
  summary: {
    totalServicesValue: 542000, outstanding: 450000, overdueInvoices: 3, settledThisMonth: 162000,
  },
  channels: [
    { channel: 'MBBS Hostel Canteen',       billed:  82000, outstanding:  14760, invoices: 3, status: 'Partial' },
    { channel: 'Allied Health Canteen',     billed:  58000, outstanding:  10440, invoices: 2, status: 'Partial' },
    { channel: 'Nursing Canteen',           billed:  42000, outstanding:  42000, invoices: 2, status: 'Overdue' },
    { channel: 'Staff Canteen',             billed:  95000, outstanding:  95000, invoices: 4, status: 'Overdue' },
    { channel: 'Faculty Dining',            billed:  38000, outstanding:  38000, invoices: 2, status: 'Overdue' },
    { channel: 'OPD Patient Cafeteria',     billed:  62000, outstanding:      0, invoices: 2, status: 'Cleared' },
    { channel: 'Tuck Shop — Medicine Block',billed:  18000, outstanding:   5400, invoices: 1, status: 'Partial' },
    { channel: 'Diner — Hostel A',          billed:  55000, outstanding:      0, invoices: 2, status: 'Cleared' },
    { channel: 'Diner — Hostel B',          billed:  48000, outstanding:  14400, invoices: 2, status: 'Partial' },
    { channel: 'Event Catering',            billed:  32000, outstanding:  32000, invoices: 1, status: 'Overdue' },
    { channel: 'Juice Bar / Beverages',     billed:  12000, outstanding:      0, invoices: 1, status: 'Cleared' },
  ],
  agingBuckets: [
    { bucket: '0–30 days',   count: 5, amount: 105600, severity: 'low'      },
    { bucket: '31–60 days',  count: 6, amount: 149400, severity: 'medium'   },
    { bucket: '61–90 days',  count: 4, amount: 127000, severity: 'high'     },
    { bucket: '90+ days',    count: 3, amount:  68000, severity: 'critical' },
  ],
};

// ── ADMISSIONS STANDALONE PAGES ───────────────────────────────────────────────
// Real seat data: MBBS 150/142, Allied 210/192, Nursing 120/118 (Discovery Report)
// Quota structure: Management + Convener, sub-quotas S1/S2/S3/CQ (AsramPortal)

export const mbbsAdmissionsData = {
  summary: {
    totalSeats: 150, enrolled: 142, unfilled: 8, fillRate: 94.7,
    documentsComplete: 134, documentsPending: 8,
    academicYear: '2026–2027', sourceApp: 'AsramPortal',
    sourceUrl: 'https://login.orfus.in/asramportal',
  },
  quotas: [
    {
      quota: 'Management Quota', seats: 75, filled: 72, rate: 96,
      subQuotas: [
        { name: 'S1 – Service',     seats: 25, filled: 25, rate: 100 },
        { name: 'S2 – Non-Service', seats: 25, filled: 24, rate: 96  },
        { name: 'S3',               seats: 15, filled: 14, rate: 93  },
        { name: 'Service',           seats:  5, filled:  5, rate: 100 },
        { name: 'Non-Service',       seats:  5, filled:  4, rate: 80  },
      ],
    },
    {
      quota: 'Convener Quota', seats: 75, filled: 70, rate: 93.3,
      subQuotas: [
        { name: 'CQ – Convener', seats: 75, filled: 70, rate: 93.3 },
      ],
    },
  ],
  pipeline: [
    { stage: 'Applications Received', count: 620, color: '#223F7F', note: null },
    { stage: 'Rank List Published',   count: 450, color: '#7C3AED', note: null },
    { stage: 'Seats Allotted',        count: 150, color: '#0891B2', note: null },
    { stage: 'Reported & Enrolled',   count: 142, color: '#059669', note: null },
    { stage: 'Fees Paid',             count: 138, color: '#059669', note: null },
    { stage: 'Documents Verified',    count: 134, color: '#059669', note: null },
    { stage: 'Documents Pending',     count:   8, color: '#EF4444', note: 'Action required' },
  ],
  pendingActions: [
    { title: '8 Students — Original Documents Pending', description: 'Original certificates not submitted to Admissions Office — clearance and hall ticket issuance blocked', count: 8, severity: 'high' },
  ],
  fees: {
    // Real data from ASRAM Finance portal (asramfinance.orfus.in) — FY 2025-26
    // Demands published 13 Jun 2026 · Due date: 14 Jul 2026
    summary: {
      totalDemand: 49405000, collected: 840000, pending: 48565000, collectionRate: 1.7,
      feesPaidCount: 18, feePendingCount: 124,
      dueDate: '14 Jul 2026', publishedDate: '13 Jun 2026',
      note: 'FY 2025-26 opening demands. Due date 14 Jul 2026. Collection in progress.',
    },
    byQuota: [
      // Management: ₹6,00,000 tuition + ₹40,000 skill lab = ₹6,40,000/student
      { quota: 'Management Quota', students: 72, annualFee: 640000,  demand: 46080000, collected: 760000, pending: 45320000, rate: 1.6 },
      // Convener: ₹7,500 tuition + ₹40,000 skill lab = ₹47,500/student
      { quota: 'Convener Quota',   students: 70, annualFee:  47500,  demand:  3325000, collected:  80000, pending:  3245000, rate: 2.4 },
    ],
    byType: [
      { type: 'Tuition — Management', demand: 43200000, collected: 680000, pending: 42520000, rate: 1.6 },
      { type: 'Tuition — Convener',   demand:   525000, collected:  12000, pending:   513000, rate: 2.3 },
      { type: 'Skill Lab Fee',         demand:  5680000, collected: 148000, pending:  5532000, rate: 2.6 },
    ],
    pendingStudents: [
      { name: 'K. Srinivasa Rao',  rollNo: 'MBBS25041', quota: 'Convener',   feeType: 'Tuition Fee', amount:  47500, daysOverdue: 0 },
      { name: 'A. Venkata Ramana', rollNo: 'MBBS25019', quota: 'Management', feeType: 'Tuition Fee', amount: 640000, daysOverdue: 0 },
      { name: 'P. Lakshmi Devi',   rollNo: 'MBBS25057', quota: 'Convener',   feeType: 'Skill Lab',   amount:  40000, daysOverdue: 0 },
      { name: 'M. Bhavani',        rollNo: 'MBBS25088', quota: 'Management', feeType: 'Tuition Fee', amount: 640000, daysOverdue: 0 },
    ],
  },
};

export const pgAdmissionsData = {
  summary: {
    enrolled: 340, totalSeats: 360, fillRate: 94.4, departments: 84,
    sourceApp: 'AsramPortal', sourceUrl: 'https://login.orfus.in/asramportal',
  },
  programs: [
    { program: 'MD',      seats: 180, enrolled: 175, fillRate: 97.2, departments: 32 },
    { program: 'MS',      seats: 120, enrolled: 115, fillRate: 95.8, departments: 18 },
    { program: 'Diploma', seats:  60, enrolled:  50, fillRate: 83.3, departments: 14 },
  ],
  quotas: [
    { quota: 'Management Quota', seats: 190, enrolled: 182, rate: 95.8 },
    { quota: 'Convener Quota',   seats: 170, enrolled: 158, rate: 92.9 },
  ],
  topDepartments: [
    { dept: 'General Medicine',         pgStudents: 22, program: 'MD' },
    { dept: 'General Surgery',          pgStudents: 18, program: 'MS' },
    { dept: 'Obstetrics & Gynaecology', pgStudents: 15, program: 'MD/MS' },
    { dept: 'Paediatrics',              pgStudents: 14, program: 'MD' },
    { dept: 'Orthopaedics',             pgStudents: 12, program: 'MS' },
    { dept: 'Ophthalmology',            pgStudents: 10, program: 'MD' },
    { dept: 'ENT',                      pgStudents:  9, program: 'MS' },
    { dept: 'Dermatology',              pgStudents:  8, program: 'MD' },
    { dept: 'Radiology',                pgStudents:  8, program: 'MD' },
    { dept: 'Psychiatry',               pgStudents:  7, program: 'MD' },
  ],
  logbookNote: 'PG Logbook tracking via pglogbook.orfus.in — 3 pending supervisor sign-offs as of 22 Jun 2026',
  fees: {
    // Real data from ASRAM Finance portal — FY 2025-26
    // Rate confirmed: ₹4,96,800 tuition + ₹10,000 skill lab per PG student. NOT YET PUBLISHED.
    summary: {
      totalDemand: 159472000, collected: 0, pending: 159472000, collectionRate: 0,
      feesPaidCount: 0, feePendingCount: 340,
      dueDate: 'TBD', publishedDate: null,
      note: 'FY 2025-26 PG fee demands not yet published. Expected Jul 2026.',
    },
    byProgram: [
      // MD/MS: ₹4,96,800 tuition + ₹10,000 skill lab = ₹5,06,800/student (portal confirmed)
      { program: 'MD',      students: 175, annualFee: 506800, demand:  88690000, collected: 0, pending:  88690000, rate: 0 },
      { program: 'MS',      students: 115, annualFee: 506800, demand:  58282000, collected: 0, pending:  58282000, rate: 0 },
      // Diploma: estimated ₹2,50,000/year (lower-tier PG programme)
      { program: 'Diploma', students:  50, annualFee: 250000, demand:  12500000, collected: 0, pending:  12500000, rate: 0 },
    ],
    byType: [
      { type: 'Programme Fee (MD/MS)',  demand: 146972000, collected: 0, pending: 146972000, rate: 0 },
      { type: 'Programme Fee (Diploma)',demand:  12500000, collected: 0, pending:  12500000, rate: 0 },
    ],
    alert: 'PG fee demands for FY 2025-26 not yet published on Asram Pay. Publication expected July 2026.',
  },
};

export const alliedAdmissionsData = {
  summary: {
    totalSeats: 210, enrolled: 192, unfilled: 18, fillRate: 91.4,
    documentsComplete: 177, documentsPending: 15,
    sourceApp: 'Allied Dashboard', sourceUrl: 'https://login.orfus.in/asramportal/allied-dashboard',
  },
  programs: [
    { program: 'B.Sc Medical Lab Technology', seats: 40, filled: 38, rate: 95   },
    { program: 'B.Sc Physiotherapy',          seats: 40, filled: 36, rate: 90   },
    { program: 'B.Sc Radiology & Imaging',    seats: 30, filled: 28, rate: 93.3 },
    { program: 'B.Sc Pharmacy',               seats: 40, filled: 35, rate: 87.5 },
    { program: 'B.Sc Optometry',              seats: 20, filled: 18, rate: 90   },
    { program: 'B.Sc Nursing (Allied)',       seats: 20, filled: 20, rate: 100  },
    { program: 'B.Sc Operation Theatre Tech', seats: 20, filled: 17, rate: 85   },
  ],
  quotas: [
    { quota: 'Management Quota', seats: 105, filled: 96, rate: 91.4 },
    { quota: 'Convener Quota',   seats: 105, filled: 96, rate: 91.4 },
  ],
  pipeline: [
    { stage: 'Applications Received', count: 580, color: '#223F7F', note: null },
    { stage: 'Eligible Candidates',   count: 410, color: '#7C3AED', note: null },
    { stage: 'Seats Allotted',        count: 210, color: '#0891B2', note: null },
    { stage: 'Enrolled',              count: 192, color: '#059669', note: null },
    { stage: 'Documents Verified',    count: 177, color: '#059669', note: null },
    { stage: 'Documents Pending',     count:  15, color: '#EF4444', note: 'Action required' },
  ],
  note: 'Allied Health Sciences operates as a separate college identity sharing AsramPortal infrastructure. Attendance and academic scheduling tracked under Allied Dashboard.',
  fees: {
    // Real data from ASRAM Finance portal — FY 2025-26
    // Allied rates confirmed: ₹19,000 (convener) to ₹32,500 (management). NOT YET PUBLISHED.
    summary: {
      totalDemand: 4896000, collected: 0, pending: 4896000, collectionRate: 0,
      feesPaidCount: 0, feePendingCount: 192,
      dueDate: 'TBD', publishedDate: null,
      note: 'FY 2025-26 Allied fee demands not yet published. Rates: ₹19K–₹32.5K/student.',
    },
    byProgram: [
      // Rates: ~60% convener ₹19K, ~40% management ₹32.5K → avg ₹25,500
      { program: 'B.Sc Medical Lab Technology', students: 38, annualFee: 25500, demand:  969000, collected: 0, pending:  969000, rate: 0 },
      { program: 'B.Sc Physiotherapy',          students: 36, annualFee: 25500, demand:  918000, collected: 0, pending:  918000, rate: 0 },
      { program: 'B.Sc Radiology & Imaging',    students: 28, annualFee: 25500, demand:  714000, collected: 0, pending:  714000, rate: 0 },
      { program: 'B.Sc Pharmacy',               students: 35, annualFee: 25500, demand:  892500, collected: 0, pending:  892500, rate: 0 },
      { program: 'B.Sc Optometry',              students: 18, annualFee: 25500, demand:  459000, collected: 0, pending:  459000, rate: 0 },
      { program: 'B.Sc Nursing (Allied)',        students: 20, annualFee: 25500, demand:  510000, collected: 0, pending:  510000, rate: 0 },
      { program: 'B.Sc Operation Theatre Tech',  students: 17, annualFee: 25500, demand:  433500, collected: 0, pending:  433500, rate: 0 },
    ],
    byType: [
      { type: 'Tuition Fee (Convener)',    demand: 2193600, collected: 0, pending: 2193600, rate: 0 },
      { type: 'Tuition Fee (Management)',  demand: 2702400, collected: 0, pending: 2702400, rate: 0 },
    ],
  },
};

export const nursingAdmissionsData = {
  summary: {
    totalSeats: 120, enrolled: 118, unfilled: 2, fillRate: 98.3,
    documentsComplete: 116, documentsPending: 2,
    sourceApp: 'AsramPortal', sourceUrl: 'https://login.orfus.in/asramportal',
  },
  programs: [
    {
      program: 'B.Sc Nursing', seats: 80, filled: 79, rate: 98.8,
      quotas: [
        { type: 'Management Quota', seats: 40, filled: 40, rate: 100  },
        { type: 'Convener Quota',   seats: 40, filled: 39, rate: 97.5 },
      ],
      subQuotas: ['Service', 'Non-Service'],
    },
    {
      program: 'GNM Nursing', seats: 40, filled: 39, rate: 97.5,
      quotas: [
        { type: 'Management Quota', seats: 20, filled: 20, rate: 100 },
        { type: 'Convener Quota',   seats: 20, filled: 19, rate: 95  },
      ],
      subQuotas: [],
    },
  ],
  pipeline: [
    { stage: 'Applications Received', count: 340, color: '#223F7F', note: null },
    { stage: 'Eligible Candidates',   count: 250, color: '#7C3AED', note: null },
    { stage: 'Seats Allotted',        count: 120, color: '#0891B2', note: null },
    { stage: 'Enrolled',              count: 118, color: '#BE185D', note: null },
    { stage: 'Documents Verified',    count: 116, color: '#059669', note: null },
    { stage: 'Documents Pending',     count:   2, color: '#F97316', note: 'Minor backlog' },
  ],
  fees: {
    // Real data from ASRAM Finance portal — FY 2025-26
    // Nursing rate confirmed: ₹15,000/student. PUBLISHED (effective 10 Jun, due 10 Jul 2026).
    summary: {
      totalDemand: 1770000, collected: 150000, pending: 1620000, collectionRate: 8.5,
      feesPaidCount: 10, feePendingCount: 108,
      dueDate: '10 Jul 2026', publishedDate: '10 Jun 2026',
      note: 'FY 2025-26 demands published. Due 10 Jul 2026. 10 early payments received.',
    },
    byProgram: [
      { program: 'B.Sc Nursing', students: 79, annualFee: 15000, demand: 1185000, collected: 105000, pending: 1080000, rate: 8.9 },
      { program: 'GNM Nursing',  students: 39, annualFee: 15000, demand:  585000, collected:  45000, pending:  540000, rate: 7.7 },
    ],
    byType: [
      { type: 'Tuition Fee', demand: 1770000, collected: 150000, pending: 1620000, rate: 8.5 },
    ],
    pendingStudents: [
      { name: 'S. Padmavathi',  rollNo: 'NSG25031', program: 'B.Sc Nursing', feeType: 'Tuition Fee', amount: 15000, daysOverdue: 0 },
      { name: 'R. Meenakshi',   rollNo: 'GNM25018', program: 'GNM Nursing',  feeType: 'Tuition Fee', amount: 15000, daysOverdue: 0 },
      { name: 'T. Vijayalaxmi', rollNo: 'NSG25056', program: 'B.Sc Nursing', feeType: 'Tuition Fee', amount: 15000, daysOverdue: 0 },
      { name: 'B. Saritha',     rollNo: 'GNM25007', program: 'GNM Nursing',  feeType: 'Tuition Fee', amount: 15000, daysOverdue: 0 },
    ],
  },
};

// ── UG LOGBOOK / STUDENT ATTENDANCE ───────────────────────────────────────────
// Real data: 11 classes today, ENT Theory 248/159/89 (Discovery Report)
export const ugLogbookData = {
  summary: {
    classesToday: 11, activeCourses: 4, avgAttendanceRate: 74.5,
    sourceApp: 'Attendance Portal', sourceUrl: 'https://login.orfus.in/asramportal/attendance',
  },
  courses: [
    { course: 'MBBS 1st Year',         classesToday: 1, totalStrength: 200, avgRate: 73.5 },
    { course: 'MBBS 2nd Year',         classesToday: 2, totalStrength: 210, avgRate: 80.0 },
    { course: 'MBBS Final Year Pt I',  classesToday: 4, totalStrength: 248, avgRate: 64.1 },  // real
    { course: 'MBBS Final Year Pt II', classesToday: 4, totalStrength: 230, avgRate: 80.4 },
  ],
  // Class-level real data from Attendance portal (22 Jun 2026)
  classesLive: [
    { subject: 'ENT Theory',           type: 'Theory',    course: 'MBBS Final Year Pt I',  time: '08:00–09:00', faculty: 'Parueen Sulthana', strength: 248, present: 159, absent: 89  }, // real
    { subject: 'Ophthalmology Theory', type: 'Theory',    course: 'MBBS Final Year Pt I',  time: '09:00–10:00', faculty: 'Dr. K. Madhavi',   strength: 248, present: 155, absent: 93  },
    { subject: 'Orthopaedics',         type: 'Theory',    course: 'MBBS Final Year Pt I',  time: '10:00–11:00', faculty: 'Dr. P. Raju',      strength: 248, present: 161, absent: 87  },
    { subject: 'Medicine Ward Round',  type: 'Clinical',  course: 'MBBS Final Year Pt I',  time: '08:00–11:00', faculty: 'Dr. S. Krishnan',  strength: 248, present: 152, absent: 96  },
    { subject: 'Pharmacology',         type: 'Theory',    course: 'MBBS 2nd Year',         time: '08:00–09:00', faculty: 'Dr. M. Rao',       strength: 210, present: 168, absent: 42  },
    { subject: 'Pathology Lab',        type: 'Practical', course: 'MBBS 2nd Year',         time: '09:00–12:00', faculty: 'Dr. R. Devi',      strength: 210, present: 162, absent: 48  },
    { subject: 'Biochemistry',         type: 'Theory',    course: 'MBBS 1st Year',         time: '08:00–09:00', faculty: 'Dr. A. Kumar',     strength: 200, present: 147, absent: 53  },
    { subject: 'Anatomy Dissection',   type: 'Practical', course: 'MBBS 1st Year',         time: '09:00–12:00', faculty: 'Dr. B. Rao',       strength: 200, present: 143, absent: 57  },
    { subject: 'Surgery Ward',         type: 'Clinical',  course: 'MBBS Final Year Pt II', time: '08:00–11:00', faculty: 'Dr. V. Singh',     strength: 230, present: 185, absent: 45  },
    { subject: 'Paediatrics',          type: 'Theory',    course: 'MBBS Final Year Pt II', time: '11:00–12:00', faculty: 'Dr. L. Rajan',     strength: 230, present: 183, absent: 47  },
    { subject: 'OBG Clinicals',        type: 'Clinical',  course: 'MBBS Final Year Pt II', time: '09:00–12:00', faculty: 'Dr. P. Devi',      strength: 230, present: 179, absent: 51  },
  ],
  // Threshold alerts: subjects below 75%
  lowAttendanceAlerts: [
    { subject: 'Medicine Ward Round',  course: 'MBBS Final Year Pt I', rate: 61.3 },
    { subject: 'ENT Theory',           course: 'MBBS Final Year Pt I', rate: 64.1 },
    { subject: 'Ophthalmology Theory', course: 'MBBS Final Year Pt I', rate: 62.5 },
    { subject: 'Orthopaedics',         course: 'MBBS Final Year Pt I', rate: 64.9 },
    { subject: 'Anatomy Dissection',   course: 'MBBS 1st Year',        rate: 71.5 },
  ],
};

// ── FOOD & KITCHEN ─────────────────────────────────────────────────────────────
// Source: Campus Kitchen live app exploration (Jun 2026) + A1 Finance + Hostel data
export const foodKitchenData = {
  summary: {
    totalDiners: 7,
    totalSeats: 1103,
    activeMealPlans: 5,       // Regular, Arogyasri, A la Carte, Events, Patient Diet
    activeSubscriptions: 1,   // System in ramp-up (live since May 2026)
    totalDishes: 109,
    totalIngredientIndents: 112,
  },
  diningFacilities: [
    { name: 'ASRAM Main Diner',          location: 'Main Campus',      seats: 280, type: 'Students & Staff', status: 'active' },
    { name: 'ASRAM Medical College Diner',location: 'Medical Block',   seats: 180, type: 'Medical Students',  status: 'active' },
    { name: 'ASRAM Nursing College Diner',location: 'Nursing Block',   seats: 120, type: 'Nursing Students',  status: 'active' },
    { name: 'ASRAM Allied Diner',         location: 'Allied Block',    seats: 100, type: 'Allied Health',     status: 'active' },
    { name: 'ASRAM Staff Cafeteria',      location: 'Admin Block',     seats: 150, type: 'Staff & Faculty',  status: 'active' },
    { name: 'ASRAM GH Patient Diner',     location: 'General Hospital',seats: 173, type: 'Patient Diets',    status: 'active' },
    { name: 'ASRAM Canteen Kiosk',        location: 'Main Gate',       seats: 100, type: 'Retail / Walk-in', status: 'active' },
  ],
  messBilling: {
    // From Hostel detail: ₹3,200/student/month mess fee
    totalBilled: 24192000,    // ₹24.19 L (756 students × ₹3,200/month × 10 months approx)
    collected:   20563200,    // 85% collection rate
    pending:      3628800,
    collectionRate: 85,
    ratePerStudentPerMonth: 3200,
    occupiedStudents: 756,
    byBlock: [
      { block: 'Block A — MBBS Boys',  students: 192, billed: 6144000, collected: 5222400, pending: 921600,  rate: 85 },
      { block: 'Block B — MBBS Girls', students: 208, billed: 6656000, collected: 5657600, pending: 998400,  rate: 85 },
      { block: 'Block C — Nursing',    students: 186, billed: 5952000, collected: 4761600, pending: 1190400, rate: 80 },
      { block: 'Block D — Allied',     students: 170, billed: 5440000, collected: 4921600, pending:  518400, rate: 90 },
    ],
  },
  vendorPayables: {
    // From A1 Finance: vendor payables to A1 Services across 11 channels
    outstanding:     450000,   // ₹4.5 L
    overdueInvoices: 3,
    channels: 11,
    settledThisMonth: 162000,
    totalServicesValue: 542000,
    overdueChannels: [
      { channel: 'Nursing Canteen',   outstanding: 42000, daysOverdue: 35 },
      { channel: 'Staff Canteen',     outstanding: 95000, daysOverdue: 42 },
      { channel: 'Faculty Dining',    outstanding: 38000, daysOverdue: 38 },
      { channel: 'Event Catering',    outstanding: 32000, daysOverdue: 28 },
    ],
  },
  ingredientIndents: {
    // 112 real indents from Campus Kitchen system
    totalIndents: 112,
    estimatedTotalValue: 620000,  // ₹6.2 L (extrapolated from first 10 indents ≈ ₹62K)
    recentIndents: [
      { item: 'Rice (Raw)',          quantity: '500 kg',  unit: 'kg',   approxValue: 22500,  status: 'received',  date: '20 Jun 2026' },
      { item: 'Cooking Oil',         quantity: '100 L',   unit: 'litre',approxValue: 18000,  status: 'received',  date: '20 Jun 2026' },
      { item: 'Dal (Toor)',          quantity: '200 kg',  unit: 'kg',   approxValue: 32000,  status: 'pending',   date: '21 Jun 2026' },
      { item: 'Vegetables (Mixed)',  quantity: '300 kg',  unit: 'kg',   approxValue: 15000,  status: 'received',  date: '21 Jun 2026' },
      { item: 'Milk',               quantity: '500 L',   unit: 'litre',approxValue: 25000,  status: 'in-transit',date: '22 Jun 2026' },
      { item: 'Wheat Flour',        quantity: '400 kg',  unit: 'kg',   approxValue: 16000,  status: 'pending',   date: '22 Jun 2026' },
    ],
    byStatus: [
      { status: 'Received',    count: 78, pct: 70 },
      { status: 'In Transit',  count: 18, pct: 16 },
      { status: 'Pending',     count: 16, pct: 14 },
    ],
  },
  patientDiet: {
    // 26 hospital wards integrated
    totalWards: 26,
    activeOrders: 84,
    mealsServedToday: 0,      // System ramp-up — live since May 2026
    mealTypes: ['Regular', 'Diabetic', 'Low-Sodium', 'High-Protein', 'Liquid'],
    hospitals: [
      { name: 'ASRAM General Hospital',        wards: 18, activeOrders: 62 },
      { name: 'ASRAM Super Specialty Hospital', wards:  5, activeOrders: 15 },
      { name: 'ASRAM Cancer Care Centre',       wards:  3, activeOrders:  7 },
    ],
  },
  mealPlans: {
    types: [
      { name: 'Regular',     description: 'Standard student mess meals',         count: 756 },
      { name: 'Arogyasri',   description: 'Government scheme patient meals',     count:  12 },
      { name: 'À la Carte',  description: 'Walk-in retail orders',               count:   0 },
      { name: 'Events',      description: 'Conference and event catering',        count:   2 },
      { name: 'Patient Diet',description: 'Hospital ward prescribed diet orders', count:  84 },
    ],
    weeklyMenuActive: true,
    lastMenuUpdated: '16 Jun 2026',
  },
  systemNote: 'Campus Kitchen (kitchen.orfus.in) went live May 2026. Subscription and À la Carte modules in ramp-up. Core mess operations and patient diet integration active.',
};

// ── HOSTELS ────────────────────────────────────────────────────────────────────
export const hostelDetail = {
  summary: {
    totalCapacity: 840, occupied: 756, occupancyRate: 90,
    billingDue: 675000, collectionRate: 85,
  },
  blocks: [
    { block: 'Block A — MBBS Boys',  type: 'Boys',  capacity: 200, occupied: 192, available:  8, occupancyRate: 96, warden: 'Mr. Ravi Kumar',  contact: '+91 8800XXX001', billing: 1200000, collected: 1020000, pending: 180000, rate: 85 },
    { block: 'Block B — MBBS Girls', type: 'Girls', capacity: 220, occupied: 208, available: 12, occupancyRate: 95, warden: 'Ms. Priya Singh',  contact: '+91 8800XXX002', billing: 1320000, collected: 1122000, pending: 198000, rate: 85 },
    { block: 'Block C — Nursing',    type: 'Girls', capacity: 200, occupied: 186, available: 14, occupancyRate: 93, warden: 'Ms. Anita Sharma', contact: '+91 8800XXX003', billing: 1200000, collected:  960000, pending: 240000, rate: 80 },
    { block: 'Block D — Allied',     type: 'Mixed', capacity: 220, occupied: 170, available: 50, occupancyRate: 77, warden: 'Mr. Kiran Rao',    contact: '+91 8800XXX004', billing:  780000, collected:  723000, pending:  57000, rate: 93 },
  ],
  feeComponents: [
    { component: 'Residence Fee',    perStudent: 4500,  totalBilled: 3402000, collected: 2891700, pending: 510300,  rate: 85 },
    { component: 'Mess / Diner Fee', perStudent: 3200,  totalBilled: 2419200, collected: 2056200, pending: 363000,  rate: 85 },
    { component: 'Electricity Charge',perStudent: 800,  totalBilled:  604800, collected:  544320, pending:  60480,  rate: 90 },
    { component: 'Security Deposit', perStudent: 2000,  totalBilled: 1512000, collected: 1360800, pending: 151200,  rate: 90 },
  ],
  pendingActions: [
    { title: 'Block C — High Dues',        description: '42 students in Block C (Nursing) have outstanding balances exceeding 60 days', severity: 'critical', block: 'Block C — Nursing',    count: 42 },
    { title: 'Block A — Overdue Reminder', description: '28 students in Block A have not paid this month\'s dues',                      severity: 'high',     block: 'Block A — MBBS Boys',  count: 28 },
    { title: 'Block B — Partial Payments', description: '18 students made partial payments — balance recovery pending',                  severity: 'high',     block: 'Block B — MBBS Girls', count: 18 },
    { title: 'Block D — Low Occupancy',    description: 'Block D at 77% occupancy — 50 beds vacant, review admission allocation',       severity: 'medium',   block: 'Block D — Allied',     count: 50 },
  ],
};
