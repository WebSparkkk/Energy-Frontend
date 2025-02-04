import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { TCashierProviderValue, useCashierProvider } from '../CashierPage'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/core/components/form/form'
import { FormInput } from '@/core/components/form/form-input'
import { Button } from '@/core/components/ui/button'
import { useCreateSession } from '../hooks/useCreateSession'
import { useState } from 'react'
import { z } from 'zod'
import { createSessionWithExistingMemberSchema, createSessionWithNewMemberSchema } from '../schema'
import FormAsyncSelect from '@/core/components/form/form-async-select'
import { fetchClientOptionsService } from '../services'

type TFormFields = 
z.infer<typeof createSessionWithExistingMemberSchema> & 
z.infer<typeof createSessionWithNewMemberSchema>

type TMethod = "create_new_client" | "use_existing_client"

function CreateSessionForm() {

  const { 
    isAddSessionFormVisible, 
    setIsAddSessionFormVisible 
  } = useCashierProvider() as TCashierProviderValue

  const [method, setMethod] = useState<TMethod>("use_existing_client")

  const methods = useForm<TFormFields>({
    defaultValues:{
      name: '',
      contactInfo: '',
    },
    resolver: zodResolver(
      method === "create_new_client" ?
      createSessionWithNewMemberSchema :
      createSessionWithExistingMemberSchema
    )
  })

  const { 
    createSessionFn, 
    isLoading: isSubmitting 
  } = useCreateSession({
    onSuccess() {
      setIsAddSessionFormVisible(false)
      methods.reset()
    }
  })

  function handleSubmit ({client: clientId, contactInfo, hourlyRate, name}: TFormFields) {
    createSessionFn({
      method,
      payload:{
        client:{
          name,
          contactInfo
        },
        hourlyRate: Number(hourlyRate),
        clientId: clientId?.value
      }
    })
  }

  return (
    <Dialog
      open={isAddSessionFormVisible}
      onOpenChange={setIsAddSessionFormVisible}
    >
      <DialogContent>
        <DialogHeader className='flex items-center justify-between flex-row mt-6'>
          <DialogTitle>
            إنشاء جلسة جديدة
          </DialogTitle>
          {
            method === "create_new_client" && (
              <Button onClick={() => setMethod("use_existing_client")}>
                استخدام عميل موجود
              </Button>
            )
          }
          {
            method === "use_existing_client" && (
              <Button onClick={() => setMethod("create_new_client")}>
                إنشاء عميل جديد
              </Button>
            )
          }
        </DialogHeader>
        <Form
          form={methods} 
          handleSubmit={handleSubmit} 
          className="space-y-4"
        >
          {
            method === "create_new_client" && (
              <>
                <FormInput
                  label='اسم العميل'
                  name='name'
                  type='text'
                />
                <FormInput
                  label='معلومات اتصال العميل'
                  name='contactInfo'
                  type='text'
                />
              </>
            ) 
          }
          {
            method === "use_existing_client" && (
              <FormAsyncSelect
                fetchOptions={fetchClientOptionsService}
                label='اختر العميل'
                placeholder='العميل'                  
                name='client'
              />
            ) 
          }
          <FormInput
            label="السعر بالساعة"
            name="hourlyRate"
            placeholder="السعر بالساعة"
            type="number"
          />
          <DialogFooter className="flex justify-end gap-4 mt-6">
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsAddSessionFormVisible(false)
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
              className='!ml-0'
            >
              إنشاء جلسة
            </Button>
          </DialogFooter>
        </Form>  
      </DialogContent>
    </Dialog>
  )
}

export default CreateSessionForm