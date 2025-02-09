import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useGetTreasuryInfo } from '../hooks/useGetTreasuryInfo';
import Spinner from '@/core/components/ui/spinner';
import Error from '@/core/components/ui/error';
import { formatCurrency } from '@/core/lib/utils/currency';
import { BsCash } from 'react-icons/bs';

export default function TransactionStats() {

  const { data, isLoading, error } = useGetTreasuryInfo()

  const info = data?.data
  const analysis = info?.todayAnalytic

  return (
    <Card className='mt-6 flex-1'>
      <CardHeader>
        <CardTitle>إحصائيات اليوم</CardTitle>
      </CardHeader>
      <CardContent>
        {
          !isLoading ? (
            error ? <Error>{error.message}</Error> : (
              <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium">الإيرادات</span>
                </div>
                <span className="font-bold text-green-600">
                  {
                    typeof analysis?.income === "number" ?
                    formatCurrency(analysis.income) :
                    <></>
                  }
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="font-medium">المصروفات</span>
                </div>
                <span className="font-bold text-red-600">
                  {
                    typeof analysis?.expenses === "number" ?
                    formatCurrency(analysis.expenses) :
                    <></>
                  }
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <BsCash className="h-5 w-5 text-secondary-600" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">الربح</span>
                </div>
                {
                  typeof analysis?.profit === "number" && (
                    <span className={`font-bold text-secondary-600`}>
                      {formatCurrency(analysis.profit)}
                    </span>
                  )
                }
              </div>
            </div>
            )
          ) : <Spinner/>
        }
      </CardContent>
    </Card>
  );
}