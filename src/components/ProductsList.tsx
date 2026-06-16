import { useNavigate } from "react-router-dom";
import { useProductList } from "../hooks/useProductList";
import { ProductCard } from "./ProductCard";
import { Button } from "@mantine/core";
import { Pagination } from '@mantine/core';
import { useState } from "react";

export function ProductsList() {

    const navigate = useNavigate();
    const [activePage, setPage] = useState(1);
    const {isLoading, error, products, totalCount, totalPages} = useProductList(activePage, 4);
    
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Products List</h1>
      {isLoading && <p className="text-gray-700 mb-4">Loading products...</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {totalCount !== 0 && <p className="text-gray-700 mb-4">Total products: {totalCount}</p>}
      {products && (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
      {totalCount !== 0 && (
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={(page) => setPage(page)}
        />
      )}
      <Button mt="md" variant="light" onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  );
}