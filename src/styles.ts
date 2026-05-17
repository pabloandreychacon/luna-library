import React from 'react';
import type { Size, StandardVariant, CardPadding, CardShadow, InputSize, ModalSize, PopconfirmPosition, ProgressBarVariant, ToastSeverity, ToastPosition, CornerPosition } from './types';

// ─── Design Tokens ────────────────────────────────────────────

export const colors = {
  white: '#ffffff',
  border: '#e5e7eb',
  borderInput: '#d1d5db',
  borderLight: '#f3f4f6',
  text: '#374151',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  textDisabled: '#9ca3af',
  bgHeader: '#f9fafb',
  bgHover: '#f3f4f6',
  bgSelected: '#eff6ff',
  bgSkeleton: '#f3f4f6',
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  secondary: '#4b5563',
  secondaryHover: '#6d737c',
  success: '#16a34a',
  successHover: '#15803d',
  danger: '#dc2626',
  dangerHover: '#b91c1c',
  warning: '#f59e0b',
  warningHover: '#d97706',
  info: '#0ea5e9',
  infoHover: '#0891b2',
  light: '#f9fafb',
  lightHover: '#f3f4f6',
  dark: '#111827',
  darkHover: '#1f2937',
  whatsapp: '#25D366',
  whatsappHover: '#128C7E',
} as const;

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '50%',
  pill: '9999px',
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
} as const;

export const fontWeights = {
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const transitions = {
  fast: 'all 150ms ease-in-out',
  bg: 'background-color 150ms',
  bgSlow: 'background-color 200ms',
  transform: 'transform 200ms',
  normal: 'all 300ms ease-in-out',
} as const;

export const shadows = {
  panel: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  menu: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
} as const;

export const zIndices = {
  panel: 1000,
  menu: 100,
} as const;

// ─── Common Style Objects ─────────────────────────────────────

export const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
  md: { padding: '0.5rem 1rem', fontSize: '1rem' },
  lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
};

export const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const commonStyles = {
  container: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.lg,
  } as React.CSSProperties,

  panel: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    width: '100%',
    marginTop: '0.5rem',
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.lg,
    boxShadow: shadows.panel,
    zIndex: zIndices.panel,
    overflow: 'hidden',
  } as React.CSSProperties,

  trigger: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    backgroundColor: colors.white,
    border: `1px solid ${colors.borderInput}`,
    borderRadius: radii.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: fontSizes.sm,
    color: colors.text,
    cursor: 'pointer',
    outline: 'none',
    transition: transitions.fast,
  } as React.CSSProperties,

  header: {
    width: '100%',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,

  chevron: {
    fontSize: fontSizes.xs,
    transition: transitions.transform,
    color: colors.textDisabled,
  } as React.CSSProperties,

  list: {
    maxHeight: '200px',
    overflowY: 'auto' as const,
    padding: '0.25rem 0',
  } as React.CSSProperties,

  item: (isSelected: boolean, isDisabled: boolean) => ({
    padding: '0.5rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: isDisabled ? 'not-allowed' as const : 'pointer' as const,
    backgroundColor: isSelected ? colors.bgSelected : 'transparent',
    color: isDisabled ? colors.textDisabled : colors.text,
    fontSize: fontSizes.sm,
    transition: transitions.bg,
  }) as React.CSSProperties,

  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    backgroundColor: colors.bgHover,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.sm,
    padding: '0.125rem 0.375rem',
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  } as React.CSSProperties,

  icon: {
    marginLeft: '0.5rem',
    fontSize: fontSizes.xs,
    color: colors.textDisabled,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
  } as React.CSSProperties,

  checkbox: {
    width: '1rem',
    height: '1rem',
    cursor: 'inherit',
  } as React.CSSProperties,

  filterMenu: {
    position: 'absolute' as const,
    top: '100%',
    left: '1rem',
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.md,
    boxShadow: shadows.menu,
    zIndex: zIndices.menu,
    padding: '0.5rem',
    minWidth: '150px',
  } as React.CSSProperties,

  filterOption: (active: boolean) => ({
    width: '100%',
    padding: '0.375rem 0.75rem',
    textAlign: 'left' as const,
    fontSize: fontSizes.xs,
    border: 'none',
    backgroundColor: active ? colors.bgSelected : 'transparent',
    color: active ? colors.primary : colors.text,
    borderRadius: radii.sm,
    cursor: 'pointer',
    display: 'block',
  }) as React.CSSProperties,

  pagination: {
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.bgHeader,
  } as React.CSSProperties,

  buttonBase: {
    display: 'inline-flex',
    fontWeight: fontWeights.medium,
    borderRadius: radii.md,
    hover: {
      backgroundColor: colors.bgHover,
    },
  } as React.CSSProperties,

  anchorBase: {
  } as React.CSSProperties,

  inputWrapper: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  } as React.CSSProperties,

  inputLabel: {
    marginBottom: '0.25rem',
    display: 'block',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text,
  } as React.CSSProperties,

  inputField: {
    width: '100%',
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: colors.borderInput,
    transition: transitions.fast,
    outline: 'none',
  } as React.CSSProperties,

  popover: {
    position: 'absolute' as const,
    width: '220px',
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.lg,
    boxShadow: shadows.panel,
    zIndex: zIndices.panel,
    padding: '1rem',
  } as React.CSSProperties,

  floatingButton: {
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    boxShadow: shadows.panel,
  } as React.CSSProperties,

  card: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.md,
  } as React.CSSProperties,
};

export const cardPaddingValues: Record<CardPadding, string> = {
  none: '0',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
};

export const cardShadowValues: Record<CardShadow, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

export const cardStyles = (padding: CardPadding, shadow: CardShadow, styles?: Record<string, React.CSSProperties>) => ({
  container: {
    ...commonStyles.card,
    padding: cardPaddingValues[padding],
    boxShadow: cardShadowValues[shadow],
    width: '100%',
    ...styles?.container,
  } as React.CSSProperties,
  titleContainer: {
    marginBottom: '1rem',
    ...styles?.titleContainer,
  } as React.CSSProperties,
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    color: colors.dark,
    margin: 0,
    ...styles?.title,
  } as React.CSSProperties,
  content: {
    ...styles?.content,
  } as React.CSSProperties,
});

export const dataTableStyles = (styles?: Record<string, React.CSSProperties>) => ({
  container: {
    ...commonStyles.container,
    width: '100%',
    overflowX: 'auto',
    ...styles?.container,
  } as React.CSSProperties,
  searchContainer: { padding: '1rem', borderBottom: `1px solid ${colors.border}`, ...styles?.searchContainer } as React.CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: fontSizes.sm,
    ...styles?.table,
  } as React.CSSProperties,
  thead: {
    ...styles?.thead,
  } as React.CSSProperties,
  th: {
    padding: '0.75rem 1rem',
    backgroundColor: colors.bgHeader,
    borderBottom: `1px solid ${colors.border}`,
    fontWeight: fontWeights.semibold,
    color: colors.text,
    fontSize: fontSizes.sm,
    position: 'relative',
    ...styles?.th,
  } as React.CSSProperties,
  td: {
    padding: '0.75rem 1rem',
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textSecondary,
    ...styles?.td,
  } as React.CSSProperties,
  tr: (clickable: boolean) => ({
    transition: transitions.bg,
    cursor: clickable ? 'pointer' : 'default',
    ...styles?.tr,
  }) as React.CSSProperties,
  pagination: {
    ...commonStyles.pagination,
    ...styles?.pagination,
  } as React.CSSProperties,
  icon: {
    ...commonStyles.icon,
    ...styles?.icon,
  } as React.CSSProperties,
  filterMenu: {
    ...commonStyles.filterMenu,
    ...styles?.filterMenu,
  } as React.CSSProperties,
  filterOption: (active: boolean) => ({
    ...commonStyles.filterOption(active),
    ...styles?.filterOption,
  }) as React.CSSProperties,
});

export const dropDownStyles = (
  styles?: Record<string, React.CSSProperties>,
  disabled?: boolean,
  isOpen?: boolean,
  hoverIndex?: number | null,
  value?: any
) => ({
  container: {
    position: 'relative',
    display: 'inline-flex',
    width: '100%',
    fontSize: fontSizes.sm,
    color: colors.text,
    ...styles?.container,
  } as React.CSSProperties,
  trigger: {
    ...commonStyles.trigger,
    padding: '0.625rem 1rem',
    borderRadius: radii.md,
    color: value ? colors.dark : colors.textDisabled,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'border-color 200ms, box-shadow 200ms',
    boxShadow: isOpen ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
    borderColor: isOpen ? colors.primary : colors.borderInput,
    ...styles?.trigger,
  } as React.CSSProperties,
  panel: {
    ...commonStyles.panel,
    marginTop: '0.25rem',
    borderRadius: radii.md,
    maxHeight: '200px',
    overflow: 'auto',
    display: isOpen ? 'block' : 'none',
    ...styles?.panel,
  } as React.CSSProperties,
  option: (index: number) => ({
    ...commonStyles.item(false, false),
    display: 'block',
    textAlign: 'left',
    width: '100%',
    border: 'none',
    gap: 0,
    padding: '0.5rem 1rem',
    backgroundColor: hoverIndex === index ? colors.bgHover : 'transparent',
    ...styles?.option,
  }) as React.CSSProperties,
  arrow: {
    ...commonStyles.chevron,
    marginLeft: '0.5rem',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    ...styles?.arrow,
  } as React.CSSProperties,
});

// ─── Variant Style Objects ────────────────────────────────────

export const variantStyles = {
  primary: { backgroundColor: colors.primary, color: colors.white },
  secondary: { backgroundColor: colors.secondary, color: colors.white },
  outline: { backgroundColor: 'transparent', color: colors.text, borderColor: colors.borderInput },
  success: { backgroundColor: colors.success, color: colors.white },
  danger: { backgroundColor: colors.danger, color: colors.white },
  warning: { backgroundColor: colors.warning, color: colors.white },
  info: { backgroundColor: colors.info, color: colors.white },
  dark: { backgroundColor: colors.dark, color: colors.white },
  light: { backgroundColor: colors.light, color: colors.dark },
  link: { backgroundColor: 'transparent', color: colors.primary, border: 'none', padding: 0, textDecoration: 'underline' },
} as const;

export const inputStyles = (
  styles?: Record<string, React.CSSProperties>,
  extraStyle?: React.CSSProperties,
  inputSize?: InputSize,
  readOnly?: boolean,
  disabled?: boolean
) => ({
  container: {
    ...commonStyles.inputWrapper,
    styles,
    ...extraStyle,
  } as React.CSSProperties,
  label: {
    ...commonStyles.inputLabel,
    styles,
  } as React.CSSProperties,
  input: {
    ...commonStyles.inputField,
    padding: inputSize === 'sm' ? '0.25rem 0.5rem' :
      inputSize === 'lg' ? '0.75rem 1rem' :
        inputSize === 'xl' ? '1rem 1.5rem' : '0.5rem 0.75rem',
    fontSize: inputSize === 'sm' ? fontSizes.sm :
      inputSize === 'lg' ? fontSizes.lg :
        inputSize === 'xl' ? fontSizes.xl : fontSizes.base,
    backgroundColor: readOnly ? colors.borderLight : colors.white,
    cursor: disabled ? 'not-allowed' : (readOnly ? 'default' : 'text'),
    opacity: disabled ? 0.5 : 1,
    styles,
  } as React.CSSProperties,
  variants: {
    none: {},
    primary: { borderColor: colors.primary, color: colors.primary },
    secondary: { borderColor: colors.secondary, color: colors.secondary },
    outline: { borderColor: colors.borderInput, color: colors.text },
    danger: { borderColor: colors.danger, color: colors.danger },
    success: { borderColor: colors.success, color: colors.success },
    warning: { borderColor: colors.warning, color: colors.warning },
    info: { borderColor: colors.info, color: colors.info },
    dark: { borderColor: colors.dark, color: colors.dark },
    light: { borderColor: colors.light, color: colors.light },
    link: { borderColor: 'transparent', color: colors.primary },
  } as Record<StandardVariant, React.CSSProperties>,
});

export const multiSelectStyles = (
  styles?: Record<string, React.CSSProperties>,
  disabled?: boolean,
  isOpen?: boolean
) => ({
  container: {
    position: 'relative',
    width: '100%',
    styles,
  } as React.CSSProperties,
  trigger: {
    ...commonStyles.trigger,
    minHeight: '2.5rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    styles,
  } as React.CSSProperties,
  chevron: {
    ...commonStyles.chevron,
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
  } as React.CSSProperties,
  panel: {
    ...commonStyles.panel,
    display: isOpen ? 'block' : 'none',
    styles,
  } as React.CSSProperties,
  header: {
    ...commonStyles.header,
    padding: '0.75rem',
    borderBottom: `1px solid ${colors.borderLight}`,
    flexDirection: 'column',
    gap: '0.5rem',
    styles,
  } as React.CSSProperties,
  selectAllWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: fontSizes.sm,
    color: colors.text,
    cursor: 'pointer',
  } as React.CSSProperties,
  list: {
    ...commonStyles.list,
  } as React.CSSProperties,
  item: (isSelected: boolean, isDisabled: boolean) => ({
    ...commonStyles.item(isSelected, isDisabled),
    styles,
  }) as React.CSSProperties,
  checkbox: {
    ...commonStyles.checkbox,
  } as React.CSSProperties,
  chip: {
    ...commonStyles.chip,
    styles,
  } as React.CSSProperties,
  chipIcon: {
    cursor: 'pointer',
    fontSize: fontSizes.base,
    lineHeight: 1,
    color: colors.textDisabled,
  } as React.CSSProperties,
});

export const popconfirmPositionStyles = (pos: PopconfirmPosition): React.CSSProperties => {
  const distance = '10px';
  switch (pos) {
    case 'top': return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: distance };
    case 'bottom': return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: distance };
    case 'left': return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: distance };
    case 'right': return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: distance };
    default: return {};
  }
};

export const popconfirmStyles = (
  styles?: Record<string, React.CSSProperties>,
  show?: boolean,
  position?: PopconfirmPosition
) => ({
  container: {
    position: 'relative',
    display: 'inline-block',
    ...styles?.container,
  } as React.CSSProperties,
  popover: {
    ...commonStyles.popover,
    display: show ? 'block' : 'none',
    ...popconfirmPositionStyles(position || 'top'),
    ...styles?.popover,
  } as React.CSSProperties,
  titleWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    ...styles?.titleWrapper,
  } as React.CSSProperties,
  icon: {
    color: '#eab308',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '1px',
    ...styles?.icon,
  } as React.CSSProperties,
  title: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.dark,
    ...styles?.title,
  } as React.CSSProperties,
  description: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginBottom: '0.75rem',
    marginLeft: '1.5rem',
    ...styles?.description,
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    ...styles?.actions,
  } as React.CSSProperties,
});

export const preloaderStyles = (
  zIndex: number,
  backgroundColor: string,
  size: number,
  borderWidth: number,
  styles?: Record<string, React.CSSProperties>
) => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex,
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 300ms ease-in-out',
    ...styles?.overlay,
  } as React.CSSProperties,
  spinner: {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${borderWidth}px`,
    ...styles?.spinner,
  } as React.CSSProperties,
});

export const progressBarVariantColors: Record<ProgressBarVariant, { bg: string; text: string; track: string }> = {
  primary: { bg: colors.primary, text: colors.white, track: colors.border },
  success: { bg: colors.success, text: colors.white, track: colors.border },
  warning: { bg: colors.warning, text: colors.dark, track: colors.border },
  danger: { bg: colors.danger, text: colors.white, track: colors.border },
  dark: { bg: colors.darkHover, text: colors.white, track: colors.borderInput },
  light: { bg: colors.light, text: colors.dark, track: colors.borderInput },
};

export const progressBarStyles = (
  styles?: Record<string, React.CSSProperties>,
  percentage?: number,
  variant?: ProgressBarVariant
) => {
  const currentVariant = progressBarVariantColors[variant || 'primary'] || progressBarVariantColors.primary;
  return {
    container: {
      width: '100%',
      backgroundColor: colors.bgHover,
      borderRadius: radii.pill,
      height: '1rem',
      overflow: 'hidden',
      ...styles?.container,
    } as React.CSSProperties,
    bar: {
      height: '100%',
      backgroundColor: currentVariant.bg,
      width: `${percentage || 0}%`,
      transition: transitions.normal,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radii.pill,
      ...styles?.bar,
    } as React.CSSProperties,
    text: {
      color: currentVariant.text,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.medium,
      whiteSpace: 'nowrap',
      padding: '0 0.5rem',
      ...styles?.text,
    } as React.CSSProperties,
  };
};

export const qrCodeStyles = (
  styles?: Record<string, React.CSSProperties>,
  bordered?: boolean,
  cleanBgColor?: string,
  size?: number,
  isLoading?: boolean
) => ({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: bordered ? '0.75rem' : '0',
    backgroundColor: `#${cleanBgColor || 'ffffff'}`,
    border: bordered ? `1px solid ${colors.border}` : 'none',
    borderRadius: radii.lg,
    width: 'fit-content',
    position: 'relative',
    overflow: 'hidden',
    ...styles?.container,
  } as React.CSSProperties,
  image: {
    display: 'block',
    width: `${size || 160}px`,
    height: `${size || 160}px`,
    opacity: isLoading ? 0 : 1,
    transition: 'opacity 300ms ease-in-out',
    ...styles?.image,
  } as React.CSSProperties,
  skeleton: {
    position: 'absolute',
    width: `${size || 160}px`,
    height: `${size || 160}px`,
    backgroundColor: colors.bgSkeleton,
    borderRadius: radii.sm,
    display: isLoading ? 'block' : 'none',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    ...styles?.skeleton,
  } as React.CSSProperties,
});

export const spinnerAnimationStyles = `
  @keyframes luna-spin { to { transform: rotate(360deg); } }
  @keyframes luna-bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); } }
  @keyframes luna-pulse { 50% { opacity: .5; } }
`;

export const spinnerSizeValues: Record<Size, string> = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
};

export const spinnerDotSizeValues: Record<Size, string> = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
};

export const spinnerBarSizeValues: Record<Size, { w: string; h: string }> = {
  sm: { w: '0.25rem', h: '1rem' },
  md: { w: '0.25rem', h: '1.5rem' },
  lg: { w: '0.25rem', h: '2rem' },
};

export const toastSeverityConfig: Record<ToastSeverity, { bg: string; border: string; text: string; secondaryText: string; icon: string }> = {
  success: { bg: '#f0fdf4', border: '#bcf0da', text: '#166534', secondaryText: '#15803d', icon: '✓' },
  info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', secondaryText: '#1d4ed8', icon: 'ℹ' },
  warn: { bg: '#fffbeb', border: '#fef3c7', text: '#92400e', secondaryText: '#b45309', icon: '⚠' },
  error: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b', secondaryText: '#b91c1c', icon: '✖' },
};

export const toastPositionStyles = (pos: ToastPosition): React.CSSProperties => {
  const base: React.CSSProperties = { position: 'fixed', zIndex: zIndices.panel, margin: '1rem' };
  switch (pos) {
    case 'top-right': return { ...base, top: 0, right: 0 };
    case 'top-left': return { ...base, top: 0, left: 0 };
    case 'bottom-right': return { ...base, bottom: 0, right: 0 };
    case 'bottom-left': return { ...base, bottom: 0, left: 0 };
    case 'top-center': return { ...base, top: 0, left: '50%', transform: 'translateX(-50%)' };
    case 'bottom-center': return { ...base, bottom: 0, left: '50%', transform: 'translateX(-50%)' };
    default: return { ...base, top: 0, right: 0 };
  }
};

export const toastStyles = (
  styles?: Record<string, React.CSSProperties>,
  severity?: ToastSeverity,
  position?: ToastPosition,
  isExiting?: boolean,
  visible?: boolean
) => {
  const config = toastSeverityConfig[severity || 'info'];
  return {
    container: {
      ...toastPositionStyles(position || 'top-right'),
      ...commonStyles.container,
      minWidth: '300px',
      maxWidth: '450px',
      backgroundColor: config.bg,
      border: `1px solid ${config.border}`,
      padding: '1rem',
      boxShadow: shadows.panel,
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      transition: transitions.normal,
      opacity: isExiting || !visible ? 0 : 1,
      transform: isExiting || !visible
        ? ((position || 'top-right').includes('top') ? 'translateY(-20px)' : 'translateY(20px)')
        : ((position || 'top-right').includes('center') ? 'translateX(-50%)' : 'none'),
      ...styles?.container,
    } as React.CSSProperties,
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1.5rem',
      height: '1.5rem',
      borderRadius: radii.full,
      backgroundColor: config.border,
      color: config.text,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
      flexShrink: 0,
      ...styles?.iconWrapper,
    } as React.CSSProperties,
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      ...styles?.content,
    } as React.CSSProperties,
    summary: {
      fontWeight: fontWeights.bold,
      fontSize: fontSizes.sm,
      color: config.text,
      ...styles?.summary,
    } as React.CSSProperties,
    detail: {
      fontSize: fontSizes.sm,
      color: config.secondaryText,
      lineHeight: '1.25rem',
      ...styles?.detail,
    } as React.CSSProperties,
    closeButton: {
      background: 'none',
      border: 'none',
      color: config.text,
      cursor: 'pointer',
      fontSize: fontSizes.xl,
      lineHeight: 1,
      padding: '0.25rem',
      opacity: 0.6,
      transition: transitions.fast,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...styles?.closeButton,
    } as React.CSSProperties,
  };
};

export const typedStyles = (
  style?: React.CSSProperties,
  cursorStyle?: React.CSSProperties,
  cursorOpacity?: number
) => ({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    ...style,
  } as React.CSSProperties,
  cursor: {
    display: 'inline-block',
    marginLeft: '0.25rem',
    width: '0.125rem',
    height: '1.2em',
    backgroundColor: 'currentColor',
    opacity: cursorOpacity ?? 1,
    transition: transitions.fast,
    ...cursorStyle,
  } as React.CSSProperties,
});

export const whatsAppSizes: Record<Size, { button: number; icon: number }> = {
  sm: { button: 40, icon: 20 },
  md: { button: 56, icon: 28 },
  lg: { button: 64, icon: 32 },
};

export const cornerPositionStyles = (position: CornerPosition): React.CSSProperties => {
  switch (position) {
    case 'bottom-left': return { bottom: '2rem', left: '2rem' };
    case 'top-right': return { top: '2rem', right: '2rem' };
    case 'top-left': return { top: '2rem', left: '2rem' };
    default: return { bottom: '2rem', right: '2rem' };
  }
};

export const whatsAppStyles = (
  styles?: Record<string, React.CSSProperties>,
  position?: CornerPosition,
  size?: Size,
  isHovered?: boolean,
  zIndex?: number
) => {
  const currentSize = whatsAppSizes[size || 'md'];
  const pos = position || 'bottom-right';
  return {
    button: {
      ...commonStyles.floatingButton,
      position: 'fixed',
      ...cornerPositionStyles(pos),
      width: `${currentSize.button}px`,
      height: `${currentSize.button}px`,
      backgroundColor: isHovered ? colors.whatsappHover : colors.whatsapp,
      color: colors.white,
      zIndex: zIndex ?? 1000,
      transition: transitions.normal,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      ...styles?.button,
    } as React.CSSProperties,
    tooltip: {
      position: 'fixed',
      ...cornerPositionStyles(pos),
      [pos.includes('bottom') ? 'bottom' : 'top']: '5.5rem',
      backgroundColor: colors.white,
      color: colors.text,
      padding: '0.5rem 1rem',
      borderRadius: radii.md,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semibold,
      boxShadow: shadows.menu,
      whiteSpace: 'nowrap',
      opacity: isHovered ? 1 : 0,
      transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
      transition: transitions.fast,
      pointerEvents: 'none',
      zIndex: (zIndex ?? 1000) + 1,
      ...styles?.tooltip,
    } as React.CSSProperties,
  };
};

export const scrollTopStyles = (
  styles?: React.CSSProperties,
  position?: CornerPosition,
  size?: number,
  isVisible?: boolean
) => ({
  ...commonStyles.floatingButton,
  position: 'fixed',
  ...cornerPositionStyles(position || 'bottom-right'),
  width: `${size || 48}px`,
  height: `${size || 48}px`,
  backgroundColor: colors.primary,
  color: colors.white,
  zIndex: 1000,
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  transition: transitions.normal,
  pointerEvents: isVisible ? 'auto' : 'none',
  ...styles,
} as React.CSSProperties);

export const modalSizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const modalOverlayClasses = (show: boolean, animation: boolean, className: string) =>
  `fixed inset-0 z-60 flex items-center justify-center ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${animation ? 'transition-opacity duration-300' : ''} ${className}`.trim();

export const modalDialogClasses = (size: ModalSize, centered: boolean, dialogClassName: string) =>
  `relative w-full ${modalSizeClasses[size]} mx-auto ${centered ? 'flex items-center justify-center min-h-screen' : 'mt-8'} ${dialogClassName}`.trim();

export const anchorBaseStyles = (variant: StandardVariant, isHovered: boolean, size: Size): React.CSSProperties => ({
  //...commonStyles.anchorBase,
  textDecoration: variant === 'none' ? (isHovered ? 'underline' : 'none') : 'none',
  ...(variant !== 'none' ? sizeStyles[size] : {}),
  borderRadius: variant === 'none' ? '0' : radii.md,
});

export const accordionStyles = (isActive: boolean, styles?: Record<string, React.CSSProperties>) => ({
  container: {
    ...commonStyles.container,
    overflow: 'hidden',
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  header: {
    ...commonStyles.header,
    transition: transitions.bgSlow,
  } as React.CSSProperties,
  content: {
    maxHeight: isActive ? '1000px' : '0',
    opacity: isActive ? 1 : 0,
    overflow: 'hidden',
    transition: transitions.normal,
    borderTop: isActive ? `1px solid ${colors.border}` : 'none',
  } as React.CSSProperties,
  innerContent: {
    padding: '1rem',
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  } as React.CSSProperties,
  arrow: {
    ...commonStyles.chevron,
    transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
  } as React.CSSProperties,
});

export const standardVariantStyles = (isHovered: boolean): Record<StandardVariant, React.CSSProperties> => ({
  none: { color: colors.primary },
  primary: { backgroundColor: isHovered ? colors.primaryHover : colors.primary, color: colors.white },
  secondary: { backgroundColor: isHovered ? colors.secondaryHover : colors.secondary, color: colors.white },
  outline: { backgroundColor: isHovered ? colors.lightHover : colors.white, color: colors.dark },
  danger: { backgroundColor: isHovered ? colors.dangerHover : colors.danger, color: colors.white },
  success: { backgroundColor: isHovered ? colors.successHover : colors.success, color: colors.white },
  warning: { backgroundColor: isHovered ? colors.warningHover : colors.warning, color: colors.white },
  info: { backgroundColor: isHovered ? colors.infoHover : colors.info, color: colors.white },
  dark: { backgroundColor: isHovered ? colors.darkHover : colors.dark, color: colors.white },
  light: { backgroundColor: isHovered ? colors.lightHover : colors.light, color: colors.dark },
  link: { color: isHovered ? colors.primary : colors.text },
});
