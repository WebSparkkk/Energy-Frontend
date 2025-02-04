import { httpService } from "@/core/lib/services"
import { IPayReservationPayload, IReservationPayload } from "./types"
import { IRoom } from "../rooms/types"
import { IMember } from "../members/types"

export async function getReservationsService({
  page, 
  query
}:{
  page: number,
  query?: string
}) {
  const res = await httpService.get(`/reservation?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}

export async function getReservationService(reservationId: string) {
  const res = await httpService.get(`/reservation/${reservationId}`)
  return res.data
}


export async function createReservationService(payload: IReservationPayload) {
  const res = await httpService.post(`/reservation`,payload)
  return res.data
}

export async function deleteReservationService(reservationId: string) {
  const res = await httpService.delete(`/reservation/${reservationId}`)
  return res.data
}

export async function payReservationService({
  reservationId,
  payload
}:{
  reservationId: string,
  payload: IPayReservationPayload
}) {
  const res = await httpService.post(`/reservation/${reservationId}/pay`,payload)
  return res.data
}




export async function fetchRoomsOptionsService(query: string) {
  const res = await httpService.get<TArrayResponse<IRoom>>(`/room?limit=8&query=${query}&page=1`)
  const rooms = res.data.data.data
  return rooms.map(curr => ({
    label: curr.name,
    value: curr.id
  }))
}


export async function fetchClientOptionsService(query: string) {
  const res = await httpService.get<TArrayResponse<IMember>>(`/client?limit=8&query=${query}&page=1`)
  const clients = res.data.data.data
  return clients.map(curr => ({
    label: curr.name,
    value: curr.id
  }))
}