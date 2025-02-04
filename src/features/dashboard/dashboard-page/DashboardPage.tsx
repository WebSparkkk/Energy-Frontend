import { createContext, useContext } from "react"
import { IDashboardInfos } from "./types"
import { useGetDashboardData } from "./useGetDashboardData"
import UiError from "@/core/components/ui/error" 
import Spinner from "@/core/components/ui/spinner"
import { RecentLogs } from "./components/RecentLogs"
import RevenueChart from "./components/Charts"
import { DashboardStats } from "./components/Stats"


export type TDashboardProviderValue = IDashboardInfos

const DashboardContext = createContext<TDashboardProviderValue | undefined>(undefined)

export function useDashboardProvider () {
  if (DashboardContext === undefined)
    throw new Error("Cannot Use useDashboardProvider Outside DashboardPage")
  return useContext(DashboardContext)
}

function DashboardPage() {
  
  const { data, isLoading, error } = useGetDashboardData()
  const dashboardInfos = data?.data

  if (isLoading) return (
    <div className="w-full h-full flex items-center">
      <Spinner/>
    </div>
  )
  if (error) return <UiError>{error.message}</UiError>
  if (!dashboardInfos) return <UiError>لا توجد بيانات لعرضها في لوحة التحكم.</UiError>

  return (
    <DashboardContext.Provider 
      value={{ ...dashboardInfos }}
    >
      <div className="w-full h-full bg-white p-5 rounded-lg">
        <DashboardStats/>
        <div className="w-full flex gap-10 h-[65vh]">
          <RevenueChart/>
          <RecentLogs/>
        </div>
      </div>
    </DashboardContext.Provider>
  )
}

export default DashboardPage