import { useSearchParams } from "react-router-dom"
import { IOrder } from "../types"
import { AxiosError } from "axios"
import { getOrdersService } from "../services"
import { useQuery } from "react-query"

export function useGetOrders () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<IOrder>,AxiosError<unknown>>({
    queryKey:['orders', page, query],
    queryFn:() => getOrdersService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}
