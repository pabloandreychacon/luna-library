import React, { useEffect, useState, useRef } from 'react';

export interface ScrollTopProps {
  /** Scroll position threshold to show the button (in pixels) */
  threshold?: number;
  /** Custom className for the button */
  className?: string;
  /** Custom icon/content for the button */
  children?: React.ReactNode;
  /** Position of the button */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Shape of the button */
  shape?: 'circle' | 'square' | 'rounded';
  /** Whether to show the button initially */
  showInitially?: boolean;
  /** Custom scroll behavior */
  scrollBehavior?: 'auto' | 'smooth';
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when button is clicked */
  onClick?: () => void;
  /** Callback when visibility changes */
  onVisibilityChange?: (isVisible: boolean) => void;
  /** Element ID or selector to check visibility for showing the button */
  targetElement?: string;
  /** Percentage of page scroll to show the button (0-100) */
  scrollPercentage?: number;
}

const ScrollTop = ({
  threshold = 100,
  className = '',
  children,
  position = 'bottom-right',
  size = 'md',
  shape = 'circle',
  showInitially = false,
  scrollBehavior = 'smooth',
  style,
  onClick,
  onVisibilityChange,
  targetElement,
  scrollPercentage
}: ScrollTopProps) => {
  const [isVisible, setIsVisible] = useState(showInitially);

  useEffect(() => {
    // Show/hide scroll to top button based on scroll position
    const toggleVisibility = () => {
      let shouldBeVisible = false;

      // Check scroll percentage first
      if (scrollPercentage !== undefined) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const percentage = (currentScroll / maxScroll) * 100;
        shouldBeVisible = percentage >= scrollPercentage;
      }
      // Check target element visibility
      else if (targetElement) {
        const element = document.querySelector(targetElement);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          shouldBeVisible = isInViewport; // Show when element is visible
        } else {
          // If element doesn't exist, fall back to threshold behavior
          shouldBeVisible = window.scrollY > threshold;
        }
      }
      // Default threshold behavior
      else {
        shouldBeVisible = window.scrollY > threshold;
      }

      // Set visibility immediately
      setIsVisible(shouldBeVisible);
      onVisibilityChange?.(shouldBeVisible);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Initial check
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold, onVisibilityChange, targetElement, scrollPercentage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior
    });
    onClick?.();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTop();
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'fixed bottom-8 right-8',
    'bottom-left': 'fixed bottom-8 left-8',
    'bottom-center': 'fixed bottom-8 left-1/2 transform -translate-x-1/2',
    'top-right': 'fixed top-8 right-8',
    'top-left': 'fixed top-8 left-8',
    'top-center': 'fixed top-8 left-1/2 transform -translate-x-1/2'
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg'
  };

  const buttonClasses = `
    ${positionClasses[position]}
    ${sizeClasses[size]}
    ${shapeClasses[shape]}
    ${className}
    flex items-center justify-center
    bg-blue-600 hover:bg-blue-700
    text-white
    shadow-lg hover:shadow-xl
    transition-all duration-300 ease-in-out
    cursor-pointer
    z-50
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
  `;

  const defaultContent = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  );

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      style={style}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      {children || defaultContent}
    </button>
  );
};

export default ScrollTop;
