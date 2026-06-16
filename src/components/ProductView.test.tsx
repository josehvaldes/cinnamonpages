import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { mockProducts } from "../mocks/mockData";
import { ProductView } from "./ProductView";

const mutateMock = vi.fn();
const setStoredRatingMock = vi.fn();
const useProductDetailsMock = vi.fn();

vi.mock("@mantine/core", async () => {
    const mod = await vi.importActual<typeof import("@mantine/core")>("@mantine/core");

    return {
        ...mod,
        Rating: ({ onChange, readOnly }: { onChange?: (value: number) => void; readOnly?: boolean }) => (
            <button type="button" aria-label="set rating" onClick={() => !readOnly && onChange?.(4)}>
                Set rating
            </button>
        ),
    };
});

vi.mock("../hooks/useProductRating", () => ({
    useProductRating: () => ({
        mutate: mutateMock,
        isPending: false,
    }),
}));

vi.mock("../hooks/useProductDetails", () => ({
    useProductDetails: (productId: string) => useProductDetailsMock(productId),
}));

vi.mock("../hooks/useLocalStorage", () => ({
    useLocalStorage: () => [0, setStoredRatingMock],
}));

function renderProductView(path = "/product/test-product") {
    render(
        <MantineProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/product/:productSlug" element={<ProductView />} />
                </Routes>
            </MemoryRouter>
        </MantineProvider>
    );
}

describe("ProductView", () => {
    beforeEach(() => {
        mutateMock.mockClear();
        setStoredRatingMock.mockClear();
        useProductDetailsMock.mockReset();
    });

    it("renders product view from useProductDetails", () => {
        const product = mockProducts[0];
        useProductDetailsMock.mockReturnValue({
            isLoading: false,
            error: null,
            product,
        });

        renderProductView(`/product/${product.id}`);

        expect(useProductDetailsMock).toHaveBeenCalledWith(product.id);
        expect(screen.getByText("Product View")).toBeInTheDocument();
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByRole("img", { name: product.name })).toBeInTheDocument();
    });

    it("shows 'Product not found' when product is null after loading", () => {
        useProductDetailsMock.mockReturnValue({
            isLoading: false,
            error: null,
            product: null,
        });

        renderProductView("/product/unknown-product");

        expect(screen.getByText("Product not found.")).toBeInTheDocument();
    });

    it("shows error message when useProductDetails returns an error", () => {
        useProductDetailsMock.mockReturnValue({
            isLoading: false,
            error: "Failed to fetch product",
            product: null,
        });

        renderProductView("/product/test-product");

        expect(screen.getByText("Error: Failed to fetch product")).toBeInTheDocument();
    });

    it("submits rating when user selects a star", () => {
        const product = mockProducts[0];
        useProductDetailsMock.mockReturnValue({
            isLoading: false,
            error: null,
            product,
        });

        renderProductView(`/product/${product.id}`);

        fireEvent.click(screen.getByRole("button", { name: /set rating/i }));

        expect(mutateMock).toHaveBeenCalledTimes(1);
        expect(mutateMock).toHaveBeenCalledWith(
            expect.objectContaining({
                productId: product.id,
                ratingType: "rating",
                value: expect.any(Number),
            }),
            expect.objectContaining({ onError: expect.any(Function) })
        );
    });

    it("navigates to home when 'Back to Home' is clicked", () => {
        const product = mockProducts[0];
        useProductDetailsMock.mockReturnValue({
            isLoading: false,
            error: null,
            product,
        });

        render(
            <MantineProvider>
                <MemoryRouter initialEntries={[`/product/${product.id}`]}>
                    <Routes>
                        <Route path="/" element={<p>Home Page</p>} />
                        <Route path="/product/:productSlug" element={<ProductView />} />
                    </Routes>
                </MemoryRouter>
            </MantineProvider>
        );

        fireEvent.click(screen.getByRole("button", { name: /back to home/i }));

        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
});