import { useState, useContext } from "react";
import LoadingSpinner from "../assets/loading";
import trackOrder from "../functions/trackOrder.js";
import OrderInfo from "../components/trackorder/showOrder.jsx";
import theStore from "../store/store.js";
function TrackOrder() {
  const { store } = useContext(theStore);
  //// order number variable
  let [orderNumber, setOrderNumber] = useState("");
  /// orders info
  let [orders, setOrders] = useState({});
  /// fetching
  let [isFetching, setFetching] = useState(false);
  /// msg
  let [msg, setMsg] = useState("");
  //// track order function
  function startTracking(e) {
    e.preventDefault();
    setFetching(true);
    trackOrder(orderNumber, setOrders, setMsg).then(() => {
      setFetching(false);
    });
  }
  /////// rendering
  if (!store.user.name) {
return <div className="flex items-center justify-center text-green-600 p-4 w-full h-screen">Please Login first in order to track your orders.</div>
   } else {
    if (isFetching) {
      return <LoadingSpinner color={"green-500"} />;
    }
    /// if order data available
    if (orders.orderNumber && !isFetching) {
      return (
        <OrderInfo
          order_number={orders.orderNumber}
          fullName={orders.fullName}
          totalPrice={orders.totalPrice}
          paid={orders.paid}
          payment_method={orders.payment_method}
          phone_number={orders.phone_number}
          items={orders.items}
          status = {orders.order_status}
          address={orders.address}
        />
      );
    }
    if (msg) {
      return (
        <div className="w-full p-4 h-screen flex items-center justify-center text-green-600">
          {msg}
        </div>
      );
    }
    return (
      <div className="w-full p-10 h-screen bg-white flex items-start justify-center ">
        {/* form that take order number and search for it  */}
        <form
          onSubmit={startTracking}
          className="w-fit h-fit p-10 bg-green-600 rounded-lg flex flex-col gap-4 items-center justify-center"
        >
          <div className="flex items-center justify-center">
            <input
              id="orderNumber"
              type="text"
              placeholder="order_234XXX"
              className="p-4 rounded-lg outline-0 "
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="p-4 rounded-lg bg-white text-green-700 px-6 hover:bg-zinc-100 transition duration-300"
            >
              track my order
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TrackOrder;
