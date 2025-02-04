import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { restockInventoryItemService } from "../services"
import { IRestockInventoryItemPayload } from "../types"

type TPayload = {
  inventoryId: string,
  inventoryItem: IRestockInventoryItemPayload
}
export function useRestockInventoryItem() {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,TPayload>({
    mutationFn:(payload) => restockInventoryItemService(payload),
    retry: 0,
    onSuccess:() => {
      toast.success("تم إعادة التوريد عنصر المخزون بنجاح")
      queryClient.invalidateQueries({
        queryKey:['inventory']
      })
    },
    onError:() => {
      toast.error("لا يمكن إعادة التوريد عنصر المخزون حدث خطأ")
    }
  })
}