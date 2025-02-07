import { TUserRole, USER_ROLES } from "@/features/auth/login/types";

export interface IAdminUser {
  id: string,
  username: string,
  email: string,
  password: string,
  role: `${USER_ROLES.ADMIN}`,
  balance: number,
  dailyRate: number,
  createdAt: string,
  updatedAt: string
}

export interface IUserPayload {
  username: string,
  email: string,
  password: string,
  role: TUserRole,
  dailyRate: number
}


export interface IEditUserPayload {
  username: string,
  email: string,
  password?: string,
  role: TUserRole,
  dailyRate: number
}
