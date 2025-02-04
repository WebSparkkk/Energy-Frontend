import { useNavigate } from "react-router-dom";
import { useCookiesAccessProvider } from "../providers/cookies-provider";

export function useLogout () {
  const { removeCookie } = useCookiesAccessProvider()
  const navigate = useNavigate()

  function logout () {
    removeCookie("user_role")
    removeCookie("access_token")
    localStorage.removeItem("user")
    navigate("/")
  }
  return { logout }
}