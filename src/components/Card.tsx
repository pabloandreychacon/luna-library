import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({
  children,
  title,
  className = '',
  containerClassName = 'bg-white rounded-lg border border-gray-200',
  titleClassName = 'text-lg font-semibold text-gray-900',
  padding = 'md',
  shadow = 'md',
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const classes = `
    ${containerClassName}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${className}
  `.trim();

  return (
    <div className={classes}>
      {title && (
        <div className="mb-4">
          <h3 className={titleClassName}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
