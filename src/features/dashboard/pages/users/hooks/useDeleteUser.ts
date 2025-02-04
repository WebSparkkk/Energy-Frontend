import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { deleteUserService } from "../services";
import toast from "react-hot-toast";

export function useDeleteUser () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, string>({
    mutationFn: (userId) => deleteUserService(userId),
    retry: 0,
    onSuccess:() => {
      toast.success("تم حذف المستخدم بنجاح")
      queryClient.invalidateQueries({
        queryKey:['users']
      })
    },
    onError:() => {
      toast.error("لا يمكن حذف المستخدم، حدث خطأ")
    }
  })
}