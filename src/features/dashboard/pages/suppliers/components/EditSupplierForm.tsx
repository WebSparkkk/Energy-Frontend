import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { Form } from '@/core/components/form/form'
import { Dialog } from '@radix-ui/react-dialog'
import { TSuppliersProviderValue, useSuppliersProvider } from '../SuppliersPage'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/core/components/form/form-input'
import { Button } from '@/core/components/ui/button'
import { z } from 'zod'
import { supplierFormSchema } from '../schema'
import { useEditSupplier } from '../hooks/useEditSupplier'
import { useGetSupplier } from '../hooks/useGetSupplier'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

type TFormFields = z.infer<typeof supplierFormSchema>

function EditSupplierForm() {
   
  const { 
    setIsEditSupplierFormVisible,
    isEditSupplierFormVisible
  } = useSuppliersProvider() as TSuppliersProviderValue

  const [searchParams,setSearchParams] = useSearchParams()
  const supplierId = searchParams.get("supplier-id") || ""  
  
  const { mutate, isLoading: isSubmitting } = useEditSupplier()
  const { data, isLoading, error } = useGetSupplier(supplierId)

  const supplier = data?.data

  useEffect(() => {
    if (!isLoading && !supplier) {
      searchParams.delete("supplier-id")
      setSearchParams(searchParams)
      setIsEditSupplierFormVisible(false)
      toast.error("Error, Supplier Not Found")
    }
  },[data])

  useEffect(()=>{
    searchParams.delete("supplier-id")
    setSearchParams(searchParams)
    setIsEditSupplierFormVisible(false)
  },[error])

  useEffect(()=>{
    if (!isEditSupplierFormVisible) {
      searchParams.delete("supplier-id")
      setSearchParams(searchParams)
    }
  },[isEditSupplierFormVisible])

  const methods = useForm<TFormFields>({
    defaultValues:{
      address:"",
      email:"",
      name:"",
      niche:"",
      phone:"",
      responsibleName:""
    },
    values:{
      address: supplier?.address || "",
      email: supplier?.email || "",
      name: supplier?.name || "",
      niche: supplier?.niche || "",
      phone: supplier?.phone || "",
      responsibleName: supplier?.responsibleName || "",
    }
  })

  function handleSubmit (data: TFormFields) {
    if (!isSubmitting) {
      mutate({
        supplier: data,
        supplierId
      },{
        onSuccess:() => {
          setIsEditSupplierFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isEditSupplierFormVisible}
      onOpenChange={setIsEditSupplierFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            إضافة عضو جديد
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods} 
          handleSubmit={handleSubmit} 
          className="space-y-4"
        >
          <FormInput
            label='العنوان'
            name='address'
            type='text'
          />
          <FormInput
            label='لبريد الإلكتروني'
            name='email'
            type='text'
          />
          <FormInput
            label='الاسم'
            name='name'
            type='text'
          />
          <FormInput
            label='الفئة'
            name='niche'
            type='text'
          />
          <FormInput
            label='الهاتف'
            name='phone'
            type='text'
          />
          <FormInput
            label='اسم المسؤول'
            name='responsibleName'
            type='text'
          />
          <DialogFooter className="flex justify-end gap-4 mt-6">
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsEditSupplierFormVisible(false)
              }}
              disabled={isSubmitting}
              variant="outline"
            >
              إلغاء
            </Button>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="default"
            >
              تعديل المورد 
            </Button>
          </DialogFooter>
        </Form>  
      </DialogContent> 
    </Dialog>
  );
}

export default EditSupplierForm