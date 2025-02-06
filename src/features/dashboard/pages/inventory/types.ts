export enum INVENTORY_UNIT_TYPE {
  PIECE = "piece",
  GRAM = "gram", 
  KILOGRAM = "kilogram", 
  LITRE = "litre"
}

export type TInventoryUnitType = `${INVENTORY_UNIT_TYPE}`

export interface IInventory {
  id: string,
  name: string,
  supplierId: string,
  unitType: TInventoryUnitType,
  stockQuantity: string,
  unitBuyingPrice: string,
  totalBuyingPrice: string,
  sellingPricePerUnit: string,
  createdAt: string,
  updatedAt: string
}

export interface IInventoryItemPayload {
  name: string,
  supplierId: string,
  unitType: TInventoryUnitType,
  stockQuantity: number,
  totalBuyingPrice : number,
  sellingPricePerUnit: number
}

export interface IRestockInventoryItemPayload {
  supplierId: string,
  quantity: number,
  totalBuyingPrice: number
}

export interface IReturnInventoryItemPayload {
  supplierId: string,
  quantity: number,
  totalBuyingPrice: number
}