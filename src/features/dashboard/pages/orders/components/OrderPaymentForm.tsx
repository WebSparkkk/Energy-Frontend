import { useSearchParams } from 'react-router-dom'
import { useGetOrder } from '../hooks/useGetOrder'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePayOrder } from '../hooks/usePayOrder'
import { payOrderFormSchema } from '../schema'
import { z } from 'zod'
import { ORDER_PAYMENT_METHODS } from '../types'
import PaymentReceipt from '@/core/components/common/payment-receipt'
import FormSelect from '@/core/components/form/form-select'
import { Form } from '@/core/components/form/form'

type TFormFields = z.infer<typeof payOrderFormSchema>

function OrderPaymentForm() {

  const [searchParams,setSearchParams] = useSearchParams()
  const orderId = searchParams.get("order-payment-id") || ""
  const { data, isLoading, error } = useGetOrder(orderId)
  const { mutate, isLoading:isSubmitting } = usePayOrder()
  const order = data?.data

  function closeForm () {
    searchParams.delete("order-payment-id")
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if ((error)) {
      closeForm()
      toast.error("حدث خطأ، لا يمكن دفع المؤقت.")
    }
  },[error])

  const methods = useForm<TFormFields>({
    defaultValues: {
      paymentMethod: paymentMethods[0],
    },
    resolver: zodResolver(payOrderFormSchema)
  })

  function handleSubmit ({ paymentMethod }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        payload:{
          paymentMethod: paymentMethod.value
        },
        orderId
      },{
        onSuccess:() => {
          closeForm()
        }
      })
    }
  }
  return (
    <PaymentReceipt
      open={Boolean(orderId)}
      total={Number(order?.totalPrice)}
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

export default OrderPaymentForm



const paymentMethods: {
  label: string,
  value: ORDER_PAYMENT_METHODS
}[] = [
  {
    label: "نقدًا",
    value: ORDER_PAYMENT_METHODS.CASH
  },
  {
    label: "فيزا",
    value: ORDER_PAYMENT_METHODS.VISA
  },
]