import { useMutation, useQueryClient } from "react-query"
import { createRoomService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IRoomPayload } from "../types"

export function useCreateRoom () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>, IRoomPayload>({
    mutationFn:(id) => createRoomService(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rooms']
      })
      toast.success("تم إنشاء الغرفة بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء الغرفة")
    }
  })
}