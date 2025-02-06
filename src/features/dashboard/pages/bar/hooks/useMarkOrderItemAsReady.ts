import { useMutation, useQueryClient } from "react-query";
import { markOrderItemAsReadyService } from "../services";
import { IMarkBarItemAsReadyPayload } from "../types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type TPayload = {
  barItemId: string,
  payload: IMarkBarItemAsReadyPayload
}

export function useMarkOrderItemAsReady () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<unknown>,AxiosError<unknown>,TPayload>({
    mutationFn: markOrderItemAsReadyService,
    onSuccess: () => {
      toast.success("تم تجهيز عنصر الطلب بنجاح")
      queryClient.invalidateQueries({
        queryKey: ['order_items']
      })
    },
    onError: () => {
      toast.error("حدث خطأ، لا يمكن تجهيز عنصر الطلب")
    }
  })
}