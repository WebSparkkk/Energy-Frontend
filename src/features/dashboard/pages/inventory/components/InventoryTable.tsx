
import { formatCurrency } from '@/core/lib/utils/currency';
import Table from '@/core/components/ui/table';
import { useGetInventories } from '../hooks/useGetInventories';
import Spinner from '@/core/components/ui/spinner';
import Error from '@/core/components/ui/error';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosReturnLeft } from 'react-icons/io';
import { MdDeleteForever, MdOutlineDeleteForever } from 'react-icons/md';
import KebabMenu from '@/core/components/ui/kebab-menu';
import { TInventoryProviderValue, useInventoryProvider } from '../InventoryPage';
import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider';
import { useSearchParams } from 'react-router-dom';
import { useDeleteInventoryItem } from '../hooks/useDeleteInventory';
import Tag from '@/core/components/ui/tag';
import { inventoryUnitTypeAssets } from '../constants';
import Pagination from '@/core/components/ui/pagination';



export default function InventoryTable() {

  const { data, isLoading, error } = useGetInventories()
  const [searchParams, setSearchParams] = useSearchParams()
  const { mutate, isLoading:isDeleting } = useDeleteInventoryItem()

  const { 
    setIsRestockFormVisible,
    setIsReturnStockFormVisible
  } = useInventoryProvider() as TInventoryProviderValue
  const { setPopup } = useAppPopupProvider()

  if (error) return <Error>{error.message}</Error>

  function handleDeleteInventory (inventoryId:string) {
    if (!isDeleting) {
      setPopup({
        title:"حذف عنصر المخزون",
        description:"هل أنت متأكد من حذف عنصر المخزون",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm: () => mutate(inventoryId),
      })
    }
  }

  function handleRestock (inventoryId:string) {
    searchParams.set("inventory-id", inventoryId)
    setSearchParams(searchParams)
    setIsRestockFormVisible(true)
  }
  
  function handleReturnStock (inventoryId:string) {
    searchParams.set("inventory-id", inventoryId)
    setSearchParams(searchParams)
    setIsReturnStockFormVisible(true)
  }
  
  return (
    <div>
      <h3 className='mb-3 font-semibold'>قائمة المخزون</h3>
      {
        !isLoading ? (
          <Table columns='grid-cols-[1fr_1fr_1fr_1fr_1fr_60px]'>
            <Table.Header>
              <Table.Cell>المنتج</Table.Cell>
              <Table.Cell>الوحدة</Table.Cell>
              <Table.Cell>الكمية</Table.Cell>
              <Table.Cell>سعر البيع لكل وحدة</Table.Cell>
              <Table.Cell>إجمالي سعر الشراء</Table.Cell>
              <Table.Cell> </Table.Cell>
            </Table.Header>
            <Table.Body
              data={data?.data || []}
              render={(curr) => (
                <Table.Row key={curr.id}>
                  <Table.Cell>{curr.name}</Table.Cell>
                  <Table.Cell>
                    <Tag variant={inventoryUnitTypeAssets[curr.unitType].color}>
                      {inventoryUnitTypeAssets[curr.unitType].label}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>{Number(curr.stockQuantity)}</Table.Cell>
                  <Table.Cell>{formatCurrency(Number(curr.sellingPricePerUnit))}</Table.Cell>
                  <Table.Cell>{formatCurrency(Number(curr.totalBuyingPrice))}</Table.Cell>
                  <Table.Cell>
                    <KebabMenu
                      label={<BsThreeDotsVertical />}
                      labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
                      optionsLabel='Actions'
                      options={[
                        {
                          label:"Delete",
                          action: () => handleDeleteInventory(curr.id),
                          className: "text-red-400",
                          icon: <MdDeleteForever className='text-lg' />
                        },
                        {
                          label:"Restock",
                          action: () => handleRestock(curr.id),
                          className: "text-blue-500",
                          icon: <IoIosReturnLeft className='text-lg' />
                        },
                        {
                          label:"Return Stock",
                          action: () => handleReturnStock(curr.id),
                          className: "text-yellow-500",
                          icon: <IoIosReturnLeft className='text-lg' />
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
    </div>
  );
}