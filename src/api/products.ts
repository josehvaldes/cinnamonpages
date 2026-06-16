
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

export interface productPageRequest{
  pageNumber: number;
  pageSize: number;
}

interface ProductListResponse {
    items: Product[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}


export const productsApi = {
  // Get Homepage Products
  getHomepageProducts: async (): Promise<HomepageProductsResponse> => {
    return apiRequest<HomepageProductsResponse>('/homepage', { method: 'GET' });
  },

  getProductDetails: async (productId: string): Promise<Product> => {
    return apiRequest<Product>(`/products/${productId}`, { method: 'GET' });
  },

  getProducts: async (request: productPageRequest): Promise<ProductListResponse> => {
    const { pageNumber, pageSize } = request;
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    return apiRequest<ProductListResponse>(`/products?${queryParams.toString()}`, { method: 'GET' });
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
