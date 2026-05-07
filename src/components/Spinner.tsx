import React from 'react';

{/* must have animation,role, className */ }
type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  const spinnerClass = className || "spinner-border";
  return (
    <div role="status" className={spinnerClass}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;