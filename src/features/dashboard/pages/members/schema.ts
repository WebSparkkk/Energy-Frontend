import { z } from "zod";

export const memberFormSchema = z.object({
  name: z.string().min(1,"يجب ادخال اسم العضو"),
  contactInfo: z.string().min(1,"يجب ادخال بيانات التواصل"),
  // membership_type:  z.enum(["flexible","professional","corporate"],{
  //   required_error:"يجب اختيار نوع العضوية"
  // }),
  // start_date: z.string({
  //   required_error:"يجب اضافة التاريخ"
  // }),
  // status: z.enum(["active","inactive"],{
  //   required_error:"يجب اختيار الحالة"
  // }),
})