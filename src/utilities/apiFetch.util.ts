/**
 * A generic wrapper for the fetch API with error handling and response parsing.
 * @param url - The URL to fetch
 * @param options - Fetch options (method, headers, body, signal, etc.)
 * @returns Parsed JSON response
 */
export const apiFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Handles 4xx and 5xx errors
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    // Return the parsed JSON data
    return await response.json();
  } catch (error) {
    // Handle fetch cancellation
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('Fetch aborted');
      return;
    }
    
    // Handle other errors
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    
    throw new Error(String(error));
  }
};
