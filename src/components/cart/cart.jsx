import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import theStore from "../../store/store.js";
import { Link } from "react-router-dom";
function Cart() {
  /// navigate
  const navigate = useNavigate();
  /// store
  const store = useContext(theStore);
  /// get location
  let location = useLocation();
  //// cart controller
  const [cartIsClosed, setCartIsClosed] = useState(true);
  //// get cart dom
  const cart = useRef();
  ///  /// do not show cart on blacklist
  const blackList = [
    "/login",
    "/profile",
    "/blog",
    "/register",
    "/contact-us",
    "/about-us",
    "/cart",
    "/auth-admin",
  ];
  let [showCart, setShowCart] = useState(true);
  //// get the pathname
  useEffect(() => {
    document.body.style.overflowX = "hidden";

    if (
      blackList.includes(location.pathname) ||
      blackList.includes(location.href)
    ) {
      setShowCart(false);
    } else {
      setShowCart(true);
    }
  }, [location, showCart]);

  /// cart open and close
  function toggleCart() {
    document.body.style.overflowX = "hidden";

    if (cartIsClosed === true) {
      cart.current.style.transition = "300ms";
      cart.current.style.transform = "translateX(-100%) ";
      setTimeout(() => {
        setCartIsClosed(false);
      }, 300);
    }
    if (cartIsClosed === false) {
      cart.current.style.transition = "300ms";
      cart.current.style.transform = "translateX(0) ";
      setTimeout(() => {
        setCartIsClosed(true);
      }, 300);
    }
  }
  /// when add to cart
  let [firstRender, setFirstRender] = useState(0);
  useEffect(() => {
    if (firstRender > 0 && cartIsClosed === true) {
      toggleCart();
    }
    setFirstRender((pr) => pr + 1);
  }, [store.store.cart]);
  /// rendering
  if (showCart) {
    return (
      <div
        className="h-screen md:w-3/12 left-full sm:w-4/12 w-3/6 bg-zinc-50 border-zinc-200 border-2 text-green-600 p-4 flex flex-col gap-1 rounded-md absolute z-10 transition-transform"
        ref={cart}
      >
        <div className="bg-teal-500 w-fit absolute right-full place-self-start rounded-lg mr-1 bg-opacity-80">
          <button onClick={toggleCart} className="w-full h-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
        {/* Cart content */}
        <div className="flex flex-col gap-2 justify-center ">
          {store.store.cart.length > 1
            ? store.store.cart.map((item, ind) => {
                if (item.name) {
                  return (
                    <div
                      key={ind}
                      className="w-full h-fit flex rounded-lg border-2 border-zinc-200 bg-white bg-white justify-center"
                    >
                      <Link to={item.productLink}>
                        <img
                          src={item.imgs}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </Link>
                      <div className="mt-4">
                        <Link to={item.productLink}>
                          <h2 className="text-xl font-semibold text-green-600 hover:text-teal-400 transition">
                            {item.name}
                          </h2>
                        </Link>
                        <p className="text-gray-600 mt-2">{item.price}</p>
                      </div>
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Cart;
