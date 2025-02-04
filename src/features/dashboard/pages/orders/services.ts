import { httpService } from "@/core/lib/services"
import { IMember } from "../members/types"
import { IInventory } from "../inventory/types"
import { IOrderItemPayload, IOrderPayload, IOrderPaymentPayload } from "./types"

export async function getOrdersService({
  page,
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/order?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}


export async function deleteOrderService(orderId: string) {
  const res = await httpService.delete(`/order/${orderId}`)
  return res.data
}


export async function getOrderService(orderId: string) {
  const res = await httpService.get(`/order/${orderId}`)
  return res.data
}

export async function createOrderService(payload: IOrderPayload) {
  const res = await httpService.post(`/order`,payload)
  return res.data
}


export async function createOrderItemService(payload: IOrderItemPayload) {
  const res = await httpService.post(`/order/item`,payload)
  return res.data
}

export async function deleteOrderItemService(orderItemId: string) {
  const res = await httpService.delete(`/order/item/${orderItemId}`)
  return res.data
}

export async function payOrderItemService({
  orderId,
  payload
}:{
  orderId: string,
  payload: IOrderPaymentPayload
}) {
  const res = await httpService.post(`/order/${orderId}/pay`,payload)
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


export async function fetchInventoryOptionsService(query: string) {
  const res = await httpService.get<TArrayResponse<IInventory>>(`/inventory?limit=8&query=${query}&page=1`)
  const inventories = res.data.data.data
  return inventories.map(curr => ({
    label: curr.name,
    value: curr.id
  }))
}