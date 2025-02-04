import { Form } from '@/core/components/form/form';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/core/components/form/form-input';
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { TMembersProviderValue, useMembersProvider } from '../MembersPage';
import { Button } from '@/core/components/ui/button';
import { useCreateMember } from '../hooks.ts/useCreateMember';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/core/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { memberFormSchema } from '../schema';

type TFormFields = z.infer<typeof memberFormSchema>

export default function AddMemberForm() {
    
  const { 
    isAddMemberFormVisible,
    setIsAddMemberFormVisible
  } = useMembersProvider() as TMembersProviderValue
  const { mutate, isLoading: isSubmitting } = useCreateMember()

  const methods = useForm<TFormFields>({
    defaultValues:{
      name: '',
      contactInfo: '',
    },
    resolver: zodResolver(memberFormSchema)
  })

  function handleSubmit (data: TFormFields) {
    if (!isSubmitting) {
      mutate(data,{
        onSuccess() {
          setIsAddMemberFormVisible(false)
          methods.reset()
        },
      })
    }
  }

  return (
    <Dialog 
      open={isAddMemberFormVisible}
      onOpenChange={setIsAddMemberFormVisible}
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
            label='الاسم'
            name='name'
            type='text'
          />
          <FormInput
            label='معلومات الاتصال'
            name='contactInfo'
            type='text'
          />

          <DialogFooter className="flex justify-end gap-4 mt-6">
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsAddMemberFormVisible(false)
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
              إضافة عضو
            </Button>
          </DialogFooter>
        </Form>  
      </DialogContent> 
    </Dialog>
  );
}