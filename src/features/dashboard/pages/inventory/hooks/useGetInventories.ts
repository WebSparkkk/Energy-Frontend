import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { IInventory } from "../types"
import { AxiosError } from "axios"
import { getInventoriesService } from "../services"

export function useGetInventories () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<IInventory>, AxiosError<unknown>>({
    queryKey:['inventory', page, query],
    queryFn:() => getInventoriesService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}