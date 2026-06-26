// ─── RESEARCH PORTAL DATA ─────────────────────────────────────────────────────

export const researchKPIs = {
  total: 39,
  inApprovalReview: 12,
  inFundingReview: 8,
  approved: 14,
  rejected: 5,
  submitted: 0,
};

export const researchByCollege = [
  { name: 'Medicine', fullName: 'ASRAM School of Medicine', total: 18, approved: 7, inReview: 8, rejected: 2, color: '#223F7F' },
  { name: 'Nursing', fullName: 'ASRAM School of Nursing', total: 12, approved: 4, inReview: 6, rejected: 1, color: '#7C3AED' },
  { name: 'Allied Health', fullName: 'ASRAM School of Allied Health', total: 9, approved: 3, inReview: 4, rejected: 2, color: '#059669' },
];

export const researchMonthlyTrend = [
  { month: 'Jul', submitted: 4, approved: 2 },
  { month: 'Aug', submitted: 6, approved: 3 },
  { month: 'Sep', submitted: 8, approved: 5 },
  { month: 'Oct', submitted: 5, approved: 3 },
  { month: 'Nov', submitted: 9, approved: 6 },
  { month: 'Dec', submitted: 7, approved: 4 },
];

export const researchStageBreakdown = [
  { stage: 'SUB', label: 'Submitted', count: 4, color: '#6B7280' },
  { stage: 'SCI', label: 'Scientific', count: 12, color: '#223F7F' },
  { stage: 'ETH', label: 'Ethical (IEC)', count: 8, color: '#F97316' },
  { stage: 'IRC', label: 'IRC', count: 6, color: '#7C3AED' },
  { stage: 'MGT', label: 'Management', count: 5, color: '#059669' },
];

export const researchRecentApplications = [
  { id: 'RID-2026-4712E0', title: 'Effects of Yoga on Hypertension Management', college: 'Medicine', pi: 'Dr. Priya Sharma', stage: 'SCI', daysAgo: 1 },
  { id: 'RID-2026-4AA5D5', title: 'COVID-19 Long-Term Patient Outcomes Study', college: 'Medicine', pi: 'Dr. Ravi Kumar', stage: 'ETH', daysAgo: 2 },
  { id: 'RID-2026-2D0AD2', title: 'Nursing Protocol Optimization in ICU Settings', college: 'Nursing', pi: 'Sr. Anita Rao', stage: 'SCI', daysAgo: 3 },
  { id: 'FCR-2026-B54F9A', title: 'ABC Studies on Animals and Plants', college: 'Allied Health', pi: 'Dr. John Smith', stage: 'MGT', daysAgo: 5 },
  { id: 'RID-2026-A594E8', title: 'Post-Surgical Rehabilitation Outcomes', college: 'Medicine', pi: 'Dr. Kavitha Nair', stage: 'IRC', daysAgo: 6 },
];

export const researchCommittees = [
  { name: 'Scientific Committee', code: 'SCIENTIFIC', members: 4, color: '#223F7F' },
  { name: 'Institutional Ethics Committee', code: 'IEC', members: 2, color: '#F97316' },
  { name: 'Institutional Research Committee', code: 'IRC', members: 2, color: '#7C3AED' },
  { name: 'Higher Management', code: 'MANAGEMENT', members: 2, color: '#059669' },
];

// ─── INDENT PORTAL DATA ───────────────────────────────────────────────────────

export const indentKPIs = {
  total: 9,
  inApproval: 7,
  completed: 2,
  rejected: 0,
  institutions: 15,
};

export const indentByInstitution = [
  { code: 'DUMMY_INST2', name: 'Organization2 Institute', total: 9, inApproval: 7, completed: 2, rejected: 0 },
  { code: 'DUMMY_INST1', name: 'Organization1 Institute', total: 1, inApproval: 1, completed: 0, rejected: 0 },
  { code: 'ASRAM_GH', name: 'ASRAM General Hospital', total: 0, inApproval: 0, completed: 0, rejected: 0 },
  { code: 'ASRAM_SSH', name: 'ASRAM Super Speciality Hospital', total: 0, inApproval: 0, completed: 0, rejected: 0 },
  { code: 'ASRAM_NURSING', name: 'ASRAM College Of Nursing', total: 0, inApproval: 0, completed: 0, rejected: 0 },
];

export const indentApprovalPipeline = [
  { step: 'L1 Approval', count: 3, color: '#223F7F' },
  { step: 'Director L2', count: 1, color: '#1A5FA8' },
  { step: 'CEO L3', count: 1, color: '#3B82F6' },
  { step: 'L4 Approval', count: 0, color: '#7C3AED' },
  { step: 'Purchase Officer', count: 1, color: '#F97316' },
  { step: 'Acquisition', count: 1, color: '#059669' },
];

export const indentBudgetSummary = [
  { inst: 'Org2 Institute', allocated: 2850000, used: 31408, pct: 1 },
  { inst: 'Org1 Institute', allocated: 2850000, used: 5000, pct: 0.2 },
  { inst: 'ASRAM GH', allocated: 5000000, used: 0, pct: 0 },
  { inst: 'ASRAM SSH', allocated: 4500000, used: 0, pct: 0 },
];

export const indentRecentActivity = [
  { id: 'ASRAM/IND/2026/0009', title: 'Chair', inst: 'Organization2', status: 'Pending Admin', amount: 2000, daysAgo: 0 },
  { id: 'ASRAM/IND/2026/0008', title: 'Office Desk', inst: 'Organization1', status: 'Pending Approver', amount: 23425, daysAgo: 1 },
  { id: 'ASRAM/IND/2026/0007', title: 'Laptop', inst: 'Organization2', status: 'Completed', amount: 25000, daysAgo: 2 },
  { id: 'ASRAM/IND/2026/0006', title: 'Projector Screen', inst: 'Organization2', status: 'Pending Admin', amount: 12345, daysAgo: 2 },
  { id: 'ASRAM/IND/2026/0005', title: 'Desktop Computer', inst: 'Organization2', status: 'Pending Approver', amount: 50000, daysAgo: 2 },
];

export const indentValueByPriority = [
  { priority: 'Routine', count: 0, value: 0 },
  { priority: 'Standard', count: 9, value: 140770 },
  { priority: 'High', count: 0, value: 0 },
  { priority: 'Urgent', count: 0, value: 0 },
];

// ─── RESEARCH FINANCIAL DATA ──────────────────────────────────────────────────

export const researchFunding = {
  totalProposalsWithFunding: 27,
  totalEstimatedFunding: 18750000,  // ₹1.875 Cr
  approvedFunding: 6200000,         // ₹62 L
  inReviewFunding: 9800000,         // ₹98 L
  pendingFunding: 2750000,          // ₹27.5 L
};

export const researchFundingByType = [
  { type: 'Institutional Funding', count: 14, amount: 11500000, color: '#2563eb' },
  { type: 'Agency Funding', count: 8, amount: 5250000, color: '#7c3aed' },
  { type: 'Self Funding', count: 5, amount: 2000000, color: '#0891b2' },
];

export const researchFundingByCollege = [
  { name: 'Medicine', allocated: 9500000, approved: 3200000, inReview: 5100000 },
  { name: 'Nursing', allocated: 5750000, approved: 1800000, inReview: 2900000 },
  { name: 'Allied Health', allocated: 3500000, approved: 1200000, inReview: 1800000 },
];

// ─── INDENT FINANCIAL DATA ────────────────────────────────────────────────────

export const indentFinancials = {
  totalBudgetAllocated: 42750000,  // ₹4.275 Cr across all institutions
  totalBudgetUsed: 31408,
  totalBudgetRemaining: 42718592,
  totalPipelineValue: 140770,      // value of all open indents
  completedSpend: 26000,           // value of completed indents
  pendingApprovalValue: 114770,    // value still in approval
  avgIndentValue: 15641,
};

export const indentBudgetByInstitution = [
  { inst: 'Organization2 Institute', code: 'DUMMY_INST2', allocated: 2850000, used: 31408, pct: 1.1, activeIndents: 9 },
  { inst: 'Organization1 Institute', code: 'DUMMY_INST1', allocated: 2850000, used: 5000, pct: 0.2, activeIndents: 1 },
  { inst: 'ASRAM General Hospital', code: 'ASRAM_GH', allocated: 6000000, used: 0, pct: 0, activeIndents: 0 },
  { inst: 'ASRAM Super Speciality Hospital', code: 'ASRAM_SSH', allocated: 5500000, used: 0, pct: 0, activeIndents: 0 },
  { inst: 'ASRAM College Of Nursing', code: 'ASRAM_NURSING', allocated: 3200000, used: 0, pct: 0, activeIndents: 0 },
  { inst: 'ASRAM Cancer Care', code: 'ASRAM_CC', allocated: 2800000, used: 0, pct: 0, activeIndents: 0 },
  { inst: 'ASRAM Constructions', code: 'ASRAM_CON', allocated: 4500000, used: 0, pct: 0, activeIndents: 0 },
  { inst: 'Laila Infra Structures', code: 'INFRA', allocated: 8000000, used: 0, pct: 0, activeIndents: 0 },
];

export const indentSpendByDept = [
  { dept: 'Administration', capex: 30450, ops: 958, total: 31408 },
  { dept: 'Central Laboratory', capex: 0, ops: 0, total: 0 },
  { dept: 'Computer Science', capex: 0, ops: 0, total: 0 },
  { dept: 'Mechanical Engineering', capex: 0, ops: 0, total: 0 },
];

export const indentPipelineByValue = [
  { range: '₹0–5K', count: 3, value: 6000 },
  { range: '₹5K–25K', count: 3, value: 37345 },
  { range: '₹25K–50K', count: 2, value: 48000 },
  { range: '₹50K+', count: 1, value: 50000 },
];

// ─── MODULE REGISTRY ──────────────────────────────────────────────────────────

export const modules = [
  {
    id: 'research',
    name: 'Research Portal',
    tagline: 'Research proposal lifecycle across all colleges',
    url: 'research.orfus.in',
    color: '#223F7F',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    metrics: [
      { label: 'Total Applications', value: '39' },
      { label: 'Approved', value: '14' },
      { label: 'In Review', value: '20' },
    ],
  },
  {
    id: 'indent',
    name: 'Indent Portal',
    tagline: 'Purchase requisitions across 15 institutions',
    url: 'indent.orfus.in',
    color: '#223F7F',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    metrics: [
      { label: 'Total Indents', value: '9' },
      { label: 'In Approval', value: '7' },
      { label: 'Completed', value: '2' },
    ],
  },
];
