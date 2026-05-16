import React from 'react';
import type { ProgressBarVariant } from '../types';
import { progressBarStyles } from '../styles';

export type { ProgressBarVariant };

export type ProgressBarProps = {
  /** The current progress value */
  progress: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Minimum value (default: 0) */
  min?: number;
  /** Accessibility label */
  'aria-label'?: string;
  /** Color variant */
  variant?: ProgressBarVariant;
  /** Whether to show the percentage text */
  showPercentage?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Custom styles */
  styles?: {
    container?: React.CSSProperties;
    bar?: React.CSSProperties;
    text?: React.CSSProperties;
  };
};

const ProgressBar = ({
  progress,
  max = 100,
  min = 0,
  'aria-label': ariaLabel = 'Progress',
  variant = 'primary',
  showPercentage = true,
  className = '',
  styles = {},
}: ProgressBarProps) => {
  const defaultClass = 'luna-progress';
  const combinedClassName = `${defaultClass} ${className}`.trim();

  // Ensure progress stays within bounds
  const clampedProgress = Math.max(min, Math.min(max, progress));
  const percentage = ((clampedProgress - min) / (max - min)) * 100;

  const uiStyles = progressBarStyles(styles, percentage, variant);

  return (
    <div style={uiStyles.container} className={combinedClassName}>
      <div
        role="progressbar"
        style={uiStyles.bar}
        aria-valuenow={clampedProgress}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
      >
        {showPercentage && percentage >= 10 && (
          <span style={uiStyles.text}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;