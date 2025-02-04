import { useMutation, useQueryClient } from "react-query"
import { createTimerService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { ITimerPayload } from "../types"

export function useCreateTimer () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>, ITimerPayload>({
    mutationFn:(payload) => createTimerService(payload),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timers']
      })
      toast.success("تم إنشاء المؤقت بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء المؤقت")
    }
  })
}