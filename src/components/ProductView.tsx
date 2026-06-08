

import { Button } from '@mantine/core';
import { getImageUrl } from '../utils/getImageUrl';
import { useHomepage } from '../hooks/useHomepage';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../types/Product';

const toSlug = (value: string): string => {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

export function ProductView() {
    const navigate = useNavigate();
    const { productSlug = '' } = useParams<{ productSlug: string }>();
    const { isLoading, data } = useHomepage();

    const product = useMemo<Product | null>(() => {
        if (!productSlug) return null;
        const allProducts = [...data.newArrivals, ...data.trendings, ...data.onSales];
        return allProducts.find((item) => toSlug(item.name) === productSlug) ?? null;
    }, [data.newArrivals, data.trendings, data.onSales, productSlug]);

    return (
        <div className="container mx-auto px-6 py-8">
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