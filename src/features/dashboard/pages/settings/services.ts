import { httpService } from "@/core/lib/services"
import { IResetPasswordPayload, IUserProfilePayload } from "./types"

export async function resetPasswordService({ payload, userId }: {
  payload: IResetPasswordPayload,
  userId: string
}) {
  const res = await httpService.post(`/admin-users/profile/${userId}`,payload)
  return res.data
}

export async function updateUserProfileService({ payload, userId }: {
  payload: IUserProfilePayload,
  userId: string
}) {
  const res = await httpService.put(`/admin-users/profile/${userId}`,payload)
  return res.data
}