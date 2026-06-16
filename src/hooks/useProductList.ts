import {
  useQuery,
} from '@tanstack/react-query'
import { productsApi } from '../api/products';
import type { Product } from '../types/Product';


interface ProductsListState {
  isLoading: boolean;
  error: string | null;
  products: Product[] | null;
  totalCount: number;
  totalPages: number;
}


export function useProductList(pageNumber: number, pageSize: number = 20):ProductsListState {
    const { isPending, error, data } = useQuery({
        queryKey: ['products', pageNumber, pageSize],
        queryFn:() => productsApi.getProducts({ pageNumber, pageSize }),
    });

    return {
        isLoading: isPending,
        error: error ? error.message : null,
        products: data?.items || null,
        totalCount: data?.totalCount || 0,
        totalPages: data?.totalPages || 0,
    };
}
