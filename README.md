# Cinnamon Pages

Portfolio project showcasing a modern React frontend deployed on Cloudflare and integrated with AWS services:

- AWS Lambda for product and health endpoints
- Amazon S3 for product image storage
- MSW-powered local mock API layer for development and tests

The goal of this project is to demonstrate practical full-stack integration across cloud providers, with a clean client architecture and production-style deployment workflow.

## Tech Stack

- React 19 + TypeScript
- Vite
- Cloudflare Vite plugin + Wrangler deployment
- TanStack Query (with persisted cache)
- Mantine UI
- Tailwind CSS
- Redux Toolkit + React Redux
- redux-persist
- MSW
- Vitest + Testing Library
- AWS Lambda (API backend)
- Amazon S3 (image hosting)

## Architecture Overview

1. User opens the React application deployed on Cloudflare.
2. Frontend calls AWS API endpoints (Lambda-backed) using environment-driven base URLs.
3. Product payload contains image keys.
4. Frontend builds image URLs from the configured S3 bucket URL and renders product cards.
5. In local development, MSW can intercept API calls and serve mock data when enabled.
6. Wishlist state is managed with Redux Toolkit and persisted in browser localStorage via redux-persist.

Key runtime integrations:

- Product API: GET /v1/Homepage
- Health API: GET /health/live
- Product list API: GET /v1/products?pageNumber=1&pageSize=20
- Product details API: GET /v1/products/:productId
- Product rating API: POST /v1/products/:productId/rate
- S3 image URL builder: base bucket URL + image key
- Wishlist store: Redux slice with add/remove/toggle actions persisted client-side

Routing overview:

- / - homepage storefront view
- /about - basic about page
- /products - paginated product catalog using the new ProductsList component
- /wishlist - wishlist view backed by Redux state
- /product/:productSlug - individual product view

## Features Demonstrated

- Cloud deployment-ready React SPA
- Cross-cloud integration (Cloudflare + AWS)
- Centralized API request layer with API key headers
- Health-check button to validate backend connectivity
- Cached and persisted homepage product data with TanStack Query
- Redux-powered wishlist state management shared across the app
- Persistent wishlist state across browser refreshes using redux-persist
- Local mock API support through MSW for development and automated tests
- Automated component and integration testing with Vitest
- Responsive storefront-style UI with categorized sections:
  - New Arrivals
  - Trending Products
  - On Sales
- Paginated products catalog rendered through the ProductsList page
- Wishlist route rendering saved products using ProductCard

## Environment Variables

Create a local .env file (or configure equivalent environment variables for deployment) using these keys:

VITE_AWS_API_BASE_URL=http://localhost:8000/api/
VITE_AWS_API_VERSION_URL=v1
VITE_API_KEY=your_api_key
VITE_S3_BUCKET_URL=your_s3_url
VITE_ENABLE_MOCKS=false

Notes:

- VITE_AWS_API_BASE_URL is the API gateway/base route for Lambda endpoints.
- VITE_AWS_API_VERSION_URL is appended for versioned routes such as /v1/Homepage.
- VITE_S3_BUCKET_URL should include the public S3 bucket/base path used for images.
- VITE_ENABLE_MOCKS enables MSW in local development when set to true.

## Getting Started

Prerequisites:

- Node.js 20+
- npm
- Wrangler CLI account authentication for Cloudflare deployment

Install dependencies:

npm install

Run in development:

npm run dev

Build production assets:

npm run build

Run tests:

npm run test

Run tests once without watch mode:

npm run test:run

Preview with Wrangler locally:

npm run preview

## Deployment

Deploy to Cloudflare:

npm run deploy

This builds the app and deploys it through Wrangler using the project configuration.

## Project Purpose

This repository is intended as a portfolio artifact to show:

- Frontend engineering with React + TypeScript
- Cloudflare deployment workflow
- Integration with AWS Lambda APIs
- Integration with S3-hosted media assets
- Real-world API consumption patterns in a UI application
- Client-side routing with multiple storefront views
- Mocked API and test infrastructure for local development
