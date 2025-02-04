import { useMutation, useQueryClient } from "react-query"
import { deleteSupplierService } from "../services"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export function useDeleteSupplier () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, string>({
    mutationFn: (supplierId) => deleteSupplierService(supplierId),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["suppliers"]
      })
      toast.success("تم حذف مورد بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن حذف مورد.")
    }
  })
}