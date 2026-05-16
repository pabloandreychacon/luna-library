import React from 'react';
import type { Size } from '../types';
import { spinnerAnimationStyles, spinnerSizeValues, spinnerDotSizeValues, spinnerBarSizeValues } from '../styles';

export type SpinnerSize = Size;
export type SpinnerType = 'circle' | 'dots' | 'pulse' | 'bars';

export type SpinnerProps = {
  className?: string;
  size?: SpinnerSize;
  type?: SpinnerType;
  color?: string;
  style?: React.CSSProperties;
};

const Spinner = ({
  className = '',
  size = 'md',
  type = 'circle',
  color = '#2563eb', // blue-600
  style = {},
}: SpinnerProps) => {
  const defaultClass = 'luna-spinner';
  const combinedClassName = `${defaultClass} ${className}`.trim();

  const currentSize = spinnerSizeValues[size];
  const currentDotSize = spinnerDotSizeValues[size];
  const currentBarSize = spinnerBarSizeValues[size];

  if (type === 'dots') {
    const dotStyle = {
      width: currentDotSize,
      height: currentDotSize,
      backgroundColor: color,
      borderRadius: '9999px',
      animation: 'luna-bounce 1s infinite',
    };
    return (
      <div role="status" style={{ display: 'flex', gap: '0.25rem', ...style }} className={combinedClassName}>
        <style>{spinnerAnimationStyles}</style>
        <div style={{ ...dotStyle, animationDelay: '0ms' }}></div>
        <div style={{ ...dotStyle, animationDelay: '150ms' }}></div>
        <div style={{ ...dotStyle, animationDelay: '300ms' }}></div>
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div role="status" style={{ ...style }} className={combinedClassName}>
        <style>{spinnerAnimationStyles}</style>
        <div style={{
          width: currentSize,
          height: currentSize,
          backgroundColor: color,
          borderRadius: '9999px',
          animation: 'luna-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}></div>
      </div>
    );
  }

  if (type === 'bars') {
    const barStyle = {
      width: currentBarSize.w,
      height: currentBarSize.h,
      backgroundColor: color,
      animation: 'luna-pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    };
    return (
      <div role="status" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', ...style }} className={combinedClassName}>
        <style>{spinnerAnimationStyles}</style>
        <div style={{ ...barStyle, animationDelay: '0ms' }}></div>
        <div style={{ ...barStyle, animationDelay: '200ms' }}></div>
        <div style={{ ...barStyle, animationDelay: '400ms' }}></div>
        <div style={{ ...barStyle, animationDelay: '600ms' }}></div>
      </div>
    );
  }

  // Default circle spinner
  return (
    <div
      role="status"
      className={combinedClassName}
      style={{
        display: 'inline-block',
        width: currentSize,
        height: currentSize,
        borderRadius: '9999px',
        border: '2px solid #e5e7eb',
        borderTopColor: color,
        animation: 'luna-spin 1s linear infinite',
        ...style
      }}
    >
      <style>{spinnerAnimationStyles}</style>
      <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>Loading...</span>
    </div>
  );
};

export default Spinner;
