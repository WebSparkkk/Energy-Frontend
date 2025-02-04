import { ANALYSIS_SPECIFIC_TYPES, ANALYSIS_TRANSACTION_TYPES } from "./types";

export const analysisTransactionTypes: { 
  value: ANALYSIS_TRANSACTION_TYPES; 
  label: string 
}[] = [
  { value: ANALYSIS_TRANSACTION_TYPES.EXPENSE, label: "مصروف" },
  { value: ANALYSIS_TRANSACTION_TYPES.INCOME, label: "إيراد" },  
  { value: ANALYSIS_TRANSACTION_TYPES.ALL, label: "الكل" },  
];

export const analysisSpecificTypes: {
  value: ANALYSIS_SPECIFIC_TYPES,
  label: string
}[] = [
  { value: ANALYSIS_SPECIFIC_TYPES.SALES, label: 'المبيعات' },
  { value: ANALYSIS_SPECIFIC_TYPES.SUPPLIERS_PAYMENT, label: 'مدفوعات الموردين' },
  { value: ANALYSIS_SPECIFIC_TYPES.SALARY_PAYMENT, label: 'دفع الرواتب' },
  { value: ANALYSIS_SPECIFIC_TYPES.RENT, label: 'الإيجار' },
  { value: ANALYSIS_SPECIFIC_TYPES.UTILITIES, label: 'المرافق' },
  { value: ANALYSIS_SPECIFIC_TYPES.MAINTENANCE, label: 'الصيانة' },
  { value: ANALYSIS_SPECIFIC_TYPES.TIMER, label: 'المؤقت' },
  { value: ANALYSIS_SPECIFIC_TYPES.ORDER, label: 'الطلب' },
  { value: ANALYSIS_SPECIFIC_TYPES.CASH_DEPOSIT, label: 'إيداع نقدي' },
  { value: ANALYSIS_SPECIFIC_TYPES.CASH_WITHDRAWAL, label: 'سحب نقدي' },
  { value: ANALYSIS_SPECIFIC_TYPES.OTHER, label: 'أخرى' },
  { value: ANALYSIS_SPECIFIC_TYPES.ALL, label: 'الكل' },
];