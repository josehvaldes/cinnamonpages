

import { Button } from '@mantine/core';
import { getImageUrl } from '../utils/getImageUrl';
import { useProductDetails } from '../hooks/useProductDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from '@mantine/core';
import { useState } from 'react';
import { useProductRating } from '../hooks/useProductRating';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ProductView() {
    const navigate = useNavigate();
    
    const ratingType = 'rating'; // You can customize this based on your rating system
    const { productSlug = '' } = useParams<{ productSlug: string }>();

    const {isLoading, error, product} = useProductDetails(productSlug);
    const { mutate: submitRating, isPending: isSubmittingRating } = useProductRating();
    
    const [storedRating, setStoredRating] = useLocalStorage<number>(`product_${productSlug}_${ratingType}`, 0);
    const [value, setValue] = useState(storedRating);

    const handleRatingChange = (newValue: number) => {
        console.log(`User rated product ${productSlug} with ${newValue} stars`);
        setValue(newValue);
        setStoredRating(newValue);
        // Submit rating from an event callback via mutation.
        submitRating({ productId: productSlug, value: newValue, ratingType });
    };

    return (
        <div className="container mx-auto px-6 py-8">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product View</h1>
            {isLoading && <p className="text-gray-700 mb-4">Loading product...</p>}
            {!isLoading && !product && <p className="text-gray-700 mb-4">Product not found.</p>}

            {product && (
                <div className="max-w-lg">
                    <img className="w-full rounded-md mb-4" alt={product.name} src={getImageUrl(product.img) ?? ''} />
                    <div className="flex justify-between w-full">
                        <div >
                            <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                        </div>
                        <div >
                            <Rating value={value} className="mt-1" onChange={handleRatingChange} readOnly={isSubmittingRating} />
                        </div>
                    </div>
                    <p className="text-lg text-gray-800 mt-2">{product.price}</p>
                </div>
            )}

            <Button mt="md" variant="light" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    );
}