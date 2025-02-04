import { useMutation, useQueryClient } from "react-query";
import { makeTreasuryOperationService } from "../services";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IMakeTransactionPayload } from "../types";

export function useMakeMachineTransaction () {
  const queryClient = useQueryClient()
  
  return useMutation<TResponse<unknown>,AxiosError<unknown>,IMakeTransactionPayload>({
    retry:0,
    mutationFn:(payload) => makeTreasuryOperationService(payload),
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