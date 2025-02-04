import { Button } from '@/core/components/ui/button';

import { 
  ITransactionPayload,
  PAYMENT_METHODS,
  SPECIFIC_TYPES, 
} from '../types';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog';
import { TTreasuryProviderValue, useTreasuryProvider } from '../TreasuryPage';
import { Form } from '@/core/components/form/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { transactionSchema } from '../schema';
import { FormInput } from '@/core/components/form/form-input';
import FormSelect from '@/core/components/form/form-select';
import { useCreateTransaction } from '../hooks/useCreateTransaction';
import { treasurySpecificTypes, treasuryTransactionTypes } from '../constants';
import { fetchAdminUsersOptions, fetchSuppliersOptions } from '../services';
import FormAsyncSelect from '@/core/components/form/form-async-select';
import { zodResolver } from '@hookform/resolvers/zod';

type TFormFields = z.infer<typeof transactionSchema>

export default function TransactionForm() {

  const { isAddTreasuryFormVisible, setIsAddTreasuryFormVisible } = useTreasuryProvider() as TTreasuryProviderValue

  const { mutate, isLoading:isSubmitting } = useCreateTransaction()
  
  const methods = useForm<TFormFields>({
    defaultValues:{
      amount:"0",
      description:"",
      paymentMethod: paymentMethods[0],
      specificType: treasurySpecificTypes[0],
      transactionType: treasuryTransactionTypes[0],
      user: null,
      supplier: null
    },
    resolver: zodResolver(transactionSchema)
  })

  function handleSubmit ({ 
    amount, 
    description, 
    paymentMethod, 
    specificType, 
    transactionType,
    supplier,
    user
  }: TFormFields) {
    if (!isSubmitting) {

      const payload: ITransactionPayload = {
        amount,
        description,
        paymentMethod: paymentMethod.value,
        specificType: specificType.value,
        transactionType: transactionType.value,
      }

      if (specificType.value === SPECIFIC_TYPES.SUPPLIERS_PAYMENT)
        payload.supplierId = supplier?.value
      
      if (specificType.value === SPECIFIC_TYPES.SALARY_PAYMENT)
        payload.adminUserId = user?.value

      mutate(payload,{
        onSuccess:() => {
          setIsAddTreasuryFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isAddTreasuryFormVisible}
      onOpenChange={setIsAddTreasuryFormVisible}
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
          <FormInput
            label='الوصف'
            name='description'
            type='text'
          />
          <FormSelect
            label='نوع المعاملة'
            options={treasuryTransactionTypes}
            name='transactionType'
          />
          <FormSelect
            label='الفئة'
            options={treasurySpecificTypes}
            name='specificType'
          />
          {
            methods.watch("specificType").value === SPECIFIC_TYPES.SUPPLIERS_PAYMENT ? (
              <FormAsyncSelect
                fetchOptions={fetchSuppliersOptions}
                name='supplier'
                cacheOptions
                label='المورد'
              />
            ) : <></>
          }
          {
            methods.watch("specificType").value === SPECIFIC_TYPES.SALARY_PAYMENT ? (
              <FormAsyncSelect
                fetchOptions={fetchAdminUsersOptions}
                name='user'
                cacheOptions
                label='مستخدم'
              />
            ) : <></>
          }
          <FormSelect
            label='طريقة الدفع'
            options={paymentMethods}
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
                  setIsAddTreasuryFormVisible(false)
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
  );
}


const paymentMethods: { 
  value: PAYMENT_METHODS; 
  label: string 
}[] = [
  { value: PAYMENT_METHODS.CASH, label: 'نقدي' },
  { value: PAYMENT_METHODS.VISA, label: 'بطاقة' },
];


