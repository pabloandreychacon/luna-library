import React, { useState } from 'react';
import type { ClassNames, Styles } from '../types';
import { qrCodeStyles } from '../styles';

export type QRCodeClassNames = ClassNames<'container' | 'image'>;
export type QRCodeStyles = Styles<'container' | 'image'>;

export type QRCodeProps = {
  value: string;
  size?: number;
  color?: string; // Hex color for the QR, default #000000
  bgColor?: string; // Hex color for background, default #ffffff
  bordered?: boolean;
  classNames?: QRCodeClassNames;
  styles?: QRCodeStyles;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  className?: string;
};

const QRCode = ({
  value,
  size = 160,
  color = '000000',
  bgColor = 'ffffff',
  bordered = true,
  classNames = {},
  styles = {},
  errorCorrectionLevel = 'M',
  className,
}: QRCodeProps) => {
  const defaultClassNames = {
    container: 'luna-qrcode',
    image: 'luna-qrcode-image'
  };
  const finalClassNames = { ...defaultClassNames, ...classNames };

  const [isLoading, setIsLoading] = useState(true);

  // Clean colors for the API (remove #)
  const cleanColor = color.startsWith('#') ? color.slice(1) : color;
  const cleanBgColor = bgColor.startsWith('#') ? bgColor.slice(1) : bgColor;

  // Using QRServer API for zero-dependency generation
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&color=${cleanColor}&bgcolor=${cleanBgColor}&ecc=${errorCorrectionLevel}`;

  const uiStyles = qrCodeStyles(styles, bordered, cleanBgColor, size, isLoading);

  return (
    <div className={`${finalClassNames.container} ${className || ''}`.trim()} style={uiStyles.container}>
      {isLoading && (
        <div style={uiStyles.skeleton} />
      )}
      <img
        src={qrUrl}
        alt={`QR Code for ${value}`}
        style={uiStyles.image}
        className={finalClassNames.image}
        onLoad={() => setIsLoading(false)}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
};

export default QRCode;
