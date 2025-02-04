import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IOrderPaymentPayload } from "../types"
import { payOrderItemService } from "../services"

type TPayload = {
  orderId: string,
  payload: IOrderPaymentPayload
}

export function usePayOrder () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>, TPayload>({
    mutationFn:(payload) => payOrderItemService(payload),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
      toast.success("تم إنشاء الطلب بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء الطلب")
    }
  })
}