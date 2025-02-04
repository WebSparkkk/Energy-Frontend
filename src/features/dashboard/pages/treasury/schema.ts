import { z } from 'zod';
import { PAYMENT_METHODS, SPECIFIC_TYPES, TRANSACTION_TYPES, TREASURY_MACHINE_OPERATION } from './types';

export const transactionSchema = z.object({
  transactionType: z.object({
    label: z.string(),
    value: z.enum([
      TRANSACTION_TYPES.EXPENSE,
      TRANSACTION_TYPES.INCOME,
    ])
  }, {
    required_error: 'نوع المعاملة مطلوب.',
    invalid_type_error: 'نوع المعاملة يجب أن يكون إما "income" أو "expense".',
  }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'المبلغ يجب أن يكون رقماً صالحاً.',
  }).nonempty({
    message: 'المبلغ مطلوب.',
  }),
  specificType: z.object({
    label: z.string(),
    value: z.enum([
      SPECIFIC_TYPES.CASH_DEPOSIT,
      SPECIFIC_TYPES.CASH_WITHDRAWAL,
      SPECIFIC_TYPES.MAINTENANCE,
      SPECIFIC_TYPES.ORDER,
      SPECIFIC_TYPES.OTHER,
      SPECIFIC_TYPES.RENT,
      SPECIFIC_TYPES.SALARY_PAYMENT,
      SPECIFIC_TYPES.SALES,
      SPECIFIC_TYPES.SUPPLIERS_PAYMENT,
      SPECIFIC_TYPES.TIMER,
      SPECIFIC_TYPES.UTILITIES
    ])
  }, {
    required_error: 'النوع المحدد مطلوب.',
    invalid_type_error: 'النوع المحدد غير صالح.',
  }),
  description: z.string().nonempty({
    message: 'الوصف مطلوب.',
  }),
  paymentMethod: z.object({
    label: z.string(),
    value: z.enum([
      PAYMENT_METHODS.CASH,
      PAYMENT_METHODS.VISA
    ])
  }, {
    required_error: 'طريقة الدفع مطلوبة.',
    invalid_type_error: 'طريقة الدفع غير صالحة.',
  }),

  user: z.object({
    label: z.string(),
    value: z.string(),
  }).or(z.null()),

  supplier: z.object({
    label: z.string(),
    value: z.string(),
  }).or(z.null()),

}).refine((data) => {
  const specificType = data.specificType.value;
  return specificType !== SPECIFIC_TYPES.SALARY_PAYMENT || data.user;
}, {
  message: 'يجب تحديد العميل عند اختيار نوع المعاملة "راتب".',
  path: ['user'],  
}).refine((data) => {
  const specificType = data.specificType.value;
  return specificType !== SPECIFIC_TYPES.SUPPLIERS_PAYMENT || data.supplier;
}, {
  message: 'يجب تحديد المورد عند اختيار نوع المعاملة "موردين".',
  path: ['supplier'],
});



export const treasuryOperationSchema = z.object({
  specificType: z.object({
    label: z.string(),
    value: z.enum([
      TREASURY_MACHINE_OPERATION.CASH_DEPOSIT,
      TREASURY_MACHINE_OPERATION.CASH_WITHDRAWAL,
    ])
  }, {
    required_error: 'نوع المعاملة مطلوب.',
    invalid_type_error: 'نوع المعاملة يجب أن يكون إما "income" أو "expense".',
  }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'المبلغ يجب أن يكون رقماً صالحاً.',
  }).nonempty({
    message: 'المبلغ مطلوب.',
  }),
});
