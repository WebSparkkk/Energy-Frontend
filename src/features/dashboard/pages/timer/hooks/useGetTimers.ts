import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { getTimersService } from "../services"
import { ITimer } from "../types"

export function useGetTimers () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""
  
  const result = useQuery<TArrayResponse<ITimer>, AxiosError<unknown>>({
    queryKey:['timers', page, query],
    queryFn:() => getTimersService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}