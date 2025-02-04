import { useMutation, useQueryClient } from "react-query"
import { editSupplierService } from "../services"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { ISupplierPayload } from "../types"

type TPayload = {
  supplierId: string,
  supplier: ISupplierPayload
}
export function useEditSupplier () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, TPayload>({
    mutationFn: (payload) => editSupplierService(payload),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["suppliers"]
      })
      toast.success("تم تعديل مورد بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن تعديل مورد.")
    }
  })
}