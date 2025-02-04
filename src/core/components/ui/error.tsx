import { ReactNode } from 'react';

function Error({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-w-[700px] mx-auto rounded-lg bg-red-100 px-[2.4rem] py-[1.8rem] text-center text-[1.2em] font-[600] text-red-700">
        {children}
      </div>
    </>
  );
}

export default Error;