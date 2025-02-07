import Table from '@/core/components/ui/table';
import { useGetRooms } from '../hooks/useGetRooms';
import Error from '@/core/components/ui/error';
import Spinner from '@/core/components/ui/spinner';
import { formatCurrency } from '@/core/lib/utils/currency';
import Tag, { TTagColorVariant } from '@/core/components/ui/tag';
import KebabMenu from '@/core/components/ui/kebab-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteForever, MdModeEditOutline, MdOutlineDeleteForever } from 'react-icons/md';
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider';
import { useDeleteRoom } from '../hooks/useDeleteRoom';
import { useSearchParams } from 'react-router-dom';
import { TRoomsProviderValue, useRoomsProvider } from '../RoomsPage';
import Pagination from '@/core/components/ui/pagination';
import { roomStatusAssets } from '../constants';

export default function RoomsTable() {

  const { data, isLoading, error } = useGetRooms()
  const { setPopup } = useAppPopupProvider()
  const { mutate, isLoading: isDeleting } = useDeleteRoom()
  const [searchParams,setSearchParams] = useSearchParams()
  const { setIsEditRoomFormVisible } = useRoomsProvider() as TRoomsProviderValue

  if (error) return <Error>{error.message}</Error>

  function handleEdit(roomId: string) {
    searchParams.set("room-id",roomId)
    setSearchParams(searchParams)
    setIsEditRoomFormVisible(true)
  }

  function handleDelete(timerId: string) {
    if (!isDeleting) {
      setPopup({
        description:"هل أنت متأكد من حذف الغرفة؟",
        title:"حذف الغرفة",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => mutate(timerId)
      })
    }
  }

  return (
    <div>
      <h3 className='mb-3 font-semibold'>قائمة الغرف</h3>
      {
        !isLoading ? (
          <Table columns='grid-cols-[1fr_100px_180px_1fr_50px]'>
            <Table.Header>
              <Table.Cell>الغرفة</Table.Cell>
              <Table.Cell>السعة</Table.Cell>
              <Table.Cell>الحالة</Table.Cell>
              <Table.Cell>السعر بالساعة</Table.Cell>
              <Table.Cell> </Table.Cell>
            </Table.Header>
            <Table.Body
              data={data?.data || []}
              render={(curr) => (
                <Table.Row key={curr.id}>
                  <Table.Cell>{curr.name}</Table.Cell>
                  <Table.Cell>{curr.capacity}</Table.Cell>
                  <Table.Cell>
                    <Tag variant={roomStatusAssets[curr.status].color}>
                      {roomStatusAssets[curr.status].label}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>{formatCurrency(Number(curr.hourlyRate))}</Table.Cell>
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
                        {
                          label:"Edit",
                          action: () => handleEdit(curr.id),
                          className: "text-yellow-500",
                          icon: <MdModeEditOutline className='text-lg' />
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
        ) : <Spinner/>
      }
    </div>
  );
}
