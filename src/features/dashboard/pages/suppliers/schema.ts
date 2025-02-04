import { z } from "zod";

export const supplierFormSchema = z.object({
  name: z.string().nonempty({
    message: 'اسم المورد مطلوب.',
  }),
  responsibleName: z.string().nonempty({
    message: 'اسم المسؤول مطلوب.',
  }),
  phone: z.string().nonempty({
    message: 'رقم الهاتف مطلوب.',
  }),
  email: z.string().email({
    message: 'البريد الإلكتروني غير صالح.',
  }).nonempty({
    message: 'البريد الإلكتروني مطلوب.',
  }),
  niche: z.string().nonempty({
    message: 'الفئة أو الصناعة مطلوبة.',
  }),
  address: z.string().nonempty({
    message: 'العنوان مطلوب.',
  }),
});
