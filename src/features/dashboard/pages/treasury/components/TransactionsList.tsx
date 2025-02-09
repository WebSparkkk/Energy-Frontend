import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Search, Plus } from 'lucide-react';
import { formatCurrency } from '@/core/lib/utils/currency';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { TRANSACTION_TYPES, TTransactionType } from '../types';
import Spinner from '@/core/components/ui/spinner';
import Error from '@/core/components/ui/error';
import { Input } from '@/core/components/form/input.v2';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { formatISODate } from '@/core/lib/utils/format-date';
import { Button } from '@/core/components/ui/button';
import { TTreasuryProviderValue, useTreasuryProvider } from '../TreasuryPage';
import Pagination from '@/core/components/ui/pagination';

export default function TransactionsList() {
  const { data, isLoading, error } = useGetTransactions()
  const [searchParams,setSearchParams] = useSearchParams()

  if (error) return <Error>{error.message}</Error>


  function handleClick(transactionId: string) {
    searchParams.set("transaction-id",transactionId)
    setSearchParams(searchParams)
  }

  return (
    <>
      <Card className='flex flex-col h-[75vh]'>
        <CardHeader>
          <CardTitle className='mb-4'>المعاملات المالية</CardTitle>  
          <SearchBar/>
        </CardHeader>
        <CardContent className='flex-1 overflow-hidden p-2'>
          <div className="overflow-auto h-full flex flex-col gap-4 p-4">
            {
              !isLoading && !error ? (
                data?.data.map((transaction) => (
                  <div
                    key={transaction.id}
                    onClick={()=> handleClick(transaction.id)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg duration-100 hover:bg-gray-200/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${transactionTypeColor[transaction.transactionType]}`}>
                        {
                        transaction.transactionType === TRANSACTION_TYPES.INCOME ? (
                            <ArrowDownRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          )
                        }
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">
                          {formatISODate(transaction.date)}
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${
                        transaction.transactionType === TRANSACTION_TYPES.INCOME
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.transactionType === TRANSACTION_TYPES.INCOME ? '+ ' : '- '}
                        {formatCurrency(Number(transaction.amount))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.specificType}
                      </div>
                    </div>
                  </div>
                )) 
              ) : <Spinner/>
            }

            {data?.data.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد معاملات مطابقة
              </div>
            )}
          </div>
        </CardContent>
        <div className='w-full p-4'>
          { data && <Pagination totalPages={data.totalPages}/>}
        </div>
      </Card>

    </>
  );
}

function SearchBar () {

  const [ searchParams, setSearchParams ] = useSearchParams()
  const initSearchValue = searchParams.get("search") || ""
  const [ value, setValue ] = useState<string>(initSearchValue)
  const [debouncedValue] = useDebounce(value, 300)

  const { setIsAddTreasuryFormVisible } = useTreasuryProvider() as TTreasuryProviderValue

  useEffect(()=>{
    searchParams.set("search",debouncedValue)
    setSearchParams(searchParams)
  },[debouncedValue])

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative flex-1 sm:flex-none">
        <Input
          rightIcon={<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />}
          type="text"
          placeholder="بحث..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full sm:w-64 pr-10 outline-none"
        />
      </div>
      <Button onClick={() => setIsAddTreasuryFormVisible(true)}>
        <Plus className="h-4 w-4 ml-2" />
        إضافة المعاملة  
      </Button>
    </div>
  )
}

const transactionTypeColor: Record<TTransactionType,string> = {
  expense: "bg-red-100",
  income: "bg-green-100"
}