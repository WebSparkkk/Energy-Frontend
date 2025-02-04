import { useMutation, useQueryClient } from "react-query"
import { deleteReservationService } from "../services"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

export function useDeleteReservation () {

  const queryClient = useQueryClient()

  return useMutation<TResponse<any>, AxiosError<TResponse<unknown>>, string>({
    mutationFn: (reservationId) => deleteReservationService(reservationId),
    retry:0,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["reservations"]
      })
      toast.success("تم حذف الحجز بنجاح.")
    },
    onError:() => {
      toast.error("حدث خطأ، لا يمكن حذف الحجز.")
    }
  })
}