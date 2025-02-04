import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { ITimerPaymentInfo } from "../types"
import { getTimerPaymentService } from "../services"

export function useGetTimerPayment (timerId: string) {
  
  const result = useQuery<TResponse<ITimerPaymentInfo>, AxiosError<unknown>>({
    queryKey:['timers', timerId],
    queryFn:() => getTimerPaymentService(timerId),
    retry: 0,
    enabled: Boolean(timerId)
  })

  return result 
}