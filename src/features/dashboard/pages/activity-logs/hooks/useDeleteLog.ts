import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteLogService } from "../services";

export function useDeleteLog () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, string>({
    mutationFn: (userId) => deleteLogService(userId),
    retry: 0,
    onSuccess:() => {
      toast.success("تم حذف السجل بنجاح")
      queryClient.invalidateQueries({
        queryKey:['logs']
      })
    },
    onError:() => {
      toast.error("لا يمكن حذف السجل، حدث خطأ")
    }
  })
}