import { TTagColorVariant } from "@/core/components/ui/tag";
import { RESERVATION_PAYMENT_STATUSES } from "./types";

export const reservationStatusAssets: Record<RESERVATION_PAYMENT_STATUSES,{
  color: TTagColorVariant,
  label: string
}> = {
  [RESERVATION_PAYMENT_STATUSES.PAID]: {
    label: "مدفوع",
    color: "green"
  },
  [RESERVATION_PAYMENT_STATUSES.PENDING]: {
    label: "قيد الانتظار",
    color: "yellow"
  },
} 