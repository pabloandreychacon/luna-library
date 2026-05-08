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
};

const ProgressBar = ({ progress, max, min, 'aria-label': ariaLabel, className, style }: ProgressBarPropsWithClassName) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        role="progressbar"
        className="bg-blue-600 h-full rounded-full transition-all duration-300 flex items-center justify-center text-white text-xs font-medium"
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