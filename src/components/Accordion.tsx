
import React from 'react';

/**
 * must have key, active, onClick, header, content body
 */
interface AccordionProps {
  key: string;
  active: boolean;
  onClick: () => void;
  header: React.ReactNode;
  content: React.ReactNode;
}

const Accordion = ({ key, active, onClick, header, content }: AccordionProps) => {
  return (
    <div>
      <h2>{header}</h2>
      {content}
    </div>
  );
};

export default Accordion;