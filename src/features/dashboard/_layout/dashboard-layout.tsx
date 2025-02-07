import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './header';
import { DashboardSidebar } from './sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative bg-gray-50 flex">
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10'
        }`} 
        onClick={() => setSidebarOpen(false)} 
      />

      <div className={`fixed inset-y-0 right-0 z-20 w-64 bg-white transform transition-transform lg:transform-none lg:relative ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="h-screen w-full flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}