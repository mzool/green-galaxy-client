import { useState } from "react";
import LoadingSpinner from "../assets/loading";
import trackOrder from "../functions/trackOrder.js";
import OrderInfo from "../components/trackorder/showOrder.jsx";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
function TrackOrder() {
  const [search, setSearch] = useSearchParams();
  //// order number variable
  const [orderNumber, setOrderNumber] = useState(
    search.get("orderNumber") || ""
  );
  /// order info
  const [order, setOrder] = useState({});
  /// email
  const [email, setEmail] = useState(search.get("email") || "");
  /// fetching
  const [isFetching, setFetching] = useState(false);
  /// msg
  const [msg, setMsg] = useState("");
  /// if there are a params then get the order
  useEffect(() => {
    if (email && orderNumber) {
      trackOrder(orderNumber, email, setOrder, setMsg);
    }
  }, []);

  //// track order function
  function startTracking(e) {
    e.preventDefault();
    /// set search params
    setSearch({ email, orderNumber });
    setFetching(true);
    trackOrder(orderNumber, email, setOrder, setMsg).then(() => {
      setFetching(false);
    });
  }
  /////// rendering
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  /// if order data available
  if (order.orderNumber) {
    return (
      <div className="w-full flex justify-center p-4">
        <OrderInfo order={order} setOrder={setOrder} />
      </div>
    );
  }
  return (
    <div className="w-full p-10 h-screen bg-white flex items-start justify-center text-gray-700">
      {/* form that take order number and search for it  */}
      <form
        onSubmit={startTracking}
        className="w-full sm:w-4/6 md:w-3/6 h-fit text-sm p-10 bg-green-600 rounded-lg flex flex-col gap-4 items-center justify-center"
      >
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="px-4 py-2 rounded-md outline-0 w-full"
          />
          <input
            required
            id="orderNumber"
            type="text"
            placeholder="order id"
            className="px-4 py-2 rounded-md outline-0 w-full"
            value={orderNumber}
            onChange={(e) => {
              setOrderNumber(e.target.value);
            }}
          />
        </div>
        {/* message */}
        {msg && (
          <div className="text-red-500 p-2 bg-white w-fit rounded-md place-self-start">
            {msg}
          </div>
        )}
        {/* submint */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-white hover:bg-gray-200 transition duration-300"
          >
            track my order
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrackOrder;
