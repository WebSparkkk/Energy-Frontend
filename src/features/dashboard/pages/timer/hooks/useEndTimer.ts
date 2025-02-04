import { useMutation, useQueryClient } from "react-query"
import { endTimerService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

export function useEndTimer () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,string>({
    mutationFn:(id) => endTimerService(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timers']
      })
      toast.success("تم إنهاء المؤقت بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنهاء المؤقت")
    }
  })
}