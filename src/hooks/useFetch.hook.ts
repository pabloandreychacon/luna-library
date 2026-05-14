import { useState, useEffect } from 'react';
import { apiFetch } from '../utilities/apiFetch.util';

type Data<T> = T | null;
type ErrorType = Error | null | string | null;

type Params<T> = {
  data: Data<T>;
  error: ErrorType;
  loading: boolean;
};

/**
 * Custom hook to perform a fetch request and manage its state (data, error, loading).
 * @template T - Expected return type
 * @param url - URL to fetch
 * @param options - Optional configuration (e.g., delay for testing)
 * @returns Object with data, error, and loading state
 */
export const useFetch = <T>(url: string, options?: { delay?: number }): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      
      if (options?.delay) {
        await new Promise(resolve => setTimeout(resolve, options.delay));
      }

      try {
        const result: T = await apiFetch(url, { signal });
        setData(result);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, loading };
};
