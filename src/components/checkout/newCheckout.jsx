import { useState, useEffect, useContext } from "react";
import CheckoutNav from "./checkoutNav";
import OrderItems from "./orderItems";
import GetCart from "../../functions/getCart";
import theStore from "../../store/store.js";
import LoadingSpinner from "../../assets/loading";
import CheckoutForm from "./checkoutForm.jsx";

function NCheckout() {
  const { store } = useContext(theStore);
  const [fetching, setFetching] = useState(true);
  const [checkoutPage, setCheckoutPage] = useState(false);

  // Check if the cart is empty
  useEffect(() => {
    if (store.cart.items?.length > 0) {
      setCheckoutPage(true);
      setFetching(false);
    } else {
      setFetching(false);
    }
  }, [store.cart.items]);

  // Fetch cart items from the server
  useEffect(() => {
    if (!checkoutPage) {
      setFetching(true);
      GetCart(store)
        .then(() => {
          setCheckoutPage(store.cart.items?.length > 0);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, []);

  // Rendering logic
  if (fetching) {
    return <LoadingSpinner color={"green-600"} />;
  }

  if (checkoutPage) {
    return (
      <div className="min-h-screen">
        {/* navbar */}
        <CheckoutNav />
        {/* order summary */}
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <OrderItems cart={store?.cart} />
          {/* payment section */}
          <CheckoutForm cart={store?.cart}/>
        </div>
      </div>
    );
  }

  // Default state when there are no items in the cart
  return (
    <div className="w-full min-h-screen text-center text-gray-700 font-bold p-6">
      There are no items in your cart.
    </div>
  );
}

export default NCheckout;
