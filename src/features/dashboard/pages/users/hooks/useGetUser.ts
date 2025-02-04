import { useQuery } from "react-query"
import { getUserService } from "../services"
import { AxiosError } from "axios"
import { IAdminUser } from "../types"

export function useGetUser (userId: string) {
  const result = useQuery<TResponse<IAdminUser>, AxiosError<unknown>>({
    queryKey:['users', userId],
    queryFn:() => getUserService(userId),
    retry: 0,
  })

  return result
}