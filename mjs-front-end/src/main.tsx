import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './Utils/Providers/AuthProvider.tsx'
import Router from './Utils/Router/Router.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './Utils/react-query.ts'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
