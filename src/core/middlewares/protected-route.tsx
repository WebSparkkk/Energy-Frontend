import { Navigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuth } from "../providers/auth-provider"
import { TUserRole } from "@/features/auth/login/types"

type TProtectedRouteProps = {
  roles: TUserRole[],
  withLogout?: boolean,
  redirectTo: string
} & TChildren

export default function ProtectedRoute ({ 
  children, 
  roles, 
  redirectTo,
  withLogout = false
}: TProtectedRouteProps) {

  const auth = useAuth()
  const { logout } = useLogout()

  const doesMatch = roles.find(curr => curr === auth.userRole)
  if (doesMatch) {
    return children
  }else {
    withLogout && logout()
    return <Navigate to={redirectTo}/>
  }
}