import { Link } from "react-router-dom";
function OrderInfo({ order, setOrder }) {
  //// rendering
  return (
    <div className="w-page flex-col gap-10 bg-white p-4 min-h-screen rounded-md text-gray-700">
      <div className="p-2 bg-green-600 rounded-md mb-10">
        <button
          onClick={() => setOrder({})}
          className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-200 transition duration-300"
        >
          go back
        </button>
      </div>
      {/* order info */}
      <div className="flex flex-row flex-wrap gap-4 bg-gray-100 border-b border-gray-500 w-full h-fit p-4 rounded-md">
        <div className="flex flex-col gap-2 items-center ">
          <h2 className="font-semibold">order number</h2>
          <p>{order.orderNumber}</p>
        </div>
        <div className="flex flex-col gap-2 items-center ">
          <h2 className="font-semibold">date placed</h2>
          <p>{order.placedAt}</p>
        </div>
        <div className="flex flex-col gap-2 items-center ">
          <h2 className="font-semibold">total ammount</h2>
          <p>{(order.total).toFixed(2)}$</p>
        </div>
      </div>
      {/* user info */}
      <div className="flex flex-row sm:gap-6 p-4 flex-wrap border-b border-gray-500">
        {/* user name */}
        <h2 className="sm:border-r border-black p-2 text-sm">
          <strong>customer name: </strong> {order.userName}
        </h2>
        {/* user email */}
        <h2 className="sm:border-r border-black p-2 text-sm">
          <strong>email: </strong> {order.userEmail}
        </h2>
        {/* address  */}
        <h2 className="sm:border-r border-black p-2 text-sm">
          <strong> address: </strong> {order.fullAddress}
        </h2>
        {/* payment method */}
        <h2 className="sm:border-r border-black p-2 text-sm">
          <strong> payment method: </strong>
          {order.paymentMethod}
        </h2>
        {/* phone number */}
        <h2 className="sm:border-r border-black p-2 text-sm">
          <strong> phone: </strong>
          {order.phoneNumber}
        </h2>
        {/* status */}
        <h2
          className={`sm:border-r border-black p-2 text-sm ${
            order.status == "Pending" && "text-yellow-600"
          } ${order.status == "Cancelled" && "text-red-600"} ${
            order.status == "Completed" && "text-green-600"
          } ${order.status == "Processing" && "text-green-600"}`}
        >
          <strong>order status: </strong>
          {order.status}
        </h2>
        {/* details */}

        {order?.detailedStatus && (
          <div>
            <h2>details:</h2>
            <h2>{order.detailedStatus}</h2>
          </div>
        )}
      </div>
      {/* items */}
      {order.items.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 sm:flex-row w-full p-4 sm:justify-start items-center justify-center"
        >
          <h2>{index + 1}</h2>
          <Link
            to={`/products/${item.id}`}
            className="text-teal-700 w-40 h-40 block mb-5 items-center justify-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <span className="mt-2 block">View Product</span>
          </Link>
          <h2>{item.name}</h2>
          {item.color && (
            <div
              className="h-6 w-6 rounded-md "
              style={{ backgroundColor: item.color }}
            />
          )}
          {item.size && <h2>{item.size}</h2>}
          {item.varient && <h2>{item.varient}</h2>}
          <h2>quantity: {item.quantity}</h2>
          <h2>price: {(item.price).toFixed(2)}$</h2>
          <h2>discount: {item.discount}%</h2>
          <h2>
            price after discount:
            {(item.price * (1 - item.discount / 100)).toFixed(2)}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default OrderInfo;
