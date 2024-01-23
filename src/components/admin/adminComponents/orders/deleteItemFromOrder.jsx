import deleteItemFromOrderHandler from "./ordersFunctions/deleteItemFromOrder.js";
import { useState } from "react";
function DeleteItemFromOrder({ data }) {
  ///
  const [msg, setMsg] = useState("");
  const [fetching, setFetching] = useState(false);
  const [item, setItem] = useState("");
  //// handle delete
  function handleDelete(e) {
    e.preventDefault();
    setFetching(true);
    deleteItemFromOrderHandler(data.order_id, item)
      .then((res) => res.json())
      .then((data) => {
          setMsg(data.message || "something error");
        
      })
      .finally(() => {
        setFetching(false);
      });
  }
  /// rendering
  return (
    <div className="flex flex-col gap-10 text-gray-700 bg-gray-100 w-full h-fit rounded-md p-4 text-center">
      <h2 className="font-bold">Delete Order Item</h2>
      <form
        className="flex flex-row gap-4 w-full items-center justify-start"
        onSubmit={handleDelete}
      >
        {/* new order status */}
        <label htmlFor="item">item:</label>
        <select
          name="item"
          id="item"
          className="px-4 py-2 rounde-md"
          onChange={(e) => setItem(e.target.value)}
        >
          <option value="">choose item you want to delete</option>
          {data.items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.product.productName}
            </option>
          ))}
        </select>
        {/* submit */}
        {fetching ? (
          <div className="h-6 w-6 border-t border-b border-green-600 animate-spin rounded-full" />
        ) : (
          <input
            disabled={fetching}
            type="submit"
            value={"delete item"}
            className="px-4 py-2 rounded-md bg-gray-700 text-white"
          />
        )}
      </form>
      {msg && <div className="bg-white p-2">{msg}</div>}
    </div>
  );
}

export default DeleteItemFromOrder;
