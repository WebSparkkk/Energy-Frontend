import { Button } from '@/core/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog';
import { Form } from '@/core/components/form/form';
import { FormInput } from '@/core/components/form/form-input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { restockFormSchema } from '../schema';
import { TInventoryProviderValue, useInventoryProvider } from '../InventoryPage';
import { zodResolver } from '@hookform/resolvers/zod';
import FormAsyncSelect from '@/core/components/form/form-async-select';
import { fetchSuppliersOptions } from '../services';
import { useRestockInventoryItem } from '../hooks/useRestockInventoryItem';
import { useSearchParams } from 'react-router-dom';

type TFormFields = z.infer<typeof restockFormSchema>

export default function RestockInventoryForm() {

  const { isRestockFormVisible, setIsRestockFormVisible } = useInventoryProvider() as TInventoryProviderValue
  const [searchParams] = useSearchParams()
  const inventoryId = searchParams.get("inventory-id") || ""
  const { mutate, isLoading: isSubmitting } = useRestockInventoryItem()
  
  const methods = useForm<TFormFields>({
    defaultValues:{
      supplier: null as unknown as {
        label: string,
        value: string
      },
      quantity: "0",
      totalBuyingPrice: ""
    },
    resolver: zodResolver(restockFormSchema)
  })

  function handleSubmit ({
    supplier,
    quantity,
    totalBuyingPrice
  }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        inventoryId,
        inventoryItem: {
          quantity: Number(quantity),
          supplierId: supplier.value,
          totalBuyingPrice: Number(totalBuyingPrice)
        }
      },{
        onSuccess() {
          setIsRestockFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isRestockFormVisible}
      onOpenChange={setIsRestockFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            إعادة توريد عنصر         
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods}
          handleSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormAsyncSelect
            fetchOptions={fetchSuppliersOptions}
            name='supplier'
            cacheOptions
            label='المورد'
          />
          <FormInput
            label='الكمية'
            type='number'
            name='quantity'
          />
          <FormInput
            label='إجمالي سعر الشراء'
            name='totalBuyingPrice'
            type='number'
          />
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button 
                disabled={isSubmitting} 
                type="button" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault()
                  setIsRestockFormVisible(false)
                }}
              >
                إلغاء
              </Button>
              <Button 
                disabled={isSubmitting} 
                type="submit"
              >
                إعادة توريد العنصر
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
