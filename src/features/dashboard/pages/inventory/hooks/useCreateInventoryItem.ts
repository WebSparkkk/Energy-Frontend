import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { IInventoryItemPayload } from "../types"
import toast from "react-hot-toast"
import { createInventoryItemService } from "../services"

export function useCreateInventoryItem () {
  const queryClient = useQueryClient()
  
  return useMutation<TResponse<unknown>,AxiosError<unknown>, IInventoryItemPayload>({
    retry:0,
    mutationFn:(payload) => createInventoryItemService(payload),
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["inventory"]
      })
      toast.success("تم إنشاء عنصر المخزون بنجاح")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء عنصر المخزون.")
    }
  })
}