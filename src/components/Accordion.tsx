import React, { useState } from 'react';
import { accordionStyles } from '../styles';

export type AccordionStyles = {
  container?: React.CSSProperties;
  header?: React.CSSProperties;
  content?: React.CSSProperties;
  innerContent?: React.CSSProperties;
  arrow?: React.CSSProperties;
};

export type AccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultActive?: boolean;
  active?: boolean;
  onClick?: () => void;
  styles?: AccordionStyles;
  className?: string;
};

const Accordion = ({
  title,
  children,
  defaultActive = false,
  active: externalActive,
  onClick,
  className,
  styles = {},
}: AccordionProps) => {

  const defaultClass = 'luna-accordion';
  const combinedClassName = `${defaultClass} ${className || ''}`.trim();

  const [internalActive, setInternalActive] = useState(defaultActive);

  const isActive = externalActive !== undefined ? externalActive : internalActive;

  const handleToggle = () => {
    if (onClick) {
      onClick();
    } else {
      setInternalActive(!internalActive);
    }
  };

  const uiStyles = accordionStyles(isActive, styles);

  return (
    <div style={uiStyles.container} className={combinedClassName}>
      <button
        type="button"
        style={uiStyles.header}
        className='accordion-button'
        onClick={handleToggle}
      >
        <span>{title}</span>
        <span style={uiStyles.arrow}>▼</span>
      </button>
      <div style={uiStyles.content} className='accordion-content'>
        <div style={uiStyles.innerContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;