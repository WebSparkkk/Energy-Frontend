import { TTagColorVariant } from "@/core/components/ui/tag";
import { INVENTORY_UNIT_TYPE } from "./types";

export const inventoryUnitTypeAssets: Record<INVENTORY_UNIT_TYPE,{
  color: TTagColorVariant,
  label: string
}> = {
  [INVENTORY_UNIT_TYPE.GRAM]: {
    color: "blue",
    label: "Gram",
  },
  [INVENTORY_UNIT_TYPE.KILOGRAM]: {
    color: "purple",
    label: "KG",
  },
  [INVENTORY_UNIT_TYPE.LITRE]: {
    color: "orange",
    label: "Litre",
  },
  [INVENTORY_UNIT_TYPE.PIECE]: {
    color: "green",
    label: "Piece",
  },
}