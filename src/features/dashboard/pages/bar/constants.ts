import { TTagColorVariant } from "@/core/components/ui/tag";
import { BAR_ITEM_STATUS } from "./types";

export const barItemStatusAssets: Record<BAR_ITEM_STATUS,{
  label: string,
  color: TTagColorVariant
}> = {
  [BAR_ITEM_STATUS.PREPARING]: {
    label: "قيد التحضير",
    color: "yellow"
  },
  [BAR_ITEM_STATUS.READY]: {
    label: "جاهز",
    color: "green"
  },
}