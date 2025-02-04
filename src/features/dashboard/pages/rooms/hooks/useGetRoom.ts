import { useQuery } from "react-query"
import { IRoom } from "../types"
import { AxiosError } from "axios"
import { getRoomService } from "../services"

export function useGetRoom (roomId: string) {

  const result = useQuery<TResponse<IRoom>, AxiosError<unknown>>({
    queryKey:['rooms', roomId],
    queryFn:() => getRoomService(roomId),
    retry: 0,
  })

  return result
}