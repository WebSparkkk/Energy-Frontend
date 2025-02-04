import { useSearchParams } from "react-router-dom"
import { IRoom } from "../types"
import { useQuery } from "react-query"
import { AxiosError } from "axios"
import { getRoomsService } from "../services"

export function useGetRooms () {
  const [ searchParams ] = useSearchParams()
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<IRoom>, AxiosError<unknown>>({
    queryKey:['rooms', page, query],
    queryFn:() => getRoomsService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}