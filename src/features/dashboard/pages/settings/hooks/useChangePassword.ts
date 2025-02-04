import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { IResetPasswordPayload } from "../types"
import { resetPasswordService } from "../services"
import { useAuth } from "@/core/providers/auth-provider"
import { AxiosError } from "axios"


export function useChangePassword () {

  const auth = useAuth()
  const user = auth.user

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, IResetPasswordPayload>({
    mutationFn: (payload) => resetPasswordService({
      payload: payload,
      userId: user?.id || ""
    }),
    retry:0,
    onSuccess:() => {
      toast.success("تم تغيير كلمة المرور بنجاح")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن تغيير كلمة مرور المستخدم")
    }
  })
}