import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/form/input';
import { Search, Menu } from 'lucide-react';
import { useGetUserProfile } from '../pages/settings/hooks/useGetUserProfile';
import Tag from '@/core/components/ui/tag';
import { userRolesAssets } from '../pages/users/constants';
import { USER_ROLES } from '@/features/auth/login/types';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {

  const { data, isLoading } = useGetUserProfile()
  const user = data?.data
  const assets = userRolesAssets[user?.role as USER_ROLES]

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5 text-secondary-600" />
          </Button>
          
          <div className="relative hidden sm:block">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="بحث..."
              className="pr-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-left hidden sm:block">
            <div className={`font-[600] text-sm text-secondary-800 ${isLoading && "shimmer"}`}>
              {user?.username || "nothing"}
            </div>
            <Tag 
              variant={assets?.color || ""} 
              className={`text-[.7rem] font-medium py-[1px] ${isLoading && "shimmer"}`}
            >
              {assets?.label || "nothing"}
            </Tag>
          </div>
          {
            isLoading ? (
              <div className="w-12 aspect-square !rounded-full shimmer"/>
            ) :(
              <img
                src="/images/user-avatar.jpg"
                alt="Profile"
                className={`w-12 aspect-square pointer-events-none !rounded-full object-cover`}
              />
            )
          }
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="mt-4 sm:hidden">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="بحث..."
            className="w-full pr-10"
          />
        </div>
      </div>
    </header>
  );
}