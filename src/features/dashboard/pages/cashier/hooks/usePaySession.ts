import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { paySessionService } from "../services"
import { IPaySessionPayload } from "../types"
import { AxiosError } from "axios"

type TPayload = {
  payload: IPaySessionPayload,
  sessionId: string
}

export function usePaySession () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, TPayload>({
    mutationFn: (payload) => paySessionService(payload),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      toast.success("تم دفع الجلسة بنجاح")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن دفع الجلسة")
    }
  })
}