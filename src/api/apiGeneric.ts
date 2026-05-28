import { ApiError } from './apiError';
// API configuration and base URL
export const API_BASE_URL = import.meta.env.VITE_AWS_API_BASE_URL || 'http://localhost:8080/';
export const API_VERSION_URL = import.meta.env.VITE_AWS_API_VERSION_URL || 'v1';
export const API_KEY = import.meta.env.VITE_API_KEY || 'your_api_key';

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
    //test the root only
const url = `${API_BASE_URL}${endpoint}`; //
//   const url = `${API_BASE_URL}/${API_VERSION_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    console.log(`API Request: ${config.method || 'GET'} ${url}`);
    console.log('ok: ', response.ok);
    console.log('RAW: ', response);

    if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }
    //return response.json() as unknown as T;

    // return response data as string for now, since the health check endpoint returns a string
    const textData = await response.text();
    console.log('Response Text: ', textData);
    return textData as unknown as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('Trace Error:', error);
    throw new ApiError('Network error occurred', 0, error);
  }
}