import { Button } from '@/core/components/ui/button'
import { useDeleteOrder } from '../../../orders/hooks/useDelteOrder'
import { useSessionItemInfoData } from './SessionItemInfo'
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { Trash2 } from 'lucide-react'
import { formatISODate } from '@/core/lib/utils/format-date'
import { formatCurrency } from '@/core/lib/utils/currency'
import { IoClose } from 'react-icons/io5'
import { IoMdAdd } from 'react-icons/io'
import { useSearchParams } from 'react-router-dom'
import { TCashierProviderValue, useCashierProvider } from '../../CashierPage'

function SessionItemOrders() {

  const [searchParams,setSearchParams] = useSearchParams()
  const { orders } = useSessionItemInfoData()
  const { mutate, isLoading:isDeleting } = useDeleteOrder()
  const { setPopup } = useAppPopupProvider()
  const { setIsAddOrderFormVisible } = useCashierProvider() as TCashierProviderValue


  function closeOrderInfo () {
    searchParams.delete("session-client-id")
    setSearchParams(searchParams)
  }

  function handleDeleteOrder (orderId: string) {
    if (!isDeleting) {
      setPopup({
        description:"هل أنت متأكد من حذف الطلب؟",
        title:"حذف الطلب",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => mutate(orderId,{
          onSettled: closeOrderInfo
        })
      })
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <Button
          size="sm"
          onClick={() => setIsAddOrderFormVisible(true)}
        >
          <span>إضافة طلب</span>
          <IoMdAdd className='text-xl ml-1' />
        </Button>
        <h3 className='mb-3 font-semibold text-right'>الطلبات</h3>
      </div>
      {
        !orders.length ? 
        <h4 className='font-semibold text-center mt-5'>
          لا توجد طلبات لعرضها 
        </h4> : <></>
      }
      <div className='h-[400px] overflow-auto w-full flex flex-col gap-4 p-2'>
        {
          orders.map(curr => (
            <div key={curr.id} className="w-full bg-gray-50 rounded-lg bg-gray flex flex-col gap-3 p-4">
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteOrder(curr.id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="flex flex-col text-right">
                  <h5 className='font-medium text-zinc-600'>#{curr.id} طلب</h5>
                  <p className='font-medium text-zinc-500 text-sm'>{formatISODate(curr.createdAt)}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {
                  curr.orderItems.map(currItem => {
                    const name = currItem.inventoryItem.name
                    const qty = currItem.quantity
                    const price = currItem.inventoryItem.sellingPricePerUnit

                    return (
                      <div key={currItem.id} className="w-full flex justify-between items-center">
                        <span className='text-sm'>{formatCurrency(Number(price) * qty)}</span>
                        <div className='flex gap-2 items-center text-[.9rem]'>
                          <span>{qty}</span>
                          <span><IoClose /></span>
                          <span>{name}</span>
                        </div>
                      </div>
                    )
                  })
                }
                <div className="mt-2 border-t-2 border-zinc-200 pt-2 flex items-center justify-between">
                  <span>{formatCurrency(Number(curr.totalPrice))}</span>
                  <span>الإجمالي</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SessionItemOrders