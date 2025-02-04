function Spinner({
  className
}:{
  className?: string
}) {
  return (
    <div className={`${className||""} spinner mx-auto my-[4.8rem] w-[6.4rem] h-[6.4rem] border-4 border-yellow-600 border-t-transparent rounded-full animate-spin`}></div>
  );
}

export default Spinner