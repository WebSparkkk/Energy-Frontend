import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useRevenueAnalysisProvider } from '../RevenueAnalysisPage';
import { formatCurrency } from '@/core/lib/utils/currency';

export function RevenueCharts() {

  const result = useRevenueAnalysisProvider()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>الإيرادات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-100 rounded-lg">
              <ArrowDownRight className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {
                  result?.totalIncome ?
                  formatCurrency(Number(result.totalIncome)) : "-"
                }
              </div>
              <div className="text-sm text-gray-500">إجمالي الإيرادات</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>المصروفات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-100 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {
                  result?.totalExpense ?
                  formatCurrency(Number(result.totalExpense)) : "-"
                }             
              </div>
              <div className="text-sm text-gray-500">إجمالي المصروفات</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>صافي الربح</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArrowDownRight className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {
                  result?.netProfit ?
                  formatCurrency(Number(result.netProfit)) : "-"
                }                           
              </div>
              <div className="text-sm text-gray-500">الإيرادات - المصروفات</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

