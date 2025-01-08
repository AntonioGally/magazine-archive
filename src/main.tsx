// Libs
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Components
import Router from './routes/index.tsx';
import { Provider } from 'react-redux';
// Scriptrs
import { store } from './store/index.ts';
// Css
import "./style/global.css"

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
