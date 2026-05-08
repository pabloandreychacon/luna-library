{/* must have progress, max, min, aria-label */ }
import React from 'react';
import { CSSProperties } from 'react';

type ProgressBarProps = {
  progress: number;
  max: number;
  min: number;
  'aria-label': string;
};

{/* need a class for the progress bar class name: progress-bar */ }
type ProgressBarPropsWithClassName = ProgressBarProps & {
  className?: CSSProperties;
  style?: CSSProperties;
  containerClassName?: string;
  barClassName?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
};

const ProgressBar = ({ progress, max, min, 'aria-label': ariaLabel, className, style, containerClassName = 'w-full bg-gray-200 rounded-full h-4 overflow-hidden', barClassName = 'h-full rounded-full transition-all duration-300 flex items-center justify-center text-xs font-medium', variant = 'primary' }: ProgressBarPropsWithClassName) => {
  const variantClasses = {
    primary: {
      bg: 'bg-blue-600',
      text: 'text-white',
      containerBg: 'bg-gray-200'
    },
    success: {
      bg: 'bg-green-600',
      text: 'text-white',
      containerBg: 'bg-gray-200'
    },
    warning: {
      bg: 'bg-yellow-500',
      text: 'text-gray-900',
      containerBg: 'bg-gray-200'
    },
    danger: {
      bg: 'bg-red-600',
      text: 'text-white',
      containerBg: 'bg-gray-200'
    },
    dark: {
      bg: 'bg-gray-800',
      text: 'text-white',
      containerBg: 'bg-gray-300'
    },
    light: {
      bg: 'bg-gray-100',
      text: 'text-gray-900',
      containerBg: 'bg-gray-300'
    }
  };

  const currentVariant = variantClasses[variant];
  const barClasses = `${currentVariant.bg} ${barClassName} ${currentVariant.text}`;

  return (
    <div className={containerClassName}>
      <div
        role="progressbar"
        className={barClasses}
        aria-valuenow={progress}
        aria-valuemin={min}
        aria-valuemax={max}
        style={{ width: `${progress}%`, ...className, ...style }}
      >
        {progress > 10 && `${progress}%`}
      </div>
    </div>
  );
};

export default ProgressBar;