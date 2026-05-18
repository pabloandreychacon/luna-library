import { EMAIL_REGEX, URL_REGEX } from '../types';

export const validators = {
  isEmail: (value: string): boolean => EMAIL_REGEX.test(value),

  isUrl: (value: string): boolean => URL_REGEX.test(value),

  isEmpty: (value: any): boolean =>
    value === undefined || value === null || value === false || String(value).trim().length === 0,

  isNumber: (value: any): boolean =>
    !isNaN(parseFloat(value)) && isFinite(value),

  /** A strong password is defined as including both letters and numbers. */
  isStrongPassword: (password: string, minLength: number): boolean =>
    password.length >= minLength && /[A-Za-z]/.test(password) && /[0-9]/.test(password),

  isPhone: (phone: string, locale: string = 'generic'): boolean => {
    const clean = phone.replace(/\s|-/g, '');
    if (locale === 'es-CR') return /^[245678]\d{7}$/.test(clean);
    return /^\+?[\d\s-]{7,}$/.test(clean);
  },

  minLength: (value: string, min?: number): boolean => min === undefined || value.length >= min,

  maxLength: (value: string, max?: number): boolean => max === undefined || value.length <= max,

  matchesPattern: (value: string, pattern: RegExp): boolean => pattern.test(value),

  isDate: (value: string): boolean => {
    if (!value) return false;
    const d = new Date(value);
    return !isNaN(d.getTime());
  },

  isDateBefore: (value: string, max: string): boolean => new Date(value) < new Date(max),

  isDateAfter: (value: string, min: string): boolean => new Date(value) > new Date(min),
};
