import Table from '@/core/components/ui/table';
import { useGetUsers } from '../hooks/useGetUsers';
import Spinner from '@/core/components/ui/spinner';
import Error from '@/core/components/ui/error';
import { formatISODate } from '@/core/lib/utils/format-date';
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { MdDeleteForever, MdModeEditOutline, MdOutlineDeleteForever } from "react-icons/md";
import KebabMenu from '@/core/components/ui/kebab-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TUserProviderValue, useUsersProvider } from '../UsersPage';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/core/components/ui/pagination';
import { formatCurrency } from '@/core/lib/utils/currency';
import Tag from '@/core/components/ui/tag';
import { userRolesAssets } from '../constants';

export default function UsersTable() {

  const { data, isLoading, error } = useGetUsers()
  const { setPopup } = useAppPopupProvider()
  const { mutate, isLoading: isDeleting } = useDeleteUser()
  const { setIsEditUserFormVisible } = useUsersProvider() as TUserProviderValue
  const [searchParams,setSearchParams] = useSearchParams()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>

  function handleUserDelete (userId: string) {
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

  function handleUserEdit (userId: string) {
    setIsEditUserFormVisible(true)
    searchParams.set("user-id",userId)
    setSearchParams(searchParams)
  }

  return (
    <div className='w-full'>
      <h3 className='mb-3 font-semibold'>قائمة المستخدمين</h3>
      <Table columns={"grid-cols-[.7fr_.7fr_.7fr_.7fr_200px_1fr_50px]"}>
        <Table.Header>
          <Table.Cell>المستخدم</Table.Cell>
          <Table.Cell>البريد الإلكتروني</Table.Cell>
          <Table.Cell>التقييم اليومي</Table.Cell>
          <Table.Cell>الرصيد</Table.Cell>
          <Table.Cell>الوظيفه</Table.Cell>
          <Table.Cell>تاريخ الإنشاء</Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        <Table.Body
          data={data?.data || []}
          render={(curr) => (
            <Table.Row key={curr.id}>
              <Table.Cell>{curr.username}</Table.Cell>
              <Table.Cell>{curr.email}</Table.Cell>
              <Table.Cell>{formatCurrency(curr.dailyRate) || "-"}</Table.Cell>
              <Table.Cell>  
                <Tag variant={+curr.balance > 0 ? "green" : (+curr.balance < 0 ? "red" : "gray")}>
                  {formatCurrency(curr.balance)}
                </Tag>
              </Table.Cell>
              <Table.Cell>
                <Tag variant={userRolesAssets[curr.role].color}>
                  {userRolesAssets[curr.role].label}
                </Tag>
              </Table.Cell>
              <Table.Cell>{formatISODate(curr.createdAt)}</Table.Cell>
              <Table.Cell className='!flex justify-center'>
                <KebabMenu
                  label={<BsThreeDotsVertical />}
                  labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
                  optionsLabel='Actions'
                  options={[
                    {
                      label:"Delete",
                      action: () => handleUserDelete(curr.id),
                      className: "text-red-400",
                      icon: <MdDeleteForever className='text-lg' />
                    },
                    {
                      label:"Edit",
                      action: () => handleUserEdit(curr.id),
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