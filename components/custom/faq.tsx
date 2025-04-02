'use client';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const FAQ = ({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  return (
    <div className='px-4 md:px-[40px] lg:px-[70px] md:space-y-[12px] space-y-[6px]'>
      {questions.map((item, index) => (
        <div
          key={index}
          className='py-2 md:py-4 lg:px-[50px] px-4 border rounded-[10px]'>
          <div className='bg-secondary-transparent rounded-[10px] py-3 md:py-6'>
            <button
              onClick={() => toggleFAQ(index)}
              className='flex justify-between items-center w-full px-3 md:px-[30px]'>
              <span className='text-left font-semibold'>{item.question}</span>
              <ChevronDownIcon
                className={`w-5 h-5 text-white p-1 bg-primary rounded-full cursor-pointer transform transition-transform ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? 'max-h-[200px] opacity-100'
                  : 'max-h-0 opacity-0'
              } overflow-hidden  px-3 md:px-[30px]`}>
              <p className='font-dm-sans text-sm mt-6'>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
