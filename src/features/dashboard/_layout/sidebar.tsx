import { Link, useLocation } from 'react-router-dom';
import { 
  PieChart, 
  Users, 
  Package2, 
  ShoppingCart,
  Clock,
  Settings,
  LogOut,
  UserCog,
  DollarSign,
  Truck,
  Wallet,
  ScrollText,
  BarChart3,
  DoorClosed,
  CalendarDays,
  X,
  ChefHat
} from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { Button } from '@/core/components/ui/button';
import { useLogout } from '@/core/hooks/useLogout';
import { useAuth } from '@/core/providers/auth-provider';
import { useLayoutEffect, useState } from 'react';
import { USER_ROLES } from '@/features/auth/login/types';

interface DashboardSidebarProps {
  onClose: () => void;
}

const cashierRoutes = [
  { icon: <PieChart className="h-5 w-5" />, label: 'لوحة التحكم', path: '/dashboard' },
  { icon: <DollarSign className="h-5 w-5" />, label: 'الكاشير', path: '/dashboard/cashier' },
  { icon: <Users className="h-5 w-5" />, label: 'الأعضاء', path: '/dashboard/members' },
  { icon: <DoorClosed className="h-5 w-5" />, label: 'الغرف', path: '/dashboard/rooms' },
  { icon: <CalendarDays className="h-5 w-5" />, label: 'الحجوزات', path: '/dashboard/reservations' },
  { icon: <Package2 className="h-5 w-5" />, label: 'المخزون', path: '/dashboard/inventory' },
  { icon: <ShoppingCart className="h-5 w-5" />, label: 'الطلبات', path: '/dashboard/orders' },
  { icon: <Clock className="h-5 w-5" />, label: 'المؤقتات', path: '/dashboard/timers' },
  { icon: <Truck className="h-5 w-5" />, label: 'الموردين', path: '/dashboard/suppliers' },
  { icon: <Wallet className="h-5 w-5" />, label: 'الخزينة', path: '/dashboard/treasury' },
  { icon: <ScrollText className="h-5 w-5" />, label: 'السجلات', path: '/dashboard/logs' },
  { icon: <ChefHat className="h-5 w-5" />, label: 'المطبخ', path: '/dashboard/bar' },
]

const adminRoutes = [
  { icon: <BarChart3 className="h-5 w-5" />, label: 'تحليل الإيرادات', path: '/dashboard/revenue' },
  { icon: <UserCog className="h-5 w-5" />, label: 'المستخدمين', path: '/dashboard/users' },
  { icon: <Settings className="h-5 w-5" />, label: 'الإعدادات', path: '/dashboard/settings' },
];

export function DashboardSidebar({ onClose }: DashboardSidebarProps) {

  const { userRole } = useAuth()
  const location = useLocation();
  const { logout } = useLogout()

  const [routes,setRoutes] = useState<typeof cashierRoutes>(cashierRoutes)

  useLayoutEffect(() => {
    if (userRole === USER_ROLES.ADMIN)
      setRoutes(prev => [...prev,...adminRoutes])
  },[userRole])

  return (
    <div className="flex flex-col bg-white">
      {/* Close button for mobile */}
      <div className="lg:hidden p-4">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <PieChart className="h-6 w-6 text-secondary-600" />
          <span className="text-xl font-bold text-secondary-800">Energy</span>
        </div>
      </div>

      <nav className="p-4 overflow-auto h-[82.5vh]">
        <ul>
          {routes.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-secondary-50 transition-colors",
                  location.pathname === item.path && "bg-secondary-50 text-secondary-600"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-secondary-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}