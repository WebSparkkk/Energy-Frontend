import { useGetReservations } from '../hooks/useGetReservations';
import Spinner from '@/core/components/ui/spinner';
import Table from '@/core/components/ui/table';
import Error from '@/core/components/ui/error';
import { formatCurrency } from '@/core/lib/utils/currency';
import { BsThreeDotsVertical } from 'react-icons/bs';
import KebabMenu from '@/core/components/ui/kebab-menu';
import { MdDeleteForever, MdOutlineDeleteForever } from 'react-icons/md';
import { TbCash } from 'react-icons/tb';
import { RESERVATION_PAYMENT_STATUSES } from '../types';
import { formatISODate } from '@/core/lib/utils/format-date';
import { useDeleteReservation } from '../hooks/useDeleteReservation';
import { useSearchParams } from 'react-router-dom';
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider';
import Tag from '@/core/components/ui/tag';
import { reservationStatusAssets } from '../constants';
import Pagination from '@/core/components/ui/pagination';


export default function ReservationsTable() {
  
  const { data, isLoading, error } = useGetReservations()
  const { mutate, isLoading:isDeleting } = useDeleteReservation()
  const [searchParams,setSearchParams] = useSearchParams()
  const { setPopup } = useAppPopupProvider()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>

  function handleDelete(reservationId: string) {
    if (!isDeleting) {
      setPopup({
        description:"هل أنت متأكد من حذف الحجز؟",
        title:"حذف الحجز",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => mutate(reservationId)
      })
    }
  }

  function handlePayReservation(reservationId: string) {
    searchParams.set("reservation-payment-id",reservationId)
    setSearchParams(searchParams)
  }

  return (
    <div>
      <h3 className='mb-3 font-semibold'>قائمة الحجوزات</h3>
      <Table columns='grid-cols-[1fr_1fr_1fr_1fr_1fr_160px_150px_60px]'>
        <Table.Header>
          <Table.Cell>اسم العميل</Table.Cell>
          <Table.Cell>اسم الغرفة</Table.Cell>
          <Table.Cell>من</Table.Cell>
          <Table.Cell>إلى</Table.Cell>
          <Table.Cell>التكلفة</Table.Cell>
          <Table.Cell>حالة الدفع</Table.Cell>
          <Table.Cell> </Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        <Table.Body
          data={data?.data || []}
          render={(curr) => (
            <Table.Row key={curr.id}>
              <Table.Cell>{curr.Client.name}</Table.Cell>
              <Table.Cell>{curr.Room.name}</Table.Cell>
              <Table.Cell>{formatISODate(curr.fromDate)}</Table.Cell>
              <Table.Cell>{formatISODate(curr.toDate)}</Table.Cell>
              <Table.Cell>{formatCurrency(Number(curr.totalCost))}</Table.Cell>
              <Table.Cell>
                <Tag variant={reservationStatusAssets[curr.paymentStatus].color}>
                  {reservationStatusAssets[curr.paymentStatus].label}
                </Tag>
              </Table.Cell>
              <Table.Cell>
                <button 
                  onClick={() => handlePayReservation(curr.id)} 
                  className="payment_button"
                  disabled={curr.paymentStatus === RESERVATION_PAYMENT_STATUSES.PAID}
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
                      action: () => handleDelete(curr.id),
                      className: "text-red-400",
                      icon: <MdDeleteForever className='text-lg' />
                    },
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
  );
}