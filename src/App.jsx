import { Footer, Navbar, Product } from "./components/all";
import RegisterPage from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import NotFound from "./pages/404";
import ProfilePage from "./pages/profile";
import Home from "./pages/home";
import AboutUs from "./pages/aboutUs";
import Contact from "./pages/contactUs";
/// store
import theStore from "./store/store";
/// use state
import { useState } from "react";
/// all products
import AllProducts from "./components/product/allProducts";
/// cart page
import CartPage from "./pages/cartPage";
/// ads
import Ads from "./components/ads line/ads";
import ads from "./templates/ads.json";
/////////
//// admin
import AuthAdmin from "./components/admin/authAdmin";
//// blog
import Blog from "./pages/blog";
import GetBlog from "./components/blog/getBlog";
/// checkout
import Checkout from "./pages/checkout";
//////////////////////
function App() {
  /// context api for global store
  let [store, setStore] = useState({
    user: {},
    updateUser: (newData) => {
      setStore({ ...store, user: newData });
    },
    products: {},
    updateProducts: (newProducts) => {
      setStore({ ...store, products: newProducts });
    },
    // cart: [{}],
    // updateCart: (item) => {
    //  setStore((prevStore) => ({
    //    ...prevStore,
    //    cart: [...prevStore.cart, item],
    //  }));
    // },
  });
  return (
    <theStore.Provider value={{ store, setStore }}>
      <BrowserRouter>
        <Ads ads={[ads.firstAdd, ads.secondAdd, ads.thirdAdd]} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/about-us"
            element={
              <>
                <AboutUs />
              </>
            }
          />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/auth-admin" element={<AuthAdmin />} />
          <Route path="/products/:productUrl" element={<Product />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs/:blogId" element={<GetBlog />} />
          <Route path="/checkout/:cart_id" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </theStore.Provider>
  );
}

export default App;