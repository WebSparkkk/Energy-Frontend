import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { IAdminUser, } from "../types"
import { getUsersService } from "../services"
import { AxiosError } from "axios"

export function useGetUsers () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<IAdminUser>, AxiosError<unknown>>({
    queryKey:['users', page, query],
    queryFn:() => getUsersService({ page, query }),
    retry: 0,
  })
  
  return {
    ...result,
    data: result.data?.data
  }
}