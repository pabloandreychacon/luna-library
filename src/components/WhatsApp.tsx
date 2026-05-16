import React, { useState } from 'react';
import type { Size, CornerPosition } from '../types';
import { whatsAppSizes, whatsAppStyles } from '../styles';

export interface WhatsAppProps {
  /** Phone number for WhatsApp (with country code, without + or spaces) */
  phone?: string;
  /** Default message to send */
  message?: string;
  /** Position of the button */
  position?: CornerPosition;
  /** Size of the button */
  size?: Size;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Tooltip text */
  tooltipText?: string;
  /** Custom className */
  className?: string;
  /** Custom styles */
  styles?: {
    button?: React.CSSProperties;
    tooltip?: React.CSSProperties;
  };
  /** Callback when button is clicked */
  onClick?: () => void;
  /** Z-index for the button */
  zIndex?: number;
}

const WhatsApp = ({
  phone = '',
  message = 'Hi!',
  position = 'bottom-right',
  size = 'md',
  showTooltip = true,
  tooltipText = 'Need help?',
  className = '',
  styles = {},
  onClick,
  zIndex = 1000,
}: WhatsAppProps) => {
  const defaultClass = 'luna-whatsapp';
  const combinedClassName = `${defaultClass} ${className}`.trim();

  const [isHovered, setIsHovered] = useState(false);

  if (!phone) return null;

  const handleWhatsAppClick = () => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClick?.();
  };

  const uiStyles = whatsAppStyles(styles, position, size, isHovered, zIndex);
  const currentSize = whatsAppSizes[size];

  return (
    <>
      <button
        type="button"
        style={uiStyles.button}
        className={combinedClassName}
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="WhatsApp"
      >
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      {showTooltip && (
        <div style={uiStyles.tooltip}>
          {tooltipText}
        </div>
      )}
    </>
  );
};

export default WhatsApp;
