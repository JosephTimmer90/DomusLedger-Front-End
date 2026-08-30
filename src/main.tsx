import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
