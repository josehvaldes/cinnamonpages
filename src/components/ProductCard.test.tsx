import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { mockProducts } from "../mocks/mockData";
import { ProductCard } from "./ProductCard";
import wishlistReducer from "../store/wishlistSlice";

function renderProductCard(product = mockProducts[0]) {
	const store = configureStore({
		reducer: {
			wishlist: wishlistReducer,
		},
	});

	return render(
		<Provider store={store}>
			<MantineProvider>
				<MemoryRouter>
					<ProductCard
						id={product.id}
						img={product.img}
						name={product.name}
						price={product.price}
					/>
				</MemoryRouter>
			</MantineProvider>
		</Provider>
	);
}

describe("ProductCard", () => {
	it("renders product", () => {
		const product = mockProducts[0];

		renderProductCard(product);

		expect(screen.getByText(product.name)).toBeInTheDocument();
		expect(screen.getByText(`${product.price} $`)).toBeInTheDocument();
		expect(screen.getByRole("img", { name: product.name })).toBeInTheDocument();
	});


});
