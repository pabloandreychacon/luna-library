import { apiFetch } from "./apiFetch.util";

/**
 * Generic GET request
 * @template T - Expected return type
 * @param url - Full URL or endpoint
 * @param options - Additional fetch options
 */
export const get = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return apiFetch(url, { ...options, method: 'GET' });
};

/**
 * Generic POST request
 * @template T - Expected return type
 * @param url - Full URL or endpoint
 * @param body - Data to send
 * @param options - Additional fetch options
 */
export const post = async <T>(url: string, body: any, options?: RequestInit): Promise<T> => {
  return apiFetch(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

/**
 * Generic PUT request
 * @template T - Expected return type
 * @param url - Full URL or endpoint
 * @param body - Data to send
 * @param options - Additional fetch options
 */
export const put = async <T>(url: string, body: any, options?: RequestInit): Promise<T> => {
  return apiFetch(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

/**
 * Generic DELETE request
 * @template T - Expected return type
 * @param url - Full URL or endpoint
 * @param options - Additional fetch options
 */
export const del = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return apiFetch(url, { ...options, method: 'DELETE' });
};

// Generic HTTP Client Object
export const httpClient = {
  get,
  post,
  put,
  delete: del,
};
