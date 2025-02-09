import { cn } from '@/core/lib/utils/utils'
import React, { memo } from 'react'
import { FaFileDownload } from "react-icons/fa";

type TDownloadButtonProps = {
  downloadURL: string,
  label: string,
  className?: string
}

const DownloadButton = React.forwardRef<HTMLAnchorElement, TDownloadButtonProps>(
  ({ downloadURL, label, className, ...props }, ref) => {

    return (
      <a
        download
        href={downloadURL}
        className={cn(className, `
          bg-green-500 px-4 py-2 gap-2 inline-flex items-center justify-center
          whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
          focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
        `)}
        ref={ref}
        {...props}
      >
        <FaFileDownload className='text-white text-lg'/>
        <span className='text-white'>{label}</span>
      </a>
    )
  }
)

export default memo(DownloadButton)
