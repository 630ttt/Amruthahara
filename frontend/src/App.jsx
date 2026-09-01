import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
 
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ProtectedRoute from "./components/user/ProtectedRoute";
 
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import OurStory from "./pages/user/OurStory";
import FlowerTraditions from "./pages/user/FlowerTraditions";
import Farming from "./pages/user/Farming";
import Recipes from "./pages/user/Recipes";
import FarmerStories from "./pages/user/FarmerStories";
import SeasonalProduce from "./pages/user/SeasonalProduce";
import Wellness from "./pages/user/Wellness";
import Categories from "./pages/user/Categories";
import WishlistPage from "./pages/user/WishlistPage";
import ProductDetails  from "./pages/user/ProductDetails"
import Subscription from "./pages/user/Subscription";
 
import UserDashboard from "./pages/user/UserDashboard";

import ProfilePage from "./pages/user/ProfilePage";
import OrdersPage from "./pages/user/OrdersPage";
import SubscriptionsPage from "./pages/user/SubscriptionsPage";
import OrderSuccess from "./pages/user/OrderSucess";
import Orders from "./pages/user/Orders";
import OrderTracking from "./pages/user/OrderTracking";
import Honey from "./pages/user/Honey";
 import OrganicLiving from "./pages/user/OrganicLiving";
import BuildYourBowl from "./pages/user/BuildYourBowl";
import SiteContent from "./pages/user/SiteContent";
import MilletRange from "./pages/user/MilletRange";
import EditProduct from "./pages/admin/EditProduct";
 
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Productsss from "./pages/admin/Productsss";
import AddProduct from "./pages/admin/AddProduct";
import AdminSettings from "./pages/admin/AdminSettings";
import Users from "./pages/admin/Users";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSubscriptions from "./pages/admin/Subscriptions";
 
import PaymentTest from "./pages/PaymentTest";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
 
       
 
        <Route
          path="/"
          element={<Home />}
        />
 
        <Route
          path="/products"
          element={<Products />}
        />
 
        <Route
          path="/our-story"
          element={<OurStory />}
        />
       <Route
          path="/flower-traditions"
          element={<FlowerTraditions />}
        />
        <Route
          path="/Farming"
          element={<Farming />}
        />
        <Route
          path="/farming"
          element={<Farming />}
        />
        <Route
          path="/Recipes"
          element={<Recipes />}
        />
        <Route
          path="/recipes"
          element={<Recipes />}
        />
        <Route
          path="/Farmer-Stories"
          element={<FarmerStories />}
        />
        <Route
          path="/farmer-stories"
          element={<FarmerStories />}
        />
        <Route
        path="/Seasonal-produce"
        element={<SeasonalProduce />}
/>
        <Route
          path="/seasonal-produce"
          element={<SeasonalProduce />}
        />
        <Route
        path="/Wellness"
        element={<Wellness />}
        />
        <Route
          path="/wellness"
          element={<Wellness />}
        />
        <Route
          path="/millet-range"
          element={<MilletRange />}
        />
 
        <Route
          path="/categories"
          element={<Categories />}
        />
 
        <Route
          path="/login"
          element={<Login />}
        />
 
        <Route
          path="/register"
          element={<Register />}
        />
 
        <Route
          path="/wishlist"
          element={<WishlistPage />}
        />
        <Route
          path="/honey"
          element={<Honey />}
        />
        <Route
          path="/organic-living"
          element={<OrganicLiving />}
        />
        <Route path="/products/:id" element={<ProductDetails />} />
 
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/bowl" element={<BuildYourBowl/>} />
        <Route path="/about" element={<SiteContent page="about" />} />
        <Route path="/contact" element={<SiteContent page="contact" />} />
        <Route path="/faq" element={<SiteContent page="faq" />} />
        <Route path="/privacy-policy" element={<SiteContent page="privacy" />} />
        <Route path="/returns" element={<SiteContent page="returns" />} />
        <Route path="/shipping" element={<SiteContent page="shipping" />} />
        <Route path="/terms" element={<SiteContent page="terms" />} />
        <Route path="/subscription" element={<Subscription />} />
 
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
 
 
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
 
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
 
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
 
        <Route
          path="/dashboard/subscriptions"
          element={
            <ProtectedRoute>
              <SubscriptionsPage />
            </ProtectedRoute>
          }
        />
        <Route
  path="/order-success"
  element={<OrderSuccess />}
/>
 
<Route
  path="/orders"
  element={<Orders />}
/>
 
<Route
  path="/orders/:orderId"
  element={<OrderTracking />}
/>
 
       
 
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
 
        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/admin/users"
          element={<Users />}
        />
       <Route
          path="/admin/AdminOrders"
          element={<AdminOrders />}
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
       
 
        <Route
          path="/admin/products"
          element={<Productsss />}
        />
 
        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />
        <Route
          path="/payment-test"
          element={<PaymentTest />}
        />
 
       
 
        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />
        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />
        <Route
          path="/admin/analytics"
          element={<AdminAnalytics />}
        />
        <Route
          path="/admin/subscriptions"
          element={<AdminSubscriptions />}
        />
        <Route
          path="*"
          element={<Home />}
        />
 
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
