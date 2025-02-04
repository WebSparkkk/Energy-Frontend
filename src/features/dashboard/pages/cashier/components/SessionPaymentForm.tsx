import PaymentReceipt from '@/core/components/common/payment-receipt'
import { CASHIER_PAYMENT_METHODS } from '../types'
import { Form } from '@/core/components/form/form'
import FormSelect from '@/core/components/form/form-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { useGetActiveSession } from '../hooks/useGetSession'
import { paySessionFormSchema } from '../schema'
import { z } from 'zod'
import { usePaySession } from '../hooks/usePaySession'
import { IoCart } from 'react-icons/io5'
import { formatCurrency } from '@/core/lib/utils/currency'
import { IoIosTimer } from 'react-icons/io'

type TFormFields = z.infer<typeof paySessionFormSchema>

function SessionPaymentForm() {

  const { mutate, isLoading:isSubmitting } = usePaySession()
  const [searchParams,setSearchParams] = useSearchParams()
  const clientSessionId = searchParams.get("payment-session-id") || ""

  const { data, isLoading } = useGetActiveSession(clientSessionId)
  const paymentInfo = data?.data

  const totalOrdersPrice = paymentInfo?.Orders?.reduce((acc,curr) => acc + Number(curr.totalPrice),0) 
  const totalTimersPrice = paymentInfo?.Timers?.reduce((acc,curr) => acc + Number(curr.totalPrice),0)

  function closeForm () {
    searchParams.delete("payment-session-id")
    setSearchParams(searchParams)
  }

  const methods = useForm<TFormFields>({
    defaultValues: {
      paymentMethod: paymentMethods[0] 
    },
    resolver: zodResolver(paySessionFormSchema)
  })

  function handleSubmit ({ paymentMethod }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        payload:{
          paymentMethod: paymentMethod.value
        },
        sessionId: clientSessionId
      },{
        onSuccess:() => {
          closeForm()
        }
      })
    }
  }

  const totalPrice = (totalOrdersPrice || 0) + (totalTimersPrice || 0)

  return (
    <PaymentReceipt
      open={Boolean(clientSessionId)}
      total={totalPrice}
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
          icon={<IoCart className="text-xl" />}
          label="إجمالي سعر الطلبات"
          value={
            totalOrdersPrice ?
            formatCurrency(totalOrdersPrice) :
            "-"
          }
        />

        <PaymentReceipt.Item
          icon={<IoIosTimer className="text-xl" />}
          label="إجمالي سعر المؤقتات"
          value={
            totalTimersPrice ?
            formatCurrency(totalTimersPrice) :
            "-"
          }
        />
      </Form>
    </PaymentReceipt>
  )
}

export default SessionPaymentForm

const paymentMethods: {
  label: string,
  value: CASHIER_PAYMENT_METHODS
}[] = [
  {
    label: "نقدًا",
    value: CASHIER_PAYMENT_METHODS.CASH
  },
  {
    label: "فيزا",
    value: CASHIER_PAYMENT_METHODS.VISA
  },
]