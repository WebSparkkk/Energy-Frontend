import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/core/components/form/input';
import { formatCurrency } from '@/core/lib/utils/currency';
import { useGetSuppliers } from '../hooks/useGetSuppliers';
import Error from '@/core/components/ui/error';
import Spinner from '@/core/components/ui/spinner';
import Table from '@/core/components/ui/table';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import KebabMenu from '@/core/components/ui/kebab-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteForever, MdModeEditOutline, MdOutlineDeleteForever } from 'react-icons/md';
import { TSuppliersProviderValue, useSuppliersProvider } from '../SuppliersPage';
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider';
import { useDeleteSupplier } from '../hooks/useDeleteSupplier';
import Pagination from '@/core/components/ui/pagination';

export default function SuppliersList() {
  
  const { data, isLoading, error } = useGetSuppliers()
  const [searchParams, setSearchParams] = useSearchParams()
  const { mutate, isLoading: isDeleting } = useDeleteSupplier()
  const { setPopup } = useAppPopupProvider()
  
  const { 
    setIsEditSupplierFormVisible
  } = useSuppliersProvider() as TSuppliersProviderValue

  if (error) return <Error>{error.message}</Error>

  function handleEditSupplier (supplierId:string) {
    searchParams.set("supplier-id", supplierId)
    setSearchParams(searchParams)
    setIsEditSupplierFormVisible(true)
  }

  function handleDeleteSupplier (supplierId:string) {
    if (!isDeleting) {
      setPopup({
        title:"حذف المورد",
        description:"هل أنت متأكد من حذف المورد",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm: () => mutate(supplierId),
      })
    }
  }

  return (
    <Card className='w-[95%] mx-auto'>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>قائمة الموردين</CardTitle>
        <SearchBar/>
      </CardHeader>
      <CardContent>
        {
          !isLoading ? (
            <Table columns='grid-cols-[1fr_1fr_100px_1fr_1fr_1.5fr_50px]'>
              <Table.Header>
                <Table.Cell>المورد</Table.Cell>
                <Table.Cell>الفئة</Table.Cell>
                <Table.Cell>الرصيد</Table.Cell>
                <Table.Cell>العنوان</Table.Cell>
                <Table.Cell>هاتف</Table.Cell>
                <Table.Cell>البريد الإلكتروني</Table.Cell>
                <Table.Cell> </Table.Cell>
              </Table.Header>
              <Table.Body
                data={data?.data || []}
                render={(curr) => (
                  <Table.Row key={curr.id}>
                    <Table.Cell>{curr.name}</Table.Cell>
                    <Table.Cell>{curr.niche}</Table.Cell>
                    <Table.Cell>{formatCurrency(Number(curr.balance))}</Table.Cell>
                    <Table.Cell>{curr.address}</Table.Cell>
                    <Table.Cell>{curr.phone}</Table.Cell>
                    <Table.Cell>{curr.email}</Table.Cell>
                    <Table.Cell className='flex justify-center'>
                      <KebabMenu
                        label={<BsThreeDotsVertical />}
                        labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
                        optionsLabel='Actions'
                        options={[
                          {
                            label:"Delete",
                            action: () => handleDeleteSupplier(curr.id),
                            className: "text-red-400",
                            icon: <MdDeleteForever className='text-lg' />
                          },
                          {
                            label:"Edit",
                            action: () => handleEditSupplier(curr.id),
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
          ) : <Spinner/>
        }
      </CardContent>
    </Card>
  );
}

function SearchBar () {

  const [searchParams,setSearchParams] = useSearchParams()

  const initSearchValue = searchParams.get("search") || ""
  const [ value, setValue ] = useState<string>(initSearchValue)
  const [debouncedValue] = useDebounce(value, 300)
    
  const { 
    setIsAddSupplierFormVisible
  } = useSuppliersProvider() as TSuppliersProviderValue


  useEffect(()=>{
    searchParams.set("search",debouncedValue)
    setSearchParams(searchParams)
  },[debouncedValue])

  const toggleAddSupplierFormVisibility = () => {
    setIsAddSupplierFormVisible(true)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 sm:flex-none">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="بحث..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full sm:w-64 pr-10"
        />
      </div>
      <Button onClick={toggleAddSupplierFormVisibility}>
        <Plus className="h-4 w-4 ml-2" />
        إضافة مورد
      </Button>
    </div>
  )
}