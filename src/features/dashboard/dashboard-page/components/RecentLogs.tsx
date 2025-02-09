import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import Tag from '@/core/components/ui/tag';
import { TDashboardProviderValue, useDashboardProvider } from '../DashboardPage';
import { userRolesAssets } from '../../pages/users/constants';
import { logsActionsAssets } from '../../pages/activity-logs/constants';
import { formatISODate } from '@/core/lib/utils/format-date';


export function RecentLogs() {

  const { history } = useDashboardProvider() as TDashboardProviderValue

  return (
    <Card className='w-2/5 h-full flex flex-col pl-4 pb-4'>
      <CardHeader>
        <CardTitle>آخر السجلات</CardTitle>
      </CardHeader>
      <CardContent className='overflow-auto flex-1'>
        <div className="space-y-4">
          {history.map(({ AdminUser, createdAt, id, action }) => {
            const { color, icon: Icon, label } = logsActionsAssets[action]
            const { role, username } = AdminUser
            return (
              <div key={id} className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <Tag className="h-[36px] w-[36px] flex items-center justify-center !p-2" variant={color}>
                  <Icon className="text-lg"/>
                </Tag>
                <div className="flex flex-col gap-2 flex-1">
                
                  <p className="text-sm font-semibold text-zinc-700">{label}</p>
                  <p className="text-[.75rem] text-zinc-700 font-medium">{formatISODate(createdAt)}</p>

                  <div className="flex gap-3 items-center">
                    <Tag 
                      className="text-[.7rem] !py-1 w-fit"
                      variant={userRolesAssets[role].color}
                    >
                      {userRolesAssets[role].label}
                    </Tag>
                    <p className="font-medium text-[.75rem]">{username}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}