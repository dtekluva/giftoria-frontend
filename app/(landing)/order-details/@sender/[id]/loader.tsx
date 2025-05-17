const SenderPageSkeleton = () => {
  return (
    <div className='container mx-auto px-4 py-6 md:py-11 animate-pulse'>
      {/* Back Button and Title Skeleton */}
      <div className='flex items-center gap-2 mb-4'>
        <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
        <div className='w-40 h-6 bg-gray-300 rounded-md'></div>
      </div>

      {/* Stepper Skeleton */}
      <div className='flex gap-4 mb-8 max-w-[60vw] mx-auto justify-between'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='flex flex-col  items-center justify-between gap-2'>
            {index < 3 && (
              <div className='w-25 h-25 rounded-full bg-gray-300'></div>
            )}
            <div className='w-32 h-4 bg-gray-300 rounded-md'></div>
          </div>
        ))}
      </div>

      {/* Guarantee Text Skeleton */}
      <div className='md:mt-[105px] mt-8 md:pb-10 border-b pb-4 border-[#FAFAFA]'>
        <div className='w-32 h-4 bg-gray-300 rounded-md'></div>
      </div>

      {/* Card Details Skeleton */}
      <div className='flex items-center justify-between pt-4 md:pt-8 gap-8 flex-wrap'>
        <div className='flex items-center gap-4'>
          <div className='w-[160px] h-[100px] bg-gray-300 rounded-md'></div>
          <div className='w-24 h-4 bg-gray-300 rounded-md'></div>
        </div>
        <div className='md:flex gap-[110px]'>
          <div className='flex flex-col items-end gap-4'>
            <div className='w-32 h-4 bg-gray-300 rounded-md'></div>
            <div className='w-24 h-6 bg-gray-300 rounded-md'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SenderPageSkeleton;
