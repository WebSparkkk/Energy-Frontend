import { z } from "zod";
import { TIMER_PAYMENT_METHODS } from "./types";

export const payTimerFormSchema = z.object({
  paymentMethod: z.object({
    label: z.string(),
    value: z.enum([
      TIMER_PAYMENT_METHODS.CASH,
      TIMER_PAYMENT_METHODS.VISA
    ],{
      message: "يرجى اختيار طريقة الدفع (نقدًا أو فيزا)." 
    })
  })
});

export const createTimerFormSchema = z.object({
  client: z.object({
    label: z.string(),
    value: z.string()
  }, {
    message: "يرجى اختيار العميل"
  }),
  hourlyRate: z.string({
    required_error: "يرجى إدخال السعر بالساعة" 
  }).min(1, { message: "يرجى إدخال السعر بالساعة" })
})