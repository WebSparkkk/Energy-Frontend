import { SPECIFIC_TYPES, TRANSACTION_TYPES } from "./types";

export const treasurySpecificTypes: {
  value: SPECIFIC_TYPES,
  label: string
}[] = [
  { value: SPECIFIC_TYPES.SALES, label: 'المبيعات' },
  { value: SPECIFIC_TYPES.SUPPLIERS_PAYMENT, label: 'مدفوعات الموردين' },
  { value: SPECIFIC_TYPES.SALARY_PAYMENT, label: 'دفع الرواتب' },
  { value: SPECIFIC_TYPES.RENT, label: 'الإيجار' },
  { value: SPECIFIC_TYPES.UTILITIES, label: 'المرافق' },
  { value: SPECIFIC_TYPES.MAINTENANCE, label: 'الصيانة' },
  { value: SPECIFIC_TYPES.TIMER, label: 'المؤقت' },
  { value: SPECIFIC_TYPES.ORDER, label: 'الطلب' },
  { value: SPECIFIC_TYPES.CASH_DEPOSIT, label: 'إيداع نقدي' },
  { value: SPECIFIC_TYPES.CASH_WITHDRAWAL, label: 'سحب نقدي' },
  { value: SPECIFIC_TYPES.OTHER, label: 'أخرى' },
];


export const treasuryTransactionTypes: { 
  value: TRANSACTION_TYPES; 
  label: string 
}[] = [
  { value: TRANSACTION_TYPES.EXPENSE, label: "مصروف" },
  { value: TRANSACTION_TYPES.INCOME, label: "إيراد" },  
];