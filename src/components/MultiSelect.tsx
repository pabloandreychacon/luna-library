import React, { useState, useMemo, useRef, useEffect } from 'react';
import { multiSelectStyles } from '../styles';
import Input from './Input';

export type MultiSelectOption = {
  label: string;
  value: any;
  disabled?: boolean;
};

export type MultiSelectClassNames = {
  container?: string;
  trigger?: string;
  label?: string;
  panel?: string;
  header?: string;
  filterInput?: string;
  list?: string;
  item?: string;
  chip?: string;
  chipIcon?: string;
};

export type MultiSelectStyles = {
  container?: React.CSSProperties;
  trigger?: React.CSSProperties;
  chevron?: React.CSSProperties;
  panel?: React.CSSProperties;
  header?: React.CSSProperties;
  selectAllWrapper?: React.CSSProperties;
  list?: React.CSSProperties;
  item?: React.CSSProperties;
  checkbox?: React.CSSProperties;
  chip?: React.CSSProperties;
  chipIcon?: React.CSSProperties;
};

export type MultiSelectProps = {
  options: MultiSelectOption[];
  value: any[];
  onChange: (value: any[]) => void;
  id?: string;
  placeholder?: string;
  display?: 'comma' | 'chip';
  filter?: boolean;
  filterPlaceholder?: string;
  selectAll?: boolean;
  maxSelectedLabels?: number;
  classNames?: MultiSelectClassNames;
  styles?: MultiSelectStyles;
  disabled?: boolean;
  className?: string;
};

const MultiSelect = ({
  options,
  value = [],
  onChange,
  id,
  placeholder = 'Select Items',
  display = 'comma',
  filter = true,
  filterPlaceholder = 'Search...',
  selectAll = true,
  maxSelectedLabels = 3,
  classNames,
  styles,
  disabled = false,
}: MultiSelectProps) => {
  const defaultClassNames = {
    container: 'luna-multiselect',
    trigger: 'luna-multiselect-trigger',
    panel: 'luna-multiselect-panel',
    header: 'luna-multiselect-header',
    item: 'luna-multiselect-item',
    chip: 'luna-multiselect-chip'
  };
  const finalClassNames = { ...defaultClassNames, classNames };

  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter(opt =>
      opt.label.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [options, filterText]);

  const handleToggleOption = (optionValue: any) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allValues = options.filter(opt => !opt.disabled).map(opt => opt.value);
      onChange(allValues);
    } else {
      onChange([]);
    }
  };

  const isAllSelected = options.length > 0 && options.every(opt => value.includes(opt.value));

  const renderLabel = () => {
    if (value.length === 0) return <span style={{ color: '#9ca3af' }}>{placeholder}</span>;

    if (display === 'chip') {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {value.map(val => {
            const opt = options.find(o => o.value === val);
            return (
              <div key={val} style={uiStyles.chip} className={finalClassNames.chip}>
                {opt?.label}
                <span
                  style={uiStyles.chipIcon}
                  onClick={(e) => { e.stopPropagation(); handleToggleOption(val); }}
                >
                  ×
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    if (value.length > maxSelectedLabels) {
      return `${value.length} items selected`;
    }

    return value.map(val => options.find(o => o.value === val)?.label).join(', ');
  };

  const uiStyles = multiSelectStyles(styles, disabled, isOpen);


  return (
    <div
      ref={containerRef}
      className={`${finalClassNames.container} ${classNames || ''}`.trim()}
      style={uiStyles.container}
    >
      <div
        className={finalClassNames.trigger}
        style={uiStyles.trigger}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {renderLabel()}
        </div>
        <span style={uiStyles.chevron}>▼</span>
      </div>

      <div className={finalClassNames.panel} style={uiStyles.panel}>
        {(filter || selectAll) && (
          <div style={uiStyles.header} className={finalClassNames.header}>
            {selectAll && (
              <label style={uiStyles.selectAllWrapper}>
                <input
                  type="checkbox"
                  style={uiStyles.checkbox}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
                <span>Select All</span>
              </label>
            )}
            {filter && (
              <Input
                inputSize="sm"
                id={id ? `${id}-filter` : undefined}
                placeholder={filterPlaceholder}
                value={filterText}
                onChange={setFilterText}
                className="w-full"
              />
            )}
          </div>
        )}

        <div style={uiStyles.list}>
          {filteredOptions.map(opt => {
            const isSelected = value.includes(opt.value);
            return (
              <div
                key={opt.value}
                style={uiStyles.item(isSelected, !!opt.disabled)}
                className={finalClassNames.item}
                onClick={() => !opt.disabled && handleToggleOption(opt.value)}
                onMouseOver={(e) => !opt.disabled && !isSelected && (e.currentTarget.style.backgroundColor = '#f9fafb')}
                onMouseOut={(e) => !opt.disabled && !isSelected && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={isSelected}
                  style={uiStyles.checkbox}
                  disabled={opt.disabled}
                />
                <span>{opt.label}</span>
              </div>
            );
          })}
          {filteredOptions.length === 0 && (
            <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
