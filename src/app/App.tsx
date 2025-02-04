import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthRoute } from '@/core/middlewares/auth-route';
import { Providers } from '@/core/providers';

import HomePage from '../features/home/HomePage';
import LoginPage from '../features/auth/login/Login';
import LogsPage from '@/features/dashboard/pages/activity-logs/LogsPage';
import MembersPage from '@/features/dashboard/pages/members/MembersPage';
import UsersPage from '@/features/dashboard/pages/users/UsersPage';
import CashierPage from '@/features/dashboard/pages/cashier/CashierPage';
import SettingsPage from '@/features/dashboard/pages/settings/SettingsPage';
import OrdersPage from '@/features/dashboard/pages/orders/OrdersPage';
import TimerPage from '@/features/dashboard/pages/timer/TimerPage';
import TreasuryPage from '@/features/dashboard/pages/treasury/TreasuryPage';
import SuppliersPage from '@/features/dashboard/pages/suppliers/SuppliersPage';
import InventoryPage from '@/features/dashboard/pages/inventory/InventoryPage';
import ReservationsPage from '@/features/dashboard/pages/reservation/ReservationsPage';
import RoomsPage from '@/features/dashboard/pages/rooms/RoomsPage';;
import Dashboard from '@/features/dashboard/dashboard';
import DashboardPage from '@/features/dashboard/dashboard-page/DashboardPage';
import RevenueAnalysisPage from '@/features/dashboard/pages/revenue-analysis/RevenueAnalysisPage';
import BarPage from '@/features/dashboard/pages/bar/BarPage';


function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route 
            path="/employer/signin" 
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
            
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route index path="" element={<DashboardPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="timers" element={<TimerPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="treasury" element={<TreasuryPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="cashier" element={<CashierPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="revenue" element={<RevenueAnalysisPage />} />
            <Route path="bar" element={<BarPage />} />
          </Route>

        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
