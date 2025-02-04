import { Button } from '@/core/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog';
import { Form } from '@/core/components/form/form';
import { FormInput } from '@/core/components/form/form-input';
import FormSelect from '@/core/components/form/form-select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { inventoryFormSchema } from '../schema';
import { INVENTORY_UNIT_TYPE } from '../types';
import { TInventoryProviderValue, useInventoryProvider } from '../InventoryPage';
import { useCreateInventoryItem } from '../hooks/useCreateInventoryItem';
import { zodResolver } from '@hookform/resolvers/zod';
import FormAsyncSelect from '@/core/components/form/form-async-select';
import { fetchSuppliersOptions } from '../services';

type TFormFields = z.infer<typeof inventoryFormSchema>

export default function AddInventoryForm() {

  const { isAddInventoryFormVisible, setIsAddInventoryFormVisible } = useInventoryProvider() as TInventoryProviderValue

  const { mutate, isLoading: isSubmitting } = useCreateInventoryItem()
  
  const methods = useForm<TFormFields>({
    defaultValues:{
      name: "",
      sellingPricePerUnit: "0",
      stockQuantity: "0",
      supplier: null as unknown as {
        label: string,
        value: string
      },
      totalBuyingPrice:"0",
      unitBuyingPrice:"0",
      unitType: inventoryUnitTypeList[0],
    },
    resolver: zodResolver(inventoryFormSchema)
  })

  function handleSubmit ({
    name, 
    sellingPricePerUnit, 
    stockQuantity, 
    supplier, 
    totalBuyingPrice, 
    unitBuyingPrice, 
    unitType
  }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        name,
        sellingPricePerUnit: Number(sellingPricePerUnit),
        stockQuantity: Number(stockQuantity),
        totalBuyingPrice: Number(totalBuyingPrice),
        unitBuyingPrice: Number(unitBuyingPrice),
        unitType: unitType.value,
        supplierId: supplier.value
      },{
        onSuccess() {
          setIsAddInventoryFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isAddInventoryFormVisible}
      onOpenChange={setIsAddInventoryFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            إضافة عنصر         
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods}
          handleSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormInput
            label='اسم المنتج'
            name='name'
            type='text'
          />
          <FormAsyncSelect
            fetchOptions={fetchSuppliersOptions}
            name='supplier'
            cacheOptions
            label='المورد'
          />
          <FormSelect
            label='نوع الوحدة'
            placeholder='نوع الوحدة'
            options={inventoryUnitTypeList}
            name='unitType'
          />
          <FormInput
            label='الكمية'
            type='number'
            name='stockQuantity'
          />
          <FormInput
            label='سعر الشراء لكل وحدة'
            name='unitBuyingPrice'
            type='number'
          />
          <FormInput
            label='سعر البيع لكل وحدة'
            name='sellingPricePerUnit'
            type='number'
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
                  setIsAddInventoryFormVisible(false)
                }}
              >
                إلغاء
              </Button>
              <Button 
                disabled={isSubmitting} 
                type="submit"
              >
                إضافة عنصر
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const inventoryUnitTypeList: {
  label: string,
  value: INVENTORY_UNIT_TYPE
}[] = [
  { value: INVENTORY_UNIT_TYPE.PIECE, label: "قطعة" },
  { value: INVENTORY_UNIT_TYPE.GRAM, label: "جرام" },
  { value: INVENTORY_UNIT_TYPE.KILOGRAM, label: "كيلوجرام" },
  { value: INVENTORY_UNIT_TYPE.LITRE, label: "لتر" },
];

