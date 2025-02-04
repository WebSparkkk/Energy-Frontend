import { useMutation, useQueryClient } from "react-query"
import { editRoomService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IRoomPayload } from "../types"

type TPayload = {
  roomId: string,
  payload: IRoomPayload
}

export function useEditRoom () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>, TPayload>({
    mutationFn:(id) => editRoomService(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rooms']
      })
      toast.success("تم تعديل الغرفة بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن تعديل الغرفة")
    }
  })
}