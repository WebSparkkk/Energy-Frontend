import { z } from "zod";
import { ORDER_PAYMENT_METHODS } from "./types";

export const ORDER_ITEMS_MAX_LENGTH = 20

export const createOrderSchema = z.object({
  client: z.object({
    label: z.string().min(1, { message: "الاسم مطلوب" }),
    value: z.string().uuid(),
  }),
  orderItems: z.array(
    z.object({
      inventoryItem: z.object({
        label: z.string().min(1, { message: "الاسم مطلوب" }),
        value: z.string().uuid(),
      }),
      quantity: z
        .string()
        .regex(/^\d+$/, { message: "الكمية يجب أن تكون رقمًا صحيحًا" })
        .refine((val) => parseInt(val, 10) > 0, {
          message: "الكمية يجب أن تكون أكبر من 0",
        }),
    })
  )
  .min(1, { message: "يجب تحديد عنصر واحد على الأقل في الطلب" })
  .max(ORDER_ITEMS_MAX_LENGTH, { message: `يمكنك تحديد ما يصل إلى ${ORDER_ITEMS_MAX_LENGTH} عنصرًا فقط في الطلب` }),
});

export const payOrderFormSchema = z.object({
  paymentMethod: z.object({
    label: z.string(),
    value: z.enum([
      ORDER_PAYMENT_METHODS.CASH,
      ORDER_PAYMENT_METHODS.VISA
    ],{
      message: "يرجى اختيار طريقة الدفع (نقدًا أو فيزا)." 
    })
  })
});

export const createOrderItemSchema = z.object({
  inventoryItem: z.object({
    label: z.string().min(1, { message: "الاسم مطلوب" }),
    value: z.string().uuid(),
  }),
  quantity: z
    .string()
    .regex(/^\d+$/, { message: "الكمية يجب أن تكون رقمًا صحيحًا" })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "الكمية يجب أن تكون أكبر من 0",
    }),
})