import { useMutation, useQueryClient } from "react-query"
import { startTimerService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

export function useStartTimer () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,string>({
    mutationFn:(id) => startTimerService(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timers']
      })
      toast.success("تم بدء المؤقت بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن بدء المؤقت")
    }
  })
}