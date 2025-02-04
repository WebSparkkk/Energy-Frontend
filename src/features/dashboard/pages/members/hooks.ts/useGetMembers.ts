import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { ITableMember } from "../types"
import { getMembersService } from "../services"
import { AxiosError } from "axios"

export function useGetMembers() {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<ITableMember>,AxiosError<unknown>>({
    queryKey:['members', page, query],
    queryFn:() => getMembersService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}