import { useGetUser } from "../../users/hooks/useGetUser";
import { useAuth } from "@/core/providers/auth-provider";

export function useGetUserProfile () {
  const auth = useAuth()
  const userId = auth.user?.id || ""

  return useGetUser(userId)
}