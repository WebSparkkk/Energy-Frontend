import { ITransaction } from "../treasury/types";

export interface IRevenueAnalysis {
  totalIncome: string,
  totalExpense: string,
  netProfit: string,
  treasuryRecords: ITransaction[]
}

export enum ANALYSIS_TRANSACTION_TYPES {
  INCOME = "income",
  EXPENSE = "expense",
  ALL = "all"
}

export enum ANALYSIS_SPECIFIC_TYPES {
  SALES = 'sales',
  SUPPLIERS_PAYMENT = 'suppliers payment', 
  SALARY_PAYMENT = 'salary payment',
  RENT = 'rent',
  UTILITIES = 'utilities',
  MAINTENANCE ='maintenance',
  TIMER = 'timer',
  ORDER = 'order',
  CASH_DEPOSIT = 'cash deposit',
  CASH_WITHDRAWAL = 'cash withdrawal',
  OTHER = 'other',
  ALL = "all"
}


export type TAnalysisTransactionType = `${ANALYSIS_TRANSACTION_TYPES}`
export type TAnalysisSpecificType = `${ANALYSIS_SPECIFIC_TYPES}`


