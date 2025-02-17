import { USER_ROLES } from "@/features/auth/login/types";
import { z } from "zod";

export const userFormSchema = z.object({
  username: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }),
  role: z.object({
    value: z.enum([
      USER_ROLES.ADMIN,
      USER_ROLES.CASHIER,
      USER_ROLES.EMPLOYEE,
      USER_ROLES.MANAGER,
      USER_ROLES.CHIEF
    ]),
    label: z.string()
  },{
    message: "الرجاء اختيار دور المستخدم"
  }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف" }),
  dailyRate: z.string().min(1, { message: "التقييم اليومي يجب أن يكون أكبر من أو يساوي 0" }),
});


export const editUserFormSchema = z.object({
  username: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }),
  role: z.object({
    value: z.enum([
      USER_ROLES.ADMIN,
      USER_ROLES.CASHIER,
      USER_ROLES.EMPLOYEE,
      USER_ROLES.MANAGER,
      USER_ROLES.CHIEF
    ]),
    label: z.string()
  },{
    message: "الرجاء اختيار دور المستخدم"
  }),
  password: z.string().optional().refine(value => true),
  dailyRate: z.string().min(1, { message: "التقييم اليومي يجب أن يكون أكبر من أو يساوي 0" }),
});
