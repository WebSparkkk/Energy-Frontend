import { Toaster } from 'react-hot-toast'

function ToastProvider({ children }: TChildren) {
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            padding: '12px 24px',
            backgroundColor: '#fff',
            color: '#374151',
          },
        }}
      />
      { children }
    </>
  )
}

export default ToastProvider