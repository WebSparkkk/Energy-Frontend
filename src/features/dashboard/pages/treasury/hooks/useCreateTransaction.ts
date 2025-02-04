import { useMutation, useQueryClient } from "react-query";
import { createTransactionService } from "../services";
import { AxiosError } from "axios";
import { ITransactionPayload } from "../types";
import toast from "react-hot-toast";

export function useCreateTransaction () {
  const queryClient = useQueryClient()
  
  return useMutation<TResponse<unknown>,AxiosError<unknown>, ITransactionPayload>({
    retry:0,
    mutationFn:(payload) => createTransactionService(payload),
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["treasury"]
      })
      toast.success("تم إنشاء المعاملة بنجاح")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء المعاملة.")
    }
  })
}