import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { IUserPayload } from "../types"
import { createUserService } from "../services"
import toast from "react-hot-toast"

export function useCreateUser () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, IUserPayload>({
    mutationFn: (user) => createUserService(user),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["users"]
      })
      toast.success("تم إنشاء المستخدم بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء المستخدم.")
    }
  })
}