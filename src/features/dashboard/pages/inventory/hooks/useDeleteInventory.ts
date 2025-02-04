import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { deleteInventoryService } from "../services";

export function useDeleteInventoryItem () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,string>({
    mutationFn:(id) => deleteInventoryService(id),
    retry: 0,
    onSuccess:() => {
      toast.success("تم حذف عنصر المخزون بنجاح")
      queryClient.invalidateQueries({
        queryKey:['inventory']
      })
    },
    onError:() => {
      toast.error("لا يمكن حذف عنصر المخزون حدث خطأ")
    }
  })
}