import { useQuery } from "react-query"
import { IOrder } from "../types"
import { AxiosError } from "axios"
import { getOrderService } from "../services"

export function useGetOrder (orderId: string) {

  const result = useQuery<TResponse<IOrder>,AxiosError<unknown>>({
    queryKey:['orders', orderId],
    queryFn:() => getOrderService(orderId),
    retry: 0,
    enabled: Boolean(orderId)
  })

  return result
}