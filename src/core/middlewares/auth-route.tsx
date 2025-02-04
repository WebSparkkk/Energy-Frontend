import { Navigate } from "react-router-dom"
import { useAuth } from "../providers/auth-provider"

export function AuthRoute ({ children }: TChildren) {
  const auth = useAuth()
  if (auth.isAuth) {
    return <Navigate to='/dashboard'/>
  }
  return children
}