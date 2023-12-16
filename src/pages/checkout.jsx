import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../assets/loading";
import CheckoutForm from "../components/checkout/checkoutForm";
function Checkout() {
  /// get cart id
  const { cart_id } = useParams();
  /// get cart items
  let [cartItems, setCartItems] = useState([]);
  /// total price
  let [totolPrice, setTotalPrice] = useState(0);
  /// discount code
  let [discountCode, setDiscountCode] = useState("");
  /// is fitching for rendering
  let [isFetching, setIsFetching] = useState(false);
  let [verified, setVerified] = useState(false);
  /// msgs
  let [message, setMsg] = useState({
    err: "",
    msg: "",
  });
  /// check for the cart id
  useEffect(() => {
    setIsFetching(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_checkout_page
      }/${cart_id}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `GreenBearer ${
            import.meta.env.VITE_authorization_token
          }`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
              import.meta.env.VITE_get_cart
            }`,
            {
              method: "get",
              mode: "cors",
              credentials: "include",
              headers: {
                Authorization: `GreenBearer ${
                  import.meta.env.VITE_authorization_token
                }`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.cart.allCartProducts) {
                setCartItems(data.cart.allCartProducts);
                setIsFetching(false);
              } else {
                setIsFetching(false);
              }
            });
          setVerified(true);
        } else {
          setIsFetching(false);
          setVerified(false);
        }
      });
  }, []);
  /// set total price
  useEffect(() => {
    cartItems.forEach((item) => {
      setTotalPrice((pr) => (pr += item.totalPrice));
    });
  }, [cartItems]);
  /// handle discount submit
  function getDiscount(e) {
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
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_get_discount_code
        }`,
        {
          method: "post",
          mode: "cors",
          headers: {
            Authorization: `GreenBearer ${
              import.meta.env.VITE_authorization_token
            }`,
            "content-type": "apllication/json",
          },
          body: JSON.stringify({ discountCode }),
        }
      )
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
  if (verified == true) {
    return (
      <div className="sm:grid sm:grid-cols-2 flex flex-col-reverse w-full h-fit min-h-screen mb-4">
        {/* form */}
        <div className="bg-white w-full h-fit min-h-screen">
          <CheckoutForm totalPrice={totolPrice.toFixed(2)} items={cartItems} />
        </div>
        <div className="bg-gray-200 w-full p-4 h-fit min-h-screen flex flex-col gap-2 rounded-lg">
          {/* display cart items */}
          <div className="flex flex-col gap-2 p-2 items-center">
            {cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-green-900 rounded flex flex-row h-fit p-2 items-center text-white gap-4"
                >
                  <div className="w-fit">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12"
                    />
                  </div>
                  <div>
                    <h2>{item.name}</h2>
                  </div>
                  <div className="flex justify-center">
                    <h1>quantity:</h1>
                    {item.quantity}
                  </div>
                  <div>
                    <h2>item price: {item.price}</h2>
                  </div>
                </div>
              );
            })}
          </div>
          {/* display discount form */}
          <div className="w-full p-2 flex items-center justify-center">
            <form
              onSubmit={getDiscount}
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
              <div className="w-full flex items-center justify-end p-2">
                {message.err && <p className="text-red-500">{message.err}</p>}
                {message.msg && <p className="text-teal-600">{message.msg}</p>}
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
          <div className="w-fit flex items-center justify-start m-4 text-black p-4 bg-white rounded-lg">
            <h1> total price: {totolPrice.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    );
  } else {
    //////////////////////////////////////// no checkout page
    return (
      <div className="h-screen flex flex-col gap-2 justify-center items-center bg-white text-green-600 ">
        <h1>Page Not Found</h1>
        <p>
          Sorry, the page you requested is not available. You can try adding
          items to your cart
          <Link
            to={"/all-products"}
            className="p-2 border-2 border-zinc-200 shadow-md shadwo-green-500 rounded-md bg-green-100 m-2"
          >
            
            shop now
          </Link>
          or visit your
          <Link
            to={"/cart"}
            className="p-2 border-2 border-zinc-200 shadow-md shadwo-green-500 rounded-md bg-green-100 m-2"
          >
            cart.
          </Link>
        </p>
      </div>
    );
  }
}

export default Checkout;
