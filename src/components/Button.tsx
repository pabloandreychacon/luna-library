import React, { useState } from 'react';
import type { StandardVariant, ButtonSize } from '../types';
import { commonStyles, sizeStyles, sizeClasses, standardVariantStyles, variantClasses } from '../styles';

export type { StandardVariant, ButtonSize };
export type AllButtonProps = React.ComponentPropsWithoutRef<'button'>;

export type ButtonClassNames = Partial<Record<'button' | 'container' | 'variant' | 'size', string>>;
export type ButtonStyles = Partial<Record<'button' | 'container' | 'variant' | 'size', React.CSSProperties>>;

export type ButtonProps = {
  children: React.ReactNode;
  variant?: StandardVariant;
  size?: ButtonSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
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
  classNames = {},
  styles = {},
  className = '',
  style: extraStyle = {}, // Capturamos style extra
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
      {children}
    </button>
  );
};

export default Button;
