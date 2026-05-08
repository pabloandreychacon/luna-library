import React from 'react';

export interface SpinnerProps {
  className?: string;
  containerClassName?: string;
  dotClassName?: string;
  barClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'circle' | 'dots' | 'pulse' | 'bars';
};

const Spinner = ({ 
  className, 
  containerClassName = 'flex gap-1',
  dotClassName = 'bg-blue-600 rounded-full animate-bounce',
  barClassName = 'bg-blue-600 animate-pulse',
  size = 'md', 
  type = 'circle' 
}: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const dotSizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const barSizeClasses = {
    sm: 'w-1 h-4',
    md: 'w-1 h-6',
    lg: 'w-1 h-8'
  };

  if (type === 'dots') {
    return (
      <div role="status" className={`${containerClassName} ${className || ''}`}>
        <span className="sr-only">Loading...</span>
        <div className={`${dotSizeClasses[size]} ${dotClassName}`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${dotSizeClasses[size]} ${dotClassName}`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${dotSizeClasses[size]} ${dotClassName}`} style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div role="status" className={`${sizeClasses[size]} ${className || ''}`}>
        <span className="sr-only">Loading...</span>
        <div className={`${sizeClasses[size]} ${dotClassName}`}></div>
      </div>
    );
  }

  if (type === 'bars') {
    return (
      <div role="status" className={`flex gap-1 items-center ${containerClassName} ${className || ''}`}>
        <span className="sr-only">Loading...</span>
        <div className={`${barSizeClasses[size]} ${barClassName}`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${barSizeClasses[size]} ${barClassName}`} style={{ animationDelay: '200ms' }}></div>
        <div className={`${barSizeClasses[size]} ${barClassName}`} style={{ animationDelay: '400ms' }}></div>
        <div className={`${barSizeClasses[size]} ${barClassName}`} style={{ animationDelay: '600ms' }}></div>
      </div>
    );
  }

  // Default circle spinner
  return (
    <div
      role="status"
      className={`inline-block animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className || ''}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
