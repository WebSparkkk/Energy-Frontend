import { IMember } from "../members/types"
import { IRoom } from "../rooms/types"

export enum RESERVATION_PAYMENT_STATUSES {
  PENDING = "PENDING",
  PAID = "PAID",
}

export enum RESERVATION_PAYMENT_METHODS {
  CASH = 'cash',
  VISA = 'visa'
}

export type TReservationPaymentStatus = `${RESERVATION_PAYMENT_STATUSES}`
export type TReservationPaymentMethods = `${RESERVATION_PAYMENT_METHODS}`

export interface IReservation {
  id:                 string,
  roomId:             string,
  clientId:           string,
  fromDate:           string,
  toDate:             string,
  paymentStatus:      TReservationPaymentStatus,
  totalCost:          string,
  updated_at:         string,
  created_at:         string,
  Client: IMember,
  Room: IRoom
}

export interface IReservationPayload {
  roomId: string,
  clientId: string,
  fromDate: string,
  toDate: string
}

export interface IPayReservationPayload {
  paymentMethod: TReservationPaymentMethods
}