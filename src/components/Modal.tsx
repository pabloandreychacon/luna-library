import React, { useEffect, useRef } from 'react';

// Modal size variants
type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  /** Whether the modal is visible */
  show: boolean;
  /** Callback when modal is closed */
  onHide: () => void;
  /** Modal size variant */
  size?: ModalSize;
  /** Whether to center the modal vertically */
  centered?: boolean;
  /** Whether to show backdrop overlay */
  backdrop?: boolean | 'static';
  /** Whether to close modal when backdrop is clicked */
  backdropClose?: boolean;
  /** Whether to close modal when ESC key is pressed */
  keyboard?: boolean;
  /** Whether to show modal with animation */
  animation?: boolean;
  /** Custom className for the modal */
  className?: string;
  /** Custom className for the modal dialog */
  dialogClassName?: string;
  /** Custom className for the modal content */
  contentClassName?: string;
  /** Custom className for the modal header */
  headerClassName?: string;
  /** Custom className for the modal body */
  bodyClassName?: string;
  /** Custom className for the modal footer */
  footerClassName?: string;
  /** Modal title */
  title?: React.ReactNode;
  /** Modal header content */
  header?: React.ReactNode;
  /** Modal body content */
  children: React.ReactNode;
  /** Modal footer content */
  footer?: React.ReactNode;
  /** Whether to show close button in header */
  closeButton?: boolean;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

const Modal = ({
  show,
  onHide,
  size = 'md',
  centered = false,
  backdrop = true,
  backdropClose = true,
  keyboard = true,
  animation = true,
  className = '',
  dialogClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  title,
  header,
  children,
  footer,
  closeButton = true,
  style
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle ESC key press
  useEffect(() => {
    if (!show || !keyboard) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onHide();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [show, keyboard, onHide]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (backdropClose) {
      // Check if click is on backdrop using data attribute
      const target = event.target as HTMLElement;
      if (target.getAttribute('data-backdrop') === 'true' || target.closest('[data-backdrop="true"]')) {
        onHide();
      }
    }
  };

  // Focus management
  useEffect(() => {
    if (show) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the modal dialog
      if (modalRef.current) {
        modalRef.current.focus();
      }
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus and body scroll
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const modalClasses = `
    fixed inset-0 z-60 flex items-center justify-center
    ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    ${animation ? 'transition-opacity duration-300' : ''}
    ${className}
  `.trim();

  const dialogClasses = `
    relative w-full ${sizeClasses[size]} mx-auto
    ${centered ? 'flex items-center justify-center min-h-screen' : 'mt-8'}
    ${dialogClassName}
  `.trim();

  if (!show) return null;

  return (
    <div
      ref={modalRef}
      className={modalClasses}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      style={style}
    >
      {/* Backdrop */}
      {backdrop && (
        <div
          data-backdrop="true"
          className={`absolute inset-0 bg-black bg-opacity-50 ${animation ? 'transition-opacity duration-300' : ''} ${show ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleBackdropClick}
        />
      )}

      {/* Modal Content */}
      <div className={dialogClasses}>
        <div className={`bg-white rounded-lg shadow-xl relative z-10 ${contentClassName}`}>
          {/* Modal Header */}
          {(header || title || closeButton) && (
            <div className={`flex items-center justify-between p-4 border-b border-gray-200 ${headerClassName}`}>
              {header || (title && (
                <h3 className="text-lg font-semibold text-gray-900" id="modal-title">
                  {title}
                </h3>
              ))}
              {closeButton && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={onHide}
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Modal Body */}
          <div className={`p-4 ${bodyClassName}`}>
            {children}
          </div>

          {/* Modal Footer */}
          {footer && (
            <div className={`flex items-center justify-end p-4 border-t border-gray-200 space-x-2 ${footerClassName}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
