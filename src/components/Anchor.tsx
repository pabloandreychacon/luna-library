import React from 'react';

// Anchor link variants and sizes
export type AnchorVariant = 'none' | 'primary' | 'secondary' | 'outline';
export type AnchorSize = 'sm' | 'md' | 'lg';
export type AllAnchorProps = React.ComponentPropsWithoutRef<'a'>;

export type AnchorProps = {
  children?: React.ReactNode;
  variant?: AnchorVariant;
  size?: AnchorSize;
  href?: string;
  className?: string;
  containerClassName?: string;
  variantClassName?: string;
  sizeClassName?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
};

const Anchor = ({
  children = "Pablo Andrey Chacon Luna",
  variant = 'none',
  size = 'sm',
  href = 'https://andreychaconresumereact.netlify.app/',
  className,
  containerClassName = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2',
  variantClassName = 'bg-blue-600 text-white hover:bg-blue-700',
  sizeClassName = 'px-3 py-1.5 text-sm',
  target = '_blank',
  rel = 'noopener noreferrer',
  style,
  ...props
}: AnchorProps & AllAnchorProps) => {

  const baseClasses = containerClassName;

  const variantClasses = {
    none: '',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
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
    ${variantClassName}
    ${sizeClassName}
    ${className}
  `.trim();

  return (
    <a href={href} target={target} rel={rel} className={classes} style={style} {...props}>
      {children}
    </a>
  );
};

export default Anchor;