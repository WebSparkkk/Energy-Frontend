import PaymentReceipt from "@/core/components/common/payment-receipt"
import { Form } from "@/core/components/form/form"
import FormSelect from "@/core/components/form/form-select"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { IoMdTime } from "react-icons/io"
import { useGetReservation } from "../hooks/useGetReservation"
import { usePayReservation } from "../hooks/usePayReservation"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"
import { RESERVATION_PAYMENT_METHODS } from "../types"
import { payReservationFormSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"


type TFormFields = z.infer<typeof payReservationFormSchema>

export default function ReservationPayment() {

  const { mutate, isLoading:isSubmitting } = usePayReservation()
  const [searchParams,setSearchParams] = useSearchParams()
  const reservationId = searchParams.get("reservation-payment-id") || ""

  const { data, isLoading ,error } = useGetReservation(reservationId)
  const reservation = data?.data

  function closeForm () {
    searchParams.delete("reservation-payment-id")
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if ((error && reservationId)) {
      closeForm()
      toast.error("حدث خطأ، لا يمكن دفع الحجز.")
    }
  },[error])

  const methods = useForm<TFormFields>({
    defaultValues: {
      paymentMethod: paymentMethods[0] 
    },
    resolver: zodResolver(payReservationFormSchema)
  })

  function handleSubmit ({ paymentMethod }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        payload:{
          paymentMethod: paymentMethod.value
        },
        reservationId
      },{
        onSuccess:() => {
          closeForm()
        }
      })
    }
  }
  
  return (
    <PaymentReceipt
      open={Boolean(reservationId)}
      total={Number(reservation?.totalCost)}
      isLoading={isLoading}
      handleProceedPayment={() => {
        methods.handleSubmit(handleSubmit)()
      }}
      setIsOpen={(isOpen) => {
        if (!isOpen) {
          closeForm()
        }
      }}
    >
      <Form
        form={methods}
        handleSubmit={handleSubmit}
        className="space-y-4"
      >
        <FormSelect
          label='اختر طريقة الدفع'
          placeholder='طريقة الدفع'
          options={paymentMethods}
          name='paymentMethod'
        />
      </Form>
    </PaymentReceipt>
  )
}


const paymentMethods: {
  label: string,
  value: RESERVATION_PAYMENT_METHODS
}[] = [
  {
    label: "نقدًا",
    value: RESERVATION_PAYMENT_METHODS.CASH
  },
  {
    label: "فيزا",
    value: RESERVATION_PAYMENT_METHODS.VISA
  },
]