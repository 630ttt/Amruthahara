import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ProtectedRoute from "./components/user/ProtectedRoute";
 
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import OurStory from "./pages/user/OurStory";
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
import EditProduct from "./pages/admin/EditProduct";
 
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Productsss from "./pages/admin/Productsss";
import AddProduct from "./pages/admin/AddProduct";
import Users from "./pages/admin/Users";
 
import PaymentTest from "./pages/PaymentTest";
 
function App() {
  return (
    <BrowserRouter>
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
          path="*"
          element={<Home />}
        />
        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />
 
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;