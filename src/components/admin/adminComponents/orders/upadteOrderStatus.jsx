import { useState } from "react";
import updateOrderStatusHandler from "./ordersFunctions/updateOrderStatus.js";
function UpadteOrderStatus({ data }) {
  ///
  const [newOrderStatus, setNewOrderStatus] = useState(data?.order_status);
  const [fetching, setIsFetching] = useState(false);
  const [details, setDetails] = useState("");
  const [msg, setMsg] = useState("");
  /// handle submit
  function handleOrderStatus(e) {
    e.preventDefault();
    setIsFetching(true);
    updateOrderStatusHandler(data?.order_id, newOrderStatus, details)
      .then((res) => res.json())
      .then((data) => {
          setMsg(data.message ||"something error");
      })
      .finally(() => {
        setIsFetching(false);
      });
  }
  /// rendering
  return (
    <div className="flex flex-col gap-10 text-gray-700 bg-gray-100 w-full h-fit rounded-md p-4 text-center">
      <h2 className="font-bold">update order status</h2>
      <form
        className="flex flex-row gap-4 w-full items-center justify-start"
        onSubmit={handleOrderStatus}
      >
        {/* current order status */}
        <label htmlFor="currentStatus">current status:</label>
        <input
          id="currentStatus"
          type="text"
          readOnly
          className="px-4 py-2 rounded-md "
          value={data?.order_status}
        />
        {/* new order status */}
        <label htmlFor="newOrderStatus">new status:</label>
        <select
          name="newOrderStatus"
          id="newOrderStatus"
          className="px-4 py-2 rounde-md"
          onChange={(e) => setNewOrderStatus(e.target.value)}
        >
          <option value="">choose new order status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {/* details */}
        <label htmlFor="details">order details:</label>
        <input
          type="text"
          className="px-4 py-2 rounded-md"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        {/* submit */}
        {fetching ? (
          <div className="h-6 w-6 border-t border-b border-green-600 animate-spin rounded-full" />
        ) : (
          <input
            disabled={fetching}
            type="submit"
            value={"change order status"}
            className="px-4 py-2 rounded-md bg-gray-700 text-white"
          />
        )}
      </form>
      {msg && <div className="bg-white p-2">{msg}</div>}
    </div>
  );
}

export default UpadteOrderStatus;
