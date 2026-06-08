import {
  useQuery,
} from '@tanstack/react-query'
import { productsApi, type HomepageProductsResponse } from '../api/products';


const HOMEPAGE_PRODUCTS_QUERY_KEY = ['homepageProducts'] as const;

interface HomepageState {
  isLoading: boolean;
  error: string | null;
  data: HomepageProductsResponse;
}

export function useHomepage(): HomepageState {
  const { isPending, error, data } = useQuery<HomepageProductsResponse, Error>({
    queryKey: HOMEPAGE_PRODUCTS_QUERY_KEY,
    queryFn: () => productsApi.getHomepageProducts(),
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
  return {
    isLoading: isPending,
        error: error ? error.message : null,
        data: data ?? { trendings: [], newArrivals: [], onSales: [] },
  };
}