import { useMutation, useQueryClient } from "react-query"
import { deleteOrderItemService } from "../services"
import toast from "react-hot-toast"
import { AxiosError } from "axios"


export function useDeleteOrderItem () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>, string>({
    mutationFn:(orderItemId) => deleteOrderItemService(orderItemId),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ["order_items"] })
      toast.success("تم حذف عنصر الطلب بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن حذف عنصر الطلب")
    }
  })
}