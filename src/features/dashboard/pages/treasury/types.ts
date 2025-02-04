export enum SPECIFIC_TYPES {
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
  OTHER = 'other' 
}

export enum PAYMENT_METHODS {
  CASH = "cash",
  VISA = "visa"
}

export enum TRANSACTION_TYPES {
  INCOME = "income",
  EXPENSE = "expense"
}

export enum TREASURY_MACHINE_OPERATION {
  CASH_DEPOSIT = 'cash deposit',
  CASH_WITHDRAWAL = 'cash withdrawal',
}


export type TSpecificType = `${SPECIFIC_TYPES}`
export type TPaymentMethod = `${PAYMENT_METHODS}`
export type TTransactionType = `${TRANSACTION_TYPES}`
export type TTreasuryMachineOperation = `${TREASURY_MACHINE_OPERATION}`

export interface ITransaction {
  id: string,
  transactionType: TTransactionType,
  specificType: TSpecificType,
  amount: string,
  description: string,
  date: string,
  reconciliationDate: null,
  balanceAfterTransaction: string,
  cashInMachineBefore: string,
  cashInMachineAfter: string,
  paymentMethod: TPaymentMethod,
  createdAt: string,
  updatedAt: string
}


export interface ITreasuryInfo {
  currentBalance: {
    cashInMachine: number,
    todayVisaIncome: number,
    total: number
  },
  todayAnalytic: {
    income: number,
    expenses: number,
    profit: number
  }
}

export interface ITransactionPayload {
  transactionType: TTransactionType,
  amount: string,
  specificType: TSpecificType,
  description: string,
  paymentMethod: TPaymentMethod,
  adminUserId?: string,
  supplierId?: string
}

export interface IMakeTransactionPayload {
  amount: number,
  specificType: TTreasuryMachineOperation
}