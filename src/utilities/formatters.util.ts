/**
 * Utility functions for formatting data.
 */
export const formatters = {
  /**
   * Formats a number as currency.
   * @param value - Number to format
   * @param locale - Locale (default: 'en-US')
   * @param currency - Currency code (default: 'USD')
   */
  currency: (value: number, locale: string = 'en-US', currency: string = 'USD'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  },

  /**
   * Formats a date to a readable string.
   * @param date - Date to format
   * @param locale - Locale (default: 'en-US')
   * @param options - Intl.DateTimeFormatOptions
   */
  date: (date: Date | string | number, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string => {
    const d = new Date(date);
    const defaultOptions: Intl.DateTimeFormatOptions = options || {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
  },

  /**
   * Truncates a string to a specific length.
   */
  truncate: (str: string, length: number): string => {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  }
};
