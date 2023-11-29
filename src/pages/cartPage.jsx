import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../assets/loading";
function CartPage() {
  /// cart id 
  let [cart_id, setCartId] = useState("");
  /// user picks
  let [userPicks, setUserPicks] = useState([]);
  /// is fetching
  let [isFetching, setFetching] = useState(false);
  /// for rendering control
  /// msg
  let [msg, setMsg] = useState("");
  /// get cart items from server
  useEffect(() => {
    setFetching(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_cart
      }`,
      {
        method: "get",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cart.allCartProducts) {
          setCartId(data.cart.cart_id)
          setUserPicks(data.cart.allCartProducts);
          setFetching(false);
        } else {
          setUserPicks([]);
          setFetching(false);
        }
      });
  }, []);
  /////////////////////////////////////////////////////////////// get total price
  let [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (userPicks.length > 0) {
      userPicks.forEach((item) => {
        setTotalPrice((pr) => pr + item.totalPrice);
      });
    }
  }, [userPicks]);
  //// remove item from cart
  ///////////////////////////////////////////////////// deleting variable for rendering control
  let [deleting, setDeleting] = useState(false);
  function removeItem(itemId, cartId) {
    setDeleting(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_delete_cart_item
      }`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          itemId,
          cartId,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setMsg("somthing wrong, try again later");
          return;
        }
        setDeleting(false);
        setMsg("removing item from your cart ...");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          window.location.reload("self");
        }, 5000);
      });
  }
  /// if is fetching
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  /// if no cart available
  if (userPicks.length == 0) {
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
  }
  /// rendering
  return (
    <div className="h-fit w-full p-4 flex flex-col gap-4 ">
      {/* message */}
      {msg && (
        <div className="w-full p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-md text-white flex flex-col items-center justify-center">
          {msg}
        </div>
      )}
      {userPicks.map((pk, index) => {
        return (
          <div
            key={index}
            // make it responsive
            className="bg-gradient-to-r from-green-500 to-green-700 p-4 text-white rounded-lg w-full h-fit"
          >
            {/* product information */}
            <div className="grid grid-cols-6 gap-2 justify-start h-fit">
              {/* image */}
              <Link to={`../products/${pk.id}`} className="w-full h-full">
                <img src={pk.image} alt={pk.name} className="rounded-lg" />
              </Link>
              {/* name and stock*/}
              <div className="flex flex-col gap-2 items-center justify-center">
                <div> {pk.name}</div>
                <div>
                  {pk.stock > 0 ? (
                    <p className="text-white">in stock</p>
                  ) : (
                    <p className="text-red-500">out of stock</p>
                  )}
                </div>
              </div>
              {/* user picks */}
              <div className="flex flex-col gap-2 justify-center items-center">
                <div>
                  <h2>varients you picked:</h2>
                </div>
                {pk.color && (
                  <div className="flex flex-row gap-2">
                    <p>color:</p> <p>{pk.color}</p>
                  </div>
                )}

                {pk.size && (
                  <div className="flex flex-row gap-2">
                    <p>size:</p> <p>{pk.size}</p>
                  </div>
                )}
                {pk.varients && (
                  <div className="flex flex-row gap-2">
                    <p>varients:</p> <p>{pk.otherVarients}</p>
                  </div>
                )}
              </div>

              {/* quantity */}
              <div className="flex flex-col gap-2 items-center justify-center">
                <label htmlFor="quantity">quantity:</label>
                <div>
                  <input
                    id="quantity"
                    type="number"
                    value={pk.quantity}
                    readOnly
                    className="rounded-lg p-2 w-full outline-0 text-green-600"
                  />
                </div>
              </div>

              {/* price */}
              <div className="flex flex-row gap-2 items-center justify-center">
                <h2>price:</h2>
                <p>{pk.totalPrice}</p>
              </div>
              {/* remove */}
              <div className="flex items-center justify-center">
                {deleting ? (
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white place-self-center"></div>
                ) : (
                  <button
                    className="w-full h-fit p-2 flex items-center justify-center hover:bg-red-100 transition duration-300 rounded-lg"
                    onClick={() => {
                      removeItem(pk.itemId, pk.cart_id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {/* total and order page*/}
      <div className="w-full h-fit text-green-600 bg-zinc-100 rounded p-4 grid grid-cols-2 ">
        <div>
          <h2>total price: {totalPrice.toFixed(2)}</h2>
        </div>
        <Link to={`/checkout/${cart_id}`}>
          <button className="p-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition duration-300 float-right">complete order</button>
        </Link>
      </div>
      {/* other items maybe you like */}
    </div>
  );
}

export default CartPage;
