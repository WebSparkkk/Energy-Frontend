import { TUserRole } from "@/features/auth/login/types"

export enum LOG_ACTIONS {
  USER_LOGIN = "USER_LOGIN",

  ORDERED = "ORDERED",
  ORDER_PAID = "ORDER_PAID",
  ORDER_DELETED = "ORDER_DELETED",

  SESSION_STARTED = "SESSION_STARTED",
  SESSION_ENDED = "SESSION_ENDED",
  SESSION_PAID = "SESSION_PAID",
  SESSION_DELETED = "SESSION_DELETED",

  RESERVATION = "RESERVATION",
  RESERVATION_PAID = "RESERVATION_PAID",
  RESERVATION_DELETED = "RESERVATION_DELETED",
}

export type TLogAction = `${LOG_ACTIONS}`

export interface ILog {
  id: string,
  userId: string,
  action: TLogAction,
  details: string,
  createdAt: string,
  updatedAt: string,
  AdminUser: {
    id: string,
    username: string,
    role: TUserRole
  }
}