import { useMutation, useQueryClient } from "react-query"
import { pauseTimerService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

export function usePauseTimer () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,string>({
    mutationFn:(id) => pauseTimerService(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timers']
      })
      toast.success("تم إيقاف المؤقت بنجاح")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إيقاف المؤقت")
    }
  })
}