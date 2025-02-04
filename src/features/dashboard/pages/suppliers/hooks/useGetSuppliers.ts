import { useSearchParams } from "react-router-dom"
import { getSuppliersService } from "../services"
import { ISupplier } from "../types"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export function useGetSuppliers() {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<ISupplier>,AxiosError<unknown>>({
    queryKey:['suppliers', page, query],
    queryFn:() => getSuppliersService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}