import { z } from 'zod';
import { RESERVATION_PAYMENT_METHODS } from './types';

export const createReservationSchema = z.object({
  room: z.object({
    label: z.string().min(1, { message: 'الرجاء توفير اسم الغرفة' }),
    value: z.string().min(1, { message: 'الرجاء توفير معرف الغرفة' }),
  }),
  client: z.object({
    label: z.string().min(1, { message: 'الرجاء توفير اسم العميل' }),
    value: z.string().min(1, { message: 'الرجاء توفير معرف العميل' }),
  }),
  fromDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'تاريخ البداية غير صالح',
  }),
  toDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'تاريخ النهاية غير صالح',
  }),
}).refine((data) => new Date(data.fromDate) < new Date(data.toDate), {
  path:["fromDate"],
  message: 'تاريخ البداية يجب أن يكون قبل تاريخ النهاية',
}).refine((data) => data.fromDate !== data.toDate, {
  path:["toDate"],
  message: 'تاريخ البداية لا يمكن أن يكون نفس تاريخ النهاية',
});


export const payReservationFormSchema = z.object({
  paymentMethod: z.object({
    label: z.string(),
    value: z.enum([
      RESERVATION_PAYMENT_METHODS.CASH,
      RESERVATION_PAYMENT_METHODS.VISA
    ],{
      message: "يرجى اختيار طريقة الدفع (نقدًا أو فيزا)." 
    })
  })
});