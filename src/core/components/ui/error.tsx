import { ReactNode } from 'react';
import { MdOutlineError } from 'react-icons/md';

function Error({ children }: { children: ReactNode }) {
  return (
    <div className='w-full flex justify-center '>
      <div className="w-fit items-center flex gap-2 h-fit mt-16 mx-auto rounded-lg bg-red-100 px-[2.4rem] py-[1.8rem] text-center text-[1em] font-[600] text-red-700">
        {children}
        <MdOutlineError className='text-2xl'/>
      </div>
    </div>
  );
}

export default Error;