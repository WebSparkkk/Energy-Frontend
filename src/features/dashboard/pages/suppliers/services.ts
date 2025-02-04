import { httpService } from "@/core/lib/services";
import { ISupplierPayload } from "./types";

export async function getSuppliersService({
  page,
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/supplier?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}

export async function getSupplierService(supplierId: string) {
  const res = await httpService.get(`/supplier/${supplierId}`)
  return res.data
}

export async function deleteSupplierService(supplierId: string) {
  const res = await httpService.delete(`/supplier/${supplierId}`)
  return res.data
}

export async function editSupplierService({
  supplierId,
  supplier
}:{
  supplierId: string,
  supplier: ISupplierPayload
}) {
  const res = await httpService.put(`/supplier/${supplierId}`,supplier)
  return res.data
}


export async function createSupplierService(supplier: ISupplierPayload) {
  const res = await httpService.post(`/supplier`,supplier)
  return res.data
}

