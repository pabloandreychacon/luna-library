{/* must have toggle, options, selected, onChange */ }
import React from 'react';

type DropDownProps = {
  toggle: React.ReactNode;
  options: React.ReactNode[];
  selected: React.ReactNode;
  onChange: (value: React.ReactNode) => void;
};

const DropDown = ({ toggle, options, selected, onChange }: DropDownProps) => {
  return (
    <div className="show dropdown">
      <button type="button" id="dropdown-basic" aria-expanded="true" className="dropdown-toggle show btn btn-success">
        {selected}
      </button>
      <div
        x-placement="bottom-start"
        aria-labelledby="dropdown-basic"
        className="dropdown-menu show"
        data-popper-reference-hidden="false"
        data-popper-escaped="false"
        data-popper-placement="bottom-start"
        style={{ position: 'absolute', inset: '0px auto auto 0px', transform: 'translate3d(0px, 39.3333px, 0px)' }}
      >
        {options.map((option, index) => (
          <a key={index} href="#/action-1" data-rr-ui-dropdown-item="" className="dropdown-item" onClick={() => onChange(option)}>
            {option}
          </a>
        ))}

      </div>
    </div>
  );
};

export default DropDown;