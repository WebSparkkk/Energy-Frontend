import { Form } from '@/core/components/form/form'
import { FormInput } from '@/core/components/form/form-input'
import { Button } from '@/core/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import { Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { resetPasswordFormSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useChangePassword } from '../hooks/useChangePassword'

type TFormFields = z.infer<typeof resetPasswordFormSchema>

function ResetPasswordForm() {

  const [isFieldsDisabled,setIsFieldsDisabled] = useState<boolean>(true)
  const { mutate, isLoading: isSubmitting } = useChangePassword()

  const methods = useForm<TFormFields>({
    defaultValues:{
      confirm_new_password: "",
      new_password: "",
      old_password: ""
    },
    resolver: zodResolver(resetPasswordFormSchema)
  })


  function handleSubmit (fields: TFormFields) {
    if (!isSubmitting) {
      mutate({
        confirmNewPassword: fields.confirm_new_password,
        newPassword: fields.new_password,
        oldPassword: fields.old_password
      },{
        onSuccess: () => {
          methods.reset()
          setIsFieldsDisabled(true)
        }
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>تغيير كلمة المرور</CardTitle>
      </CardHeader>
      <CardContent>
        <Form 
          form={methods}
          handleSubmit={handleSubmit} 
          className="space-y-4"
        >
          <FormInput
            label='كلمة المرور الحالية'
            type="password"
            rightIcon={<Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
            name='old_password'
            disabled={isFieldsDisabled}
          />
          
          <FormInput
            label="كلمة مرور جديدة"
            type="password"
            rightIcon={<Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
            name='new_password'
            disabled={isFieldsDisabled}
          />

          <FormInput
            label="تأكيد كلمة المرور الجديدة"
            type="password"
            rightIcon={<Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
            name='confirm_new_password'
            disabled={isFieldsDisabled}
          />
          {
            !isFieldsDisabled ? (
              <div className="flex gap-4">
                <Button 
                  type="submit"
                >
                  حفظ التغييرات                
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsFieldsDisabled(true)
                    methods.reset()
                  }}
                >
                  إلغاء
                </Button>
              </div>
            ) : (
              <Button 
                type="button"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault()
                  setIsFieldsDisabled(false)
                }}
              >
                تغيير كلمة المرور
              </Button>
            )
          }
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm