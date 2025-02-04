import { httpService } from "@/core/lib/services"
import { IUserPayload } from "./types"

export async function getUsersService ({
  page,
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/admin-users?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}

export async function getUserService (userId: string) {
  const res = await httpService.get(`/admin-users/${userId}`)
  return res.data
}


export async function editUserService ({
  user,
  userId
}:{
  userId: string, 
  user: IUserPayload
}) {
  const res = await httpService.put(`/admin-users/${userId}`, user)
  return res.data
}

export async function deleteUserService(userId: string) {
  const res = await httpService.delete(`/admin-users/${userId}`)
  return res.data
}


export async function createUserService(userPayload: IUserPayload) {
  const res = await httpService.post(`/admin-users`,userPayload)
  return res.data
}