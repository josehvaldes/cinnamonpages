
import { apiRequest } from './apiGeneric';
import type { Product } from '../types/Product';

export interface HomepageProductsResponse {
    trendingProducts: Product[];
    newArrivals: Product[];
    onSales: Product[];
}

export const productsApi = {
  // Get Homepage Products
  getHomepageProducts: async (): Promise<HomepageProductsResponse> => {
    return apiRequest<HomepageProductsResponse>('/Homepage', { method: 'GET' });
  },
};