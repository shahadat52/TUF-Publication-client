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
          {/* <Route path="dashboard" element={<PrivateRoute />}>
            
          </Route> */}
          <Route path='dashboard' element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<PrivateRoute><DashboardHomePage /></PrivateRoute>} /> {/* optional homepage */}
            <Route path="orders/publication" element={<PrivateRoute><PublicationOrdersPage /></PrivateRoute>} />
            <Route path="orders/annual" element={<PrivateRoute><AnnualOrdersPage /></PrivateRoute>} />
            <Route path="orders/delivery/pending" element={<PrivateRoute><DeliveryPendingProductsPage /></PrivateRoute>} />
            <Route path="order/branch/:id" element={<PrivateRoute><BranchOrderPage /></PrivateRoute>} />
            <Route path="products" element={<PrivateRoute><ProductManagementPage /></PrivateRoute>} />
            <Route path="notice" element={<PrivateRoute><NoticeManagementPage /></PrivateRoute>} />
            <Route path="products/:id" element={<PrivateRoute><ProductOrderDetails /></PrivateRoute>} />
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
