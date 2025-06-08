import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { Provider } from './components/ui/provider'

import { ProductosProvider } from './contexts/ProductosContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <ProductosProvider>
        <RouterProvider router={router} />
      </ProductosProvider>
    </Provider>
  </StrictMode>,
)
