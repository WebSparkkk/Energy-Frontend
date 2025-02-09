import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { TDashboardProviderValue, useDashboardProvider } from '../DashboardPage';
import ApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';

export default function Chart() {

  const { transactions } = useDashboardProvider() as TDashboardProviderValue

  const transactionsAmounts = transactions.map(curr => Number(curr.balanceAfterTransaction))
  const transactionsDates = transactions.map((curr) => {
    const date = new Date(curr.createdAt);
    return date.toLocaleDateString('ar-EG', {
      weekday: 'short', 
      year: 'numeric', 
      month: 'short',
      day: 'numeric', 
    });
  }); 
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
      </CardHeader>
      <CardContent className='flex justify-center'>
        <ApexChart
          width={chartWidth}
          height={500}
          type='area'
          series={[{
            color: "var(--secondary-500)",
            data: transactionsAmounts,
          }]}
          options={{
            colors: ["var(--secondary-500)", "transparent"],
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'category',
              categories: transactionsDates
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}