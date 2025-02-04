import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Wallet, CreditCard, PiggyBank } from 'lucide-react';
import { useGetTreasuryInfo } from '../hooks/useGetTreasuryInfo';
import Error from '@/core/components/ui/error';
import Spinner from '@/core/components/ui/spinner';
import { formatCurrency } from '@/core/lib/utils/currency';

export default function TreasuryBalance() {

  const { data, isLoading, error } = useGetTreasuryInfo()
  
  const info = data?.data
  const balance = info?.currentBalance

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>الرصيد الحالي</CardTitle>
      </CardHeader>
      <CardContent>
        { error && <Error>{error.message}</Error> }
        {
          !isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-secondary-600" />
                </div>
                <span className="font-medium">نقدي</span>
              </div>
              <span className="font-bold">
                { 
                  typeof balance?.cashInMachine === "number" ?
                  formatCurrency(balance?.cashInMachine) :
                  <></>
                }
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-secondary-600" />
                </div>
                <span className="font-medium">بنكي</span>
              </div>
              <span className="font-bold">
                {
                  typeof balance?.todayVisaIncome === "number" ?
                  formatCurrency(balance?.todayVisaIncome) :
                  <></>
                }
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <PiggyBank className="h-5 w-5 text-secondary-600" />
                </div>
                <span className="font-medium">الإجمالي</span>
              </div>
              <span className="font-bold text-secondary-600">
                {
                  typeof balance?.total === "number" ?
                  formatCurrency(balance?.total) :
                  <></>
                }
              </span>
            </div>
          </div>
          ) : <Spinner/>
        }
      </CardContent>
    </Card>
  );
}

