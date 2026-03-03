import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/common/Loader";
const AdminDashboard = lazy(() => import("./pages/user/AdminDashboard"))
const OrderHistory = lazy(() => import("./pages/user/Orderhistory"))

/* Layout */
const MainLayout = lazy(() => import("./components/layout/MainLayout"));

/* Pages */
const Home = lazy(() => import("./pages/home/Home"));
const Categories = lazy(() => import("./pages/home/Categories"));
const PopularFoods = lazy(() => import("./pages/home/PopularFoods"));

/* Menu Pages */
const MenuLayout = lazy(() => import("./pages/menu/MenuLayout"));
const Menu = lazy(() => import("./pages/menu/Menu"));
const CategoryFoods = lazy(() => import("./pages/menu/CategoryFoods"));
const FoodDetails = lazy(() => import("./pages/menu/FoodDetails"));

/* Cart Pages */
const CartLayout = lazy(() => import("./pages/cart/CartLayout"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Checkout = lazy(() => import("./pages/cart/Checkout"));
const OrderSuccess = lazy(() => import("./pages/cart/OrderSuccess"));

/* User Pages */
const UserLayout = lazy(() => import("./pages/user/UserLayout"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Orders = lazy(() => import("./pages/user/Orders"));
const Settings = lazy(() => import("./pages/user/Settings"));

/* Common Components */
const HomeSection = lazy(() => import("./components/common/HomeSection"));
const Sidebar = lazy(() => import("./components/common/Sidebar"));
const Login = lazy(() => import("./pages/Auth/Login"))
const Signup = lazy(() => import("./pages/Auth/Signup"))
const router = createBrowserRouter([

   {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeSection /> },
      { path: "categories", element: <Categories /> },
      { path: "popular", element: <PopularFoods /> },

      {
        path: "menu",
        element: <MenuLayout />,
        children: [
          { index: true, element: <Menu /> },

          // ✅ FIXED HERE
          { path: "category/:category", element: <CategoryFoods /> },

          { path: "food/:foodId", element: <FoodDetails /> },
        ],
      },

      {
        path: "cart",
        element: <CartLayout />,
        children: [
          { index: true, element: <Cart /> },
          { path: "checkout", element: <Checkout /> },
          { path: "success", element: <OrderSuccess /> },
        ],
      },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      {
        path: "/user",
        element: <UserLayout />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "orders", element: <Orders /> },
          { path: "settings", element: <Settings /> },
          { path: "admin", element: <AdminDashboard /> },
          { path: "orderhistory", element: <OrderHistory /> },
          { index: true, element: <Profile /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;