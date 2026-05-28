import { useState, useCallback } from 'react';
import { api } from '../api/health';
import { ApiError } from '../api/apiError';

interface HealthCheckState {
  isLoading: boolean;
  error: string | null;
  sendMessage: () => Promise<string | null>;
}

export function healthCheck(): HealthCheckState {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendMessage = useCallback(async (): Promise<string | null> => {

    setIsLoading(true);
    setError(null);

    try {
      const res: string = await api.healthCheck();
      
      return `${res}`;
      
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Health check API error:', err);
      return "API connection failed";
    } finally {
      setIsLoading(false);
    }
  }, []);


  return {
    isLoading,
    error,
    sendMessage: sendMessage,
  };

}