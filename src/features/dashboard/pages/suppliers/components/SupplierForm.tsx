import { Button } from '@/core/components/ui/button';
import { z } from 'zod';
import { supplierFormSchema } from '../schema';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog';
import { Form } from '@/core/components/form/form';
import { FormInput } from '@/core/components/form/form-input';
import { TSuppliersProviderValue, useSuppliersProvider } from '../SuppliersPage';
import { useCreateSupplier } from '../hooks/useCreateSupplier';

type TFormFields = z.infer<typeof supplierFormSchema>

export default function SupplierForm() {
  
  const { 
    setIsAddSupplierFormVisible,
    isAddSupplierFormVisible
  } = useSuppliersProvider() as TSuppliersProviderValue 

  const { mutate, isLoading: isSubmitting } = useCreateSupplier()

  const methods = useForm<TFormFields>({
    defaultValues:{
      address:"",
      email:"",
      name:"",
      niche:"",
      phone:"",
      responsibleName:""
    }
  })

  function handleSubmit (data: TFormFields) {
    if (!isSubmitting) {
      mutate(data,{
        onSuccess:() => {
          setIsAddSupplierFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isAddSupplierFormVisible}
      onOpenChange={setIsAddSupplierFormVisible}
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
                setIsAddSupplierFormVisible(false)
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
              إضافة المورد 
            </Button>
          </DialogFooter>
        </Form>  
      </DialogContent> 
    </Dialog>
  );
}