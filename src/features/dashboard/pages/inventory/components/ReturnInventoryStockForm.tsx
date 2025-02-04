import { Button } from '@/core/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog';
import { Form } from '@/core/components/form/form';
import { FormInput } from '@/core/components/form/form-input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { returnStockFormSchema } from '../schema';
import { TInventoryProviderValue, useInventoryProvider } from '../InventoryPage';
import { zodResolver } from '@hookform/resolvers/zod';
import FormAsyncSelect from '@/core/components/form/form-async-select';
import { fetchSuppliersOptions } from '../services';
import { useSearchParams } from 'react-router-dom';
import { useReturnInventoryStockItem } from '../hooks/useReturnInventoryStockItem';

type TFormFields = z.infer<typeof returnStockFormSchema>

function ReturnInventoryStockForm() {

  const { isReturnStockFormVisible, setIsReturnStockFormVisible } = useInventoryProvider() as TInventoryProviderValue
  const [searchParams] = useSearchParams()
  const inventoryId = searchParams.get("inventory-id") || ""
  const { mutate, isLoading: isSubmitting } = useReturnInventoryStockItem()
  
  const methods = useForm<TFormFields>({
    defaultValues:{
      supplier: null as unknown as {
        label: string,
        value: string
      },
      quantity: "0",
      totalBuyingPrice: ""
    },
    resolver: zodResolver(returnStockFormSchema)
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
          setIsReturnStockFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isReturnStockFormVisible}
      onOpenChange={setIsReturnStockFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            إرجاع عنصر  
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
                  setIsReturnStockFormVisible(false)
                }}
              >
                إلغاء
              </Button>
              <Button 
                disabled={isSubmitting} 
                type="submit"
              >
                إرجاع عنصر
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReturnInventoryStockForm