import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { mockProducts } from "../mocks/mockData";
import { ProductCard } from "./ProductCard";

vi.mock("../hooks/useProductRating", () => ({
	useProductRating: () => ({
		mutate: vi.fn(),
		isPending: false,
	}),
}));

vi.mock("../hooks/useLocalStorage", () => ({
	useLocalStorage: () => [false, vi.fn()],
}));

describe("ProductCard", () => {
	it("renders product", () => {
		const product = mockProducts[0];

		render(
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
		);

		expect(screen.getByText(product.name)).toBeInTheDocument();
		expect(screen.getByText(`${product.price} $`)).toBeInTheDocument();
		expect(screen.getByRole("img", { name: product.name })).toBeInTheDocument();
	});
});
