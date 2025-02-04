import { z } from "zod";
import { ROOM_STATUSES } from "./types";

export const createRoomSchema = z.object({
  name: z.string().min(1, { message: "الاسم مطلوب" }),
  status: z.object({
    label: z.string(),
    value: z.enum([
      ROOM_STATUSES.AVAILABLE,
      ROOM_STATUSES.NOT_AVAILABLE
    ])
  }, { message: "الحالة مطلوبة ويجب أن تكون متاحة أو غير متاحة" }),
  hourlyRate: z.string()
    .regex(/^\d+$/, { message: "السعر بالساعة يجب أن يكون رقماً" })
    .min(1, { message: "السعر بالساعة مطلوب ويجب أن يكون أكبر من 0" }),
  capacity: z.string()
    .regex(/^\d+$/, { message: "السعة يجب أن تكون رقماً" })
    .min(1, { message: "السعة مطلوبة ويجب أن تكون أكبر من 0" }),
});




export const editRoomSchema = z.object({
  name: z.string().min(1, { message: "الاسم مطلوب" }),
  status: z.object({
    label: z.string(),
    value: z.enum([
      ROOM_STATUSES.AVAILABLE,
      ROOM_STATUSES.NOT_AVAILABLE
    ])
  }, { message: "الحالة مطلوبة ويجب أن تكون متاحة أو غير متاحة" }),
  hourlyRate: z.string()
    .regex(/^\d+$/, { message: "السعر بالساعة يجب أن يكون رقماً" })
    .min(1, { message: "السعر بالساعة مطلوب ويجب أن يكون أكبر من 0" }),
  capacity: z.string()
    .regex(/^\d+$/, { message: "السعة يجب أن تكون رقماً" })
    .min(1, { message: "السعة مطلوبة ويجب أن تكون أكبر من 0" }),
});