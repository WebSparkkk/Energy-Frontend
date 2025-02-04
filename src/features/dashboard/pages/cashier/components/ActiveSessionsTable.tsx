
import { useGetActiveSessions } from '../hooks/useGetActiveSessions';
import Spinner from '@/core/components/ui/spinner';
import Error from '@/core/components/ui/error';
import Table from '@/core/components/ui/table';
import { formatISODate } from '@/core/lib/utils/format-date';
import { TbCash } from 'react-icons/tb';
import { ImInfo } from "react-icons/im";
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/core/components/ui/card';

export default function ActiveSessionsTable() {
  
  const { data, isLoading, error } = useGetActiveSessions()
  const [searchParams,setSearchParams] = useSearchParams()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>

  function handlePaySession(sessionId: string) {
    searchParams.set("payment-session-id",sessionId)
    setSearchParams(searchParams)
  }

  function handleShowSessionInfo (sessionId: string) {
    searchParams.set("session-client-id",sessionId)
    setSearchParams(searchParams)
  }

  return (
    <div>
      <h3 className='mb-3 font-semibold'>الجلسات النشطة</h3>
      <Table columns='grid-cols-[200px_1fr_1fr_50px_140px]'>
        <Table.Header>
          <Table.Cell>الاسم</Table.Cell>
          <Table.Cell>معلومات الاتصال</Table.Cell>
          <Table.Cell>تم الإنشاء في</Table.Cell>
          <Table.Cell> </Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        <Table.Body
          className='h-[60vh] overflow-auto'
          data={data?.data || []}
          render={(curr) => (
            <Table.Row key={curr.id}>
              <Table.Cell>{curr.name}</Table.Cell>
              <Table.Cell>{curr.contactInfo}</Table.Cell>
              <Table.Cell>{formatISODate(curr.createdAt)}</Table.Cell>
              <Table.Cell>
                <button 
                  onClick={() => handleShowSessionInfo(curr.id)}
                  className='hover:bg-zinc-200 duration-100 text-xl rounded-sm p-1 text-black'
                >
                  <ImInfo/>
                </button>
              </Table.Cell>
              <Table.Cell> 
                <button 
                  className="payment_button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePaySession(curr.id)
                  }} 
                >
                  دفع
                  <TbCash className='text-lg' />
                </button>
              </Table.Cell>
            </Table.Row>
          )}
        />
      </Table>
    </div>
  );
}