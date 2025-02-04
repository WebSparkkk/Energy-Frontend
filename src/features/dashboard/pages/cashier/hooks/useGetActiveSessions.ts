import { useSearchParams } from "react-router-dom"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { getActiveSessionsService } from "../services"
import { ISession } from "../types"

export function useGetActiveSessions () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TResponse<ISession[]>,AxiosError<unknown>>({
    queryKey:['sessions', page, query],
    queryFn:() => getActiveSessionsService({ page, query }),
    retry: 0,
  })

  return result
}
