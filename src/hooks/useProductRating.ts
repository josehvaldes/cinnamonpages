import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../api/products';

interface SubmitProductRatingInput {
  productId: string;
  value: number;
  ratingType: string;
}

export function useProductRating() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ productId, value, ratingType }: SubmitProductRatingInput) =>
      productsApi.postProductRating(productId, { value, ratingType }),
    onSuccess: (_, variables) => {
      // Invalidate the product details cache for this specific productId
      queryClient.invalidateQueries({
        queryKey: ['productDetails', variables.productId],
      });
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  return mutation;
}