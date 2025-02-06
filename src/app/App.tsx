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
import ProtectedRoute from '@/core/middlewares/protected-route';
import { USER_ROLES } from '@/features/auth/login/types';


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
            
            <Route 
              path="members" element={
                <ProtectedRoute 
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <MembersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="rooms" 
              element={
                <ProtectedRoute 
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <RoomsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="timers" 
              element={
                <ProtectedRoute
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <TimerPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="suppliers" 
              element={
                <ProtectedRoute
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <SuppliersPage />
                </ProtectedRoute>   
              } 
            />
            <Route 
              path="treasury" 
              element={
                <ProtectedRoute
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <TreasuryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="inventory" 
              element={
                <ProtectedRoute
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <InventoryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="logs" 
              element={
                <ProtectedRoute
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <LogsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="reservations"
              element={
                <ProtectedRoute
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <ReservationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="orders" 
              element={
                <ProtectedRoute
                    redirectTo='/dashboard'
                    roles={[
                      USER_ROLES.ADMIN, 
                      USER_ROLES.CASHIER
                    ]} 
                  >
                    <OrdersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="cashier" 
              element={
                <ProtectedRoute
                  redirectTo='/dashboard'
                  roles={[
                    USER_ROLES.ADMIN, 
                    USER_ROLES.CASHIER
                  ]} 
                >
                  <CashierPage />
                </ProtectedRoute>
              } 
            />

          
            <Route 
              path="revenue" 
              element={
                <ProtectedRoute roles={[USER_ROLES.ADMIN]} redirectTo='/dashboard'>
                  <RevenueAnalysisPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="settings" 
              element={
                <ProtectedRoute roles={[USER_ROLES.ADMIN]} redirectTo='/dashboard'>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="users" 
              element={
                <ProtectedRoute roles={[USER_ROLES.ADMIN]} redirectTo='/dashboard'>
                  <UsersPage />
                </ProtectedRoute>
              } 
            />
            

            <Route path="bar" element={<BarPage />} />
          </Route>

        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
