import { z } from "zod";

export const resetPasswordFormSchema = z.object({
  old_password: z.string().min(6, "يجب أن تكون كلمة المرور القديمة مكونة من 6 أحرف على الأقل."),
  new_password: z.string().min(6, "يجب أن تكون كلمة المرور الجديدة مكونة من 6 أحرف على الأقل."),
  confirm_new_password: z.string().min(6, "يجب أن تكون كلمة تأكيد كلمة المرور مكونة من 6 أحرف على الأقل."),
}).refine((data) => data.new_password === data.confirm_new_password, {
  message: "كلمات المرور غير متطابقة.",
  path: ["confirm_new_password"],
});


export const changeUserProfileSchema = z.object({
  email: z
    .string()
    .email("يجب أن يكون البريد الإلكتروني صالحًا."),
  username: z
    .string()
    .min(3, "يجب أن يكون اسم المستخدم مكونًا من 3 أحرف على الأقل.")
    .max(20, "يجب ألا يتجاوز اسم المستخدم 20 حرفًا."),
});
