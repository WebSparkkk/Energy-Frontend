import { httpService } from "@/core/lib/services"
import { IInventoryItemPayload, IRestockInventoryItemPayload, IReturnInventoryItemPayload } from "./types"
import { ISupplier } from "../suppliers/types"

export async function getInventoriesService({
  query,
  page
}:{
  query: string,
  page: number
}) {
  const res = await httpService.get(`/inventory?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}


export async function deleteInventoryService(inventoryId: string) {
  const res = await httpService.delete(`/inventory/${inventoryId}`)
  return res.data
}


export async function createInventoryItemService(payload: IInventoryItemPayload) {
  const res = await httpService.post(`/inventory`, payload)
  return res.data
}

export async function fetchSuppliersOptions (query: string) {
  const res = await httpService.get<TArrayResponse<ISupplier>>(`/supplier?limit=8&query=${query}&page=1`)
  const suppliers = res.data.data.data
  return suppliers.map(curr => ({
    label: curr.name,
    value: curr.id
  }))
}

export async function restockInventoryItemService({
  inventoryId,
  inventoryItem
}:{
  inventoryId: string,
  inventoryItem: IRestockInventoryItemPayload
}) {
  const res = await httpService.put(`/inventory/${inventoryId}/stock`,inventoryItem)
  return res.data
}

export async function returnStockInventoryItemService({
  inventoryId,
  inventoryItem
}:{
  inventoryId: string,
  inventoryItem: IReturnInventoryItemPayload
}) {
  const res = await httpService.post(`/inventory/${inventoryId}/stock/return`,inventoryItem)
  return res.data
}