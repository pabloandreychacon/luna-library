import React, { useState } from 'react';
import { accordionStyles } from '../styles';
import type { Styles } from '../types';

type AccordionElements = 'container' | 'header' | 'content' | 'arrow' | 'innerContent';

export type AccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultActive?: boolean;
  active?: boolean;
  onClick?: () => void;
  styles?: Styles<AccordionElements>;
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
        onClick={handleToggle}
      >
        <span>{title}</span>
        <span style={uiStyles.arrow}>▼</span>
      </button>
      <div style={uiStyles.content}>
        <div style={uiStyles.innerContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;