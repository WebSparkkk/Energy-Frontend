import { useMutation, useQueryClient } from "react-query"
import { payTimerService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IPayTimerPayload } from "../types"

type TPayload = {
  timerId: string,
  payload: IPayTimerPayload
}
export function usePayTimer () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,TPayload>({
    mutationFn:(payload) => payTimerService(payload),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['timers']
      })
      toast.success("تم دفع المؤقت بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن دفع المؤقت")
    }
  })
}