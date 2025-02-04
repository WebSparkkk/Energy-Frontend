import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { returnStockInventoryItemService } from "../services"
import { IReturnInventoryItemPayload } from "../types"

type TPayload = {
  inventoryId: string,
  inventoryItem: IReturnInventoryItemPayload
}
export function useReturnInventoryStockItem() {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,TPayload>({
    mutationFn:(payload) => returnStockInventoryItemService(payload),
    retry: 0,
    onSuccess:() => {
      toast.success("تم إرجاع عنصر المخزون بنجاح")
      queryClient.invalidateQueries({
        queryKey:['inventory']
      })
    },
    onError:() => {
      toast.error("لا يمكن إرجاع عنصر المخزون حدث خطأ")
    }
  })
}