{/* must have progress, max, min, aria-label */ }
import React from 'react';

type ProgressBarProps = {
  progress: number;
  max: number;
  min: number;
  'aria-label': string;
};

const ProgressBar = ({ progress, max, min, 'aria-label': ariaLabel }: ProgressBarProps) => {
  return <div className="progress">
    <div role="progressbar" className="progress-bar" aria-valuenow={progress} aria-valuemin={min} aria-valuemax={max} style={{ width: `${progress}%` }}>{progress}%</div>
  </div>;
};

export default ProgressBar;