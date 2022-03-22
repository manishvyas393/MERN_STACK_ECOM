import './App.css';
import Header from "./components/layout/header/Header"
import { Route, Routes } from "react-router-dom"
import webFont from "webfontloader"
import React from 'react';
import Footer from './components/layout/footer/Footer';
import Home from "./components/home/Home"
import ProductDetail from './components/product/ProductDetail/ProductDetail';
import Products from './components/product/Products/Products';
import Search from './components/product/search/Search';
import LoginSignUp from "./components/User/Login-SignUp/LoginSignUp"
import { useSelector } from "react-redux"
import store from "./store"
import { loadUser } from './actions/userActions';
import UserOptions from './components/layout/header/UserOptions';
import Profile from './components/User/Profile/Profile';
import ProctectedRoute from './components/Procteted/ProctectedRoute';
import UpdateProfile from './components/User/update-profile/UpdateProfile';
import UpdatePassword from './components/User/update-password/UpdatePassword';
import ForgotPassword from './components/User/forgot-password/ForgotPassword';
import ResetPassword from './components/User/reset-password/ResetPassword';
import Cart from "./components/cart/Cart"
import ShippingInfo from './components/cart/shipping-info/ShippingInfo';
import { ConfirmOrder } from './components/cart/confirm-order/ConfirmOrder';
import Payment from './components/cart/payment/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/cart/order-success/OrderSuccess';
import MyOrders from './components/my-orders/MyOrders';
import OrderDetails from './components/my-orders/OrderDetails';
import Dashboard from './components/admin/dashboard/Dashboard';
import AdminProducts from './components/admin/admin-products/AdminProducts';
import AdminUsers from './components/admin/admin-users/AdminUsers';
import AdminOrders from './components/admin/admin-orders/AdminOrders';
import NewProduct from "./components/admin/new-product/NewProduct"
import AdminUpdateUser from './components/admin/admin-update-user/AdminUpdateUser';
import AdminProductDetailsUpdate from './components/admin/admin-update-product/AdminProductDetailsUpdate';
import AdminProductImagesUpdate from './components/admin/admin-update-product/AdminProductImagesUpdate';
import AdminUpdateProuctOptions from './components/admin/admin-update-product/AdminUpdateProuctOptions';
import { AdminUpdateOrder } from './components/admin/admin-order-details/AdminUpdateOrder';
import AdminProductReview from './components/admin/admin-product-reviews/AdminProductReview';
const stripePromise = loadStripe('pk_test_51KEojrSGnScXNqhfwrdLTkodyhznVQBblciQ5YU0jqNRFUd8ypfY5EvmBGxAyNBRjgM5tILn5XmtnU0nRM7Hwyef00ozRCU7SB');
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user)
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
    store.dispatch(loadUser())
  }, [])
  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/process/payment" element={
          <ProctectedRoute>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProctectedRoute>
        } />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/account" element={<ProctectedRoute>
          <Profile />
        </ProctectedRoute>} />

        <Route exact path="/editprofile" element={<ProctectedRoute>
          <UpdateProfile />
        </ProctectedRoute>} />

        <Route exact path="/password/update" element={<ProctectedRoute>
          <UpdatePassword />
        </ProctectedRoute>} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/Cart" element={<ProctectedRoute>
          <Cart />
        </ProctectedRoute>} />

        <Route path="/shipping" element={<ProctectedRoute children={<ShippingInfo />} />} />

        <Route path="/orders/confirm" element={<ProctectedRoute>
          <ConfirmOrder />
        </ProctectedRoute>} />

        <Route path="/success" element={<ProctectedRoute>
          <OrderSuccess />
        </ProctectedRoute>} />

        <Route path="/myorders" element={<ProctectedRoute>
          <MyOrders />
        </ProctectedRoute>} />

        <Route path="/order/:id" element={<ProctectedRoute>
          <OrderDetails />
        </ProctectedRoute>} />

        <Route path="/admin/dashboard" element={<ProctectedRoute>
          <Dashboard />
        </ProctectedRoute>} />

        <Route path="/admin/products" element={<ProctectedRoute>
          <AdminProducts />
        </ProctectedRoute>} />

        <Route path="/admin/users" element={<ProctectedRoute>
          <AdminUsers />
        </ProctectedRoute>} />


        <Route path="/admin/orders" element={<ProctectedRoute>
          <AdminOrders/>
        </ProctectedRoute>} />
        <Route path="/admin/newproduct" element={<ProctectedRoute>
          <NewProduct/>
        </ProctectedRoute>} />

        <Route path="/admin/user/:id" element={<ProctectedRoute>
          <AdminUpdateUser/>
        </ProctectedRoute>} />


        <Route path="/admin/product/:id" element={<ProctectedRoute>
          <AdminUpdateProuctOptions/>
        </ProctectedRoute>} />

        <Route path="/admin/updateproduct/details/:id" element={<ProctectedRoute>
          <AdminProductDetailsUpdate/>
        </ProctectedRoute>} />

        <Route path="/admin/updateproduct/images/:id" element={<ProctectedRoute>
          <AdminProductImagesUpdate/>
        </ProctectedRoute>} />

        <Route path="/admin/order/:id" element={<ProctectedRoute>
          <AdminUpdateOrder/>
        </ProctectedRoute>} />
        <Route path="/admin/reviews" element={<ProctectedRoute>
          <AdminProductReview/>
        </ProctectedRoute>} />

      </Routes>
      <Footer />
    </>



  );
}

export default App;
