import { Form } from "@/core/components/form/form"
import FormSelect from "@/core/components/form/form-select"
import { usePayTimer } from "../hooks/usePayTimer"
import { z } from "zod"
import { payTimerFormSchema } from "../schema"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { TIMER_PAYMENT_METHODS } from "../types"
import { useEffect } from "react"
import PaymentReceipt from "@/core/components/common/payment-receipt"
import toast from "react-hot-toast"
import { formatTime } from "@/core/lib/utils/time"
import { IoMdTime } from "react-icons/io"
import { useGetTimerPayment } from "../hooks/useGetTimerPayment"
import { zodResolver } from "@hookform/resolvers/zod"

type TFormFields = z.infer<typeof payTimerFormSchema>

function TimerPayForm() {

  const { mutate, isLoading:isSubmitting } = usePayTimer()
  const [searchParams,setSearchParams] = useSearchParams()
  const timerId = searchParams.get("timer-paying-id") || ""

  const { data, isLoading ,error } = useGetTimerPayment(timerId)
  const paymentInfo = data?.data

  function closeForm () {
    searchParams.delete("timer-paying-id")
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if ((error && timerId)) {
      closeForm()
      toast.error("حدث خطأ، لا يمكن دفع المؤقت.")
    }
  },[error])

  const methods = useForm<TFormFields>({
    defaultValues: {
      paymentMethod: paymentMethods[0] 
    },
    resolver: zodResolver(payTimerFormSchema)
  })

  function handleSubmit ({ paymentMethod }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        payload:{
          paymentMethod: paymentMethod.value
        },
        timerId
      },{
        onSuccess:() => {
          closeForm()
        }
      })
    }
  }
  
  return (
    <PaymentReceipt
      open={Boolean(timerId)}
      total={Number(paymentInfo?.totalPrice)}
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
        <PaymentReceipt.Item
          icon={<IoMdTime className="text-xl" />}
          label="إجمالي الوقت النشط"
          value={
            paymentInfo ?
            formatTime(paymentInfo?.totalActiveTime) :
            "-"
          }
        />
      </Form>
    </PaymentReceipt>
  )
}

export default TimerPayForm


const paymentMethods: {
  label: string,
  value: TIMER_PAYMENT_METHODS
}[] = [
  {
    label: "نقدًا",
    value: TIMER_PAYMENT_METHODS.CASH
  },
  {
    label: "فيزا",
    value: TIMER_PAYMENT_METHODS.VISA
  },
]