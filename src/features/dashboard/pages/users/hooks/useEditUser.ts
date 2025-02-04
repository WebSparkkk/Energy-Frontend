import { useMutation, useQueryClient } from "react-query"
import { editUserService } from "../services"
import { IUserPayload } from "../types"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

type TPayload = {
  userId: string,
  user: IUserPayload
}
export function useEditUser () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, TPayload>({
    mutationFn: (payload) => editUserService(payload),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["users"]
      })
      toast.success("تم تعديل المستخدم بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن تعديل المستخدم.")
    }
  })
}