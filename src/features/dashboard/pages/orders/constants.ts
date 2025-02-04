import { TTagColorVariant } from "@/core/components/ui/tag";
import { ORDER_PAYMENT_STATUSES } from "./types";

export const orderStatusAssets:Record<ORDER_PAYMENT_STATUSES,{
  label: string,
  color: TTagColorVariant
}> = {
  [ORDER_PAYMENT_STATUSES.PAID]: {
    color: "green",
    label: "مدفوع"
  },
  [ORDER_PAYMENT_STATUSES.PENDING]: {
    color: "yellow",
    label: "قيد الانتظار"
  },
}