import { useMutation, useQueryClient } from "react-query"
import { deleteRoomService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

export function useDeleteRoom () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,string>({
    mutationFn:(id) => deleteRoomService(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rooms']
      })
      toast.success("تم حذف الغرفة بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن حذف الغرفة")
    }
  })
}