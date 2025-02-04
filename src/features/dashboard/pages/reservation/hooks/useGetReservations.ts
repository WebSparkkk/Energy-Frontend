import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { IReservation } from "../types"
import { AxiosError } from "axios"
import { getReservationsService } from "../services"

export function useGetReservations () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<IReservation>,AxiosError<unknown>>({
    queryKey:['reservations', page, query],
    queryFn:() => getReservationsService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}