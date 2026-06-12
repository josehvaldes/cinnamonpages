import { delay, http, HttpResponse } from 'msw';

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

const mockProducts = [
    {
        id: '11111111-0000-0000-0000-000000000001',
        name: 'Mock Blueberry Muffin',
        img: '/products/blueberry-muffin-1929337_1280.jpg',
        price: '2.49',
        links: [],
    },
    {
        id: '11111111-0000-0000-0000-000000000002',
        name: 'Mock Strawberry Tart',
        img: '/products/strawberry-tart-1929338_1280.jpg',
        price: '3.99',
        links: [],
    },
    {
        id: '11111111-0000-0000-0000-000000000003',
        name: 'Mock Cinnamon Roll',
        img: '/products/cinnamon-roll-1995428_1280.jpg',
        price: '2.99',
        links: [],
    },
    {
        id: '11111111-0000-0000-0000-000000000004',
        name: 'Mock Chocolate Croissant',
        img: '/products/chocolate-croissant-1929336_1280.jpg',
        price: '3.49',
        links: [],
    },
    {
        id: '11111111-0000-0000-0000-000000000005',
        name: 'Mock Lemon Tart',
        img: '/products/lemon-tart-1929339_1280.jpg',
        price: '3.79',
        links: [],
    },
    {
        id: '11111111-0000-0000-0000-000000000006',
        name: 'Mock Apple Pie',
        img: '/products/apple-pie-1929335_1280.jpg',
        price: '4.99',
        links: [],
    },
    {
        id: '11111111-0000-0000-0000-000000000007',
        name: 'Mock Vanilla Cupcake',
        img: '/products/vanilla-cupcake-1929334_1280.jpg',
        price: '1.99',
        links: [],
    },
    {
        id: '11111111-0000-0000-0000-000000000008',
        name: 'Mock Chocolate Brownie',
        img: '/products/chocolate-brownie-1929333_1280.jpg',
        price: '2.49',
        links: [],
    },
];

export const handlers = [
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