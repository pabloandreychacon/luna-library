import React, { useState, useRef, useEffect } from 'react';
import type { ClassNames, Styles, PopconfirmPosition } from '../types';
import Button from './Button';
import { popconfirmStyles } from '../styles';

export type PopconfirmClassNames = ClassNames<'container' | 'popover' | 'title' | 'description' | 'actions' | 'okButton' | 'cancelButton'>;

export type PopconfirmStyles = Styles<'container' | 'popover' | 'title' | 'description'>;

export type PopconfirmProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  position?: PopconfirmPosition;
  children: React.ReactElement;
  classNames?: PopconfirmClassNames;
  styles?: PopconfirmStyles;
  disabled?: boolean;
  className?: string;
};

const Popconfirm = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = 'Yes',
  cancelText = 'No',
  position = 'top',
  children,
  classNames = {},
  styles = {},
  disabled = false,
  className = '',
}: PopconfirmProps) => {
  const defaultClassNames = {
    container: 'luna-popconfirm',
    popover: 'luna-popconfirm-popover',
    title: 'luna-popconfirm-title',
    description: 'luna-popconfirm-description',
    actions: 'luna-popconfirm-actions',
    okButton: 'luna-popconfirm-ok',
    cancelButton: 'luna-popconfirm-cancel'
  };
  const finalClassNames = { ...defaultClassNames, ...classNames };

  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show]);

  const handleConfirm = () => {
    onConfirm();
    setShow(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setShow(false);
  };

  const triggerElement = React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      if (disabled) return;
      e.stopPropagation();
      setShow(!show);
      const childProps = children.props as any;
      if (childProps?.onClick) childProps.onClick(e);
    },
  } as any);

  const uiStyles = popconfirmStyles(styles, show, position);

  return (
    <div ref={containerRef} style={uiStyles.container} className={`${finalClassNames.container} ${className}`.trim()}>
      {triggerElement}

      <div style={uiStyles.popover} className={finalClassNames.popover}>
        <div style={uiStyles.titleWrapper}>
          <span style={uiStyles.icon}>⚠</span>
          <div style={uiStyles.title} className={finalClassNames.title}>{title}</div>
        </div>
        {description && (
          <div style={uiStyles.description} className={finalClassNames.description}>
            {description}
          </div>
        )}
        <div style={uiStyles.actions} className={finalClassNames.actions}>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            className={finalClassNames.cancelButton}
          >
            {cancelText}
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleConfirm}
            className={finalClassNames.okButton}
          >
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popconfirm;
