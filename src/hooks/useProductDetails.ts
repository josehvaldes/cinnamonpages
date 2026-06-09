import {
  useQuery,
} from '@tanstack/react-query'
import { productsApi } from '../api/products';
import type { Product } from '../types/Product';


interface ProductDetailsState {
  isLoading: boolean;
  error: string | null;
  product: Product | null;
}


export function useProductDetails(productId: string):ProductDetailsState {
  const { isPending, error, data } = useQuery({
    queryKey: ['productDetails', productId] as const,
    queryFn: () => productsApi.getProductDetails(productId),
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
  return {
    isLoading: isPending,
    error: error ? error.message : null,
    product: data ?? null,
  };
}