import {
  useQuery,
} from '@tanstack/react-query'

import { ApiError } from './apiError';
// API configuration and base URL
export const API_BASE_URL = import.meta.env.VITE_AWS_API_BASE_URL || 'http://localhost:8080/';
export const API_VERSION_URL = import.meta.env.VITE_AWS_API_VERSION_URL || 'v1';
export const API_KEY = import.meta.env.VITE_API_KEY || 'your_api_key';

type ApiResponseType = 'json' | 'text';

interface ApiRequestOptions extends RequestInit {
  responseType?: ApiResponseType;
  excludeApiVersion?: boolean;
}

export async function queryApi<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise< T | any> {
  
  const url = options.excludeApiVersion
    ? `${API_BASE_URL}${endpoint}`
    : `${API_BASE_URL}/${API_VERSION_URL}${endpoint}`;

  const { responseType = 'json', headers, ...requestOptions } = options;  

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...headers,
    },
    ...requestOptions,
  };
  console.log('Querying API with URL:', url);
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(url, config).then((res) =>{
        if (responseType === 'text') {
          return res.text() as unknown as T;
        }
        if (res.status === 204) {
          return undefined as unknown as T;
        }

        return res.json() as unknown as T;
      },
      ),
  })

  
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  return data
}

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  
  const url = options.excludeApiVersion
    ? `${API_BASE_URL}${endpoint}`
    : `${API_BASE_URL}/${API_VERSION_URL}${endpoint}`;

  const { responseType = 'json', headers, ...requestOptions } = options;
  

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...headers,
    },
    ...requestOptions,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    if (responseType === 'text') {
      return response.text() as unknown as T;
    }

    if (response.status === 204) {
      return undefined as unknown as T;
    }

    try {
      return response.json() as unknown as T;
    } catch {
      return undefined as unknown as T;
    }

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('Trace Error:', error);
    throw new ApiError('Network error occurred', 0, error);
  }
};
