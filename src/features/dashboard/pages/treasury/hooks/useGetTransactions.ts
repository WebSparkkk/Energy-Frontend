import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { ITransaction } from "../types"
import { getTransactionsService } from "../services"

export function useGetTransactions () {
  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  const result = useQuery<TArrayResponse<ITransaction>, AxiosError<unknown>>({
    queryKey:['treasury',"transactions", page, query],
    queryFn:() => getTransactionsService({ page, query }),
    retry: 0,
  })

  return {
    ...result,
    data: result.data?.data
  }
}
