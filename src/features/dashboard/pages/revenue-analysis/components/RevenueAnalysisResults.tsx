
import Table from '@/core/components/ui/table';
import { formatCurrency } from '@/core/lib/utils/currency';
import { useRevenueAnalysisProvider } from '../RevenueAnalysisPage';
import { formatISODate } from '@/core/lib/utils/format-date';

export default function RevenueAnalysisResults() {

  const result = useRevenueAnalysisProvider()

  return (
    <Table columns='grid-cols-[1fr_1fr_1fr_1fr_1fr]'>
      <Table.Header>
        <Table.Cell>التاريخ</Table.Cell>
        <Table.Cell>النوع</Table.Cell>
        <Table.Cell>تاريخ التسوية</Table.Cell>
        <Table.Cell>النقد في الآلة قبل</Table.Cell>
        <Table.Cell>النقد في الآلة بعد</Table.Cell>
      </Table.Header>
      <Table.Body
        data={result?.treasuryRecords || []}
        className='!min-h-[35.25vh] max-h-[35.25vh] overflow-auto'
        render={(curr) => (
          <Table.Row key={curr.id}>
            <Table.Cell>{formatISODate(curr.date)}</Table.Cell>
            <Table.Cell>{curr.specificType}</Table.Cell>
            <Table.Cell>
              { 
                curr.reconciliationDate ?
                formatISODate(curr.reconciliationDate) : "-"
              }
            </Table.Cell>
            <Table.Cell>{formatCurrency(Number(curr.cashInMachineAfter))}</Table.Cell>
            <Table.Cell>{formatCurrency(Number(curr.cashInMachineAfter))}</Table.Cell>
          </Table.Row>
        )}
      />
    </Table>
  );
}