import { z } from 'zod'
import { createOrderSchema } from '../../../orders/schema'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { Form } from '@/core/components/form/form'
import { useForm } from 'react-hook-form'
import { TCashierProviderValue, useCashierProvider } from '../../CashierPage'
import { useCreateOrder } from '../../../orders/hooks/useCreateOrder'
import { OrderItemsForm } from '../../../orders/components/AddOrderForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { useGetMember } from '../../../members/hooks.ts/useGetMember'
import Spinner from '@/core/components/ui/spinner'
import { useEffect, useLayoutEffect } from 'react'
import { useQueryClient } from 'react-query'

type TFormFields = z.infer<typeof createOrderSchema>

function AddOrderToClientForm() {
  const queryClient = useQueryClient()
  const { mutate, isLoading: isSubmitting } = useCreateOrder()
  const [searchParams,setSearchParams] = useSearchParams()
  const clientId = searchParams.get("session-client-id") || ""

  const { 
    isAddOrderFormVisible, 
    setIsAddOrderFormVisible 
  } = useCashierProvider() as TCashierProviderValue
  
  function closeSessionInfo () {
    searchParams.delete("session-client-id")
    setSearchParams(searchParams)
    setIsAddOrderFormVisible(false)
  }

  const { data, isLoading, error, refetch } = useGetMember(clientId)
  const client = data?.data

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
    values: {
      client: {
        label: client?.name || "",
        value: client?.id || ""
      },
      orderItems:[{
        inventoryItem: null  as unknown as {
          label: string,
          value: string,
        },
        quantity:"0"
      }]
    },
    resolver: zodResolver(createOrderSchema)
  })

  useLayoutEffect(() => {
    methods.reset()
    refetch()
  },[clientId]) 

  useLayoutEffect(() => {
    error && closeSessionInfo()
  },[error])

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
          queryClient.invalidateQueries({
            queryKey: ['sessions']
          })
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
        {
          !isLoading ? (
            <>
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
                <h3 className='flex items-center gap-4 font-medium text-lg'>
                  <span className='text-zinc-600'>العميل: </span>
                  <span>{client?.name}</span>
                </h3>
                <h4 className="font-medium">عناصر الطلب</h4>
                <OrderItemsForm isSubmitting={false}/>
              </Form>
            </>
          ) : <Spinner/>
        }
      </DialogContent>
    </Dialog>
  );
}

export default AddOrderToClientForm

