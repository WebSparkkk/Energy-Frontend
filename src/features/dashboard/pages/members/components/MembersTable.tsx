import { useGetMembers } from '../hooks.ts/useGetMembers';
import Table from '@/core/components/ui/table';
import Spinner from '@/core/components/ui/spinner';
import { formatISODate } from '@/core/lib/utils/format-date';
import Error from '@/core/components/ui/error';
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider';
import { MdDeleteForever, MdModeEditOutline, MdOutlineDeleteForever } from 'react-icons/md';
import { useDeleteMember } from '../hooks.ts/useDeleteMember';
import KebabMenu from '@/core/components/ui/kebab-menu';
import { BsThreeDotsVertical } from "react-icons/bs";
import { TMembersProviderValue, useMembersProvider } from '../MembersPage';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/core/components/ui/pagination';

export default function MembersTable() {
  const { data, isLoading, error } = useGetMembers()
  const { mutate, isLoading: isDeleting } = useDeleteMember()
  const { setPopup } = useAppPopupProvider()

  const { setIsEditMemberFormVisible } = useMembersProvider() as TMembersProviderValue
  const [searchParams, setSearchParams] = useSearchParams()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>

  function handleDeleteMember (userId: string) {
    if (!isDeleting) {
      setPopup({
        title:"حذف المستخدم",
        description:"هل أنت متأكد من حذف المستخدم؟",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm: () => mutate(userId),
      })
    }
  }

  function handleEditMember(memberId: string) {
    searchParams.set("member-id", memberId.toString())
    setSearchParams(searchParams)
    setIsEditMemberFormVisible(true)
  }

  return (
    <div className='w-full'>
      <h3 className='mb-3 font-semibold'>قائمة الأعضاء</h3>
      <Table columns={`grid-cols-[1fr_.5fr_1fr_50px]`}>
        <Table.Header>
          <Table.Cell>العضو</Table.Cell>
          <Table.Cell>الحالة</Table.Cell>
          <Table.Cell>تاريخ البدء</Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        <Table.Body
          data={data?.data || []}
          render={(curr) => (
            <Table.Row key={curr.id}>
              <Table.Cell>{curr.name}</Table.Cell>
              <Table.Cell>{curr.contactInfo}</Table.Cell>
              <Table.Cell>{formatISODate(curr.createdAt)}</Table.Cell>
              <Table.Cell className='!flex justify-center'>
                <KebabMenu
                  label={<BsThreeDotsVertical />}
                  labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
                  optionsLabel='Actions'
                  options={[
                    {
                      label:"Delete",
                      action: () => handleDeleteMember(curr.id),
                      className: "text-red-400",
                      icon: <MdDeleteForever className='text-lg' />
                    },
                    {
                      label:"Edit",
                      action: () => handleEditMember(curr.id),
                      className: "text-yellow-500",
                      icon: <MdModeEditOutline className='text-lg' />
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