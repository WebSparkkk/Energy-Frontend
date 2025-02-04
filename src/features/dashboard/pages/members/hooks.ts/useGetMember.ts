import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { getMemberService } from "../services"
import { IMember } from "../types"

export function useGetMember (memberId: string) {
  const result = useQuery<TResponse<IMember>, AxiosError<unknown>>({
    queryKey:['members', memberId],
    queryFn:() => getMemberService(memberId),
    retry: 0,
  })

  return result
}