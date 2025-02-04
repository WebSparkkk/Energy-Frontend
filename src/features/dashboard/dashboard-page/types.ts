import { ILog } from "../pages/activity-logs/types"
import { ITransaction } from "../pages/treasury/types"

export interface IDashboardInfos {
  statistics: {
    clientStatistics: {
      totalUsers: number,
      percentageGrowth: string
    },
    treasuryStatistics: {
      totalThisMonth: number,
      totalLastMonth: number,
      growthPercentage: string
    },
    reservationStatistics: {
      countThisMonth: number,
      countLastMonth: number,
      growthPercentage: string
    },
    timerStatistics: {
      currentMonthCount: number,
      lastMonthCount: number,
      percentageGrowth: string
    }
  },
  transactions: ITransaction[],
  history: ILog[]
}