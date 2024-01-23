import formatReadableDate from "../../../../functions/dateFormatter.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UpadteOrderStatus from "./upadteOrderStatus.jsx";
import UpdateOrderVarient from "./updateOrderItem.jsx";
import DeleteItemFromOrder from "./deleteItemFromOrder.jsx";
function OrderData({ data, setOrderData }) {
  /// user info dialog
  const userInfo = useRef(null);
  /// handle user info dialog
  function handleUserInfoDialog(open) {
    open ? userInfo.current?.close() : userInfo.current?.showModal();
  }
  /// product dialog
  const productDialog = useRef(null);
  function handleProductDialog(open) {
    open ? productDialog.current?.close() : productDialog.current?.showModal();
  }
  return (
    <div className="flex flex-col gap-4 text-gray-700 h-fit w-full min-h-screen p-4">
      {/* close */}
      <button
        className="px-4 py-2 rounded bg-gray-200 text-gray-800 w-fit border hover:border-black"
        onClick={() => setOrderData(null)}
      >
        return to all orders
      </button>
      {/* data section */}
      <div className="grid grid-cols-6 gap-2 bg-gray-100 p-4 rounded-md">
        {/* order id */}
        <div className="flex flex-col gap-2 text-center">
          <h2>order id</h2>
          {data.order_id}
        </div>
        {/* date placed */}
        <div className="flex flex-col gap-2 text-center">
          <h2>placed date</h2>
          {formatReadableDate(data.createdAt)}
        </div>
        {/* customer info */}
        <div className="flex flex-col gap-2 text-center">
          user information
          <button
            className="w-full hover:bg-gray-500 bg-gray-300 hover:text-white rounded-md"
            onClick={() => handleUserInfoDialog(false)}
          >
            click to show user info
          </button>
          {/* ***************** user info dialog***************/}
          <dialog
            ref={userInfo}
            className="backdrop:bg-green-500 backdrop:bg-opacity-20 p-4 rounded-md text-gray-700"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleUserInfoDialog(true)}
                className="px-4 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-400"
              >
                close
              </button>
              <h2>first name: {data.firstName}</h2>
              <h2>last name: {data.lastName}</h2>
              <h2>email: {data.email}</h2>
              <h2>phone: {data.phone}</h2>
              <h2>city: {data.city}</h2>
              <h2>address: {data.address}</h2>
            </div>
          </dialog>
        </div>
        {/* total ammount */}
        <div className="flex flex-col gap-2 text-center">
          <h2>total price</h2>
          <h2>{data.totalPrice}</h2>
        </div>
        {/*  product info */}
        <div className="flex flex-col gap-2 text-center">
          <h2>order items</h2>
          <button
            onClick={() => {
              handleProductDialog(false);
            }}
            className="w-full hover:bg-gray-500 bg-gray-300 hover:text-white rounded-md"
          >
            click to show order items
          </button>
          <dialog
            ref={productDialog}
            className="backdrop:bg-green-500 backdrop:bg-opacity-20 p-4 rounded-md text-gray-700"
          >
            <div className="flex flex-col gap-10">
              <button
                onClick={() => handleProductDialog(true)}
                className="px-4 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-400"
              >
                close
              </button>
              <div className="">
                {data.items.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index % 2 == 0 ? "bg-gray-100" : "bg-gray-500 text-white"
                    } p-4`}
                  >
                    <h2>{index + 1}</h2>
                    <div>
                      <h2>product id: {item.product.productId}</h2>
                      <h2>product name: {item.product.productName}</h2>
                      <h2>product price: {item.product.productPrice}$</h2>
                      <h2>product stock: {item.product.productStock}</h2>
                      <h2>current discount: {item.product.productDiscount}%</h2>
                      <h2>when order placed discount: {item.discount}%</h2>
                    </div>
                    {item.color && <h2>color: {item.color}</h2>}
                    {item.size && <h2>size: {item.size}</h2>}
                    {item.otherVarients && (
                      <h2>othterVerients: {item.otherVarients}</h2>
                    )}
                    <h2>quantity: {item.quantity}</h2>
                    <Link
                      to={`/products/${item.product.productId}`}
                      className="text-teal-500"
                    >
                      view product
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </dialog>
        </div>
        {/* status */}
        <div className="flex flex-col gap-2 text-center">
          <h2>order status</h2>
          <p>{data?.order_status}</p>
          <p> {data?.detailedStatus && data.detailedStatus}</p>
        </div>
      </div>
      <UpadteOrderStatus data={data} />
      <UpdateOrderVarient data={data} />
      <DeleteItemFromOrder data={data}/>
    </div>
  );
}

export default OrderData;
