import { useAuth } from "@/core/providers/auth-provider"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { IUserProfilePayload } from "../types"
import { updateUserProfileService } from "../services"

export function useChangeProfileSettings () {
  
  const queryClient = useQueryClient()
  const auth = useAuth()
  const user = auth.user

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, IUserProfilePayload>({
    mutationFn: (payload) => updateUserProfileService({
      payload: payload,
      userId: user?.id || ""
    }),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["users"]
      })
      toast.success("تم تغيير بيانات ملف المستخدم بنجاح")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن تغيير بيانات ملف المستخدم")
    }
  })
}