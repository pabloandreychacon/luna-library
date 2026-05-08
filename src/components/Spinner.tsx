import React from 'react';

{/* must have animation,role, className */ }
type SpinnerProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'circle' | 'dots' | 'pulse' | 'bars';
};

const Spinner = ({ className, size = 'md', type = 'circle' }: SpinnerProps) => {
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
      <div role="status" className={`flex gap-1 ${className || ''}`}>
        <span className="sr-only">Loading...</span>
        <div className={`${dotSizeClasses[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${dotSizeClasses[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${dotSizeClasses[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div role="status" className={`${sizeClasses[size]} ${className || ''}`}>
        <span className="sr-only">Loading...</span>
        <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-pulse`}></div>
      </div>
    );
  }

  if (type === 'bars') {
    return (
      <div role="status" className={`flex gap-1 items-center ${className || ''}`}>
        <span className="sr-only">Loading...</span>
        <div className={`${barSizeClasses[size]} bg-blue-600 animate-pulse`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${barSizeClasses[size]} bg-blue-600 animate-pulse`} style={{ animationDelay: '200ms' }}></div>
        <div className={`${barSizeClasses[size]} bg-blue-600 animate-pulse`} style={{ animationDelay: '400ms' }}></div>
        <div className={`${barSizeClasses[size]} bg-blue-600 animate-pulse`} style={{ animationDelay: '600ms' }}></div>
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