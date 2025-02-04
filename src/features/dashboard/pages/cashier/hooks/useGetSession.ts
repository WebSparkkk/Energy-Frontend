import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { getActiveSessionService } from "../services"
import { ISession } from "../types"

export function useGetActiveSession (clientId: string) {

  const result = useQuery<TResponse<ISession>,AxiosError<unknown>>({
    queryKey:['sessions', clientId],
    queryFn:() => getActiveSessionService(clientId),
    retry: 0,
  })

  return result
}
