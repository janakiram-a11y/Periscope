import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Landing from './pages/Landing';
import ResearchOverview from './pages/ResearchOverview';
import IndentOverview from './pages/IndentOverview';
import PeriscopeDashboard from './pages/PeriscopeDashboard';

// Management
import OrgSummary        from './pages/OrgSummary';
import CollegesOverview  from './pages/CollegesOverview';
import HospitalsOverview from './pages/HospitalsOverview';
import FoodKitchenOverview from './pages/FoodKitchenOverview';
import ManagementAlerts  from './pages/ManagementAlerts';

// Admissions
import PGAdmissions      from './pages/PGAdmissions';
import MBBSAdmissions    from './pages/MBBSAdmissions';
import AlliedAdmissions  from './pages/AlliedAdmissions';
import NursingAdmissions from './pages/NursingAdmissions';

// Academics
import PGLogbook from './pages/PGLogbook';
import UGLogbook from './pages/UGLogbook';

// Finance
import ASRAMFinance from './pages/ASRAMFinance';
import ASRAMPay     from './pages/ASRAMPay';
import A1Finance    from './pages/A1Finance';

// Operations
import BiometricAttendance from './pages/BiometricAttendance';
import Hostels             from './pages/Hostels';
import TravelDesk          from './pages/TravelDesk';

export default function App() {
  const [activeModule, setActiveModule] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeModule={activeModule} onNavigate={setActiveModule} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar activeModule={activeModule} />
        <main style={{ flex: 1, overflow: 'auto' }}>
          {activeModule === null                   && <Landing onSelect={setActiveModule} />}
          {activeModule === 'dashboard'            && <PeriscopeDashboard onNavigate={setActiveModule} />}
          {activeModule === 'org-summary'          && <OrgSummary onNavigate={setActiveModule} />}
          {activeModule === 'management-alerts'    && <ManagementAlerts onNavigate={setActiveModule} />}
          {activeModule === 'colleges-overview'    && <CollegesOverview onNavigate={setActiveModule} />}
          {activeModule === 'hospitals-overview'   && <HospitalsOverview onNavigate={setActiveModule} />}
          {activeModule === 'food-kitchen'         && <FoodKitchenOverview onNavigate={setActiveModule} />}
          {activeModule === 'pg-admissions'        && <PGAdmissions />}
          {activeModule === 'mbbs-admissions'      && <MBBSAdmissions />}
          {activeModule === 'allied-admissions'    && <AlliedAdmissions />}
          {activeModule === 'nursing-admissions'   && <NursingAdmissions />}
          {activeModule === 'pg-logbook'           && <PGLogbook />}
          {activeModule === 'ug-logbook'           && <UGLogbook />}
          {activeModule === 'asram-finance'        && <ASRAMFinance />}
          {activeModule === 'asram-pay'            && <ASRAMPay />}
          {activeModule === 'a1-finance'           && <A1Finance />}
          {activeModule === 'biometric-attendance' && <BiometricAttendance />}
          {activeModule === 'hostels'              && <Hostels />}
          {activeModule === 'travel-desk'          && <TravelDesk />}
          {activeModule === 'research'             && <ResearchOverview />}
          {activeModule === 'indent'               && <IndentOverview />}
        </main>
      </div>
    </div>
  );
}
