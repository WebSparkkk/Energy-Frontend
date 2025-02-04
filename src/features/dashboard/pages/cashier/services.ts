import { httpService } from "@/core/lib/services"
import { IMember } from "../members/types"
import { IPaySessionPayload } from "./types"

export async function getActiveSessionsService({
  page,
  query
}: {
  page: number,
  query: string
}) {
  const res = await httpService.get(`/client/active?page=${page}&query=${query}`)
  return res.data
}

export async function getActiveSessionService(clientId: string) {
  const res = await httpService.get(`/client/active/${clientId}`)
  return res.data
} 

export async function fetchClientOptionsService(query: string) {
  const res = await httpService.get<TArrayResponse<IMember>>(`/client?limit=8&query=${query}&page=1`)
  const clients = res.data.data.data
  return clients.map(curr => ({
    label: curr.name,
    value: curr.id
  }))
}


export async function paySessionService({
  sessionId,
  payload
}:{
  sessionId: string,
  payload: IPaySessionPayload
}) {
  const res = await httpService.post(`/client/active/${sessionId}/pay`, payload)
  return res.data
}