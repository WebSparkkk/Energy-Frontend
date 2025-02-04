import { IOrder } from "../orders/types";
import { ITimer } from "../timer/types";

export enum CASHIER_PAYMENT_METHODS {
  CASH = 'cash',
  VISA = 'visa'
}

export type TCashierPaymentMethod = `${CASHIER_PAYMENT_METHODS}`

export interface ISession {
  id: string,
  name: string,
  contactInfo: string,
  createdAt: string,
  updatedAt: string,
  Timers: ITimer[],
  Orders: IOrder[]
}

export interface IPaySessionPayload {
  paymentMethod: TCashierPaymentMethod
}