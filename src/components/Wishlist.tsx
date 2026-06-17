
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { ProductCard } from "./ProductCard";

export function Wishlist() {
     const products = useSelector(
        (state: RootState) => state.wishlist.items
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
            {products.length === 0 ? (
                <p>Your wishlist is currently empty.</p>
            ) : (
                 <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
}