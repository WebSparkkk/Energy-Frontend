import { Form } from '@/core/components/form/form'
import { FormInput } from '@/core/components/form/form-input'
import { Button } from '@/core/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { TTreasuryProviderValue, useTreasuryProvider } from '../TreasuryPage'
import { useForm } from 'react-hook-form'
import { useMakeMachineTransaction } from '../hooks/useMakeMachineTransaction'
import { z } from 'zod'
import { treasuryOperationSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormSelect from '@/core/components/form/form-select'
import { PAYMENT_METHODS, TREASURY_MACHINE_OPERATION } from '../types'

type TFormFields = z.infer<typeof treasuryOperationSchema>

function TreasuryTransactionForm() {

  const { isTransactionFormVisible, setIsTransactionFormVisible } = useTreasuryProvider() as TTreasuryProviderValue

  const { mutate, isLoading:isSubmitting } = useMakeMachineTransaction()
  
  const methods = useForm<TFormFields>({
    defaultValues:{
      amount:"0",
      
    },
    resolver: zodResolver(treasuryOperationSchema)
  })

  function handleSubmit ({ amount, specificType, paymentMethod }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        amount: Number(amount),
        specificType: specificType.value,
        paymentMethod:paymentMethod.value
      },{
        onSuccess:() => {
          setIsTransactionFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isTransactionFormVisible}
      onOpenChange={setIsTransactionFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            إنشاء معاملة      
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods}
          handleSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormInput
            label='المبلغ'
            name='amount'
            type='number'
          />

          <FormSelect
            label='الفئة'
            options={treasuryMachineOperations}
            name='specificType'
          />

          
          <FormSelect
            label='طريقة الدفع'
            options={treasuryMachinePaymentMethods}
            name='paymentMethod'
          />
          
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button
                disabled={isSubmitting} 
                type="button" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault()
                  setIsTransactionFormVisible(false)
                }}
              >
                إلغاء
              </Button>
              <Button 
                disabled={isSubmitting} 
                type="submit"
              >
                إضافة المعاملة
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TreasuryTransactionForm


export const treasuryMachineOperations: {
  value: TREASURY_MACHINE_OPERATION,
  label: string
}[] = [
  { value: TREASURY_MACHINE_OPERATION.CASH_DEPOSIT, label: 'إيداع نقدي' },
  { value: TREASURY_MACHINE_OPERATION.CASH_WITHDRAWAL, label: 'سحب نقدي' },
];

export const treasuryMachinePaymentMethods: {
  value: PAYMENT_METHODS,
  label: string
}[] = [
  { value: PAYMENT_METHODS.CASH, label: 'نقدي' },
  { value: PAYMENT_METHODS.VISA, label: 'بطاقة' },
];