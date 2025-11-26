import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./router";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { injectStore } from './lib/api';

// Inject store into API client to handle 401 logout dispatch
injectStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
