import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import MainLayout from './layouts/MainLayout.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import NotFound from './pages/NotFound.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import HomePage from './pages/HomePage.tsx'
import CartPage from './pages/cart/CartPage.tsx'
import DashboardLayout from './layouts/DashboardLayout.tsx'
import OrdersPage from './pages/order/OrdersPage.tsx'
import ProductManagementPage from './pages/product/ProductManagementPage.tsx'
import MyOrderPage from './pages/my order/MyOrderPage.tsx'
import ProductOrderDetails from './pages/product/ProductOrderDetails.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='myOrders' element={<MyOrderPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Dashboard layout */}
          <Route path="dashboard" element={<DashboardLayout />} >
            <Route path="/dashboard/orders" element={<OrdersPage />} />
            <Route path="/dashboard/products" element={<ProductManagementPage />} />
            <Route path="/dashboard/products/:id" element={<ProductOrderDetails />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <Routes>

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
