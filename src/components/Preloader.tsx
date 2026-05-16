import React, { useEffect, useState } from 'react';
import { preloaderStyles } from '../styles';
import Spinner from './Spinner';

export type PreloaderProps = {
  /** Loading state - if true, preloader is shown */
  isLoading?: boolean;
  /** Duration in milliseconds before auto-hide (only for internal state) */
  duration?: number;
  /** Background color overlay */
  backgroundColor?: string;
  /** Accent color for the spinner */
  accentColor?: string;
  /** Size of the spinner in pixels */
  size?: number;
  /** Border width of the spinner */
  borderWidth?: number;
  /** Custom className for the preloader */
  className?: string;
  /** Custom className for the spinner */
  spinnerClassName?: string;
  /** Custom z-index */
  zIndex?: number;
  /** Callback when preloader finishes */
  onComplete?: () => void;
  /** Custom inline styles */
  styles?: {
    overlay?: React.CSSProperties;
    spinner?: React.CSSProperties;
  };
}

const Preloader = ({
  isLoading: externalLoading,
  duration = 2000,
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  accentColor = '#2563eb',
  size = 60,
  borderWidth = 4,
  className = '',
  spinnerClassName = '',
  zIndex = 99999,
  onComplete,
  styles = {}
}: PreloaderProps) => {
  const defaultClass = 'luna-preloader';
  const combinedClassName = `${defaultClass} ${className}`.trim();

  const [internalLoading, setInternalLoading] = useState(true);

  // Use external loading state if provided, otherwise use internal state
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  useEffect(() => {
    if (externalLoading === undefined) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, externalLoading, onComplete]);

  if (!isLoading) return null;

  const uiStyles = preloaderStyles(zIndex, backgroundColor, size, borderWidth, styles);

  return (
    <div style={uiStyles.overlay} className={combinedClassName}>
      <Spinner
        className={spinnerClassName}
        color={accentColor}
        style={uiStyles.spinner}
      />
    </div>
  );
};

export default Preloader;
