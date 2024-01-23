import getAllUserOrdersHandler from "./functions/getAllUserOrders";
import { useState, useEffect } from "react";
import OrderInfo from "../trackorder/showOrder";
import cancelOrder from "./functions/cancelOrder.js";
import LoadingSpinner from "../../assets/loading.jsx";
function AllOrders() {
  /// orders
  const [orders, setOrders] = useState([]);
  /// show order info
  const [showOrder, setShowOrder] = useState({ show: false });
  ///
  const [wantedOrder, setWanted] = useState({});
  ///
  const [fetching, setFetching] = useState(false);
  const [msg, setMsg] = useState("");
  /// get all orders
  useEffect(() => {
    setFetching(true);
    getAllUserOrdersHandler()
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.allOrders.length > 0) {
          setOrders(data.allOrders);
        } else {
          setMsg(data.message);
        }
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);
  /// rendering
  if (fetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  if (showOrder.show) {
    return (
      <div className="w-full flex items-center justify-center">
        <OrderInfo order={wantedOrder} setOrder={setShowOrder} />
      </div>
    );
  }
  if (orders.length == 0 && msg) {
    return (
      <div className="bg-white text-gray-700 font-bold text-center p-10 min-h-screen text-gray-700">
        {msg}
      </div>
    );
  }
  return (
    <div className="w-full h-fit min-h-screen bg-white p-4 flex flex-col gap-4">
      <h2 className="font-bold w-full bg-green-600 text-white p-2 rounded-md text-center">
        All Orders:
      </h2>
      <div className="flex flex-row flex-warp p-2 gap-4">
        {orders.map((order) => (
          <div
            key={order.orderNumber}
            className="w-fit h-fit rounded-md bg-gray-100 p-4 flex flex-col gap-2"
          >
            <h2>order number: {order.orderNumber}</h2>
            <h2>ordered by: {order.userName}</h2>
            <h2>placed on: {order.placedAt}</h2>
            <h2>status: {order.status}</h2>
            <button
              className="w-full rounded-md bg-green-500 text-white px-4 py-2 hover:bg-opacity-70"
              onClick={() => {
                setWanted(order);
                setShowOrder({ show: true });
              }}
              disabled={fetching}
            >
              show order
            </button>
            {order.status == "Pending" && (
              <button
                disabled={fetching}
                className="w-full rounded-md bg-red-500 text-white px-4 py-2 hover:bg-opacity-70"
                onClick={() => {
                  setFetching(true);
                  cancelOrder(order.orderNumber, order.userEmail)
                    .then((res) => res.json())
                    .then((data) => {
                      order.status = "Cancelled";
                      setMsg(data.message);
                    })
                    .finally(() => {
                      setFetching(false);
                    });
                }}
              >
                cancel the order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllOrders;
