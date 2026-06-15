import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopBar from '../components/AdminTopBar';
import StatisticsCards from '../components/StatisticsCards';
import ArmadaTable from '../components/ArmadaTable';
import QuickActions from '../components/QuickActions';
import BeritaTerbaru from '../components/BeritaTerbaru';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#fcf8ff]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-[280px] flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <AdminTopBar />

        {/* Page Content */}
        <main className="p-10 space-y-6">
          {/* Statistics Cards */}
          <StatisticsCards />

          {/* Bottom Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Armada Table (spans 2 cols) */}
            <ArmadaTable />

            {/* Right Column */}
            <div className="space-y-6">
              <QuickActions />
              <BeritaTerbaru />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
