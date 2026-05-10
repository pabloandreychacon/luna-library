import React, { useState, useEffect } from 'react';

export interface WhatsAppProps {
  /** Phone number for WhatsApp (with country code, without + or spaces) */
  phone?: string;
  /** Default message to send */
  message?: string;
  /** Position of the button */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Tooltip text */
  tooltipText?: string;
  /** Custom className for the button */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Callback when button is clicked */
  onClick?: () => void;
  /** Z-index for the button */
  zIndex?: number;
  /** Whether to open in new tab */
  openInNewTab?: boolean;
}

const WhatsApp = ({
  phone = '',
  message = '¡Hola! Me gustaría obtener más información.',
  position = 'bottom-right',
  size = 'md',
  showTooltip = true,
  tooltipText = '¿En qué podemos ayudarte?',
  className = '',
  style,
  onClick,
  zIndex = 50,
  openInNewTab = true
}: WhatsAppProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Don't render if no phone number provided
  if (!phone) return null;

  const handleWhatsAppClick = () => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    if (openInNewTab) {
      window.open(whatsappUrl, '_blank');
    } else {
      window.location.href = whatsappUrl;
    }

    onClick?.();
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'top-center': 'top-6 left-1/2 transform -translate-x-1/2'
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  // Icon size based on button size
  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 40
  };

  const buttonClasses = `
    fixed ${positionClasses[position]}
    ${sizeClasses[size]}
    bg-[#25D366] hover:bg-[#128C7E]
    text-white rounded-full shadow-2xl
    flex items-center justify-center
    transition-all duration-300 hover:scale-110
    z-${zIndex}
    group
    ${className}
  `;

  return (
    <>
      <button
        className={buttonClasses}
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={style}
        aria-label="Chatear por WhatsApp"
        title="Chatear por WhatsApp"
      >
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      {showTooltip && (
        <div
          className={`
            fixed ${positionClasses[position].replace('6', '20').replace('bottom-6', 'bottom-20').replace('top-6', 'top-20')}
            bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-semibold
            shadow-md whitespace-nowrap pointer-events-none
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            ${position.includes('right') ? 'right-20' : position.includes('left') ? 'left-20' : 'left-1/2 transform -translate-x-1/2'}
          `}
          style={{
            [position.includes('bottom') ? 'bottom' : 'top']: position.includes('bottom') ? '5.5rem' : '5.5rem'
          }}
        >
          {tooltipText}
        </div>
      )}
    </>
  );
};

export default WhatsApp;
