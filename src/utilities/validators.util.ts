/**
 * Utility functions for common validations.
 */
export const validators = {
  /**
   * Checks if a string is a valid email.
   */
  isEmail: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Checks if a string is empty or only whitespace.
   */
  isEmpty: (str: string | null | undefined): boolean => {
    return !str || str.trim().length === 0;
  },

  /**
   * Checks if a value is a number.
   */
  isNumber: (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  /**
   * Validates if a password meets minimum complexity.
   * (At least 8 chars, 1 letter, 1 number)
   */
  isStrongPassword: (password: string): boolean => {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  },

  /**
   * Validates a phone number.
   * @param phone - Phone number string
   * @param locale - Optional locale (default: 'generic')
   */
  isPhone: (phone: string, locale: string = 'generic'): boolean => {
    const cleanPhone = phone.replace(/\s|-/g, '');
    if (locale === 'es-CR') {
      // Costa Rica: 8 digits, starts with 2, 4, 5, 6, 7 or 8
      return /^[245678]\d{7}$/.test(cleanPhone);
    }
    // Generic: at least 7 digits
    return /^\+?[\d\s-]{7,}$/.test(cleanPhone);
  }
};
