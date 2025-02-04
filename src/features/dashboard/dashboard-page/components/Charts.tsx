import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { TDashboardProviderValue, useDashboardProvider } from '../DashboardPage';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';

export default function Chart() {

  const { transactions } = useDashboardProvider() as TDashboardProviderValue

  const transactionsAmounts = transactions.map(curr => Number(curr.balanceAfterTransaction))
  const transactionsDates = transactions.map((curr) => new Date(curr.createdAt).getTime()); 
  const width = (window.innerWidth * 0.8) / 1.75
  const [chartWidth, setChartWidth] = useState<number>(width); 

  useEffect(() => {
    const handleResize = () => {
      const width = (window.innerWidth * 0.8) / 1.75
      setChartWidth(width); 
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Card className="w-3/5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>الإيرادات اليومية</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-secondary-500" />
            <span className="text-sm text-gray-600">الإيرادات</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-secondary-200" />
            <span className="text-sm text-gray-600">الطلبات</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <LineChart
          xAxis={[{ 
            data: transactionsDates,
            scaleType: 'time', 
            valueFormatter: (value) => new Date(value).toLocaleDateString('ar-EG'), 
          }]}
          series={[{ 
            data: transactionsAmounts, 
            color: "var(--secondary-500)",
            curve: 'natural',
          }]}
          width={chartWidth}
          height={500}
        />
      </CardContent>
    </Card>
  );
}