import Spinner from '@/core/components/ui/spinner'
import Table from '@/core/components/ui/table'
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useGetOrderItems } from '../hooks/useGetOrderItems'
import { useMarkOrderItemAsReady } from '../hooks/useMarkOrderItemAsReady'
import Error from '@/core/components/ui/error'
import KebabMenu from '@/core/components/ui/kebab-menu'
import { BAR_ITEM_STATUS, IBarItem } from '../types'
import Tag from '@/core/components/ui/tag'
import { barItemStatusAssets } from '../constants'
import { formatISODate } from '@/core/lib/utils/format-date'
import { Button } from '@/core/components/ui/button'
import { TbBellRinging2Filled } from 'react-icons/tb'
import { useDeleteOrderItem } from '../../orders/hooks/useDeleteOrderItem'
import { MdDeleteForever, MdOutlineDeleteForever } from 'react-icons/md'

function BarTable() {
  
  const { data, isLoading, error } = useGetOrderItems()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>

  return (
    <div>
      <h3 className='mb-3 font-semibold'>قائمة عناصر الطلبات</h3>
      <Table className='overflow-auto' columns='grid-cols-[1fr_125px_170px_1fr_170px_60px]'>
        <Table.Header>
          <Table.Cell>اسم عنصر المخزون</Table.Cell>
          <Table.Cell>الكمية</Table.Cell>
          <Table.Cell>الحالة</Table.Cell>
          <Table.Cell>تاريخ الإنشاء</Table.Cell>
          <Table.Cell> </Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        <Table.Body
          className='overflow-auto max-h-[60vh]'
          data={data?.data || []}
          render={(curr) => <BarRow key={curr.id} barItem={curr}/>}
        />
      </Table>
    </div>
  )
}

export default BarTable

function BarRow ({ barItem }: { barItem: IBarItem }) {

  const { mutate: markAsReady, isLoading: isSubmitting } = useMarkOrderItemAsReady()
  const { setPopup } = useAppPopupProvider()
  const { mutate: deleteItem, isLoading: isDeleting } = useDeleteOrderItem()

  function handleMarkBarItemAsReady (barItem: IBarItem) {
    if (!isSubmitting) {
      setPopup({
        description:"هل أنت متأكد من جعل عنصر الطلب محضرًا؟",
        title:"تحضير العنصر",
        isOpen: true,
        icon:<TbBellRinging2Filled className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => markAsReady({ 
          barItemId: barItem.id, 
          payload: {
            inventoryItemId: barItem.inventoryItemId,
            orderId: barItem.orderId,
            quantity: barItem.quantity
          }
        })
      })
    }
  }

  function handleDeleteOrderItem (orderItemId: string) {
    if (!isDeleting) {
      setPopup({
        description:"هل أنت متأكد من حذف عنصر الطلب؟",
        title:"حذف عنصر الطلب",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => deleteItem(orderItemId)
      })
    }
  }

  return (
    <Table.Row>
      <Table.Cell>{barItem.inventoryItem.name}</Table.Cell>
      <Table.Cell>{barItem.quantity}</Table.Cell>
      <Table.Cell>
        <Tag variant={barItemStatusAssets[barItem.status].color}>
          {barItemStatusAssets[barItem.status].label}
        </Tag>
      </Table.Cell>
      <Table.Cell>{formatISODate(barItem.createdAt)}</Table.Cell>
      <Table.Cell>
        <Button
          onClick={_ => handleMarkBarItemAsReady(barItem)}
          variant="secondary"
          disabled={barItem.status === BAR_ITEM_STATUS.READY}
          size="default"
          className='disabled:cursor-not-allowed'
        >تم التحضير</Button>
      </Table.Cell>
  
      <Table.Cell>
        <KebabMenu
          label={<BsThreeDotsVertical />}
          labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
          optionsLabel='Actions'
          options={[
            {
              label:"Delete",
              action: () => handleDeleteOrderItem(barItem.id),
              className: "text-red-400",
              icon: <MdDeleteForever className='text-lg' />,
            }
          ]}
        />
      </Table.Cell>
    </Table.Row>
  )
}