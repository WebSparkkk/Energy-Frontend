import { useNavigate } from "react-router-dom"
import { ILocalUser, ILoginPayload, ILoginResponse } from "../types"
import { useMutation } from "react-query";
import { loginService } from "../serviecs";
import { useCookiesAccessProvider } from "@/core/providers/cookies-provider";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useLogin () {
  const navigate = useNavigate() 
  const { setCookie } = useCookiesAccessProvider()
  const { mutate, isLoading } = useMutation<TResponse<ILoginResponse>, AxiosError<TResponse<unknown>>, ILoginPayload>({
    mutationFn:(payload) => loginService(payload),
    retry:0,
    onSuccess:(res) => {
      if (res.isSuccessfull) {
        const { user, token } = res.data
        const localUser: ILocalUser = {
          email: user.email,
          id: user.id,
          username: user.username
        }

        setCookie("access_token", token, { path: "/"})
        setCookie("user_role", user.role, { path: "/"})
        localStorage.setItem("user", JSON.stringify(localUser))

        toast.success("Logged in Successfully")
        navigate("/dashboard")
      }
    },
    onError:(err) => {
      toast.error(err.message)
    }
  })
  
  return {
    loginFn:mutate,
    isLoading
  }
}