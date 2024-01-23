import { useState, useEffect } from "react";
import getAllOrders from "../../admin-functions/getAllOrders.js";
import LoadingSpinner from "../../../../assets/loading.jsx";
import OrderData from "./orderData.jsx";
import AllOrderData from "./allOrderData.jsx";
function AllOrders() {
  ///
  const [search, setSearch] = useState({
    order_id: "",
    userName: "",
    email: "",
  });
  const [filterd, setFiltered] = useState([]);
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
  /// function find order
  function handleFilter() {
    let filteredOrder = [];
    orders.forEach((order) => {
      if (
        order.email == search.email ||
        order.firstName.toLowerCase() == search.userName.toLocaleLowerCase() ||
        order.lastName.toLocaleLowerCase() ==
          search.userName.toLocaleLowerCase() ||
        order.order_id == search.order_id
      ) {
        filteredOrder.push(order);
      }
    });
    setFiltered(filteredOrder);
  }
  /// rendering
  if (filterd.length > 0 && !orderData) {
    return (
      <div className="flex flex-col gap-10 text-gray-700 p-10">
        <div className="grid grid-cols-2">
          <h2 className="font-bold">filtered orders:</h2>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-md w-fit"
            onClick={() => {
              setFiltered([]);
              setSearch({ email: "", userName: "", order_id: "" });
            }}
          >
            clear filter
          </button>
        </div>
        <AllOrderData orders={filterd} setOrderData={setOrderData} />
      </div>
    );
  }
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  if (orderData) {
    return <OrderData data={orderData} setOrderData={setOrderData} />;
  }
  return (
    <div className="flex flex-col h-fit min-h-screen p-6">
      {/* search for order */}
      <div className="flex flex-row gap-4 bg-gray-100 rounded-md p-4 text-gray-700 mb-5">
        <input
          type="email"
          value={search.email}
          placeholder="email"
          onChange={(e) =>
            setSearch((pr) => ({ ...pr, email: e.target.value }))
          }
          className="rounded-md px-4 py-2"
        />
        <input
          type="text"
          value={search.userName}
          placeholder="user name"
          onChange={(e) =>
            setSearch((pr) => ({ ...pr, userName: e.target.value }))
          }
          className="rounded-md px-4 py-2"
        />
        <input
          type="text"
          value={search.order_id}
          placeholder="order id"
          onChange={(e) =>
            setSearch((pr) => ({ ...pr, order_id: e.target.value }))
          }
          className="rounded-md px-4 py-2"
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 rounded-md bg-gray-700 text-white"
        >
          find order
        </button>
      </div>
      <h2 className="font-bold text-xl mb-4">
        All Orders: ({orders.length} order)
      </h2>
      <AllOrderData orders={orders} setOrderData={setOrderData} />
    </div>
  );
}

export default AllOrders;
