import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { payReservationService } from "../services"
import { IPayReservationPayload } from "../types"

type TPayload = {
  reservationId: string,
  payload: IPayReservationPayload
}

export function usePayReservation () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, TPayload>({
    mutationFn: (payload) => payReservationService(payload),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["reservations"]
      })
      toast.success("تم دفع الحجز بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن دفع الحجز.")
    }
  })
}