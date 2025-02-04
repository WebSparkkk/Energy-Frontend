import AnalysisFilters from '@/features/dashboard/pages/revenue-analysis/components/AnalysisFilters';
import RevenueAnalysisResults from './components/RevenueAnalysisResults';
import { RevenueCharts } from './components/RevenueCharts';
import { useGetRevenueAnalysis } from './hooks/useGetRevenueAnalysis';
import Spinner from '@/core/components/ui/spinner';
import { createContext, useContext } from 'react';
import { IRevenueAnalysis } from './types';
import UiError from '@/core/components/ui/error';

type TRevenueAnalysisProviderValue = IRevenueAnalysis

const RevenueAnalysisContext = createContext<TRevenueAnalysisProviderValue|undefined>(undefined)

export function useRevenueAnalysisProvider() {
  if (RevenueAnalysisContext === undefined)
    throw new Error("Cannot Use useRevenueAnalysisProvider Outside RevenueAnalysisPage")
  return useContext(RevenueAnalysisContext)
}

export default function RevenueAnalysisPage() {

  const { data, isLoading, error } = useGetRevenueAnalysis()
  const analysisData = data?.data

  return (
    <RevenueAnalysisContext.Provider
      value={analysisData}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">التحليل المالي</h1>
          <p className="text-gray-600">تحليل تفصيلي للإيرادات والمصروفات</p>
        </div>
        <div className="flex flex-col gap-6">
          <AnalysisFilters/>
          { error && <UiError>{error.message}</UiError>}
          {
            !isLoading ? (
              <div className="flex flex-col gap-6">
                <RevenueCharts/>
                <RevenueAnalysisResults/>
              </div> 
            ) : (
              <div className="w-full h-full flex items-center">
                <Spinner/>
              </div>
            )
          }
        </div>   
      </div>
    </RevenueAnalysisContext.Provider>
  );
}