import React, { useEffect, useState } from 'react';

export interface PreloaderProps {
  /** Loading state - if true, preloader is shown */
  isLoading?: boolean;
  /** Duration in milliseconds before auto-hide */
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
}

const Preloader: React.FC<PreloaderProps> = ({
  isLoading: externalLoading,
  duration = 1000,
  backgroundColor,
  accentColor,
  size = 90,
  borderWidth = 6,
  className = '',
  spinnerClassName = '',
  zIndex = 999999,
  onComplete
}) => {
  const [internalLoading, setInternalLoading] = useState(true);

  // Use external loading state if provided, otherwise use internal state
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  useEffect(() => {
    // Only auto-hide if we're using internal loading state
    if (externalLoading === undefined) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, externalLoading, onComplete]);

  // Handle external loading state changes - auto-hide when externalLoading is true
  useEffect(() => {
    if (externalLoading === true) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [externalLoading, duration, onComplete]);

  const preloaderStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex,
    overflow: 'hidden',
    background: backgroundColor || 'var(--background-color, #00000018)',
    transition: 'all 0.6s ease-out',
    display: isLoading ? 'block' : 'none'
  };

  const spinnerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: `${borderWidth}px solid #ffffff`,
    borderColor: `${accentColor || 'var(--accent-color, #007bff)'} transparent transparent transparent`,
    borderRadius: '50%',
    width: `${size}px`,
    height: `${size}px`,
    animation: 'animate-preloader 1.5s linear infinite'
  };

  return (
    <>
      <div
        className={`preloader-overlay ${className}`}
        style={preloaderStyle}
      >
        <div
          className={`preloader-spinner ${spinnerClassName}`}
          style={spinnerStyle}
        />
      </div>

      {/* Global styles for animation */}
      <style>{`
        @keyframes animate-preloader {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Preloader;
