import { delay, http, HttpResponse } from 'msw';
import { mockProducts } from './mockData';

const ENDPOINT_LATENCY_MS = {
    health: { base: 120, jitter: 80 },
    homepage: { base: 450, jitter: 300 },
    productDetails: { base: 800, jitter: 500 },
} as const;

async function simulateLatency(
    endpoint: keyof typeof ENDPOINT_LATENCY_MS
): Promise<void> {
    const { base, jitter } = ENDPOINT_LATENCY_MS[endpoint];
    const randomized = base + Math.floor(Math.random() * (jitter + 1));
    await delay(randomized);
}


export const handlers = [

    // Mock for product rating endpoint: /v1/products/:productId/rate
    http.post(/\/v1\/products\/[^/]+\/rate$/i, async () => {
        return HttpResponse.json({ message: 'Rating received' }, { status: 202 });
        
    }),

    http.get(/\/health\/live$/i, async () => {
        
        await simulateLatency('health');
        return HttpResponse.text('Healthy');
    }),
    
    http.get(/\/v1\/products\/[^/]+$/i, async ({ request }) => {
        
        await simulateLatency('productDetails');
        const pathname = new URL(request.url).pathname;
        const productId = pathname.split('/').filter(Boolean).pop();

        if (!productId) {
            return HttpResponse.json({ message: 'Product id is required' }, { status: 400 });
        }

        const product = mockProducts.find((item) => item.id === productId);

        if (!product) {
            return HttpResponse.json(
                { message: `Product ${productId} not found` },
                { status: 404 }
            );
        }

        return HttpResponse.json({
            ...product,
            links: [
                {
                    href: request.url,
                    rel: 'self',
                    method: 'GET',
                },
            ],
        });
    }),
    http.get(/\/v1\/homepage$/i, async () => {
    
        await simulateLatency('homepage');
        return HttpResponse.json(
                {
                "trendings": [
                        mockProducts[2],
                        mockProducts[1],
                        mockProducts[0]
                ],
                "newArrivals": [
                        mockProducts[6],
                        mockProducts[7]
                ],
                "onSales": [
                        mockProducts[4],
                        mockProducts[3],
                        mockProducts[5]
                ]
        });
  })
];