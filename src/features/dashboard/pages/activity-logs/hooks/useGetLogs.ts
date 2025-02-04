import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { ILog } from "../types"
import { getLogsService } from "../services"

export function useGetLogs () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<ILog>,AxiosError<unknown>>({
    queryKey:['logs', page, query],
    queryFn:() => getLogsService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}