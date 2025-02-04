import { Card, CardContent } from '@/core/components/ui/card';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { TDashboardProviderValue, useDashboardProvider } from '../DashboardPage';
import { formatCurrency } from '@/core/lib/utils/currency';



export function DashboardStats() {

  const { statistics } = useDashboardProvider() as TDashboardProviderValue

  const { 
    clientStatistics: { 
      percentageGrowth: usersPercent, 
      totalUsers: usersValue 
    }, 
    reservationStatistics: {
      countThisMonth: reservationValue,
      growthPercentage: reservationPercentage
    }, 
    timerStatistics: {
      currentMonthCount: timerValue,
      percentageGrowth: timerPercent
    }, 
    treasuryStatistics: {
      growthPercentage: treasuryPercent,
      totalThisMonth: treasuryValue,
    }
  } = statistics

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      label: 'إجمالي الأعضاء',
      value: usersValue,
      change: Number(usersPercent).toFixed(0),
      changeType: Number(usersPercent) >= 0 ? 'increase' : 'decrease',
    },
    {
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      label: 'الإيرادات الشهرية',
      value: formatCurrency(treasuryValue),
      change: Number(treasuryPercent).toFixed(0),
      changeType: Number(treasuryPercent) >= 0 ? 'increase' : 'decrease',
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      label: 'الحجوزات النشطة',
      value: reservationValue,
      change: Number(reservationPercentage).toFixed(0),
      changeType: Number(reservationPercentage) >= 0 ? 'increase' : 'decrease',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      label: 'معدل الإشغال',
      value: timerValue,
      change: Number(timerPercent).toFixed(0),
      changeType: Number(timerPercent) >= 0 ? 'increase' : 'decrease',
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-gray-50">{stat.icon}</div>
              <span className={`text-sm ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.change}</span>
                <span>%</span>
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}