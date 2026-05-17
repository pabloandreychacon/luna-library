import React, { useEffect, useState } from 'react';
import type { ToastSeverity, ToastPosition } from '../types';
import { toastStyles, toastSeverityConfig } from '../styles';

export type ToastClassNames = {
  container?: string;
  content?: string;
  icon?: string;
  summary?: string;
  detail?: string;
  closeButton?: string;
};

export type ToastStyles = {
  container?: React.CSSProperties;
  iconWrapper?: React.CSSProperties;
  content?: React.CSSProperties;
  summary?: React.CSSProperties;
  detail?: React.CSSProperties;
  closeButton?: React.CSSProperties;
};

export type ToastProps = {
  visible: boolean;
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  life?: number; // miliseconds
  onClose: () => void;
  position?: ToastPosition;
  classNames?: ToastClassNames;
  styles?: ToastStyles;
  className?: string;
};

const Toast = ({
  visible,
  severity = 'info',
  summary,
  detail,
  life,
  onClose,
  position = 'top-right',
  classNames,
  styles,
  className,
}: ToastProps) => {
  const defaultClassNames = {
    container: 'luna-toast',
    content: 'luna-toast-content',
    icon: 'luna-toast-icon',
    summary: 'luna-toast-summary',
    detail: 'luna-toast-detail',
    closeButton: 'luna-toast-close'
  };
  const finalClassNames = { ...defaultClassNames, classNames };

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let timer: any;
    if (visible && life && life > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, life);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, life]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300) // matches transition time
  };

  if (!visible && !isExiting) return null;

  const uiStyles = toastStyles(styles, severity, position, isExiting, visible);
  const config = toastSeverityConfig[severity || 'info'];

  return (
    <div className={`${finalClassNames?.container} ${className || ''}`.trim()} style={uiStyles.container}>
      <div className={finalClassNames?.icon} style={uiStyles.iconWrapper}>
        {config.icon}
      </div>
      <div className={finalClassNames?.content} style={uiStyles.content}>
        {summary && <span className={finalClassNames?.summary} style={uiStyles.summary}>{summary}</span>}
        {detail && <div className={finalClassNames.detail} style={uiStyles.detail}>{detail}</div>}
      </div>
      <button
        className={finalClassNames.closeButton}
        style={uiStyles.closeButton}
        onClick={handleClose}
        onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseOut={(e) => (e.currentTarget.style.opacity = '0.6')}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
