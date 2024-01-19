import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../assets/loading";
import theStore from "../store/store.js";
import GetCart from "../functions/getCart.js";
import removeItem from "../functions/removeItemFromCart.js";
function CartPage() {
  /// get the store
  const { store } = useContext(theStore);
  const { items } = store.cart;
  /// is fetching
  let [isFetching, setFetching] = useState(false);
  /// msg
  let [msg, setMsg] = useState("");
  /// get cart items from server
  useEffect(() => {
    setFetching(true);
    GetCart(store).finally(() => setFetching(false));
  }, []);
  /// if is fetching
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  /// if no cart available
  if (items?.length == 0 || !items) {
    return (
      <div className="min-h-screen h-fit bg-white flex items-center justify-center flex-col gap-4 text-green-600">
        <div className="bg-zinc-100 p-2 rounded-lg flex flex-row flex-wrap gap-2">
          <h2>no items in your cart </h2>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </div>
        </div>

        <Link
          to={"/all-products"}
          className="flex items-center justify-center p-2 bg-zinc-100 gap-2 flex-row flex-wrap rounded-lg hover:bg-zinc-200 hover:text-green-500 transition ease-in-out duration-300"
        >
          <div>shop now</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
            />
          </svg>
        </Link>
      </div>
    );
  } ////////////////////////////////////////////////////////////
  else
    return (
      <div className="h-fit min-h-screen w-full px-10 py-4 flex flex-col gap-4 items-center justify-start">
        {/* message */}
        {msg && (
          <div className="w-full p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-md text-white flex flex-col items-center justify-center">
            {msg}
          </div>
        )}
        {/* title */}
        <div className="bg-gray-100 rounded-lg p-2 w-full text-center text-2xl font-bold text-gray-600">
          <h1>
            Your Cart ({items.length}
            {items.length > 1 ? " items" : " item"})
          </h1>
        </div>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              // make it responsive
              className="bg-gradient-to-r from-green-900 to-green-600 p-4 text-white rounded-lg w-full h-fit items-center justify-center sm:grid sm:grid-cols-6 gap-2 flex flex-col flex-wrap"
            >
              {/* product information */}
              {/* image */}
              <Link
                to={`../products/${item.product.id}`}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="rounded-lg w-24 h-24 "
                />
              </Link>
              {/* name and stock*/}
              <div className="flex flex-col sm:gap- items-center justify-center">
                <div> {item.product.name}</div>
                <div>
                  {item.product.stock > 0 ? (
                    <p className="text-white">in stock</p>
                  ) : (
                    <p className="text-red-500">out of stock</p>
                  )}
                </div>
              </div>
              {/* cart items */}
            { (item.color || item.size || item.otherVarients)  && <div className="flex flex-col gap-2 justify-center items-center">
                {item.color && (
                  <div className="flex flex-row gap-2">
                    <p>color:</p>{" "}
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                )}

                {item.size && (
                  <div className="flex flex-row gap-2">
                    <p>size:</p> <p>{item.size}</p>
                  </div>
                )}
                {item.otherVarients && (
                  <div className="flex flex-row gap-2">
                    <p>varients:</p> <p>{item.otherVarients}</p>
                  </div>
                )}
              </div>}

              {/* quantity */}
              <div className="flex flex-col gap-2 items-center justify-center">
                <label htmlFor="quantity">quantity:</label>
                <div>
                  <p className="rounded-lg p-1 w-full outline-0 text-white">
                    {item.quantity}
                  </p>
                </div>
              </div>

              {/* price */}
              <div className="flex flex-row gap-2 items-center justify-center">
                <h2>price:</h2>
                <p>{(item.quantity * item.product.price).toFixed(2)}</p>
              </div>
              {/* remove */}
              <div className="flex items-center justify-center">
                <button
                  className="w-full h-fit p-2 flex flex-row gap-2 items-center justify-center hover:bg-red-500 transition duration-300 rounded-lg"
                  onClick={() => {
                    removeItem(
                      item._id,
                      store.cart.cartId,
                      setMsg,
                      GetCart,
                      store
                    );
                  }}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
        {/* total and order page*/}
        <div className="w-full h-fit text-gray-600 bg-gray-100 rounded p-4 flex ">
          <Link to={`/checkout/${store.cart.cartId}`}>
            <button className="py-2 px-4 rounded-md bg-gray-600 text-white hover:bg-gray-500 transition duration-300">
              checkout
            </button>
          </Link>
        </div>
        {/* other items maybe you like */}
      </div>
    );
}

export default CartPage;
