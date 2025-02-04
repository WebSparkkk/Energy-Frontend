import { createContext, useContext } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

type TCookiesProviderValue = {
  setCookie:  (name: string, value: string, options?: any) => void,
  getCookie: (name: string) => string | undefined | null,
  removeCookie: (name: string) => void,
} | undefined

const CookiesContext = createContext<TCookiesProviderValue>(undefined);

function CookiesAccessProvider({ children }: TChildren) {
  const [cookies, setCookie, removeCookie] = useCookies<string>();

  function getCookie(name: string) {
    return cookies[name];
  }

  return (
    <CookiesContext.Provider
      value={{
        setCookie,
        getCookie,
        removeCookie,
      }}
    >
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </CookiesContext.Provider>
  );
}

function useCookiesAccessProvider() {
  const context = useContext(CookiesContext);
  if (context === undefined)
    throw new Error('CookiesContext was used outside the CookiesAccessProvider');

  return context;
}

export { CookiesAccessProvider, useCookiesAccessProvider };