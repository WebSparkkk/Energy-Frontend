import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { IMemberPayload } from "../types"
import { editMemberService } from "../services"

type TPayload = {
  member: IMemberPayload,
  memberId: string
}
export function useEditMember () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, TPayload>({
    mutationFn: (payload) => editMemberService(payload),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["members"]
      })
      toast.success("تم تعديل المستخدم بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن تعديل المستخدم.")
    }
  })
}