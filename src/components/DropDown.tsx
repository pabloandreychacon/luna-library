{/* Dropdown component for selecting options */ }
import React, { useState } from 'react';

type DropDownOption = {
  value: string;
  label: React.ReactNode;
};

type DropDownProps = {
  toggle: React.ReactNode;
  options: React.ReactNode[] | DropDownOption[];
  selected: React.ReactNode;
  onChange: (value: React.ReactNode) => void;
  className?: string;
  containerClassName?: string;
  dropdownClassName?: string;
  optionsContainerClassName?: string;
  optionClassName?: string;
};

const DropDown = ({
  toggle,
  options,
  selected,
  onChange,
  className = '',
  containerClassName = 'relative inline-block text-left',
  dropdownClassName = 'absolute z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
  optionsContainerClassName = 'py-1 flex flex-col',
  optionClassName = 'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900'
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: React.ReactNode) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${containerClassName} ${className}`}>
      <div onClick={handleToggle} className="cursor-pointer">
        {toggle}
      </div>

      {isOpen && (
        <div className={dropdownClassName}>
          <div className={optionsContainerClassName}>
            {options.map((option, index) => {
              const isOptionObject = typeof option === 'object' && option !== null && 'value' in option;
              const optionValue = isOptionObject ? (option as DropDownOption).value : option;
              const optionLabel = isOptionObject ? (option as DropDownOption).label : option;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(optionValue)}
                  className={optionClassName}
                >
                  {optionLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;