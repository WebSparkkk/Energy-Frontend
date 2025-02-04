import { httpService } from "@/core/lib/services"
import { IMarkBarItemAsReadyPayload } from "./types"

export async function getOrderItemsService({
  page,
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/order/item?page=${page}${query ? `query=${query}` : ""}`)
  return res.data
}


export async function markOrderItemAsReadyService({ barItemId, payload }: {
  payload: IMarkBarItemAsReadyPayload,
  barItemId: string
}) {
  const res = await httpService.put(`/order/item/${barItemId}`,payload)
  return res.data
}