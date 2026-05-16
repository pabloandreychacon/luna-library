import React from 'react';
import type { CardPadding, CardShadow } from '../types';
import { cardStyles } from '../styles';

export type { CardPadding, CardShadow };

export type CardProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
  padding?: CardPadding;
  shadow?: CardShadow;
  styles?: {
    container?: React.CSSProperties;
    titleContainer?: React.CSSProperties;
    title?: React.CSSProperties;
    content?: React.CSSProperties;
  };
}

const Card = ({
  children,
  title,
  className = "",
  padding = 'md',
  shadow = 'md',
  styles = {},
}: CardProps) => {
  const uiStyles = cardStyles(padding, shadow, styles);

  return (
    <div style={uiStyles.container} className={`luna-card ${className}`.trim()}>
      {title && (
        <div style={uiStyles.titleContainer}>
          <h3 style={uiStyles.title}>{title}</h3>
        </div>
      )}
      <div style={uiStyles.content}>
        {children}
      </div>
    </div>
  );
};

export default Card;
