
import React from 'react';

/**
 * must have key, active, onClick, header, content body
 */
interface AccordionProps {
  key: string;
  active: boolean;
  onClick: () => void;
  header: React.ReactNode;
  content: React.ReactNode;
}

const Accordion = ({ key, active, onClick, header, content }: AccordionProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-200 flex justify-between items-center"
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
        className={`transition-all duration-300 ease-in-out ${active ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
      >
        <div className="p-4 bg-white border-t border-gray-200">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;