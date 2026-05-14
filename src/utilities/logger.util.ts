/**
 * Utility for logging messages with different levels and optional environment check.
 */
const isDev = process.env.NODE_ENV === 'development';

const logStyles = {
  info: 'color: #3b82f6; font-weight: bold;',
  warn: 'color: #f59e0b; font-weight: bold;',
  error: 'color: #ef4444; font-weight: bold;',
  success: 'color: #10b981; font-weight: bold;'
};

export const logger = {
  info: (message: string, ...data: any[]): void => {
    if (isDev) {
      console.log(`%c[INFO] ${message}`, logStyles.info, ...data);
    }
  },

  warn: (message: string, ...data: any[]): void => {
    if (isDev) {
      console.warn(`%c[WARN] ${message}`, logStyles.warn, ...data);
    }
  },

  error: (message: string, ...data: any[]): void => {
    // Errors are usually logged even in production for debugging
    console.error(`%c[ERROR] ${message}`, logStyles.error, ...data);
  },

  success: (message: string, ...data: any[]): void => {
    if (isDev) {
      console.log(`%c[SUCCESS] ${message}`, logStyles.success, ...data);
    }
  }
};
