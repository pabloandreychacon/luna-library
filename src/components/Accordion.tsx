
import React from 'react';

/**
 * must have key, active, onClick, header, content body
 */
interface AccordionProps {
  active: boolean;
  onClick: () => void;
  header: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const Accordion = ({ active, onClick, header, content, className = '', containerClassName = 'border border-gray-200 rounded-lg overflow-hidden', headerClassName = 'w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-200 flex justify-between items-center', contentClassName = 'transition-all duration-300 ease-in-out' }: AccordionProps) => {
  return (
    <div className={`${containerClassName} ${className}`}>
      <button
        onClick={onClick}
        className={headerClassName}
        aria-expanded={active}
      >
        {header}
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${active ? 'transform rotate-180' : ''
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`${contentClassName} ${active ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
      >
        <div className={`p-4 bg-white border-t border-gray-200 ${contentClassName}`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;