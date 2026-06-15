import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { mockProducts } from "../mocks/mockData";
import { ProductCard } from "./ProductCard";

const mutateMock = vi.fn();
const setLikedMock = vi.fn();
let localStorageValue: unknown = false;

vi.mock("../hooks/useProductRating", () => ({
	useProductRating: () => ({
		mutate: mutateMock,
		isPending: false,
	}),
}));

vi.mock("../hooks/useLocalStorage", () => ({
	useLocalStorage: () => [localStorageValue, setLikedMock],
}));

function renderProductCard(product = mockProducts[0]) {
	return render(
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
}

describe("ProductCard", () => {
	beforeEach(() => {
		mutateMock.mockClear();
		setLikedMock.mockClear();
		localStorageValue = false;
	});

	it("renders product", () => {
		const product = mockProducts[0];

		renderProductCard(product);

		expect(screen.getByText(product.name)).toBeInTheDocument();
		expect(screen.getByText(`${product.price} $`)).toBeInTheDocument();
		expect(screen.getByRole("img", { name: product.name })).toBeInTheDocument();
	});

	it("handles like button click", () => {
		const product = mockProducts[0];
		const { getByRole } = renderProductCard(product);

		const likeButton = getByRole("button", { name: /like/i });
		expect(likeButton).toBeInTheDocument();
		likeButton.click();
		expect(likeButton).toHaveAttribute("aria-disabled", "false");
		expect(mutateMock).toHaveBeenCalledTimes(1);
		expect(mutateMock).toHaveBeenCalledWith(
			{ productId: product.id, value: 1, ratingType: "like" },
			expect.objectContaining({ onError: expect.any(Function) })
		);
		expect(setLikedMock).toHaveBeenCalledTimes(1);
		expect(setLikedMock).toHaveBeenNthCalledWith(1, true);

	});

	it("handles like button click when error occurs", () => {
		mutateMock.mockImplementationOnce((_, options) => {
			options?.onError?.(new Error("Request failed"));
		});

		const { getByRole } = renderProductCard();

		const likeButton = getByRole("button", { name: /like/i });
		expect(likeButton).toBeInTheDocument();
		likeButton.click();
		expect(likeButton).toHaveAttribute("aria-disabled", "false");
		expect(mutateMock).toHaveBeenCalledTimes(1);
		expect(setLikedMock).toHaveBeenCalledTimes(2);
		expect(setLikedMock).toHaveBeenNthCalledWith(1, true);
		expect(setLikedMock).toHaveBeenNthCalledWith(2, false);

	});

	it("renders 'Unlike product' aria-label when product is already liked", () => {
		localStorageValue = true;
		const product = mockProducts[0];

		const { getByRole } = renderProductCard(product);

		const unlikeButton = getByRole("button", { name: /unlike product/i });
		expect(unlikeButton).toBeInTheDocument();
	});

	it("links product name and image to the correct product URL", () => {
		const product = mockProducts[0];

		renderProductCard(product);

		const links = screen.getAllByRole("link", { name: product.name });
		expect(links.length).toBeGreaterThanOrEqual(1);
		links.forEach((link) => {
			expect(link).toHaveAttribute("href", `/product/${product.id}`);
		});
	});

});
