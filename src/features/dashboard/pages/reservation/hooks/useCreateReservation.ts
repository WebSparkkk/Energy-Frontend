import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { createReservationService } from "../services"
import { IReservationPayload } from "../types"

export function useCreateReservation () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, IReservationPayload>({
    mutationFn: (payload) => createReservationService(payload),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["reservations"]
      })
      toast.success("تم إنشاء الحجز بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن إنشاء الحجز.")
    }
  })
}