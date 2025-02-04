import { useAppPopupProvider } from './app-popup-provider'
import { opacityFadeAnimation } from '@/core/lib/animations'
import { createPortal } from "react-dom"
import { Button } from "../../components/ui/button"
import { useOutsideClick } from "../../hooks/useClickOutside"
import { AnimatePresence, motion } from 'motion/react'

function AppPopup() {

  const { popup, setPopup } = useAppPopupProvider()

  const ref = useOutsideClick<HTMLDivElement>(()=>{
    setPopup({
      ...popup,
      isOpen: false
    })
  })

  const { 
    description, 
    isOpen, 
    icon,
    title 
  } = popup

  return (
    createPortal((
      <AnimatePresence>
        {
          isOpen ? (
            <motion.div 
              {...opacityFadeAnimation}   
              key="app-popup"   
              role="dialog"  
              aria-describedby="app-popup"        
              className="w-full h-screen bg-black/30 fixed top-0 left-0 flex items-center justify-center z-[10000]"
            > 
              <div 
                ref={ref} 
                className="w-[500px] p-12 flex-col rounded-md bg-white flex items-center justify-center"
              >
                {  
                  icon ? (
                    <div className="mb-4">
                      { icon }
                    </div>
                  ) : <></>
                }
                <h3 className="mb-6 text-xl font-semibold">{title}</h3>
                <p className="mb-6 text-center text-zinc-900">{description}</p>
                <div className="w-fit gap-4 flex items-center">
                  <Button
                    variant="default"
                    onClick={() => {
                      popup.onConfirm()
                      setPopup({
                        ...popup,
                        isOpen: false
                      })
                    }}
                  >تأكيد</Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setPopup({
                        ...popup,
                        isOpen: false
                      })
                    }}
                  >إلغاء</Button>
                </div>
              </div>
            </motion.div>
          ) : <></>
        }
      </AnimatePresence>
    ), document.body)
  )
}

export default AppPopup