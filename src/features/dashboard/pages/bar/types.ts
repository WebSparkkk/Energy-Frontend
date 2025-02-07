export enum BAR_ITEM_STATUS {
  PREPARING = "preparing",
  READY = "ready"
}

export type TBarItemStatus = `${BAR_ITEM_STATUS}`


export interface IBarItem {
  id: string,
  orderId: string,
  inventoryItemId: string,
  quantity: 1,
  status: TBarItemStatus,
  createdAt: string,
  updatedAt: string,
  inventoryItem: {
    id: string,
    name: string
  } 
}

export interface IMarkBarItemAsReadyPayload {
  orderId: string,
  inventoryItemId: string,
  quantity: number
}