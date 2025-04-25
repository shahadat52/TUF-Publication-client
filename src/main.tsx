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
import PublicationOrdersPage from './pages/order/PublicationOrdersPage.tsx'
import ProductManagementPage from './pages/product/ProductManagementPage.tsx'
import MyOrderPage from './pages/my order/MyOrderPage.tsx'
import ProductOrderDetails from './pages/product/ProductOrderDetails.tsx'
import PrizeHomePage from './Prize/home/PrizeHomePage.tsx'
import NoticePopup from './components/NoticePopup.tsx'
import NoticeManagementPage from './pages/notice/NoticeManagementPage.tsx'
import NoticeHomePage from './pages/notice/NoticeHomePage.tsx'
import BranchOrderPage from './pages/order/BranchOrderPage.tsx'
import DeliveryPendingProductsPage from './pages/order/DeliveryPendingProductsPage.tsx'
import AnnualOrdersPage from './pages/order/AnnualOrdersPage.tsx'
import PrivateRoute from './Routes/PrivateRoute.tsx'
import DashboardHomePage from './layouts/DashboardHomePage.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <NoticePopup />
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='prize' element={<PrizeHomePage />} />
            <Route path='myOrders' element={<MyOrderPage />} />
            <Route path='notice' element={<NoticeHomePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard layout */}
          <Route path="dashboard" element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardHomePage />} /> {/* optional homepage */}
              <Route path="orders/publication" element={<PublicationOrdersPage />} />
              <Route path="orders/annual" element={<AnnualOrdersPage />} />
              <Route path="orders/delivery/pending" element={<DeliveryPendingProductsPage />} />
              <Route path="order/branch/:id" element={<BranchOrderPage />} />
              <Route path="products" element={<ProductManagementPage />} />
              <Route path="notice" element={<NoticeManagementPage />} />
              <Route path="products/:id" element={<ProductOrderDetails />} />
            </Route>
          </Route>



          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <Routes>

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode >,
)
