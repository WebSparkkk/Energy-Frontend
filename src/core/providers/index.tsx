import AppPopupProvider from "./app-popup/app-popup-provider";
import AuthProvider from "./auth-provider";
import { CookiesAccessProvider } from "./cookies-provider";
import TanstackProvider from "./tanstack-provider";
import { ThemeProvider } from "./theme-provider";
import ToastProvider from "./toast-provider";

export function Providers ({ children }: TChildren) {
  return (
    <AppPopupProvider>
      <ToastProvider>
        <CookiesAccessProvider>
          <TanstackProvider>
            <ThemeProvider>
              <AuthProvider>
                { children }
              </AuthProvider>
            </ThemeProvider>
          </TanstackProvider>
        </CookiesAccessProvider>
      </ToastProvider>
    </AppPopupProvider>
  )
}
