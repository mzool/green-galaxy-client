
function AllOrderData({orders, setOrderData}) {
  return (
    <div>
      {/* headers */}
      <div className="bg-gray-600 p-4 lg:grid lg:grid-cols-5 text-white hidden">
        {/* number */}
        <h2>number</h2>
        <h2>order id</h2>
        <h2>user name</h2>
        <h2>user email</h2>
        <h2>order status</h2>
      </div>
      {/* data */}
      {orders.map((order, index) => (
        <div
          key={index}
          className={`lg:grid lg:grid-cols-5 flex flex-col ${
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
          {/* user email */}
          <h2 className="lg:text-xs">{order.email}</h2>
          {/* order status */}
          <h2>{order.order_status}</h2>
        </div>
      ))}
    </div>
  );
}

export default AllOrderData