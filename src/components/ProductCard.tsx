
import {getImageUrl} from '../utils/getImageUrl';
import { Anchor } from '@mantine/core';
import type { Product } from '../types/Product';
import { Link } from 'react-router-dom';
import { useProductRating } from '../hooks/useProductRating';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ActionIcon } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';

interface ProductCardProps extends Product {}

export function ProductCard({ id, img, name, price }: ProductCardProps) {
  const productSlug = id;
  const ratingType = 'like'; 
  const [liked, setLiked] = useLocalStorage<boolean>(`product_${id}_${ratingType}`, false);
  const { mutate: submitRating, isPending: isSubmittingRating } = useProductRating();

  const onClick = () => {
    if (isSubmittingRating) {
      return;
    }
    const nextLiked = !liked;
    setLiked(nextLiked);

    submitRating({ productId: id, value: nextLiked ? 1 : 0, ratingType },
      {onError: () => {setLiked(!nextLiked);},}
    );
  };

  return (
  <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">

    <Anchor component={Link} to={`/product/${productSlug}`}>
      <img className="hover:grow hover:shadow-lg" alt={name} src={getImageUrl(img) ?? 'default-image-url'} />
    </Anchor>

    <div className="pt-3 flex items-center justify-between">
      <Anchor component={Link} to={`/product/${productSlug}`}>
        <p>{name}</p>
      </Anchor>
      <ActionIcon variant="light" color={liked ? 'red' : 'gray'} 
            disabled={isSubmittingRating} 
            aria-label={liked ? 'Unlike product' : 'Like product'}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-disabled={isSubmittingRating}            
          >
          <HeartIcon />
        </ActionIcon>
    </div>
    
    <p className="pt-1 text-gray-900">{price} $</p>

  </div>
  );
}