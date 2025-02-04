import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { IMemberPayload } from "../types"
import { createMemberService } from "../services"

export function useCreateMember () {
  const queryClient = useQueryClient()

  return useMutation<TResponse<{
    id: string,
    name: string,
    contactInfo: string,
    updatedAt: string,
    createdAt: string
  }>, AxiosError<TResponse<unknown>>, IMemberPayload>({
    mutationFn: (user) => createMemberService(user),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["members"]
      })
      toast.success("تم إنشاء المستخدم بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء المستخدم.")
    }
  })
}