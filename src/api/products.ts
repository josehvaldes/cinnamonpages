
import { apiRequest } from './apiGeneric';
import type { Product } from '../types/Product';

export interface HomepageProductsResponse {
    trendings: Product[];
    newArrivals: Product[];
    onSales: Product[];
}

export interface RateProductRequest {
    value: number;
    ratingType: string;
}

export const productsApi = {
  // Get Homepage Products
  getHomepageProducts: async (): Promise<HomepageProductsResponse> => {
    return apiRequest<HomepageProductsResponse>('/homepage', { method: 'GET' });
  },

  getProductDetails: async (productId: string): Promise<Product> => {
    return apiRequest<Product>(`/products/${productId}`, { method: 'GET' });
  },

  postProductRating: async (productId: string, rating: RateProductRequest): Promise<void> => {
    return apiRequest<void>(`/products/${productId}/rate`, {
      method: 'POST',
      body: JSON.stringify(rating),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

};
