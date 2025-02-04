import { z } from "zod";
import { createOrderSchema, ORDER_ITEMS_MAX_LENGTH } from "../schema";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { TOrdersProviderValue, useOrdersProvider } from "../OrdersPage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/core/components/ui/dialog";
import { Form } from "@/core/components/form/form";
import FormAsyncSelect from "@/core/components/form/form-async-select";
import { fetchClientOptionsService, fetchInventoryOptionsService } from "../services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/core/components/ui/button";
import { Trash2 } from "lucide-react";
import { FormInput } from "@/core/components/form/form-input";
import { MouseEvent } from "react";
import { useCreateOrder } from "../hooks/useCreateOrder";


type TFormFields = z.infer<typeof createOrderSchema>

export default function AddOrderForm() {
 
  const { mutate, isLoading: isSubmitting } = useCreateOrder()

  const { 
    isAddOrderFormVisible, 
    setIsAddOrderFormVisible 
  } = useOrdersProvider() as TOrdersProviderValue
  
  const methods = useForm<TFormFields>({
    defaultValues:{
      client: null as unknown as {
        label: string,
        value: string,
      },
      orderItems: [{
        inventoryItem: null as unknown as {
          label: string,
          value: string,
        },
        quantity:"0"
      }]
    },
    resolver: zodResolver(createOrderSchema)
  })


  function handleSubmit ({ client, orderItems }: TFormFields) {
    const clientId = client.value
    const items = orderItems.map(curr => ({
      inventoryItemId: curr.inventoryItem.value,
      quantity: Number(curr.quantity)
    }))

    if (!isSubmitting) {
      mutate({
        clientId,
        orderItems: items
      },{
        onSuccess: () => {
          setIsAddOrderFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isAddOrderFormVisible}
      onOpenChange={setIsAddOrderFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            إنشاء طلب
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods}
          handleSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormAsyncSelect
            fetchOptions={fetchClientOptionsService}
            noOptionsMessage={_ => "لا يوجد عملاء"}
            label='اختر العميل'
            placeholder='العميل'
            name='client'
          />
          <h4 className="font-medium">عناصر الطلب</h4>
          <OrderItemsForm isSubmitting={isSubmitting}/>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export function OrderItemsForm ({ isSubmitting }: {
  isSubmitting: boolean
}) {

  const { control } = useFormContext<TFormFields>()

  const {
    fields,
    append,
    remove
  } = useFieldArray<TFormFields["orderItems"],"orderItems","fieldId">({
    control: control,
    name: "orderItems",
    rules:{
      minLength: 1,
      maxLength: ORDER_ITEMS_MAX_LENGTH
    }
  })

  function handleAddOrderItem (e: MouseEvent) {
    e.preventDefault()
    if (fields.length <= ORDER_ITEMS_MAX_LENGTH) {
      append({
        inventoryItem: null,
        quantity: "0"
      })
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 h-[400px] max-h-[400px] overflow-auto p-2">
        {
          fields.map((_, index) => (
            <div
              key={index}
              className="flex h-fit gap-3 justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <FormAsyncSelect
                  isDisabled={isSubmitting}
                  fetchOptions={fetchInventoryOptionsService}
                  label="اختر عنصر المخزون"
                  name={`orderItems.${index}.inventoryItem`}
                  className="h-[40px]"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="w-[100px]">
                  <FormInput
                    min={1}
                    disabled={isSubmitting}
                    name={`orderItems.${index}.quantity`}
                    type="number"
                    label="الكمية"
                  />
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault()
                      remove(index)
                    }}
                    disabled={fields.length === 1 || isSubmitting}
                    className="text-red-600 hover:text-red-700 mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="w-full justify-between flex">
        <Button 
          variant="secondary"
          size="sm"
          disabled={isSubmitting}
          onClick={handleAddOrderItem}
        >
          إضافة عنصر إلى الطلب
        </Button>
        <Button 
          variant="default"
          type="submit"
          disabled={isSubmitting}
          size="sm"
        >
          أنشئ الطلب        
        </Button>
      </div>
    </>
  )
}