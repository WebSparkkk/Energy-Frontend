import { useMutation, useQueryClient } from "react-query"
import { deleteOrderService } from "../services"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export function useDeleteOrder () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,string>({
    mutationFn:(id) => deleteOrderService(id),
    retry: 0,
    onSuccess:() => {
      toast.success("تم حذف الطلب بنجاح")
      queryClient.invalidateQueries({
        queryKey:['orders']
      })
    },
    onError:() => {
      toast.error("لا يمكن حذف الطلب حدث خطأ")
    }
  })
}