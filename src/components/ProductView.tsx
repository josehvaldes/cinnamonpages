

import { Button } from '@mantine/core';
import { getImageUrl } from '../utils/getImageUrl';
import { useProductDetails } from '../hooks/useProductDetails';
import { useNavigate, useParams } from 'react-router-dom';

export function ProductView() {
    const navigate = useNavigate();
    const { productSlug = '' } = useParams<{ productSlug: string }>();

    const {isLoading, error, product} = useProductDetails(productSlug); // This will fetch product details when productSlug changes

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
                    <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                    <p className="text-lg text-gray-800 mt-2">{product.price}</p>
                </div>
            )}

            <Button mt="md" variant="light" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    );
}