import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteMemberService } from "../services";

export function useDeleteMember () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, string>({
    mutationFn: (userId) => deleteMemberService(userId),
    retry: 0,
    onSuccess:() => {
      toast.success("تم حذف العضو بنجاح")
      queryClient.invalidateQueries({
        queryKey:['members']
      })
    },
    onError:() => {
      toast.error("لا يمكن حذف العضو، حدث خطأ")
    }
  })
}