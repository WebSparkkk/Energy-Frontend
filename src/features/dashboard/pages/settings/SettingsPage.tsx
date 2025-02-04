import ResetPasswordForm from './components/ResetPasswordForm';
import UserProfileForm from './components/UserProfileForm';

export default function SettingsPage() {

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">إعدادات الحساب</h1>
        <p className="text-gray-600">تحديث معلومات حسابك</p>
      </div>

      <div className="space-y-6">
        <UserProfileForm/>
        <ResetPasswordForm/>
      </div>
    </div>
  );
}