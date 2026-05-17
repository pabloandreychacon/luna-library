import React, { useState } from 'react';
import type { Size, StandardVariant } from '../types';
import { anchorBaseStyles, standardVariantStyles } from '../styles';

export type { StandardVariant as AnchorVariant };
export type AnchorSize = Size;
export type AllAnchorProps = React.ComponentPropsWithoutRef<'a'>;

export type AnchorProps = {
  children?: React.ReactNode;
  variant?: StandardVariant;
  size?: AnchorSize;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
};

const Anchor = ({
  children,
  variant = 'none',
  size = 'md',
  href = 'https://andreychaconresumereact.netlify.app/',
  className = '',
  target,
  rel,
  style = {},
  ...props
}: AnchorProps & AllAnchorProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const defaultClass = 'luna-anchor';
  const combinedClassName = `${defaultClass} ${className}`.trim();

  // Focus and Active states could also be managed via state if needed,
  // but we'll stick to hover for simplicity in inline styles.

  const uiStyles = {
    base: anchorBaseStyles(variant, isHovered, size),

    variants: standardVariantStyles(isHovered)
  };

  const finalStyle = {
    ...uiStyles.base,
    ...uiStyles.variants[variant],
    ...style,
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={combinedClassName}
      style={finalStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </a>
  );
};

export default Anchor;