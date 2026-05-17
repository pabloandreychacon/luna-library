import React, { useCallback, useState, useEffect } from 'react';
import { inputStyles } from '../styles';
import { InputSize, StandardVariant } from '../types';

export type { StandardVariant, InputSize };
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | 'hidden' | 'image' | 'range' | 'reset' | 'submit';

export type AllInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>;

export type InputClassNames = Record<'container' | 'input' | 'label', string>;
export type InputStyles = Record<'container' | 'input' | 'label', React.CSSProperties>;

type InputCommonProps = {
  children?: React.ReactNode;
  variant?: StandardVariant;
  inputSize?: InputSize;
  type?: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  mask?: string;
  maskChar?: string;
  // Number/Currency props
  useCurrency?: boolean;
  currency?: string; // Example: "USD", "CRC", "EUR"
  locale?: string; // Example: "en-US", "es-CR"
  minFractionDigits?: number;
  maxFractionDigits?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  classNames?: InputClassNames;
  styles?: InputStyles;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
};

export type InputProps = InputCommonProps;

const Input = ({
  children,
  variant = 'none',
  type = 'text',
  inputSize = 'md',
  placeholder,
  value: controlledValue,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  readOnly = false,
  id,
  name,
  mask,
  maskChar = '_',
  useCurrency = false,
  currency = 'USD',
  locale = 'en-US',
  minFractionDigits = 0,
  maxFractionDigits = 2,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  classNames,
  styles,
  className: extraClassName = '',
  style: extraStyle = {},
  ...props
}: InputProps & AllInputProps) => {
  const inputId = id || name;
  const defaultClassNames = {
    container: 'luna-input',
    input: 'luna-input-field',
    label: 'luna-input-label'
  };
  const finalClassNames = { ...defaultClassNames, classNames };

  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState(controlledValue || '');

  // Keep internal value in sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // --- Currency Formatting Logic ---

  const formatCurrency = useCallback((val: string) => {
    // Remove all non-numeric chars except decimal point
    const cleanVal = val.replace(/[^0-9.]/g, '');
    if (!cleanVal) return '';

    const numericVal = parseFloat(cleanVal);
    if (isNaN(numericVal)) return '';

    return new Intl.NumberFormat(locale, {
      style: useCurrency ? 'currency' : 'decimal',
      currency: useCurrency ? currency : undefined,
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(numericVal);
  }, [locale, useCurrency, currency, minFractionDigits, maxFractionDigits]);

  // --- Masking Logic ---

  const formatWithMask = useCallback((val: string, maskStr: string) => {
    if (!maskStr) return val;
    let formatted = '';
    let rawIdx = 0;
    const rawVal = val.replace(/[^a-zA-Z0-9]/g, '');
    for (let i = 0; i < maskStr.length; i++) {
      const m = maskStr[i];
      if (rawIdx >= rawVal.length) break;
      if (m === '9') {
        if (/\d/.test(rawVal[rawIdx])) { formatted += rawVal[rawIdx]; rawIdx++; }
        else { rawIdx++; i--; }
      } else if (m === 'a') {
        if (/[a-zA-Z]/.test(rawVal[rawIdx])) { formatted += rawVal[rawIdx]; rawIdx++; }
        else { rawIdx++; i--; }
      } else if (m === '*') {
        formatted += rawVal[rawIdx]; rawIdx++;
      } else {
        formatted += m;
        if (rawVal[rawIdx] === m) rawIdx++;
      }
    }
    return formatted;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value;

    if (mask) {
      newVal = formatWithMask(newVal, mask);
    } else if (useCurrency || (type === 'number' && locale)) {
      // For currency/locale numbers, we process only on blur or handle carefully
      // To allow typing, we don't format EVERYTHING on every keystroke if it's currency
      // because it jumps. Usually currency inputs are better formatted on blur.
      // However, let's do a basic numeric-only filter during typing.
      newVal = newVal.replace(/[^0-9.]/g, '');
    }

    if (controlledValue === undefined) {
      setInternalValue(newVal);
    }
    onChange?.(newVal);
  };

  const handleBlur = () => {
    if (useCurrency && internalValue) {
      const formatted = formatCurrency(internalValue);
      if (controlledValue === undefined) {
        setInternalValue(formatted);
      }
      onChange?.(formatted);
    }
    onBlur?.();
  };

  const uiStyles = inputStyles(styles, extraStyle, inputSize, readOnly, disabled);

  const finalInputStyle = { ...uiStyles.input, ...uiStyles.variants[variant] };

  return (
    <div className={`${finalClassNames.container || ''} ${extraClassName}`.trim()} style={uiStyles.container}>
      {children && (
        <label htmlFor={inputId} className={finalClassNames.label} style={uiStyles.label}>
          {children}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={useCurrency ? 'text' : type}
        placeholder={placeholder || (mask ? mask.replace(/[9a*]/g, maskChar) : '')}
        value={internalValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        style={finalInputStyle}
        className={`${finalClassNames.input || ''} rounded-xl`.trim()}
        {...props}
      />
    </div>
  );
};

export default Input;
