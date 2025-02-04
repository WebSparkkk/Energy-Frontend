import { httpService } from "@/core/lib/services"
import { IRoomPayload } from "./types"

export async function getRoomsService({
  page, 
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/room?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}

export async function deleteRoomService(roomId: string) {
  const res = await httpService.delete(`/room/${roomId}`)
  return res.data
}

export async function createRoomService(payload: IRoomPayload) {
  const res = await httpService.post(`/room`,payload)
  return res.data
}

export async function getRoomService(roomId: string) {
  const res = await httpService.get(`/room/${roomId}`)
  return res.data
}

export async function editRoomService({
  roomId,
  payload
}:{
  roomId: string,
  payload: IRoomPayload
}) {
  const res = await httpService.put(`/room/${roomId}`,payload)
  return res.data
}