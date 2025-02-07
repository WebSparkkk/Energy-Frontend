import { TTagColorVariant } from "@/core/components/ui/tag";
import { ROOM_STATUSES } from "./types";

export const roomStatusAssets: Record<ROOM_STATUSES,{
  label: string,
  color: TTagColorVariant
}> = {
  [ROOM_STATUSES.AVAILABLE]: {
    color: "green",
    label: "متاح"
  },
  [ROOM_STATUSES.NOT_AVAILABLE]: {
    color: "red",
    label: "غير متاح"
  },
}