import { IInventory } from "../inventory/types"
import { TPaymentMethod } from "../treasury/types"

export enum ORDER_PAYMENT_STATUSES {
  PENDING =   "PENDING",
  PAID =      "PAID",  
}

export enum ORDER_PAYMENT_METHODS {
  CASH = 'cash',
  VISA = 'visa'
}

export type TOrderPaymentStatus =`${ORDER_PAYMENT_STATUSES}`
export type TOrderPaymentMethod =`${ORDER_PAYMENT_METHODS}`

export interface IOrder {
  id: string,
  clientId: string,
  totalPrice: string,
  paymentStatus: TOrderPaymentStatus,
  createdAt: string,
  updatedAt: string,
  orderItems: {
    id: string,
    orderId: string,
    inventoryItemId: string,
    quantity: number,
    createdAt: string,
    updatedAt: string,
    inventoryItem: IInventory
  }[],
  client: {
    id: string,
    name: string
  }
}

export interface IOrderItemPayload {
  inventoryItemId : string,
  orderId: string,
  quantity : number
}

export interface IOrderPayload {
  clientId: string,
  orderItems : {
    inventoryItemId : string,
    quantity : number
  }[]
}


export interface IOrderPaymentPayload {
  paymentMethod: TPaymentMethod
}