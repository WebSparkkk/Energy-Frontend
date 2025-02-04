import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { useGetOrder } from '../hooks/useGetOrder'
import { useSearchParams } from 'react-router-dom'
import Spinner from '@/core/components/ui/spinner'
import { Dispatch, useEffect, useLayoutEffect, useState } from 'react'
import { Form } from '@/core/components/form/form'
import { Label } from '@/core/components/form/label'
import DataItem from '@/core/components/ui/data-item'
import { formatCurrency } from '@/core/lib/utils/currency'
import { Button } from '@/core/components/ui/button'
import { useDeleteOrderItem } from '../hooks/useDeleteOrderItem'
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createOrderItemSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormAsyncSelect from '@/core/components/form/form-async-select'
import { fetchInventoryOptionsService } from '../services'
import { FormInput } from '@/core/components/form/form-input'
import { useCreateOrderItem } from '../hooks/useCreateOrderItem'
import Tag from '@/core/components/ui/tag'
import { inventoryUnitTypeAssets } from '../../inventory/constants'


type TContent = "order-infos" | "order-items-form"

function Order() {

  const [searchParams,setSearchParams] = useSearchParams()
  const [currentContent,setCurrentContent] = useState<TContent>("order-infos")

  const orderId = searchParams.get("order-id") || ""

  function closeOrder () {
    searchParams.delete("order-id")
    setSearchParams(searchParams)
    setTimeout(() => {
      setCurrentContent("order-infos")
    }, 300);
  }

  useEffect(() => {
    if (!orderId) closeOrder()
  },[orderId])
  
  return (
    <Dialog
      open={Boolean(orderId)}
      onOpenChange={(isOpen) => (!isOpen) && closeOrder()}
    >
      <DialogContent>
        { currentContent === "order-infos" && <OrderInfos setCurrentContent={setCurrentContent}/> }
        { currentContent === "order-items-form" && <OrderItemsForm setCurrentContent={setCurrentContent}/> }
      </DialogContent>
    </Dialog>
  )
}

export default Order



function OrderInfos ({ setCurrentContent }:{
  setCurrentContent: Dispatch<TContent>
}) {
  const [searchParams,setSearchParams] = useSearchParams()
  const orderId = searchParams.get("order-id") || ""
  const { data, isLoading, error } = useGetOrder(orderId)
  const { mutate, isLoading: isDeleting } = useDeleteOrderItem()
  const { setPopup } = useAppPopupProvider()

  useLayoutEffect(() => {
    if (error) {
      searchParams.delete("order-id")
      setSearchParams(searchParams)
    }
  },[error])

  function handleDeleteOrderItem (orderItemId: string) {
    if (!isDeleting) {
      setPopup({
        description:"هل أنت متأكد من حذف عنصر الطلب؟",
        title:"حذف عنصر الطلب",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => mutate(orderItemId)
      })
    }
  }

  const orderItems = data?.data.orderItems

  return !isLoading ? (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-900">
          معلومات الطلب 
        </DialogTitle>
      </DialogHeader>
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium mb-2">عناصر الطلب</h4>
          { orderItems?.length ? <p>عناصر {orderItems?.length}</p> : <></>}
        </div>

        <Button 
          variant="secondary"
          onClick={() => {
            setCurrentContent("order-items-form")
          }}
          size="sm"
        >
          إضافة عنصر طلب  
        </Button>
      </div>
      <div className="space-y-3 h-[500px] overflow-auto p-2">
        { 
          orderItems?.length === 0 &&
          <h3 className='text-center mt-16 font-semibold'>لا توجد عناصر طلب</h3> 
        }
        {
          orderItems?.map(curr => {
            const { inventoryItem, quantity } = curr
            const { color, label } = inventoryUnitTypeAssets[curr.inventoryItem.unitType]
            return (
              <div
                key={curr.id}
                className="flex gap-3 items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <div>
                    <Label className='font-bold'>عنصر المخزون :</Label>
                    <div className="-space-y-2">
                      <DataItem 
                        label="الاسم" 
                        labelClassName="text-[.8rem]"
                        value={inventoryItem?.name || "-"}
                      />
                      <DataItem 
                        label="نوع الوحدة" 
                        labelClassName="text-[.8rem]"
                        value={(
                          <Tag className='!py-0' variant={color}>
                            {label}
                          </Tag>
                        )}
                      />
                      <DataItem 
                        labelClassName="text-[.8rem]"
                        label="إجمالي سعر الشراء" 
                        value={
                          inventoryItem?.totalBuyingPrice ?
                          formatCurrency(Number(inventoryItem?.totalBuyingPrice)) :
                          "-"
                        }
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between h-fit w-fit gap-4'>
                    <Label className='font-bold !m-0'>الكمية :</Label>
                    <span className='font-[500]'>{quantity}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteOrderItem(curr.id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )
          })
        }
      </div>
    </>
  ) : <Spinner/>
}

type TOrderItemFields = z.infer<typeof createOrderItemSchema>

function OrderItemsForm ({ setCurrentContent }:{
  setCurrentContent: Dispatch<TContent>
}) {

  const [searchParams,setSearchParams] = useSearchParams()
  const { mutate, isLoading: isSubmitting } = useCreateOrderItem()

  function closeOrder () {
    searchParams.delete("order-id")
    setSearchParams(searchParams)
    setCurrentContent("order-infos")
  }
  const orderId = searchParams.get("order-id") || ""
  const methods = useForm<TOrderItemFields>({
    defaultValues: {
      inventoryItem: null as unknown as {
        label: string,
        value: string
      },
      quantity: "0"
    },
    resolver: zodResolver(createOrderItemSchema)
  })

  function handleSubmit ({ inventoryItem, quantity }: TOrderItemFields) {
    if (!isSubmitting && orderId) {
      mutate({
        inventoryItemId: inventoryItem.value,
        quantity: Number(quantity),
        orderId
      },{
        onSuccess: closeOrder
      })
    }
  }

  return (
    <>
      <DialogHeader className='flex justify-between flex-row mt-3'>
        <DialogTitle className="text-xl font-bold text-gray-900">
          إضافة عنصر للطلب
        </DialogTitle>
        <Button 
          variant="secondary"
          onClick={() => {
            setCurrentContent("order-infos")
          }}
          size="sm"
        >
          الرجوع لمعلومات الطلب 
        </Button>
      </DialogHeader>
      <Form
        form={methods}
        handleSubmit={handleSubmit}
        className='space-y-4'
      >
        <FormAsyncSelect
          fetchOptions={fetchInventoryOptionsService}
          name='inventoryItem'
          label="اختر عنصر المخزون"
          className="h-[40px]"        
        />
        <FormInput
          type='number'
          disabled={isSubmitting}
          name={`quantity`}
          label="الكمية"
        />
        <DialogFooter>
          <div className="flex justify-end gap-4">
            <Button
              disabled={isSubmitting} 
              type="button" 
              variant="outline" 
              onClick={(e) => {
                e.preventDefault()
                closeOrder()
              }}
            >
              إلغاء
            </Button>
            <Button
              disabled={isSubmitting} 
              type="submit"
            >
              إضافة 
            </Button>
          </div>
        </DialogFooter>
      </Form>
    </>
  )
}