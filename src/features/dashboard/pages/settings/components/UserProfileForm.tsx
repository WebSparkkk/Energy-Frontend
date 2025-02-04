import { Form } from '@/core/components/form/form'
import { FormInput } from '@/core/components/form/form-input'
import { Button } from '@/core/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import { Mail } from 'lucide-react'
import { MdAccountCircle } from 'react-icons/md'
import { z } from 'zod'
import { changeUserProfileSchema } from '../schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useChangeProfileSettings } from '../hooks/useChangeProfileSettings'
import { useGetUserProfile } from '../hooks/useGetUserProfile'
import Spinner from '@/core/components/ui/spinner'
import Error from '@/core/components/ui/error'
import DataItem from '@/core/components/ui/data-item'
import { formatCurrency } from '@/core/lib/utils/currency'
import Tag from '@/core/components/ui/tag'
import { userRolesAssets } from '../../users/constants'

type TFormFields = z.infer<typeof changeUserProfileSchema>

function UserProfileForm() {

  const [isFieldsDisabled,setIsFieldsDisabled] = useState<boolean>(true)
  const { mutate, isLoading: isSubmitting } = useChangeProfileSettings()
  const { data, isLoading, error } = useGetUserProfile()

  const user = data?.data
  const roleAssets = user ? userRolesAssets[user.role] : null

  const methods = useForm<TFormFields>({
    defaultValues:{
      email: "",
      username: ""
    },
    values: {
      email: data?.data.email || "",
      username: data?.data.username || ""
    },
    resolver: zodResolver(changeUserProfileSchema)
  })

  function handleSubmit ({ email, username }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        email,
        username
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
        <CardTitle>المعلومات الشخصية</CardTitle>
      </CardHeader>
      <CardContent>
        { error && <Error>{error.message}</Error>}
        {
          !isLoading ? (
            <>
              <div className="flex mb-4 justify-between items-center">
                <div className="flex flex-col gap-2">
                  <DataItem 
                    label="الرصيد" 
                    value={user ? (
                      <Tag variant='yellow' className='text-sm !py-1'>
                        {formatCurrency(user.balance)}
                      </Tag>
                    ) : "-"}
                  />
                  <DataItem 
                    label="المعدل اليومي" 
                    value={user ? (
                      <Tag variant='orange' className='text-sm !py-1'>
                        {formatCurrency(user.dailyRate)}
                      </Tag>
                    ) : "-"}
                  />
                  <DataItem 
                    label="الدور / الوظيفة" 
                    value={roleAssets ? (
                      <Tag 
                        variant={roleAssets.color}
                        className='text-sm !py-1'
                      >
                        {roleAssets.label}
                      </Tag>
                    ) : "-"}
                  />
                </div>
                <img 
                  className='object-cover w-[150px] aspect-square rounded-full' 
                  src='/images/user-avatar.jpg' 
                  alt='user avatar'
                />
              </div>
              <Form 
                form={methods}
                handleSubmit={handleSubmit} 
                className="space-y-4"
              >
                <FormInput
                  label='اسم المستخدم'
                  name='username'
                  type="text"
                  disabled={isFieldsDisabled}
                  rightIcon={<MdAccountCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
                />
                <FormInput
                  label='البريد الإلكتروني'
                  name="email"
                  type="text"
                  disabled={isFieldsDisabled}
                  rightIcon={<Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
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
                      تعديل معلومات المستخدم              
                    </Button>
                  )
                }
              </Form>
            </>
          ) : <Spinner/>
        }
      </CardContent>
    </Card>
  )
}

export default UserProfileForm