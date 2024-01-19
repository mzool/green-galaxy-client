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
//// track order
import TrackOrder from "./pages/trackOrder";
/// search result
import SearchResult from "./components/search/searchResult";
import Sales from "./pages/sales";
//////////////////////
function App() {
  /// context api for global store
  let [store, setStore] = useState({
    user: {},
    updateUser: (newData) => {
      setStore((prevStore) => ({ ...prevStore, user: newData }));
    },
    products: [],
    updateProducts: (productsArr) => {
      setStore((prevStore) => ({
        ...prevStore,
        products: [...prevStore.products, ...productsArr],
      }));
    },
    cart: {},
    updateCart: (item) => {
      setStore((prevStore) => ({
        ...prevStore,
        cart: { items: item.cartItems, cartId: item.cartId, totalPrice: item.totalPrice },
      }));
    },
    blogs: [],
    updateBlogs: (item) => {
      setStore((prevStore) => ({
        ...prevStore,
        blogs: [...prevStore.blogs, ...item],
      }));
    },
    location: {},
    theme: {},
    updateTheme: (style) => {
      setStore((prevStore) => ({
        ...prevStore,
        theme: { ...prevStore.theme, style },
      }));
    },
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
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/auth/admin" element={<AuthAdmin />} />
          <Route path="/products/:productUrl" element={<Product />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs/:blog_id" element={<GetBlog />} />
          <Route path="/checkout/:cartId" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </theStore.Provider>
  );
}

export default App;
