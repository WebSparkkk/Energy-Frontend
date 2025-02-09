import { httpService } from '@/core/lib/services'
import { cn } from '@/core/lib/utils/utils'
import React, { memo, useCallback, useState } from 'react'
import { FaFileDownload } from "react-icons/fa";
import { ImSpinner3 } from 'react-icons/im';

type TDownloadButtonProps = {
  downloadURL: string,
  label: string,
  className?: string
}

const DownloadButton = React.forwardRef<HTMLButtonElement, TDownloadButtonProps>(
  ({ downloadURL, label, className, ...props }, ref) => {
    const [isDownloading,setIsDownloading] = useState<boolean>(false)

    const handleDownload = useCallback(async function () {
      setIsDownloading(true)
      const res = await httpService.get(downloadURL)

      setIsDownloading(false)
    },[])

    return (
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={cn(className, `
          bg-green-500 px-4 py-2 gap-2 inline-flex items-center justify-center
          whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
          focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
          ${isDownloading ? "cursor-wait" : ""}
        `)}
        ref={ref}
        {...props}
      >
        <span className='text-white text-xl'>
          { isDownloading ? <ImSpinner3 className='animate-spin text-lg'/> : <FaFileDownload/> }
        </span>
        
        <span className='text-white'>{label}</span>
      </button>
    )
  }
)

export default memo(DownloadButton)
