import { useMutation, useQueryClient } from "react-query"
import { createOrderItemService } from "../services"
import { IOrderItemPayload } from "../types"
import toast from "react-hot-toast"
import { AxiosError } from "axios"


export function useCreateOrderItem () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>, IOrderItemPayload>({
    mutationFn:(payload) => createOrderItemService(payload),
    retry: 0,
    onSuccess: (_,payload) => {
      queryClient.invalidateQueries({
        queryKey: ['orders', payload.orderId]
      })
      toast.success("تم إنشاء عنصر الطلب بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء عنصر الطلب")
    }
  })
}