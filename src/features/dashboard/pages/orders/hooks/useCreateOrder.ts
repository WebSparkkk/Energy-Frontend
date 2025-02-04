import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IOrderPayload } from "../types"
import { createOrderService } from "../services"

export function useCreateOrder () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>, IOrderPayload>({
    mutationFn:(payload) => createOrderService(payload),
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

