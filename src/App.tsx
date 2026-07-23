import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/context/CartContext";

import Landing from "./routes/index";
import Login from "./pages/Login";

import Shop from "./pages/shop/Shop";
import ProductDetails from "./pages/shop/ProductDetails";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import OrderSuccess from "./pages/shop/OrderSuccess";

import Account from "./pages/account/Account";
import Orders from "./pages/account/Orders";
import Addresses from "./pages/account/Addresses";
import Wishlist from "./pages/account/Wishlist";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminHeatmap from "./pages/admin/AdminHeatmap";
import AdminAICenter from "./pages/admin/AdminAICenter";
import AdminMarketing from "./pages/admin/AdminMarketing";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminShipping from "./pages/admin/AdminShipping";
import AdminContent from "./pages/admin/AdminContent";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminSettings from "./pages/admin/AdminSettings";

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/success/:id" element={<OrderSuccess />} />

            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<Orders />} />
            <Route path="/account/addresses" element={<Addresses />} />
            <Route path="/account/wishlist" element={<Wishlist />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="heatmap" element={<AdminHeatmap />} />
              <Route path="ai" element={<AdminAICenter />} />
              <Route path="marketing" element={<AdminMarketing />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="shipping" element={<AdminShipping />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="security" element={<AdminSecurity />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
