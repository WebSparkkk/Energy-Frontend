import { formatCurrency } from '@/core/lib/utils/currency';
import { useGetOrders } from '../hooks/useGetOrders';
import Spinner from '@/core/components/ui/spinner';
import Table from '@/core/components/ui/table';
import Error from '@/core/components/ui/error';
import { orderStatusAssets } from '../constants';
import Tag from '@/core/components/ui/tag';
import { formatISODate } from '@/core/lib/utils/format-date';
import KebabMenu from '@/core/components/ui/kebab-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteForever, MdOutlineDeleteForever } from 'react-icons/md';
import { ORDER_PAYMENT_STATUSES } from '../types';
import { TbCash } from 'react-icons/tb';
import { useDeleteOrder } from '../hooks/useDelteOrder';
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/core/components/ui/pagination';

export default function OrdersTable() {

  const { data, isLoading, error } = useGetOrders()
  const { mutate, isLoading: isDeleting } = useDeleteOrder()
  const { setPopup } = useAppPopupProvider()
  const [searchParams,setSearchParams] = useSearchParams()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>

  function handleDeleteOrder (orderId: string) {
    if (!isDeleting) {
      setPopup({
        description:"هل أنت متأكد من حذف الطلب؟",
        title:"حذف الطلب",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => mutate(orderId)
      })
    }
  }

  function handlePayOrder (orderId: string) {
    searchParams.set("order-payment-id",orderId)
    setSearchParams(searchParams)
  }

  function handleRowClick (orderId: string) {
    searchParams.set("order-id",orderId)
    setSearchParams(searchParams)
  }

  return (
    <div>
      <h3 className='mb-3 font-semibold'>قائمة الطلبات</h3>
      <Table className='overflow-auto' columns='grid-cols-[1fr_240px_1fr_200px_60px]'>
        <Table.Header>
          <Table.Cell>التاريخ</Table.Cell>
          <Table.Cell>الحالة</Table.Cell>
          <Table.Cell>التكلفة</Table.Cell>
          <Table.Cell> </Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        <Table.Body
          data={data?.data || []}
          render={(curr) => (
            <Table.Row 
              onClick={() => handleRowClick(curr.id)}
              className='hover:bg-zinc-100 duration-100 cursor-pointer'
              key={curr.id}
            >
              <Table.Cell>{formatISODate(curr.createdAt)}</Table.Cell>
              <Table.Cell>
                <Tag variant={orderStatusAssets[curr.paymentStatus].color}>
                  {orderStatusAssets[curr.paymentStatus].label}
                </Tag>
              </Table.Cell>
              <Table.Cell>{formatCurrency(Number(curr.totalPrice))}</Table.Cell>
              <Table.Cell>
                <button 
                  className="payment_button"
                  disabled={curr.paymentStatus === ORDER_PAYMENT_STATUSES.PAID}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePayOrder(curr.id)
                  }} 
                >
                  دفع
                  <TbCash className='text-lg' />
                </button>
              </Table.Cell>
              <Table.Cell>
                <KebabMenu
                  label={<BsThreeDotsVertical />}
                  labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
                  optionsLabel='Actions'
                  options={[
                    {
                      label:"Delete",
                      action: () => handleDeleteOrder(curr.id),
                      className: "text-red-400",
                      icon: <MdDeleteForever className='text-lg' />,
                    }
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          )}
        />
        <Table.Footer>
          { data && <Pagination totalPages={data.totalPages}/>}
        </Table.Footer>
      </Table>
    </div>
  )
}