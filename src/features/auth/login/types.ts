export enum USER_ROLES {
  ADMIN = "ADMIN",
  CASHIER = "CASHIER",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  CHIEF = "CHIEF",
}

export type TUserRole = `${USER_ROLES}`

export interface ILoginPayload {
  username: string,
  password: string
}

export interface ILoginResponse {
  token: string,
  user: {
    id: string,
    username: string,
    email: string,
    password: string,
    role: TUserRole,
    balance: number,
    dailyRate: number,
    createdAt: string,
    updatedAt: string
  }
}

export interface ILocalUser {
  id: string,
  username: string,
  email: string,
}