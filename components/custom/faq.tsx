'use client';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const VISIBLE_COUNT = 5;

const FAQ = ({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const visibleQuestions = showAll ? questions : questions.slice(0, VISIBLE_COUNT);
  const hasMore = questions.length > VISIBLE_COUNT;

  return (
    <div className='px-4 md:space-y-[12px] space-y-[6px]'>
      {visibleQuestions.map((item, index) => (
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
              } overflow-hidden px-3 md:px-[30px]`}>
              <p className='font-dm-sans text-sm mt-6'>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className='py-2 md:py-4 lg:px-[50px] px-4 border rounded-[10px]'>
          <div className='bg-secondary-transparent rounded-[10px] py-3 md:py-6'>
            <button
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) setActiveIndex(null);
              }}
              className='flex justify-between items-center w-full px-3 md:px-[30px]'>
              <span className='text-left font-semibold'>
                {showAll ? 'Show less' : `See ${questions.length - VISIBLE_COUNT} more questions`}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 text-white p-1 bg-primary rounded-full cursor-pointer transform transition-transform ${
                  showAll ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
