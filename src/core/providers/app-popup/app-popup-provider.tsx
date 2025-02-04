import { createContext, Dispatch, useContext, useState } from "react"
import AppPopup from "./app-popup"

type TAppPopupValue = {
  title: string,
  description: string,
  icon?: any,
  isOpen: boolean,
  onConfirm: Function
}

type TAppPopupProvider = {
  setPopup: Dispatch<TAppPopupValue>,
  popup: TAppPopupValue
}

const AppPopupContext = createContext<TAppPopupProvider>({
  setPopup: () => {},
  popup: {
    description: "",
    isOpen: false,
    onConfirm: () => {},
    title: ""
  }
})

export function useAppPopupProvider () {
  if (AppPopupContext === undefined)
    throw new Error("Cannot Use useAppPopupProvider outside AppPopupProvider")
  return useContext(AppPopupContext)
}

function AppPopupProvider({ children }: TChildren) {

  const [popup, setPopup] = useState<TAppPopupValue>({
    description:"",
    title: "",
    icon:null,
    isOpen:false,
    onConfirm: () => {}
  })

  return (
    <AppPopupContext.Provider 
      value={{
        setPopup,
        popup
      }}
    >
      { children }
      <AppPopup/>
    </AppPopupContext.Provider>  
  )
}

export default AppPopupProvider