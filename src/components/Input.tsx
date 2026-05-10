import React from 'react';

// Input variants and sizes
export type InputVariant = 'none' | 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | 'hidden' | 'image' | 'range' | 'reset' | 'submit';

export type AllInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'>;

export type InputProps = {
  children?: React.ReactNode;
  variant?: InputVariant;
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
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  variantClassName?: string;
  sizeClassName?: string;
  style?: React.CSSProperties;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

const Input = ({
  children,
  variant = 'none',
  type = 'text',
  inputSize = 'md',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  readOnly = false,
  className = '',
  containerClassName = 'relative inline-block',
  inputClassName = 'border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500',
  variantClassName = '',
  sizeClassName = '',
  style,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}: InputProps & AllInputProps) => {
  const baseClasses = containerClassName;

  const variantClasses: Record<InputVariant, string> = {
    none: '',
    primary: 'bg-blue-600 text-white border-blue-600 focus:ring-blue-500 focus:border-blue-500',
    secondary: 'bg-gray-600 text-white border-gray-600 focus:ring-gray-500 focus:border-gray-500',
    outline: 'border-gray-300 text-gray-700 bg-white focus:ring-blue-500 focus:border-blue-500',
    danger: 'bg-red-600 text-white border-red-600 focus:ring-red-500 focus:border-red-500',
    success: 'bg-green-600 text-white border-green-600 focus:ring-green-500 focus:border-green-500'
  };

  const sizeClasses: Record<InputSize, string> = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
    xl: 'px-6 py-4 text-xl'
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[inputSize]}
    ${variantClassName}
    ${sizeClassName}
    ${className}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}
  `.trim();

  return (
    <div className={classes} style={style}>
      {children && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {children}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={`
          ${inputClassName}
          ${variantClasses[variant]}
          ${sizeClasses[inputSize]}
          ${variantClassName}
          ${sizeClassName}
        `.trim()}
        {...props}
      />
    </div>
  );
};

export default Input;
