import { useQuery } from "react-query"
import { IReservation } from "../types"
import { AxiosError } from "axios"
import { getReservationService } from "../services"

export function useGetReservation (reservationId: string) {

  const result = useQuery<TResponse<IReservation>,AxiosError<unknown>>({
    queryKey:['reservations', reservationId],
    queryFn:() => getReservationService(reservationId),
    retry: 0,
    enabled: Boolean(reservationId)
  })

  return result
}