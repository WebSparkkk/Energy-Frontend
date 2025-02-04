import Spinner from "@/core/components/ui/spinner"
import { useGetLogs } from "../hooks/useGetLogs"
import Error from "@/core/components/ui/error"
import { Card, CardContent } from "@/core/components/ui/card"
import Tag from "@/core/components/ui/tag"
import { formatISODate } from "@/core/lib/utils/format-date"
import KebabMenu from "@/core/components/ui/kebab-menu"
import { useAuth } from "@/core/providers/auth-provider"
import { USER_ROLES } from "@/features/auth/login/types"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdDeleteForever, MdOutlineDeleteForever } from "react-icons/md"
import { userRolesAssets } from "../../users/constants"
import { useAppPopupProvider } from "@/core/providers/app-popup/app-popup-provider"
import { useDeleteLog } from "../hooks/useDeleteLog"
import { logsActionsAssets } from "../constants"
import Pagination from "@/core/components/ui/pagination"

function ActivityLogViewer() {

  const { data, isLoading, error } = useGetLogs()
  const { setPopup } = useAppPopupProvider()
  const { mutate, isLoading: isDeleting } = useDeleteLog()
  const { userRole } = useAuth()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>

  const logs = data?.data

  function handleDeleteLog (id: string) {
    if (!isDeleting) {
      setPopup({
        description:"هل أنت متأكد من حذف السجل؟",
        title:"حذف السجل",
        isOpen: true,
        icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
        onConfirm:() => mutate(id)
      })
    }
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="max-h-[65vh] overflow-auto p-8 mb-4">  
          <div className="flex h-full flex-col gap-4 p-0">
            {
              logs?.map(({action, createdAt, details, id, AdminUser}) => {
                const { color, icon: Icon, label } = logsActionsAssets[action]
                const { role, username } = AdminUser

                return (
                  <div key={id} className="bg-gray-50 p-4 rounded-lg flex items-center gap-10">
                    <Tag className="h-[60px] w-[60px] flex items-center justify-center" variant={color}>
                      <Icon className="text-2xl"/>
                    </Tag>
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-semibold text-zinc-700">{label}</p>
                        <p className="text-sm text-zinc-700 font-medium">{formatISODate(createdAt)}</p>
                      </div>
                      <div className="flex gap-4">
                        <Tag 
                          className="text-sm"
                          variant={userRolesAssets[role].color}
                        >
                          {userRolesAssets[role].label}
                        </Tag>
                        <p className="font-medium">{username}</p>
                      </div>
                      <p className="text-[1rem] text-zinc-700 font-[500]">{details}</p>
                    </div>
                    <div className="flex items-start font-semibold">
                      <KebabMenu
                        label={<BsThreeDotsVertical/>}
                        labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
                        optionsLabel="Actions"
                        options={[
                          {
                            label:"Delte",
                            icon: <MdDeleteForever />,
                            action: () => handleDeleteLog(id),
                            disabled: userRole !== USER_ROLES.ADMIN,
                            className: "text-red-500"
                          }
                        ]}
                      />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        { data && <Pagination totalPages={data.totalPages}/>}
      </CardContent>
    </Card>
  )
}

export default ActivityLogViewer