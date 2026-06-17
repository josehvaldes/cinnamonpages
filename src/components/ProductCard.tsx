
import {getImageUrl} from '../utils/getImageUrl';
import { Anchor } from '@mantine/core';
import type { Product } from '../types/Product';
import { Link } from 'react-router-dom';

import { ActionIcon, Tooltip } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';
import { useDispatch } from "react-redux";
import { toggleItem } from "../store/wishlistSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface ProductCardProps extends Product {}

export function ProductCard({ id, img, name, price }: ProductCardProps) {
  const productSlug = id;
  const inWishlist = useSelector((state: RootState) => state.wishlist.items.some((item: Product) => item.id === id));
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(toggleItem({ id, img, name, price }));
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
      <Tooltip label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
        <ActionIcon variant="light" color={inWishlist ? 'red' : 'gray'} 
            onClick={onClick}
            role="button"
            tabIndex={0} 
            aria-label='hover to see tooltip'            
          >
          <HeartIcon />
        </ActionIcon>
      </Tooltip>
    </div>
    
    <p className="pt-1 text-gray-900">{price} $</p>

  </div>
  );
}