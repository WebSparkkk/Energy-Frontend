import { Form } from '@/core/components/form/form';
import { Card, CardContent } from '@/core/components/ui/card';
import { useForm } from 'react-hook-form';
import { treasurySpecificTypes, treasuryTransactionTypes } from '../../treasury/constants';
import FormSelect from '@/core/components/form/form-select';
import { FormInput } from '@/core/components/form/form-input';
import { useEffect, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TAnalysisSpecificType, TAnalysisTransactionType } from '../types';
import { analysisSpecificTypes, analysisTransactionTypes } from '../constants';

type TFormFields = {
  toDate: string,
  fromDate: string,
  transactionType: {
    value: TAnalysisTransactionType,
    label: string
  },
  specificType: {
    value: TAnalysisSpecificType,
    label: string
  },
}

function AnalysisFilters() {

  const [searchParams,setSearchParams] = useSearchParams()

  const methods = useForm<TFormFields>({
    defaultValues: {
      fromDate: "",
      toDate: "",
      transactionType: treasuryTransactionTypes[0],
      specificType: treasurySpecificTypes[0]
    } 
  })

  const { watch } = methods

  function handleFiltering({ fromDate, specificType, toDate, transactionType }: TFormFields) {
    searchParams.set("fromDate", fromDate)
    searchParams.set("toDate", toDate)
    searchParams.set("transactionType", transactionType.value)
    searchParams.set("specificType", specificType.value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const subscription = watch((values) => {
      handleFiltering(values as TFormFields);
    });
  
    return () => subscription.unsubscribe(); 
  }, [watch]); 
  
  useLayoutEffect(() => {
    searchParams.delete("fromDate")
    searchParams.delete("toDate")
    searchParams.delete("transactionType")
    searchParams.delete("specificType")
    setSearchParams(searchParams)
  },[])

  return (
    <Card>
      <CardContent className="pt-6 mb-6">
        <Form 
          form={methods}
          handleSubmit={handleFiltering}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="space-y-2">
            <FormInput
              type='date'
              name="fromDate"
              label='من تاريخ'
            />
          </div>

          <div className="space-y-2">
            <FormInput
              type='date'
              name='toDate'
              label='إلى تاريخ'
            />
          </div>

          <div className="space-y-2">
            <FormSelect
              label='نوع المعاملة'
              name="transactionType"
              placeholder='نوع المعاملة'
              options={analysisTransactionTypes}
            />
          </div>

          <div className="space-y-2">
            <FormSelect
              label='التصنيف'
              placeholder='التصنيف'
              name='specificType'
              options={analysisSpecificTypes}
            />
          </div>
          <button className='hidden'/>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AnalysisFilters;




