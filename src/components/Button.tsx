import React from 'react';
import type { ClassNames, Styles, ButtonVariant, ButtonSize } from '../types';
import { commonStyles, sizeStyles, sizeClasses, variantStyles, variantClasses } from '../styles';

export type { ButtonVariant, ButtonSize };
export type AllButtonProps = React.ComponentPropsWithoutRef<'button'>;

export type ButtonClassNames = ClassNames<'button' | 'container' | 'variant' | 'size'>;
export type ButtonStyles = Styles<'button'>;

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
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

  const baseButtonStyle: React.CSSProperties = {
    ...commonStyles.buttonBase,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...sizeStyles[size],
    ...styles.button,
  };

  const finalButtonStyle = {
    ...baseButtonStyle,
    ...variantStyles[variant],
    ...extraStyle
  };

  const classes = [
    classNames.container || '',
    variantClasses[variant],
    sizeClasses[size],
    classNames.button || '',
    'luna-button',
    className,
  ].filter(Boolean).join(' ').trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      style={finalButtonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
