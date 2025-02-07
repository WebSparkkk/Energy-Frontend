import { useMutation, useQueryClient } from "react-query"
import { editUserService } from "../services"
import { IEditUserPayload } from "../types"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

type TPayload = {
  userId: string,
  user: IEditUserPayload
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