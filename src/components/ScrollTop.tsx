import React, { useEffect, useState } from 'react';
import type { CornerPosition } from '../types';
import { scrollTopStyles } from '../styles';

export type ScrollTopProps = {
  threshold?: number;
  className?: string;
  children?: React.ReactNode;
  position?: CornerPosition;
  size?: number;
  scrollBehavior?: 'auto' | 'smooth';
  styles?: React.CSSProperties;
};

const ScrollTop = ({
  threshold = 100,
  className = '',
  children,
  position = 'bottom-right',
  size = 48,
  scrollBehavior = 'smooth',
  styles = {},
}: ScrollTopProps) => {
  const defaultClass = 'luna-scrolltop';
  const combinedClassName = `${defaultClass} ${className}`.trim();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior,
    });
  };

  const uiStyles = scrollTopStyles(styles, position, size, isVisible);

  return (
    <button
      type="button"
      style={uiStyles}
      className={combinedClassName}
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
    >
      {children || (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      )}
    </button>
  );
};

export default ScrollTop;
