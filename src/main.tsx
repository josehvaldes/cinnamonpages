
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme/theme';
import '@mantine/core/styles.css';
import './index.css';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  store,
  persistor,
} from "./store/store";


import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1, // Retry failed requests once
        refetchOnWindowFocus: false, // Disable refetching on window focus
        gcTime: 10 * 60 * 1000, // 10 minutes before garbage collecting unused query data
      },
    },
  }
);

const queryCachePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

const isMockingEnabled = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true';

async function enableMocking() {
  if (isMockingEnabled) {
    const { worker } = await import('./mocks/browser');

    await worker.start({ onUnhandledRequest: 'warn' });
  }
}

enableMocking().then(() => {
  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <MantineProvider theme={theme}>
                    {isMockingEnabled ? (
                      <QueryClientProvider client={queryClient}>
                        {app}
                      </QueryClientProvider>
                    ) : (
                      <PersistQueryClientProvider
                        client={queryClient}
                        persistOptions={{
                          persister: queryCachePersister,
                          maxAge: 2 * 60 * 60 * 1000, // Keep persisted cache for up to 2 hours
                          buster:"1.0.1" // Change this value to invalidate all persisted cache when your app updates
                        }}
                      >
                        {app}
                      </PersistQueryClientProvider>
                    )}
          </MantineProvider>
      </PersistGate>        
      </Provider>
    </React.StrictMode>
  )
});

