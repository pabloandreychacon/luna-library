{/* must have toggle, options, selected, onChange */ }
import React, { useState } from 'react';

type DropDownProps = {
  toggle: React.ReactNode;
  options: React.ReactNode[];
  selected: React.ReactNode;
  onChange: (value: React.ReactNode) => void;
  className?: string;
};

const DropDown = ({ toggle, options, selected, onChange, className = '' }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: React.ReactNode) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div onClick={handleToggle} className="cursor-pointer">
        {toggle}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex flex-col">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;