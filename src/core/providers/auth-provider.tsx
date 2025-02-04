import { createContext, useContext, useLayoutEffect } from 'react';
import { httpService } from '../lib/services';
import { useCookiesAccessProvider } from './cookies-provider';
import { useLogout } from '../hooks/useLogout';
import { ILocalUser, TUserRole } from '@/features/auth/login/types';

type TAuthProvider = {
  isAuth: boolean,
  userRole: TUserRole | null,
  user: ILocalUser | null
}

const AuthContext = createContext<TAuthProvider|undefined>(undefined);

function AuthProvider({ children }: TChildren) {

  const { getCookie } = useCookiesAccessProvider()
  const { logout } = useLogout()
  
  const accessToken = getCookie("access_token")
  const localUser = localStorage.getItem("user")
  const user = localUser ? JSON.parse(localUser) : null
  const userRole = (getCookie("user_role") || null) as TUserRole | null

  const isAuth = Boolean(accessToken)

  useLayoutEffect(
    function() {
      const requestInterceptor = httpService.interceptors.request.use(
        (request) => {
          if (request.headers && isAuth) {
            request.headers.Authorization = "Bearer " + accessToken
          }
          return request
        },
        (error) => error
      )

      const responseInterceptor = httpService.interceptors.response.use(  
        (response) => response,
        (error) => {
          error.message = error.response.data.message

          const code = error.response.statusCode
          if (isAuth) {
            const isUnauthorized = code == 401
            if (isUnauthorized) {
              logout()
            }
          }
          return Promise.reject(error);
        }
      )

      return () => {
        httpService.interceptors.response.eject(responseInterceptor);
        httpService.interceptors.request.eject(requestInterceptor);
      };
    },[]
  )

  return (
    <AuthContext.Provider 
      value={{
        isAuth,
        userRole,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth was used outside the AuthProvider');
  return context;
}