import { z } from "zod";
import { INVENTORY_UNIT_TYPE } from "./types";

export const inventoryFormSchema =  z.object({
  name: z.string().nonempty({
    message: "اسم العنصر مطلوب.",
  }),
  supplier: z.object({
    label: z.string(),
    value: z.string()
  },{
    required_error: "معرّف المورد غير صالح.",
  }),
  unitType: z.object({
    label: z.string(),
    value: z.enum([
      INVENTORY_UNIT_TYPE.GRAM,
      INVENTORY_UNIT_TYPE.KILOGRAM,
      INVENTORY_UNIT_TYPE.LITRE,
      INVENTORY_UNIT_TYPE.PIECE
    ])
  }, {
    required_error: "نوع الوحدة مطلوب.",
    invalid_type_error: "نوع الوحدة غير صالح. يجب أن يكون 'piece' أو 'kg' أو 'liter'.",
  }),
  stockQuantity: z
    .string()
    .regex(/^\d+$/, {
      message: "كمية المخزون يجب أن تكون عدداً صحيحاً.",
    })
    .nonempty({
      message: "كمية المخزون مطلوبة.",
    }),
  totalBuyingPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "إجمالي سعر الشراء يجب أن يكون رقماً صالحاً.",
    })
    .nonempty({
      message: "إجمالي سعر الشراء مطلوب.",
    }),
  sellingPricePerUnit: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "سعر بيع الوحدة يجب أن يكون رقماً صالحاً.",
    })
    .nonempty({
      message: "سعر بيع الوحدة مطلوب.",
    }),
});


export const restockFormSchema = z.object({
  supplier: z
    .object({
      label: z.string().nonempty({ message: "اسم المورد مطلوب." }),
      value: z
        .string()
        .nonempty({ message: "معرف المورد مطلوب." }),
    }),
  quantity: z
    .string()
    .regex(/^\d+$/, { message: "الكمية يجب أن تكون رقماً صالحاً." })
    .nonempty({ message: "الكمية مطلوبة." }),
  totalBuyingPrice: z
    .string()
    .regex(/^\d+$/, { message: "إجمالي سعر الشراء يجب أن يكون رقماً صالحاً." })
    .nonempty({ message: "إجمالي سعر الشراء مطلوب." }),
});

export const returnStockFormSchema = z.object({
  supplier: z
    .object({
      label: z.string().nonempty({ message: "اسم المورد مطلوب." }),
      value: z
        .string()
        .nonempty({ message: "معرف المورد مطلوب." }),
    }),
  quantity: z
    .string()
    .regex(/^\d+$/, { message: "الكمية يجب أن تكون رقماً صالحاً." })
    .nonempty({ message: "الكمية مطلوبة." }),
  totalBuyingPrice: z
    .string()
    .regex(/^\d+$/, { message: "إجمالي سعر الشراء يجب أن يكون رقماً صالحاً." })
    .nonempty({ message: "إجمالي سعر الشراء مطلوب." }),
});