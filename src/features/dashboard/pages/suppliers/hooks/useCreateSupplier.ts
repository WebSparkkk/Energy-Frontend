import { useMutation, useQueryClient } from "react-query"
import { createSupplierService } from "../services"
import { AxiosError } from "axios"
import { ISupplierPayload } from "../types"
import toast from "react-hot-toast"

export function useCreateSupplier () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, ISupplierPayload>({
    mutationFn: (supplier) => createSupplierService(supplier),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["suppliers"]
      })
      toast.success("تم إنشاء مورد بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء مورد.")
    }
  })
}