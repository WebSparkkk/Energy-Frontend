import { TTagColorVariant } from "@/core/components/ui/tag";
import { INVENTORY_UNIT_TYPE } from "./types";

export const inventoryUnitTypeAssets: Record<INVENTORY_UNIT_TYPE,{
  color: TTagColorVariant,
  label: string
}> = {
  [INVENTORY_UNIT_TYPE.GRAM]: {
    color: "blue",
    label: "جرام",
  },
  [INVENTORY_UNIT_TYPE.KILOGRAM]: {
    color: "purple",
    label: "كيلو غرام",
  },
  [INVENTORY_UNIT_TYPE.LITRE]: {
    color: "orange",
    label: "لتر",
  },
  [INVENTORY_UNIT_TYPE.PIECE]: {
    color: "green",
    label: "قطعة",
  },
}