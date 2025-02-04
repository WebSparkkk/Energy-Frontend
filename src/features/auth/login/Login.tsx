import { Link } from 'react-router-dom';
import { Building2, Lock, ArrowRight, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form } from '@/core/components/form/form';
import { useLogin } from './hooks/useLogin';
import { FormInput } from '@/core/components/form/form-input';
import { Label } from '@/core/components/form/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(1,"يجب ادخال اسم المستخدم"),
  password: z.string().min(1,"يجب ادخال كلمة السر"),
  remember_me: z.boolean(),
})

type TFormFields = z.infer<typeof formSchema>

export default function LoginPage() {

  const { isLoading, loginFn } = useLogin()

  const methods = useForm<TFormFields>({
    defaultValues: {
      password: "",
      username: "",
      remember_me: false
    },
    resolver: zodResolver(formSchema)
  })

  function handleLogin (data: TFormFields) {
    loginFn({
      username: data.username,
      password: data.password
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Back Link */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4">
            <ArrowRight className="h-5 w-5" />
            <span>العودة للرئيسية</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-700">Energy</span>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">تسجيل دخول أصحاب العمل</h2>
          <p className="text-center text-gray-600">أدر مساحات العمل الخاصة بك بكفاءة</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <Form 
            handleSubmit={handleLogin} 
            form={methods} 
            className="space-y-6"
          >
            <div>
              <Label htmlFor="username">
                اسم المستخدم
              </Label>
              <div className="relative">
                <FormInput
                  rightIcon={<User className="text-gray-400" />}
                  id='username'
                  name='username'
                  className='pr-9'
                  type='text'
                  placeholder='Username'
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">
                كلمة المرور
              </Label>
              <div className="relative">
                <FormInput
                  rightIcon={<Lock className="text-gray-400 " />}
                  id='password'
                  className='pr-9'
                  name='password'
                  type='password'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <FormInput
                  id='remember_me'
                  name='remember_me'
                  type='checkbox'
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  showValidationMessage={false}
                />
                <Label htmlFor="remember_me" className='!mb-0'>
                  تذكرني
                </Label>
              </div>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                نسيت كلمة المرور؟
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
            >
              تسجيل الدخول
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
