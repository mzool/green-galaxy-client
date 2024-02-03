import { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../assets/loading";
import CheckoutForm from "../components/checkout/checkoutForm";
import theStore from "../store/store.js";
import getDiscount from "../functions/discountCode.js";
import GetCart from "../functions/getCart.js";

function Checkout() {
  //// store
  const { store } = useContext(theStore);
  /// discount code
  const [discountCode, setDiscountCode] = useState("");
  /// is fitching for rendering
  const [isFetching, setIsFetching] = useState(true);
  /// msgs
  const [message, setMsg] = useState({
    err: "",
    msg: "",
  });
  const [done, setDone] = useState(false);
  // get cart items from server
  useEffect(() => {
    window.scrollTo(0, 0);
    if (store.cart.items?.length > 0) {
      setIsFetching(false);
      return;
    } else {
      GetCart(store).finally(() => setIsFetching(false));
    }
  }, []);
  /// handle discount submit
  function handleDiscount(e) {
    e.preventDefault();
    /// regix to check discount code
    const dRegex = /^[a-zA-Z0-9]+$/;
    const checker = dRegex.test(discountCode);
    if (checker == false) {
      setMsg({
        err: "invalid discount code",
        msg: "",
      });
      return;
    } else {
      /// fetch the server for the discount code
      getDiscount(discountCode)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMsg({
              err: "",
              msg: discountCode,
            });
          } else {
            setMsg({
              err: "invalid discount code",
              msg: "",
            });
            return;
          }
        });
    }
  }
  ////////// rendering
  /// if is fetching
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  // the checkout page //////////////
  if (store.cart.items?.length > 0) {
    return (
      <div className="flex flex-row flex-wrap w-full h-fit min-h-screen p-2">
        {/* form */}
        <CheckoutForm
          totalPrice={store.cart.totalPrice.toFixed(2)}
          items={store.cart.items}
          cartId={store.cart.cartId}
          setDone={setDone}
        />
        {!done && (
          <div className="bg-gray-200 w-2/6 p-4 h-fit min-h-screen flex flex-col gap-2 rounded-lg">
            {/* display cart items */}
            <div className="flex flex-col gap-2 p-2 items-center">
              {store.cart.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-green-900 rounded flex flex-row h-fit p-2 items-center text-white gap-4"
                  >
                    <div className="w-fit">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12"
                      />
                    </div>
                    <div>
                      <h2>{item.product.name}</h2>
                    </div>
                    <div className="flex justify-center">
                      <h1>quantity:</h1>
                      {item.quantity}
                    </div>
                    <div>
                      <h2>item price: {item.product.price}</h2>
                    </div>
                    <div>
                      <h2>discount: {item.product.discount}%</h2>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* display discount form */}
            <div className="w-full p-2 flex items-center justify-center">
              <form
                onSubmit={handleDiscount}
                className="flex flex-col w-full h-fit p-2 items-center justify-center "
              >
                {/* discount code */}
                <div className="w-full flex items-center justify-start">
                  <input
                    type="text"
                    placeholder="discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    required
                    className="outline-0 p-2 w-full sm:w-5/6 md:w-4/6 border-white border-2 rounded-md hover:border-teal-500 focus:border-teal-500 transition duration-300"
                  />
                </div>
                {/* message */}
                <div className="w-full flex items-center p-2">
                  {message.err && <p className="text-red-500">{message.err}</p>}
                  {message.msg && (
                    <p className="text-teal-600">{message.msg}</p>
                  )}
                </div>
                {/* submit */}
                <div className="w-full flex items-center justify-start">
                  <button
                    type="submit"
                    className="w-5/6 sm:w-3/6 md:w-2/6 border-white border-2 bg-gray-600 rounded-md p-2 text-white hover:bg-gray-500 transition duration-300"
                  >
                    apply
                  </button>
                </div>
              </form>
            </div>
            {/* total price after discount */}
            <div className="w-fit flex flex-col items-center justify-start m-4 text-black p-4 bg-white rounded-lg">
              <h1> total price: {store.cart.totalPrice.toFixed(2)}</h1>
              <p className="text-xs">
                *shipping and taxes calculated when confirm order
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="h-screen w-full text-center text-2xl font-bold text-green=600">
        no cart found for you.
      </div>
    );
  }
}

export default Checkout;
