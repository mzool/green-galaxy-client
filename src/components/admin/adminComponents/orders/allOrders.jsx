import { useState, useEffect } from "react";
import getAllOrders from "../../admin-functions/getAllOrders.js";
import LoadingSpinner from "../../../../assets/loading.jsx";
import OrderData from "./orderData.jsx";
function AllOrders() {
  ///
  const [orders, setOrders] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [orderData, setOrderData] = useState(null);
  //// fetch the server
  useEffect(() => {
    setFetching(true);
    getAllOrders()
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.allOrders);
        }
      })
      .finally(() => setFetching(false));
  }, []);

  /// rendering
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  if (orderData) {
    return <OrderData data={orderData} setOrderData={setOrderData} />;
  }
  return (
    <div className="flex flex-col h-fit min-h-screen p-6">
      <h2 className="font-bold text-xl mb-4">
        All Orders: ({orders.length} order)
      </h2>
      {/* headers */}
      <div className="bg-gray-600 p-4 grid grid-cols-4 text-white">
        {/* number */}
        <h2>number</h2>
        <h2>order id</h2>
        <h2>user name</h2>
        <h2>order status</h2>
      </div>
      {/* data */}
      {orders.map((order, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 ${
            index % 2 == 0
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-gray-600 text-white hover:bg-gray-700"
          } p-4  p-4 cursor-pointer `}
          onClick={() => setOrderData(order)}
        >
          {/* number */}
          <h2>{index + 1}</h2>
          {/* order id */}
          <div>{order.order_id}</div>
          {/* user name */}
          <h2>
            {order.firstName} {order.lastName}
          </h2>
          {/* order status */}
          <h2>{order.order_status}</h2>
        </div>
      ))}
    </div>
  );
}

export default AllOrders;
