import { useMutation, useQueryClient } from "react-query"
import { deleteTimerService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

export function useDeleteTimer () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,string>({
    mutationFn:(id) => deleteTimerService(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timers']
      })
      toast.success("تم حذف المؤقت بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن حذف المؤقت")
    }
  })
}