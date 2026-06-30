import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetailes";
import AddProduct from "./pages/addProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const router = createBrowserRouter([
  { path: "/",            element: <Layout><Home /></Layout> },
  { path: "/products",    element: <Layout><Products /></Layout> },
  

  { path: "/product/:id", element: <Layout><ProductDetails /></Layout> }, 
  
  { path: "/cart",        element: <Layout><Cart /></Layout> },
  { path: "/add-product", element: <Layout><AddProduct /></Layout> },
  { path: "/profile",     element: <Layout><Profile /></Layout> },
  { path: "/signup",      element: <Signup /> },
  { path: "/login",       element: <Login /> },
  { path: "/check-email", element: <Verify /> },
  { path: "/verify",      element: <VerifyEmail /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;