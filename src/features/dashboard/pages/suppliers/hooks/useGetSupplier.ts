import { useQuery } from "react-query"
import { getSupplierService } from "../services"
import { ISupplier } from "../types"
import { AxiosError } from "axios"

export function useGetSupplier (supplierId: string) {
  const result = useQuery<TResponse<ISupplier>, AxiosError<unknown>>({
    queryKey:['suppliers', supplierId],
    queryFn:() => getSupplierService(supplierId),
    retry: 0,
  })

  return result
}