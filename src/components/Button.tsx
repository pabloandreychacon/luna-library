import React from 'react';

// Button variants and sizes
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type AllButtonProps = React.ComponentPropsWithoutRef<'button'>;

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  variantClassName?: string;
  sizeClassName?: string;
  style?: React.CSSProperties;
}

{/* onCLick default should open window.open('https://andreychaconresumereact.netlify.app/', '_blank') */ }

const Button = ({
  children,
  variant = 'primary',
  size = 'sm',
  onClick = () =>
    void 0,
  disabled = false,
  className = '',
  containerClassName = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2',
  variantClassName = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  sizeClassName = 'px-3 py-1.5 text-sm',
  style,
  ...props
}: AllButtonProps & ButtonProps) => {
  const baseClasses = containerClassName;

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
