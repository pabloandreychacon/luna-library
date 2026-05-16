import React from 'react';

export type ClassNames<T extends string> = { [K in T]?: string };
export type Styles<T extends string> = { [K in T]?: React.CSSProperties };

export type Size = 'sm' | 'md' | 'lg';
export type ExtendedSize = Size | 'xl';
export type OptionalSize = Size | 'none';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link';
export type ButtonSize = Size;

export type AnchorVariant = 'none' | 'primary' | 'secondary' | 'outline';
export type InputVariant = 'none' | 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';

export type InputSize = ExtendedSize;
export type ModalSize = ExtendedSize;
export type CardPadding = OptionalSize;
export type CardShadow = OptionalSize;
export type PopconfirmPosition = 'top' | 'bottom' | 'left' | 'right';
export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export type CornerPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
