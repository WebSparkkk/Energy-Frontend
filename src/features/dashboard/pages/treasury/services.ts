import { httpService } from "@/core/lib/services"
import { IMakeTransactionPayload, ITransactionPayload } from "./types"
import { ISupplier } from "../suppliers/types"
import { IAdminUser } from "../users/types"

export async function getTransactionsService({
  page,
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/treasury?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}

export async function getTreasuryInfoService() {
  const res = await httpService.get(`/treasury/info`)
  return res.data
}

export async function createTransactionService(payload: ITransactionPayload) {
  const res = await httpService.post(`/treasury`,payload)
  return res.data
}

export async function makeTreasuryOperationService(payload: IMakeTransactionPayload) {
  const res = await httpService.post(`/treasury/cash`,payload)
  return res.data
}

export async function getTransactionService(transactionId: string) {
  const res = await httpService.get(`/treasury/${transactionId}`)
  return res.data
}

export async function fetchSuppliersOptions (query: string) {
  const res = await httpService.get<TArrayResponse<ISupplier>>(`/supplier?size=8&query=${query}&page=1`)
  const suppliers = res.data.data.data
  return suppliers.map(curr => ({
    label: curr.name,
    value: curr.id
  }))
}

export async function fetchAdminUsersOptions (query: string) {
  const res = await httpService.get<TArrayResponse<IAdminUser>>(`/admin-users?size=8&query=${query}&page=1`)
  const suppliers = res.data.data.data
  return suppliers.map(curr => ({
    label: curr.username,
    value: curr.id
  }))
}