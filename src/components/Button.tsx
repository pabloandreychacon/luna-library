import React, { useState } from 'react';
import type { StandardVariant, ButtonSize } from '../types';
import { commonStyles, sizeStyles, sizeClasses, standardVariantStyles } from '../styles';

export type { StandardVariant, ButtonSize };
export type AllButtonProps = React.ComponentPropsWithoutRef<'button'>;

export type ButtonClassNames = Partial<Record<'button' | 'container' |
  'variant' | 'size', string>>;
/* lo anterior es lo mismo que: 
type ButtonClassNames = {
  button?: string;
  container?: string;
  variant?: string;
  size?: string;
};
*/

export type ButtonStyles = Partial<Record<'button' | 'container' | 'variant' | 'size', React.CSSProperties>>;

export type ButtonProps = {
  children?: React.ReactNode;
  variant?: StandardVariant;
  size?: ButtonSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  classNames?: ButtonClassNames;
  styles?: ButtonStyles;
  className?: string;
  style?: React.CSSProperties;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'sm',
  onClick,
  disabled = false,
  rounded = false,
  icon,
  iconPosition = 'left',
  classNames = {},
  styles = {},
  className = '',
  style: extraStyle = {},
  ...props
}: AllButtonProps & ButtonProps) => {

  const [isHovered, setIsHovered] = useState(false);

  const defaultClassNames = {
    container: '',
    button: '',
    variant: '',
    size: ''
  };
  const finalClassNames = { ...defaultClassNames, ...classNames };

  const baseButtonStyle: React.CSSProperties = {
    ...commonStyles.buttonBase,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    borderRadius: rounded ? '9999px' : '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.08)',
    ...(icon ? { display: 'inline-flex', alignItems: 'center', gap: '0.4em' } : {}),
    ...sizeStyles[size]
  };

  const uiStyles = {
    variants: standardVariantStyles(isHovered)
  };

  const finalButtonStyle = {
    ...baseButtonStyle,
    ...uiStyles.variants[variant],
    ...extraStyle
  };

  const classes = [
    finalClassNames.container,
    sizeClasses[size],
    finalClassNames.button,
    'luna-button',
    className,
  ].filter(Boolean).join(' ').trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      style={finalButtonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;
