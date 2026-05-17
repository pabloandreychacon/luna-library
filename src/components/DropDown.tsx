import React, { useState, useRef, useEffect } from 'react';
import { dropDownStyles } from '../styles';

export type DropDownOption = {
  value: string | number;
  label?: React.ReactNode;
  text?: React.ReactNode;
};

export type DropDownClassNames = {
  container?: string;
  trigger?: string;
  panel?: string;
  option?: string;
};

export type DropDownStyles = {
  container?: React.CSSProperties;
  trigger?: React.CSSProperties;
  panel?: React.CSSProperties;
  option?: React.CSSProperties;
  arrow?: React.CSSProperties;
};

export type DropDownProps = {
  options: (string | number | DropDownOption)[];
  value?: string | number | React.ReactNode;
  onChange: (value: any) => void;
  placeholder?: string;
  toggle?: React.ReactNode;
  classNames?: DropDownClassNames;
  styles?: DropDownStyles;
  disabled?: boolean;
  className?: string;
};

const DropDown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  toggle,
  className,
  styles,
  disabled = false,
}: DropDownProps) => {
  const defaultClassNames = {
    container: 'luna-dropdown',
    trigger: 'luna-dropdown-trigger',
    panel: 'luna-dropdown-panel',
    option: 'luna-dropdown-option'
  };
  const finalClassNames = { ...defaultClassNames, className };

  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: any) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Helper to get label from value
  const getDisplayLabel = () => {
    if (value === undefined || value === null || value === '') return placeholder;
    const found = options.find(opt => {
      if (typeof opt === 'object') return opt.value === value;
      return opt === value;
    });
    if (found && typeof found === 'object') return found.label;
    return found || value;
  };

  const uiStyles = dropDownStyles(styles, disabled, isOpen, hoverIndex, value);

  return (
    <div ref={containerRef} style={uiStyles.container} className={`${finalClassNames.container} ${className || ''}`.trim()}>
      {toggle ? (
        <div onClick={handleToggle} style={{ display: 'inline-block' }}>
          {toggle}
        </div>
      ) : (
        <button
          type="button"
          style={uiStyles.trigger}
          className={finalClassNames.trigger}
          onClick={handleToggle}
        >
          <span>{getDisplayLabel()}</span>
          <span style={uiStyles.arrow}>▼</span>
        </button>
      )}

      <div style={uiStyles.panel} className={finalClassNames.panel}>
        {options.map((option, index) => {
          const isObj = typeof option === 'object' && option !== null && 'value' in option;
          const optValue = isObj ? (option as DropDownOption).value : option;
          const optLabel = isObj ? (option as DropDownOption).label : option;

          return (
            <button
              key={index}
              type="button"
              style={uiStyles.option(index)}
              className={finalClassNames.option}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => handleOptionClick(optValue)}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;