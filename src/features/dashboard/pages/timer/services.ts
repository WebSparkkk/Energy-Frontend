import { httpService } from "@/core/lib/services"
import { IPayTimerPayload, ITimerPayload } from "./types"
import { ITableMember } from "../members/types"

export async function getTimersService({
  page, 
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/timer?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}

export async function startTimerService(timerId: string) {
  const res = await httpService.post(`/timer/${timerId}/start`)
  return res.data
}

export async function endTimerService(timerId: string) {
  const res = await httpService.post(`/timer/${timerId}/end`)
  return res.data
}

export async function pauseTimerService(timerId: string) {
  const res = await httpService.post(`/timer/${timerId}/pause`)
  return res.data
}

export async function deleteTimerService(timerId: string) {
  const res = await httpService.delete(`/timer/${timerId}`)
  return res.data
}

export async function payTimerService({
  timerId,
  payload
}:{
  timerId: string,
  payload: IPayTimerPayload
}) {
  const res = await httpService.post(`/timer/${timerId}/pay`, payload)
  return res.data
}

export async function fetchClientsOptions(query: string) {
  const res = await httpService.get<TArrayResponse<ITableMember>>(`/client?limit=8&query=${query}&page=1`)
  const clients = res.data.data.data
  return clients.map(curr => ({
    label: curr.name,
    value: curr.id,
  }))
}

export async function createTimerService(payload: ITimerPayload) {
  const res = await httpService.post(`/timer`,payload)
  return res.data
}

export async function getTimerPaymentService(timerId: string) {
  const res = await httpService.get(`/timer/${timerId}/price`)
  return res.data
}
