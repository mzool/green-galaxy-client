import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ConfirmOrder(props) {
  /// get props
  const { info, totalPrice, items, payment_method, cart_id } = props;
  /// navigate
  const navigate = useNavigate();
  /// fetching
  let [isFetching, setFetching] = useState(false);
  /// completed
  let [completed, setCompleted] = useState(false);
  /// messages
  let [message, setMessage] = useState({
    err: "",
    msg: "",
  });
  /// handle payment
  function handleCheckout() {
    setFetching(true);
    let theItems = items.map((item) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        otherVarients: item.otherVarients,
      };
    });
    const body = {
      ...info,
      items: theItems,
      totalPrice,
      payment_method,
      cart_id,
    };

    if (payment_method === "cash") {
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_new_order
        }`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            Authorization: `GreenBearer ${
              import.meta.env.VITE_authorization_token
            }`,
          },
          body: JSON.stringify(body),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMessage({ err: "", msg: data.message });
          } else {
            setMessage({
              err: data.error,
              msg: "",
            });
          }
          setFetching(false);
          setCompleted(true);
          setTimeout(() => {
            navigate(`/track-order/${data.orderNumber}`);
          }, 10000);
        });
    } else {
      console.log("paypal");
    }
  }
  ///////////////////////// rendering
  return (
    <div className="flex flex-col gap-2 bg-white p-4 justify-start text-zinc-800 rounded-lg w-full h-fit border-2 border-zinc-500">
      {/* confirm your order */}
      <div className="place-self-center">
        <h2>Confirm your order Information </h2>
      </div>
      <hr />
      {/* user info */}
      {/* user full name */}
      <div className="flex flex-row gap-2">
        <h2>Full name:</h2>
        <p>
          {info.firstName} {info.lastName}
        </p>
      </div>

      {/* user email */}
      <div className="flex flex-row gap-2">
        <h2>Email:</h2>
        <p>{info.email}</p>
      </div>
      {/* user phone */}
      <div className="flex flex-row gap-2">
        <h2>Phone Number:</h2>
        <p>{info.phone}</p>
      </div>
      {/* user address */}
      <div className="flex flex-row gap-2">
        <h2>Address:</h2>
        <p>{info.address}</p>
      </div>
      <hr />
      {/* items */}
      <div className="flex flex-col">
        <h2>items:</h2>
        <ol className="list-decimal list-inside p-2">
          {items.map((item, index) => {
            return (
              <li key={index} className="m-2 p-2">
                {item.name}
                <ul className="list-disc list-inside">
                  {item.color && <li>color: {item.color}</li>}
                  {item.size && <li> size: {item.size}</li>}
                  {item.otherVarients && (
                    <li>varients: {item.otherVarients}</li>
                  )}
                  <li>unit price: {item.price}</li>
                  <li>quantity: {item.quantity}</li>
                </ul>
                <hr />
              </li>
            );
          })}
        </ol>
      </div>
      {/* total price */}
      <div className="flex flex-row gap-2">
        <h2>Total Price:</h2>
        <p>{totalPrice}</p>
      </div>
      {/* payment method */}
      <div className="flex flex-row gap-2">
        <h2>Payment method:</h2>
        <p>{payment_method}</p>
      </div>
      {/* place order */}
      <div>
        {!completed && !isFetching && (
          <button
            className="p-2 rounded-lg bg-teal-600 text-white border-2 border-white hover:border-green-500 transition duration-300 m-2 px-6"
            onClick={handleCheckout}
            disabled={completed}
          >
            Place order
          </button>
        )}
        {isFetching && (
          <button
            className="p-2 rounded-lg bg-teal-600 text-white border-2 border-white transition duration-300 m-2 px-6 animate-pulse"
            disabled={true}
          >
            processing...
          </button>
        )}
        {message.err && (
          <div className="p-4 text-red-500">
            <h2>{message.err}</h2>
          </div>
        )}
        {message.msg && (
          <div className="p-4 text-green-500">
            <h2>{message.msg}</h2>
          </div>
        )}
      </div>
      {/* generate reciept */}
    </div>
  );
}

export default ConfirmOrder;
