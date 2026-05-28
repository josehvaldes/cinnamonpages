import { apiRequest } from "./apiGeneric";

// Specific API functions for the api
export const api = {
  
  // Get Health Check
  healthCheck: async (): Promise<string> => {
    return apiRequest('/');
  },

};

export default api;
