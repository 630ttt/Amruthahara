import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===============================
// USER AUTH
// ===============================
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ProtectedRoute from "./components/user/ProtectedRoute";

// ===============================
// USER PAGES
// ===============================
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import OurStory from "./pages/user/OurStory";
import Categories from "./pages/user/Categories";
import WishlistPage from "./pages/user/WishlistPage";

// ===============================
// USER DASHBOARD
// ===============================
import UserDashboard from "./pages/user/UserDashboard";
import ProfilePage from "./pages/user/ProfilePage";
import OrdersPage from "./pages/user/OrdersPage";
import SubscriptionsPage from "./pages/user/SubscriptionsPage";

// ===============================
// ADMIN
// ===============================
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Productsss from "./pages/admin/Productsss";
import AddProduct from "./pages/admin/AddProduct";

// ===============================
// PAYMENT
// ===============================
import PaymentTest from "./pages/PaymentTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================
            PUBLIC USER ROUTES
        ================================= */}

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

        {/* =================================
            PROTECTED SHOPPING ROUTES
        ================================= */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* =================================
            USER DASHBOARD
        ================================= */}

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

        {/* =================================
            ADMIN
        ================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin/products"
          element={<Productsss />}
        />

        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />

        {/* =================================
            PAYMENT TEST
        ================================= */}

        <Route
          path="/payment-test"
          element={<PaymentTest />}
        />

        {/* =================================
            FALLBACK
        ================================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;