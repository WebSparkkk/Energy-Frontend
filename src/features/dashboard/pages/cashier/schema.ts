import { z } from "zod";
import { memberFormSchema } from "../members/schema";
import { createTimerFormSchema } from "../timer/schema";
import { CASHIER_PAYMENT_METHODS } from "./types";

export const createSessionWithNewMemberSchema = z.object({
  hourlyRate: z.string({
    required_error: "يرجى إدخال السعر بالساعة" 
  }).min(1, { message: "يرجى إدخال السعر بالساعة" })
}).merge(memberFormSchema)


export const createSessionWithExistingMemberSchema = createTimerFormSchema

export const paySessionFormSchema = z.object({
  paymentMethod: z.object({
    label: z.string(),
    value: z.enum([
      CASHIER_PAYMENT_METHODS.CASH,
      CASHIER_PAYMENT_METHODS.VISA
    ],{
      message: "يرجى اختيار طريقة الدفع (نقدًا أو فيزا)." 
    })
  })
});
